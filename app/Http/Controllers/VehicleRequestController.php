<?php

namespace App\Http\Controllers;

use App\Models\VehicleRequest;
use App\Models\Vehicle;
use App\Models\User;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class VehicleRequestController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();

        // If admin, see all. If user, see only theirs.
        $query = VehicleRequest::with(['user', 'department']);

        if ($user->role !== 'admin' && $user->role !== 'fleet_manager') {
            $query->where('user_id', $user->id);
        }

        $requests = $query->orderBy('created_at', 'desc')->paginate(10);

        // Calculate SLA status for the view
        $requests->getCollection()->transform(function ($request) {
            $createdAt = Carbon::parse($request->created_at);
            $deadline = $createdAt->copy()->addHours(2);
            $now = Carbon::now();

            $status = 'green';
            if ($now->greaterThan($deadline)) {
                $status = 'red';
            } elseif ($now->diffInMinutes($deadline) < 60) {
                $status = 'yellow';
            }

            $request->sla_status = $status;
            $request->deadline = $deadline->format('Y-m-d H:i');
            return $request;
        });

        return Inertia::render('Requests/Index', [
            'requests' => $requests,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Requests/Create', [
            'departments' => Department::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'department_id' => 'required|exists:departments,id',
            'reason' => 'required|string',
            'destination' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);

        $user = Auth::user();

        VehicleRequest::create(array_merge($validated, [
            'user_id' => $user->id,
            'status' => 'pending',
        ]));

        return Redirect::route('requests.index')->with('message', 'Solicitud enviada correctamente.');
    }

    public function grant(Request $request, VehicleRequest $vehicleRequest)
    {
        abort_unless(in_array(Auth::user()->role, ['admin', 'fleet_manager'], true), 403);

        $validated = $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'driver_id' => 'required|exists:users,id',
        ]);

        $vehicle = Vehicle::findOrFail($validated['vehicle_id']);

        if ($vehicle->status !== 'available') {
            return back()->withErrors(['vehicle' => 'El vehículo seleccionado no está disponible.']);
        }

        // Update request
        $vehicleRequest->update([
            'status' => 'assigned',
            'granted_by' => Auth::id(),
        ]);

        // Create assignment
        \App\Models\Assignment::create([
            'request_id' => $vehicleRequest->id,
            'vehicle_id' => $vehicle->id,
            'driver_id' => $validated['driver_id'],
            'assigned_at' => now(),
        ]);

        // Mark vehicle as in use
        $vehicle->update(['status' => 'in_use']);

        return Redirect::route('requests.index')->with('message', 'Vehículo asignado correctamente.');
    }

    public function reject(VehicleRequest $vehicleRequest)
    {
        abort_unless(in_array(Auth::user()->role, ['admin', 'fleet_manager'], true), 403);

        $vehicleRequest->update(['status' => 'rejected']);

        return Redirect::route('requests.index')->with('message', 'Solicitud rechazada.');
    }
}
