<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(rand(6, 12));
        $content = $this->generateRichContent();
        
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'content' => $content,
            'excerpt' => $this->faker->paragraph(),
            'featured_image' => 'articles/article-' . $this->faker->numberBetween(1, 10) . '.jpg',
            'status' => $this->faker->randomElement(['draft', 'published']),
            'published_at' => $this->faker->dateTimeBetween('-1 month', '+1 month'),
            'author_id' => User::where('role', 'author')->inRandomOrder()->first()->id,
            'meta_title' => $title,
            'meta_description' => $this->faker->paragraph(),
            'social_image' => 'articles/social-' . $this->faker->numberBetween(1, 5) . '.jpg',
        ];
    }

    /**
     * Generate rich content with HTML formatting.
     */
    private function generateRichContent(): string
    {
        $paragraphs = $this->faker->paragraphs(rand(5, 10));
        $content = '';

        foreach ($paragraphs as $index => $paragraph) {
            if ($index === 0) {
                $content .= "<h2>" . $this->faker->sentence() . "</h2>";
            }
            
            $content .= "<p>" . $paragraph . "</p>";
            
            // Add a subheading after a few paragraphs
            if ($index === 2) {
                $content .= "<h3>" . $this->faker->sentence() . "</h3>";
            }
            
            // Add a blockquote in the middle
            if ($index === 3) {
                $content .= "<blockquote>" . $this->faker->paragraph() . "</blockquote>";
            }
            
            // Add a list somewhere
            if ($index === 4) {
                $content .= "<ul>";
                for ($i = 0; $i < 4; $i++) {
                    $content .= "<li>" . $this->faker->sentence() . "</li>";
                }
                $content .= "</ul>";
            }
        }

        return $content;
    }
}
