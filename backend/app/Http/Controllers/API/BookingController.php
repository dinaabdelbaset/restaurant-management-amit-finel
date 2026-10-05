<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        if ($request->user()->role === 'admin') {
            return response()->json(Booking::with('user')->orderBy('created_at', 'desc')->get());
        }
        return response()->json(Booking::where('user_id', $request->user()->id)->orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'booking_date' => 'required|date',
            'booking_time' => 'required',
            'guests' => 'required|integer|min:1',
        ]);

        $booking = Booking::create([
            'user_id' => $request->user()->id,
            'booking_date' => $request->booking_date,
            'booking_time' => $request->booking_time,
            'guests' => $request->guests,
            'status' => 'Pending'
        ]);

        return response()->json($booking, 201);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Pending,Accepted,Rejected'
        ]);

        $booking = Booking::findOrFail($id);
        $booking->update(['status' => $request->status]);

        return response()->json($booking);
    }
}
