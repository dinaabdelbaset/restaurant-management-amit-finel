<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'name' => 'Bistro Bliss API',
        'status' => 'online',
        'version' => '1.0'
    ]);
});
