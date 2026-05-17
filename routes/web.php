<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\VehicleRequestController;
use App\Http\Controllers\TripLogController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\MaintenanceController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehicleDocumentController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard/export-summary', [DashboardController::class, 'exportSummary'])
        ->name('dashboard.export-summary');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('departments', DepartmentController::class);
    Route::resource('vehicles', VehicleController::class);
    Route::resource('requests', VehicleRequestController::class);
    Route::post('requests/{vehicleRequest}/grant', [VehicleRequestController::class, 'grant'])->name('requests.grant');
    Route::post('requests/{vehicleRequest}/reject', [VehicleRequestController::class, 'reject'])->name('requests.reject');
    Route::resource('trip-logs', TripLogController::class);
    Route::post('trips/{assignment}/start', [TripLogController::class, 'start'])->name('trips.start');
    Route::post('trips/{assignment}/end', [TripLogController::class, 'end'])->name('trips.end');
    Route::get('assignments', [AssignmentController::class, 'index'])->name('assignments.index');
    Route::resource('maintenances', MaintenanceController::class);
    Route::resource('documents', VehicleDocumentController::class);

    Route::middleware('admin')->group(function () {
        Route::resource('users', UserController::class)->only(['index', 'edit', 'update']);
    });
});

require __DIR__.'/auth.php';
