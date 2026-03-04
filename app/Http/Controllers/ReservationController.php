<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    /**
     * Show the reservation form.
     */
    public function show()
    {
        return Inertia::render('Reservation');
    }

    /**
     * Handle the reservation form submission.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'date' => ['required', 'date', 'after_or_equal:today'],
            'time' => ['required', 'string'],
            'guests' => ['required', 'string'],
            'occasion' => ['nullable', 'string', 'max:255'],
            'special_requests' => ['nullable', 'string', 'max:1000'],
        ]);

        // Store reservation in database
        // \App\Models\Reservation::create($validated);

        // Send confirmation email (implement later)
        // Mail::to($validated['email'])->send(new ReservationConfirmation($validated));

        return back()->with('success', 'Reservation confirmed! Check your email for details.');
    }
}
