<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AssignmentController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Assignments/Index', [
            'assignments' => Assignment::with(['vehicle', 'driver', 'request'])
                ->whereDoesntHave('tripLog', function ($query) {
                    $query->whereNotNull('end_km');
                })->get(),
        ]);
    }
}
