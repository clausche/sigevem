<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class VehicleController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Vehicles/Index', [
            'vehicles' => Vehicle::with(['department', 'assignedDriver'])
                ->orderBy('mobile_code')
                ->orderBy('plate')
                ->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Vehicles/Create', [
            'departments' => Department::orderBy('name')->get(['id', 'name']),
            'drivers' => User::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'mobile_code' => ['required', 'string', 'regex:/^M-\d{2}$/', 'unique:vehicles,mobile_code'],
            'plate' => 'required|string|max:10|unique:vehicles,plate',
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:'.(date('Y') + 1),
            'type' => 'required|string|max:255',
            'status' => 'required|string',
            'current_km' => 'required|integer|min:0',
            'department_id' => 'nullable|exists:departments,id',
            'assigned_driver_id' => 'nullable|exists:users,id',
            'parking_location' => 'nullable|string|max:255',
        ]);

        Vehicle::create($validated);

        return Redirect::route('vehicles.index')->with('message', 'Vehículo registrado con éxito.');
    }

    public function edit(Vehicle $vehicle): Response
    {
        return Inertia::render('Vehicles/Edit', [
            'vehicle' => $vehicle,
            'departments' => Department::orderBy('name')->get(['id', 'name']),
            'drivers' => User::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Vehicle $vehicle)
    {
        $validated = $request->validate([
            'mobile_code' => ['required', 'string', 'regex:/^M-\d{2}$/', 'unique:vehicles,mobile_code,'.$vehicle->id],
            'plate' => 'required|string|max:10|unique:vehicles,plate,'.$vehicle->id,
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:'.(date('Y') + 1),
            'type' => 'required|string|max:255',
            'status' => 'required|string',
            'current_km' => 'required|integer|min:0',
            'department_id' => 'nullable|exists:departments,id',
            'assigned_driver_id' => 'nullable|exists:users,id',
            'parking_location' => 'nullable|string|max:255',
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
