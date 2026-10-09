<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Booking;
use App\Models\User;

class DummyBookingSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('role', 'user')->first() ?? User::first();
        if (!$user) return;

        if (Booking::count() === 0) {
            Booking::create([
                'user_id' => $user->id,
                'booking_date' => '2026-10-15',
                'booking_time' => '19:30',
                'guests' => 4,
                'status' => 'Accepted',
            ]);

            Booking::create([
                'user_id' => $user->id,
                'booking_date' => '2026-10-18',
                'booking_time' => '20:00',
                'guests' => 2,
                'status' => 'Pending',
            ]);
        }
    }
}
