<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Section;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Get dashboard statistics.
     */
    public function index(Request $request)
    {
        // Basic counts
        $totalArticles = Article::count();
        $publishedArticles = Article::published()->count();
        $draftArticles = Article::draft()->count();
        $scheduledArticles = Article::scheduled()->count();
        $totalSections = Section::count();
        $totalAuthors = User::where('role', 'author')->count();

        // Articles by section
        $articlesBySection = Section::withCount('articles')
            ->orderBy('articles_count', 'desc')
            ->take(5)
            ->get()
            ->map(function ($section) {
                return [
                    'id' => $section->id,
                    'name' => $section->name,
                    'count' => $section->articles_count,
                ];
            });

        // Recent articles
        $recentArticles = Article::with('author')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($article) {
                return [
                    'id' => $article->id,
                    'title' => $article->title,
                    'status' => $article->status,
                    'author' => $article->author->name,
                    'created_at' => $article->created_at,
                ];
            });

        // Articles by month (last 6 months)
        $articlesByMonth = Article::select(
                DB::raw('YEAR(created_at) as year'),
                DB::raw('MONTH(created_at) as month'),
                DB::raw('COUNT(*) as count')
            )
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                return [
                    'date' => $item->year . '-' . str_pad($item->month, 2, '0', STR_PAD_LEFT),
                    'count' => $item->count,
                ];
            });

        // Articles by author (top 5)
        $articlesByAuthor = User::withCount('articles')
            ->where('role', 'author')
            ->orderBy('articles_count', 'desc')
            ->take(5)
            ->get()
            ->map(function ($author) {
                return [
                    'id' => $author->id,
                    'name' => $author->name,
                    'count' => $author->articles_count,
                ];
            });

        return response()->json([
            'counts' => [
                'total_articles' => $totalArticles,
                'published_articles' => $publishedArticles,
                'draft_articles' => $draftArticles,
                'scheduled_articles' => $scheduledArticles,
                'total_sections' => $totalSections,
                'total_authors' => $totalAuthors,
            ],
            'articles_by_section' => $articlesBySection,
            'recent_articles' => $recentArticles,
            'articles_by_month' => $articlesByMonth,
            'articles_by_author' => $articlesByAuthor,
        ]);
    }
}
