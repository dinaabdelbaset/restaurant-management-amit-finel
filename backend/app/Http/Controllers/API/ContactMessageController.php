<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    public function index()
    {
        return response()->json(ContactMessage::latest()->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string'
        ]);

        $contact = ContactMessage::create($request->all());

        return response()->json(['message' => 'Message sent successfully!', 'contact' => $contact], 201);
    }

    public function destroy($id)
    {
        ContactMessage::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
