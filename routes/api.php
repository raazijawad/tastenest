<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Categories API
Route::apiResource('categories', CategoryController::class);
Route::post('/categories/reorder', [CategoryController::class, 'reorder']);

// Products API
Route::apiResource('products', ProductController::class);
