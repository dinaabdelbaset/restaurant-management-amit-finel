<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        if ($request->user()->role === 'admin') {
            return response()->json(Order::with(['user', 'orderItems.menuItem'])->orderBy('created_at', 'desc')->get());
        }
        return response()->json(Order::with('orderItems.menuItem')
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'address' => 'required|string',
            'phone' => 'required|string',
            'notes' => 'nullable|string',
            'payment_method' => 'required|in:Cash on Delivery,Card',
            'items' => 'required|array|min:1',
            'items.*.menu_item_id' => 'required|exists:menu_items,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric',
        ]);

        $totalAmount = 0;
        foreach($request->items as $item) {
            $totalAmount += ($item['price'] * $item['quantity']);
        }

        $order = Order::create([
            'user_id' => $request->user()->id,
            'address' => $request->address,
            'phone' => $request->phone,
            'notes' => $request->notes,
            'payment_method' => $request->payment_method,
            'status' => 'Pending',
            'total_amount' => $totalAmount,
        ]);

        foreach($request->items as $item) {
            $order->orderItems()->create([
                'menu_item_id' => $item['menu_item_id'],
                'quantity' => $item['quantity'],
                'price' => $item['price']
            ]);
        }

        return response()->json($order->load('orderItems.menuItem'), 201);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Pending,Accepted,In Progress,Delivered,Rejected'
        ]);

        $order = Order::findOrFail($id);
        $order->update(['status' => $request->status]);

        return response()->json($order);
    }
}
