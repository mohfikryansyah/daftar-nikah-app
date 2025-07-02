<?php

use Inertia\Inertia;
use App\Models\PermohonanNikah;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TemplateBerkasController;
use App\Http\Controllers\StatusPermohonanNikahController;
use App\Http\Controllers\Catin\PermohonanNikahController as CatinPermohonanNikahController;
use App\Http\Controllers\Global\PermohonanNikahController as GlobalPermohonanNikahController;

Route::get('/', function () {
    return Inertia::render('landing-page/landing-page');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return redirect()->route('dashboard.kua');
    })->name('dashboard');


    Route::get('kua/dashboard', function () {
        $permohonanNikahChart = PermohonanNikah::get();
        /** @var \App\Models\User */
        $user = Auth::user();
        $role = $user->getFirstRole();

        if ($role !== 'kua') {
            abort(403, 'Unauthorized action.');
        }

        $relevantStatus = [
            'kua' => [
                'Diverifikasi Puskesmas',
                'Diverifikasi KUA',
                'Ditolak KUA',
            ],
        ];

        $permohonanNikah = PermohonanNikah::with([
            'mempelaiPria.orangTua',
            'mempelaiWanita.orangTua',
            'user',
            'latestStatus',
        ])
            ->when(
                isset($relevantStatus[$role]),
                function ($query) use ($relevantStatus, $role) {
                    $query->whereHas('latestStatus', function ($q) use ($relevantStatus, $role) {
                        $q->whereIn('status_permohonan', $relevantStatus[$role]);
                    });
                }
            )
            ->latest()
            ->get();


        return Inertia::render('menu/dashboard/dashboard-kua', compact('permohonanNikahChart', 'permohonanNikah'));
    })->name('dashboard.kua');

    Route::get('puskesmas/dashboard', function () {
        $permohonanNikahChart = PermohonanNikah::get();
        /** @var \App\Models\User */
        $user = Auth::user();
        $role = $user->getFirstRole();

        if ($role !== 'puskesmas') {
            abort(403, 'Unauthorized action.');
        }

        $relevantStatus = [
            'puskesmas' => [
                'Diverifikasi Kelurahan',
                'Diverifikasi Puskesmas',
                'Ditolak Puskesmas',
            ],
        ];

        $permohonanNikah = PermohonanNikah::with([
            'mempelaiPria.orangTua',
            'mempelaiWanita.orangTua',
            'user',
            'latestStatus',
        ])
            ->when(
                isset($relevantStatus[$role]),
                function ($query) use ($relevantStatus, $role) {
                    $query->whereHas('latestStatus', function ($q) use ($relevantStatus, $role) {
                        $q->whereIn('status_permohonan', $relevantStatus[$role]);
                    });
                }
            )
            ->latest()
            ->get();


        return Inertia::render('menu/dashboard/dashboard-puskesmas', compact('permohonanNikahChart', 'permohonanNikah'));
    })->name('dashboard.puskesmas');

    Route::get('kelurahan/dashboard', function () {
        $permohonanNikahChart = PermohonanNikah::get();
        /** @var \App\Models\User */
        $user = Auth::user();
        $role = $user->getFirstRole();

        if ($role !== 'kelurahan') {
            abort(403, 'Unauthorized action.');
        }

        $relevantStatus = [
            'kelurahan' => [
                'Menunggu Verifikasi Kelurahan',
                'Diverifikasi Kelurahan',
                'Ditolak Kelurahan',
            ],
        ];

        $permohonanNikah = PermohonanNikah::with([
            'mempelaiPria.orangTua',
            'mempelaiWanita.orangTua',
            'user',
            'latestStatus',
        ])
            ->when(
                isset($relevantStatus[$role]),
                function ($query) use ($relevantStatus, $role) {
                    $query->whereHas('latestStatus', function ($q) use ($relevantStatus, $role) {
                        $q->whereIn('status_permohonan', $relevantStatus[$role]);
                    });
                }
            )
            ->latest()
            ->get();


        return Inertia::render('menu/dashboard/dashboard-kelurahan', compact('permohonanNikahChart', 'permohonanNikah'));
    })->name('dashboard.kelurahan');

    Route::prefix('catin')->group(function () {
        Route::resource('permohonan-nikah', CatinPermohonanNikahController::class)
            ->parameters(['permohonan-nikah' => 'permohonanNikah'])
            ->names('catin.permohonan-nikah');

        Route::resource('status-permohonan-nikah', StatusPermohonanNikahController::class)
            ->parameters(['status-permohonan-nikah' => 'statusPermohonanNikah'])
            ->only('update');
    });

    Route::prefix('global')->group(function () {
        Route::resource('permohonan-nikah', GlobalPermohonanNikahController::class)
            ->parameters(['permohonan-nikah' => 'permohonanNikah'])
            ->names('global.permohonan-nikah');

        Route::resource('status-permohonan-nikah', StatusPermohonanNikahController::class)
            ->parameters(['status-permohonan-nikah' => 'statusPermohonanNikah'])
            ->only('update');

        Route::put('status-permohonan-nikah/{statusPermohonanNikah}/update-puskesmas', [StatusPermohonanNikahController::class, 'updatePuskesmas'])
            ->name('status-permohonan-nikah.update-puskesmas');

        Route::put('status-permohonan-nikah/{statusPermohonanNikah}/update-kua', [StatusPermohonanNikahController::class, 'updateKUA'])
            ->name('status-permohonan-nikah.update-kua');
    });

    Route::prefix('kelurahan')->group(function () {
        Route::resource('template-berkas', TemplateBerkasController::class)
            ->parameters(['template-berkas' => 'templateBerkas'])
            ->names('kelurahan.template-berkas');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
