<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\MenuController;
use App\Http\Controllers\API\BookingController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\ContactMessageController;
// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/menu', [MenuController::class, 'index']);
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{id}', [PostController::class, 'show']);
Route::post('/contact', [ContactMessageController::class, 'store']);
// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    // User profile
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    
    // User bookings
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);
    
    // User orders
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    
    // Admin routes
    Route::middleware('can:admin')->group(function () {
        Route::post('/menu', [MenuController::class, 'store']);
        Route::put('/menu/{id}', [MenuController::class, 'update']);
        Route::delete('/menu/{id}', [MenuController::class, 'destroy']);
        
        Route::put('/bookings/{id}/status', [BookingController::class, 'updateStatus']);
        Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);
        Route::get('/admin/users', [AuthController::class, 'users']);
        
        Route::post('/posts', [PostController::class, 'store']);
        Route::put('/posts/{id}', [PostController::class, 'update']);
        Route::delete('/posts/{id}', [PostController::class, 'destroy']);
        
        Route::get('/contact', [ContactMessageController::class, 'index']);
        Route::delete('/contact/{id}', [ContactMessageController::class, 'destroy']);
    });
});
