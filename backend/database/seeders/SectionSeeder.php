<?php

namespace Database\Seeders;

use App\Models\Section;
use Illuminate\Database\Seeder;

class SectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sections = [
            [
                'name' => 'Technology',
                'description' => 'Latest news and insights about technology and innovation.',
                'featured_image' => 'sections/technology.jpg',
            ],
            [
                'name' => 'Business',
                'description' => 'Business strategies, entrepreneurship, and market trends.',
                'featured_image' => 'sections/business.jpg',
            ],
            [
                'name' => 'Lifestyle',
                'description' => 'Tips and advice for a balanced and fulfilling lifestyle.',
                'featured_image' => 'sections/lifestyle.jpg',
            ],
            [
                'name' => 'Health',
                'description' => 'Health tips, wellness advice, and medical breakthroughs.',
                'featured_image' => 'sections/health.jpg',
            ],
            [
                'name' => 'Travel',
                'description' => 'Travel guides, destination reviews, and adventure stories.',
                'featured_image' => 'sections/travel.jpg',
            ],
        ];

        foreach ($sections as $section) {
            Section::create($section);
        }
    }
}
