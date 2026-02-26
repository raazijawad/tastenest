<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ShareAuthData
{
    public function handle(Request $request, Closure $next)
    {
        Inertia::share([
            'auth' => [
                'user' => $request->user(),
            ],
        ]);

        return $next($request);
    }
}
