import React from 'react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import type { PageProps as AppPageProps } from '@/types';

interface VehicleRequest {
    id: number;
    reason: string;
    destination: string;
    start_date: string;
    end_date: string;
    status: string;
    sla_status: 'green' | 'yellow' | 'red';
    deadline: string;
    user?: {
        name: string;
    };
    department?: {
        name: string;
    };
}

interface PageProps extends AppPageProps {
    requests: {
        data: VehicleRequest[];
        links: any;
    };
    flash: {
        message: string | null;
    };
    vehicles: any[];
    users: any[];
}

export default function Index() {
    const { requests, flash } = usePage<PageProps>().props;
    const { post } = useForm();

    const handleGrant = (id: number, vehicleId: number, driverId: number) => {
        post(route('requests.grant', { vehicleRequest: id, vehicle_id: vehicleId, driver_id: driverId }));
    };

    const handleReject = (id: number) => {
        post(route('requests.reject', id));
    };

    const promptAndGrant = (id: number) => {
        const vehicleId = Number(prompt('Ingrese ID de Vehículo'));
        const driverId = Number(prompt('Ingrese ID de Conductor'));

        if (!vehicleId || !driverId) {
            return;
        }

        handleGrant(id, vehicleId, driverId);
    };

    return (
        <AuthenticatedLayout
            user={usePage().props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Solicitudes de Vehículos</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between mb-6">
                            <h3 className="text-lg font-medium">Gestión de Solicitudes</h3>
                            <Link
                                href={route('requests.create')}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                            >
                                Nueva Solicitud
                            </Link>
                        </div>

                        {flash.message && (
                            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
                                {flash.message}
                            </div>
                        )}

                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario / Unidad</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motivo / Destino</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha/Hora</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SLA (2h)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {requests.data.map((req) => (
                                    <tr key={req.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div className="font-bold">{req.user?.name}</div>
                                            <div className="text-gray-500 text-xs">{req.department?.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="font-medium">{req.reason}</div>
                                            <div className="text-xs italic">{req.destination}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {req.start_date.split('T')[0]} {req.start_date.split('T')[1] || ''}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                req.sla_status === 'green' ? 'bg-green-100 text-green-800' :
                                                req.sla_status === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {req.deadline}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                req.status === 'pending' ? 'bg-gray-100 text-gray-800' :
                                                req.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                                                req.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {req.status === 'pending' && usePage().props.auth.user.role === 'admin' && (
                                                <>
                                                    <button
                                                        onClick={() => promptAndGrant(req.id)}
                                                        className="text-green-600 hover:text-green-900 mr-4"
                                                    >
                                                        Otorgar
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(req.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Rechazar
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
