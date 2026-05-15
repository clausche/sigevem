<?php

namespace App\Http\Controllers;

use App\Models\Maintenance;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class MaintenanceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Maintenances/Index', [
            'maintenances' => Maintenance::with('vehicle')->orderBy('date', 'desc')->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Maintenances/Create', [
            'vehicles' => Vehicle::orderBy('plate')->get(['id', 'plate']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'type' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'cost' => 'required|numeric|min:0',
            'km' => 'required|integer|min:0',
            'workshop' => 'required|string|max:255',
        ]);

        Maintenance::create($validated);

        return Redirect::route('maintenances.index')->with('message', 'Mantención registrada con éxito.');
    }

    public function edit(Maintenance $maintenance): Response
    {
        return Inertia::render('Maintenances/Edit', [
            'maintenance' => $maintenance,
            'vehicles' => Vehicle::orderBy('plate')->get(['id', 'plate']),
        ]);
    }

    public function update(Request $request, Maintenance $maintenance)
    {
        $validated = $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'type' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'cost' => 'required|numeric|min:0',
            'km' => 'required|integer|min:0',
            'workshop' => 'required|string|max:255',
        ]);

        $maintenance->update($validated);

        return Redirect::route('maintenances.index')->with('message', 'Mantención actualizada con éxito.');
    }

    public function destroy(Maintenance $maintenance)
    {
        $maintenance->delete();

        return Redirect::route('maintenances.index')->with('message', 'Mantención eliminada.');
    }
}
