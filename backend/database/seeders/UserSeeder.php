<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'bio' => 'Administrator of the blog platform.',
            'email_verified_at' => now(),
        ]);

        // Create author user
        User::create([
            'name' => 'Author User',
            'email' => 'author@example.com',
            'password' => Hash::make('password'),
            'role' => 'author',
            'bio' => 'Content creator and writer for the blog.',
            'email_verified_at' => now(),
        ]);

        // Create additional authors
        User::factory(3)->create([
            'role' => 'author',
            'email_verified_at' => now(),
        ]);
    }
}
