<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index()
    {
        return response()->json(Post::latest()->get());
    }

    public function show($id)
    {
        return response()->json(Post::findOrFail($id));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('posts', 'public');
            $data['image'] = '/storage/' . $path;
        }

        $post = Post::create($data);

        return response()->json($post, 201);
    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            if ($post->image) {
                $oldPath = str_replace('/storage/', '', $post->image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('posts', 'public');
            $data['image'] = '/storage/' . $path;
        }

        $post->update($data);

        return response()->json($post);
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        if ($post->image) {
            $oldPath = str_replace('/storage/', '', $post->image);
            Storage::disk('public')->delete($oldPath);
        }
        $post->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
