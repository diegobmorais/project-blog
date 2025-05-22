<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Section;
use App\Models\User;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sections = Section::all();
        $authors = User::where('role', 'author')->get();

        // Create 20 published articles
        Article::factory(20)->create([
            'status' => 'published',
            'published_at' => now()->subDays(rand(1, 30)),
            'author_id' => $authors->random()->id,
        ])->each(function ($article) use ($sections) {
            // Attach 1-3 random sections to each article
            $article->sections()->attach(
                $sections->random(rand(1, 3))->pluck('id')->toArray()
            );
        });

        // Create 5 draft articles
        Article::factory(5)->create([
            'status' => 'draft',
            'published_at' => null,
            'author_id' => $authors->random()->id,
        ])->each(function ($article) use ($sections) {
            // Attach 1-3 random sections to each article
            $article->sections()->attach(
                $sections->random(rand(1, 3))->pluck('id')->toArray()
            );
        });

        // Create 5 scheduled articles
        Article::factory(5)->create([
            'status' => 'published',
            'published_at' => now()->addDays(rand(1, 14)),
            'author_id' => $authors->random()->id,
        ])->each(function ($article) use ($sections) {
            // Attach 1-3 random sections to each article
            $article->sections()->attach(
                $sections->random(rand(1, 3))->pluck('id')->toArray()
            );
        });
    }
}
