<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class VehicleController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Vehicles/Index', [
            'vehicles' => Vehicle::with('department')->orderBy('plate')->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Vehicles/Create', [
            'departments' => Department::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'plate' => 'required|string|unique:vehicles,plate',
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:'.(date('Y')+1),
            'type' => 'required|string|max:255',
            'status' => 'required|string',
            'current_km' => 'required|integer|min:0',
            'department_id' => 'nullable|exists:departments,id',
        ]);

        Vehicle::create($validated);

        return Redirect::route('vehicles.index')->with('message', 'Vehículo registrado con éxito.');
    }

    public function edit(Vehicle $vehicle): Response
    {
        return Inertia::render('Vehicles/Edit', [
            'vehicle' => $vehicle,
            'departments' => Department::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Vehicle $vehicle)
    {
        $validated = $request->validate([
            'plate' => 'required|string|max:255|unique:vehicles,plate,' . $vehicle->id,
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:'.(date('Y')+1),
            'type' => 'required|string|max:255',
            'status' => 'required|string',
            'current_km' => 'required|integer|min:0',
            'department_id' => 'nullable|exists:departments,id',
        ]);

        $vehicle->update($validated);

        return Redirect::route('vehicles.index')->with('message', 'Vehículo actualizado con éxito.');
    }

    public function destroy(Vehicle $vehicle)
    {
        $vehicle->delete();

        return Redirect::route('vehicles.index')->with('message', 'Vehículo eliminado.');
    }
}
