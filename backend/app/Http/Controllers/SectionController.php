<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\SectionResource;
use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sections = Section::withCount('articles')->get();
        
        return SectionResource::collection($sections);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:sections',
            'description' => 'nullable|string',
            'featured_image' => 'nullable|image|max:2048',
        ]);

        $data = $request->except('featured_image');
        
        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('sections', 'public');
            $data['featured_image'] = $path;
        }

        // Generate slug if not provided
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        $section = Section::create($data);

        return new SectionResource($section);
    }

    /**
     * Display the specified resource.
     */
    public function show(Section $section)
    {
        $section->load('articles');
        
        return new SectionResource($section);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Section $section)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:sections,slug,' . $section->id,
            'description' => 'nullable|string',
            'featured_image' => 'nullable|image|max:2048',
        ]);

        $data = $request->except('featured_image');
        
        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            // Delete old image if exists
            if ($section->featured_image) {
                Storage::disk('public')->delete($section->featured_image);
            }
            
            $path = $request->file('featured_image')->store('sections', 'public');
            $data['featured_image'] = $path;
        }

        // Generate slug if not provided but name changed
        if (empty($data['slug']) && isset($data['name']) && $data['name'] !== $section->name) {
            $data['slug'] = Str::slug($data['name']);
        }

        $section->update($data);

        return new SectionResource($section);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Section $section)
    {
        // Check if section has articles
        if ($section->articles()->count() > 0) {
            return response()->json([
                'message' => 'Cannot delete section with articles. Remove articles first or reassign them to another section.',
            ], 422);
        }

        // Delete featured image if exists
        if ($section->featured_image) {
            Storage::disk('public')->delete($section->featured_image);
        }

        $section->delete();

        return response()->json(['message' => 'Section deleted successfully']);
    }
}
