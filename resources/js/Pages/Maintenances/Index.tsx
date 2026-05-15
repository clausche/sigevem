import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import type { PageProps as AppPageProps } from '@/types';

interface Maintenance {
    id: number;
    vehicle_id: number;
    type: string;
    description: string;
    date: string;
    cost: number;
    km: number;
    workshop: string;
    vehicle?: {
        plate: string;
    };
}

interface PageProps extends AppPageProps {
    maintenances: {
        data: Maintenance[];
        links: any;
    };
    flash: {
        message: string | null;
    };
}

export default function Index() {
    const { maintenances, flash } = usePage<PageProps>().props;

    return (
        <AuthenticatedLayout
            user={usePage().props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Mantenciones Vehiculares</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between mb-6">
                            <h3 className="text-lg font-medium">Historial de Mantenciones y Reparaciones</h3>
                            <Link
                                href={route('maintenances.create')}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                            >
                                Registrar Mantención
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehículo</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KM</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costo</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {maintenances.data.map((m) => (
                                    <tr key={m.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{m.vehicle?.plate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{m.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{m.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{m.km} km</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${m.cost}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link
                                                href={route('maintenances.edit', m.id)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                                            >
                                                Editar
                                            </Link>
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
