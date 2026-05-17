<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Maintenance;
use App\Models\Vehicle;
use App\Models\VehicleDocument;
use App\Models\VehicleRequest;
use Dompdf\Dompdf;
use Dompdf\Options;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Dashboard');
    }

    public function exportSummary(): SymfonyResponse
    {
        $vehicleStatuses = [
            'available' => Vehicle::where('status', 'available')->count(),
            'in_use' => Vehicle::where('status', 'in_use')->count(),
            'maintenance' => Vehicle::where('status', 'maintenance')->count(),
            'out_of_service' => Vehicle::where('status', 'out_of_service')->count(),
            'reserved' => Vehicle::where('status', 'reserved')->count(),
        ];
        $vehicleStatuses['other'] = max(0, Vehicle::count() - array_sum($vehicleStatuses));

        $data = [
            'generatedAt' => now(),
            'stats' => [
                ['label' => 'Total de vehículos', 'value' => Vehicle::count(), 'detail' => 'Flota municipal registrada'],
                ['label' => 'Disponibles', 'value' => $vehicleStatuses['available'], 'detail' => 'Listos para asignación'],
                ['label' => 'En uso', 'value' => $vehicleStatuses['in_use'], 'detail' => 'Despachados o asignados'],
                ['label' => 'En mantención', 'value' => $vehicleStatuses['maintenance'], 'detail' => 'Taller municipal y externos'],
                ['label' => 'Solicitudes pendientes', 'value' => VehicleRequest::where('status', 'pending')->count(), 'detail' => 'Esperando aprobación'],
                ['label' => 'Solicitudes aprobadas', 'value' => VehicleRequest::whereIn('status', ['approved', 'assigned'])->count(), 'detail' => 'En curso o asignadas'],
                ['label' => 'Docs. registrados', 'value' => VehicleDocument::count(), 'detail' => 'Permisos, RT, SOAP, seguros'],
                ['label' => 'Mantenciones', 'value' => Maintenance::count(), 'detail' => 'Programadas e históricas'],
            ],
            'departmentCount' => Department::count(),
            'vehicleStatuses' => $vehicleStatuses,
            'featuredVehicle' => Vehicle::with(['department', 'assignedDriver'])
                ->where('mobile_code', 'M-05')
                ->first(),
            'latestRequests' => VehicleRequest::with(['user', 'department'])
                ->latest()
                ->take(7)
                ->get(),
            'documents' => VehicleDocument::with('vehicle')
                ->orderBy('expiry_date')
                ->take(5)
                ->get(),
            'maintenances' => Maintenance::with('vehicle')
                ->orderBy('date')
                ->take(5)
                ->get(),
        ];

        $html = view('reports.dashboard-summary', $data)->render();
        $options = new Options();
        $options->set('defaultFont', 'DejaVu Sans');
        $options->set('isRemoteEnabled', false);

        $pdf = new Dompdf($options);
        $pdf->loadHtml($html, 'UTF-8');
        $pdf->setPaper('a4', 'portrait');
        $pdf->render();

        $filename = 'resumen-sigevem-'.now()->format('Y-m-d-His').'.pdf';

        return response($pdf->output(), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="'.$filename.'"',
        ]);
    }
}
