<?php

namespace App\Http\Controllers;

use App\Models\VehicleDocument;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class VehicleDocumentController extends Controller
{
    public function index(): Response
    {
        // List documents that are expiring soon or already expired
        return Inertia::render('Documents/Index', [
            'documents' => VehicleDocument::with('vehicle')
                ->orderBy('expiry_date', 'asc')
                ->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Documents/Create', [
            'vehicles' => Vehicle::orderBy('plate')->get(['id', 'plate']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'type' => 'required|string', // soap, technical_review, circulation_permit
            'expiry_date' => 'required|date',
            'file_path' => 'nullable|string',
        ]);

        VehicleDocument::create($validated);

        return Redirect::route('documents.index')->with('message', 'Documento registrado con éxito.');
    }

    public function edit(VehicleDocument $vehicleDocument): Response
    {
        return Inertia::render('Documents/Edit', [
            'document' => $vehicleDocument,
            'vehicles' => Vehicle::orderBy('plate')->get(['id', 'plate']),
        ]);
    }

    public function update(Request $request, VehicleDocument $vehicleDocument)
    {
        $validated = $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'type' => 'required|string',
            'expiry_date' => 'required|date',
            'file_path' => 'nullable|string',
        ]);

        $vehicleDocument->update($validated);

        return Redirect::route('documents.index')->with('message', 'Documento actualizado con éxito.');
    }

    public function destroy(VehicleDocument $vehicleDocument)
    {
        $vehicleDocument->delete();

        return Redirect::route('documents.index')->with('message', 'Documento eliminado.');
    }
}
