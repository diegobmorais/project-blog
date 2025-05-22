<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdResource;
use App\Models\Ad;
use Illuminate\Http\Request;

class AdController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Ad::query();

        // Filter by position
        if ($request->has('position')) {
            $query->where('position', $request->position);
        }

        // Filter by active status
        if ($request->has('active')) {
            $isActive = filter_var($request->active, FILTER_VALIDATE_BOOLEAN);
            $query->where('is_active', $isActive);
        }

        $ads = $query->get();
        
        return AdResource::collection($ads);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|in:header,sidebar,article_top,article_middle,article_bottom,footer',
            'content' => 'required|string',
            'is_active' => 'boolean',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $ad = Ad::create($request->all());

        return new AdResource($ad);
    }

    /**
     * Display the specified resource.
     */
    public function show(Ad $ad)
    {
        return new AdResource($ad);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ad $ad)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'position' => 'sometimes|required|in:header,sidebar,article_top,article_middle,article_bottom,footer',
            'content' => 'sometimes|required|string',
            'is_active' => 'boolean',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $ad->update($request->all());

        return new AdResource($ad);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ad $ad)
    {
        $ad->delete();

        return response()->json(['message' => 'Ad deleted successfully']);
    }

    /**
     * Get active ads for a specific position.
     */
    public function getActiveByPosition(Request $request, $position)
    {
        $ad = Ad::active()->position($position)->first();
        
        if (!$ad) {
            return response()->json(['message' => 'No active ad found for this position'], 404);
        }
        
        return new AdResource($ad);
    }
}
