<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        /** @var \App\Models\User */
        $user = Auth::user();
        $role = $user->getFirstRole();

        if ($role === 'kelurahan') {
            return redirect()->intended(route('dashboard.kelurahan', absolute: false));
        } elseif ($role === 'puskesmas') {
            return redirect()->intended(route('dashboard.puskesmas', absolute: false));
        } elseif ($role === 'kecamatan') {
            return redirect()->intended(route('dashboard.kecamatan', absolute: false));
        } elseif ($role === 'kua') {
            return redirect()->intended(route('dashboard.kua', absolute: false));
        } elseif ($role === 'catin') {
            return redirect()->intended(route('catin.permohonan-nikah.index', absolute: false));
        } else {
            return redirect()->intended(route('catin.permohonan-nikah.index', absolute: false));
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
