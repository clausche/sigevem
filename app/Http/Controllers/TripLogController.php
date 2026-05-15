<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\TripLog;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class TripLogController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('TripLogs/Index', [
            'logs' => TripLog::with(['assignment.vehicle', 'assignment.driver'])->paginate(10),
        ]);
    }

    public function start(Request $request, Assignment $assignment)
    {
        $validated = $request->validate([
            'start_km' => 'required|integer|min:0',
            'fuel_level_start' => 'required|string',
        ]);

        TripLog::create([
            'assignment_id' => $assignment->id,
            'start_km' => $validated['start_km'],
            'fuel_level_start' => $validated['fuel_level_start'],
        ]);

        return Redirect::route('assignments.index')->with('message', 'Salida registrada correctamente.');
    }

    public function end(Request $request, Assignment $assignment)
    {
        $validated = $request->validate([
            'end_km' => 'required|integer|min:0',
            'fuel_level_end' => 'required|string',
            'observations' => 'nullable|string',
            'incidents' => 'nullable|string',
        ]);

        $tripLog = TripLog::where('assignment_id', $assignment->id)->firstOrFail();

        if ($validated['end_km'] < $tripLog->start_km) {
            return back()->withErrors(['end_km' => 'El kilometraje final no puede ser menor al inicial.']);
        }

        $tripLog->update([
            'end_km' => $validated['end_km'],
            'fuel_level_end' => $validated['fuel_level_end'],
            'observations' => $validated['observations'],
            'incidents' => $validated['incidents'],
        ]);

        // Update vehicle status and km
        $vehicle = $assignment->vehicle;
        $vehicle->update([
            'current_km' => $validated['end_km'],
            'status' => 'available',
        ]);

        // Close request
        $assignment->request->update(['status' => 'completed']);

        return Redirect::route('requests.index')->with('message', 'Retorno registrado y vehículo liberado.');
    }
}
