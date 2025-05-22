<?php

namespace Database\Seeders;

use App\Models\Ad;
use Illuminate\Database\Seeder;

class AdSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ads = [
            [
                'name' => 'Header Banner',
                'position' => 'header',
                'content' => '<div class="bg-primary-100 p-4 rounded-lg text-center">
                    <p class="text-primary-800 font-bold">Header Advertisement Space</p>
                    <p class="text-primary-600">Your ad could be here!</p>
                </div>',
                'is_active' => true,
            ],
            [
                'name' => 'Sidebar Top',
                'position' => 'sidebar',
                'content' => '<div class="bg-secondary-100 p-4 rounded-lg text-center">
                    <p class="text-secondary-800 font-bold">Sidebar Advertisement</p>
                    <p class="text-secondary-600">Promote your product here</p>
                </div>',
                'is_active' => true,
            ],
            [
                'name' => 'Article Top',
                'position' => 'article_top',
                'content' => '<div class="bg-accent-100 p-4 rounded-lg text-center my-4">
                    <p class="text-accent-800 font-bold">Featured Promotion</p>
                    <p class="text-accent-600">Special offer for our readers!</p>
                </div>',
                'is_active' => true,
            ],
            [
                'name' => 'Article Middle',
                'position' => 'article_middle',
                'content' => '<div class="bg-gray-100 p-4 rounded-lg text-center my-4">
                    <p class="text-gray-800 font-bold">Mid-Article Ad</p>
                    <p class="text-gray-600">Discover our services</p>
                </div>',
                'is_active' => true,
            ],
            [
                'name' => 'Article Bottom',
                'position' => 'article_bottom',
                'content' => '<div class="bg-primary-100 p-4 rounded-lg text-center my-4">
                    <p class="text-primary-800 font-bold">Bottom Article Ad</p>
                    <p class="text-primary-600">Learn more about our offerings</p>
                </div>',
                'is_active' => true,
            ],
            [
                'name' => 'Footer Banner',
                'position' => 'footer',
                'content' => '<div class="bg-secondary-100 p-4 rounded-lg text-center">
                    <p class="text-secondary-800 font-bold">Footer Advertisement</p>
                    <p class="text-secondary-600">Last chance to check our deals!</p>
                </div>',
                'is_active' => true,
            ],
        ];

        foreach ($ads as $ad) {
            Ad::create($ad);
        }
    }
}
