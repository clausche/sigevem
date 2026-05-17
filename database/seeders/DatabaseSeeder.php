<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(DepartmentsSeeder::class);
        $this->call(FleetVehiclesSeeder::class);

        // User::factory(10)->create();

        User::firstOrCreate([
            'email' => 'test@example.com',
        ], [
            'name' => 'Test User',
            'role' => 'admin',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ])->update(['role' => 'admin']);
    }
}
