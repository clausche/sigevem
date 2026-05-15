import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import type { PageProps as AppPageProps } from '@/types';

interface TripLog {
    id: number;
    start_km: number;
    end_km: number | null;
    fuel_level_start: string;
    fuel_level_end: string | null;
    observations: string | null;
    incidents: string | null;
    assignment: {
        vehicle: { plate: string };
        driver: { name: string };
    };
}

interface PageProps extends AppPageProps {
    logs: {
        data: TripLog[];
        links: any;
    };
}

export default function Index() {
    const { logs } = usePage<PageProps>().props;

    return (
        <AuthenticatedLayout
            user={usePage().props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Bitácora de Viajes</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehículo</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conductor</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Km Inicio</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Km Final</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Combustible</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Observaciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {logs.data.map((log) => (
                                    <tr key={log.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{log.assignment.vehicle.plate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.assignment.driver.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.start_km}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.end_km || 'En curso...'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.fuel_level_start} $\rightarrow$ {log.fuel_level_end || '...'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.observations}</td>
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
