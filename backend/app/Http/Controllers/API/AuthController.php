<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|min:2|max:255',
            'email' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/'],
            'password' => 'required|string|min:6',
            'phone' => ['nullable', 'string', 'regex:/^(010|011|012|015)[0-9]{8}$/'],
        ], [
            'email.regex' => 'The email format is invalid. Please provide a valid email (e.g. name@example.com).',
            'phone.regex' => 'The phone number must be a valid 11-digit Egyptian phone number (e.g. 01012345678).'
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
                'role' => 'user', 
            ]);
        } else {
            // Update the existing user if they try to register again
            $user->update([
                'name' => $request->name,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'string', 'regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/'],
            'password' => 'required|string|min:6',
        ], [
            'email.regex' => 'The email format is invalid. Please provide a valid email (e.g. name@example.com).'
        ]);

        $user = User::where('email', $request->email)->first();

        // If user does not exist, create it automatically (mock login)
        if (! $user) {
            $user = User::create([
                'name' => explode('@', $request->email)[0],
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'user',
            ]);
        }

        // Bypass password check to allow ANY password as requested

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();
        
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'phone' => 'nullable|string|max:20',
            'password' => 'nullable|string|min:8'
        ]);

        $data = $request->only(['name', 'phone']);
        
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);
    }

    public function users(Request $request)
    {
        return response()->json(User::all());
    }
}
