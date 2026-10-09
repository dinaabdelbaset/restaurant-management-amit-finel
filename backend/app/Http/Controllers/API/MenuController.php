<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index()
    {
        return response()->json(MenuItem::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'category' => 'required|string',
            'image' => 'nullable'
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('menu', 'public');
            $data['image'] = '/storage/' . $path;
        }

        $item = MenuItem::create($data);
        return response()->json($item, 201);
    }

    public function update(Request $request, $id)
    {
        $item = MenuItem::findOrFail($id);
        
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric',
            'category' => 'sometimes|string',
            'image' => 'nullable'
        ]);

        $data = $request->only(['name', 'description', 'price', 'category']);

        if ($request->hasFile('image')) {
            if ($item->image && str_starts_with($item->image, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $item->image);
                \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('menu', 'public');
            $data['image'] = '/storage/' . $path;
        } elseif ($request->filled('image') && is_string($request->image)) {
            $data['image'] = $request->image;
        }

        $item->update($data);
        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = MenuItem::findOrFail($id);
        if ($item->image && str_starts_with($item->image, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $item->image);
            \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
        }
        $item->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
