<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;

// Guest Routes (Login & Register)
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

// Public Routes
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/menu', function () {
    return Inertia::render('DishMenu');
})->name('menu');

// Protected Routes (Require Authentication)
Route::middleware('auth')->group(function () {
    Route::get('/profile', function () {
        return Inertia::render('Profile');
    })->name('profile');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});
