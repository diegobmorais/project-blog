<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Article::with(['author', 'sections']);

        // Filter by status
        if ($request->has('status')) {
            if ($request->status === 'published') {
                $query->published();
            } elseif ($request->status === 'draft') {
                $query->draft();
            } elseif ($request->status === 'scheduled') {
                $query->scheduled();
            }
        }

        // Filter by section
        if ($request->has('section')) {
            $query->whereHas('sections', function ($q) use ($request) {
                $q->where('sections.id', $request->section);
            });
        }

        // Filter by author
        if ($request->has('author')) {
            $query->where('author_id', $request->author);
        }

        // Search by title or content
        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('content', 'like', '%' . $request->search . '%');
            });
        }

        // Order by
        $orderBy = $request->order_by ?? 'created_at';
        $orderDir = $request->order_dir ?? 'desc';
        $query->orderBy($orderBy, $orderDir);

        // Paginate
        $perPage = $request->per_page ?? 15;
        $articles = $query->paginate($perPage);

        return ArticleResource::collection($articles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:articles',
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'featured_image' => 'nullable|image|max:2048',
            'status' => 'required|in:draft,published',
            'published_at' => 'nullable|date',
            'section_ids' => 'nullable|array',
            'section_ids.*' => 'exists:sections,id',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'social_image' => 'nullable|image|max:2048',
        ]);

        $data = $request->except(['featured_image', 'social_image', 'section_ids']);
        
        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('articles', 'public');
            $data['featured_image'] = $path;
        }

        // Handle social image upload
        if ($request->hasFile('social_image')) {
            $path = $request->file('social_image')->store('articles/social', 'public');
            $data['social_image'] = $path;
        }

        // Set author
        $data['author_id'] = $request->user()->id;

        // Generate slug if not provided
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        // Create article
        $article = Article::create($data);

        // Attach sections
        if ($request->has('section_ids')) {
            $article->sections()->attach($request->section_ids);
        }

        return new ArticleResource($article->load(['author', 'sections']));
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return new ArticleResource($article->load(['author', 'sections']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:articles,slug,' . $article->id,
            'content' => 'sometimes|required|string',
            'excerpt' => 'nullable|string',
            'featured_image' => 'nullable|image|max:2048',
            'status' => 'sometimes|required|in:draft,published',
            'published_at' => 'nullable|date',
            'section_ids' => 'nullable|array',
            'section_ids.*' => 'exists:sections,id',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'social_image' => 'nullable|image|max:2048',
        ]);

        $data = $request->except(['featured_image', 'social_image', 'section_ids']);
        
        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            // Delete old image if exists
            if ($article->featured_image) {
                Storage::disk('public')->delete($article->featured_image);
            }
            
            $path = $request->file('featured_image')->store('articles', 'public');
            $data['featured_image'] = $path;
        }

        // Handle social image upload
        if ($request->hasFile('social_image')) {
            // Delete old image if exists
            if ($article->social_image) {
                Storage::disk('public')->delete($article->social_image);
            }
            
            $path = $request->file('social_image')->store('articles/social', 'public');
            $data['social_image'] = $path;
        }

        // Generate slug if not provided but title changed
        if (empty($data['slug']) && isset($data['title']) && $data['title'] !== $article->title) {
            $data['slug'] = Str::slug($data['title']);
        }

        // Update article
        $article->update($data);

        // Sync sections
        if ($request->has('section_ids')) {
            $article->sections()->sync($request->section_ids);
        }

        return new ArticleResource($article->load(['author', 'sections']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        // Check if user is authorized to delete
        if (auth()->user()->id !== $article->author_id && !auth()->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Delete images
        if ($article->featured_image) {
            Storage::disk('public')->delete($article->featured_image);
        }
        
        if ($article->social_image) {
            Storage::disk('public')->delete($article->social_image);
        }

        $article->delete();

        return response()->json(['message' => 'Article deleted successfully']);
    }

    /**
     * Upload an image for the article content.
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        $path = $request->file('image')->store('articles/content', 'public');
        $url = Storage::disk('public')->url($path);

        return response()->json([
            'url' => $url,
        ]);
    }
}
