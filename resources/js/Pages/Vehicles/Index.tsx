import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import type { PageProps as AppPageProps } from '@/types';

interface Vehicle {
    id: number;
    mobile_code: string | null;
    plate: string;
    brand: string;
    model: string;
    year: number;
    type: string;
    status: string;
    current_km: number;
    department_id: number | null;
    department?: {
        name: string;
    };
    assigned_driver?: {
        name: string;
    };
    parking_location: string | null;
}

interface PageProps extends AppPageProps {
    vehicles: {
        data: Vehicle[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        from: number | null;
        to: number | null;
        total: number;
    };
    flash: {
        message: string | null;
    };
}

export default function Index() {
    const { vehicles, flash } = usePage<PageProps>().props;

    return (
        <AuthenticatedLayout
            user={usePage().props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Vehículos</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between mb-6">
                            <h3 className="text-lg font-medium">Inventario de Flota Municipal</h3>
                            <Link
                                href={route('vehicles.create')}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                            >
                                Registrar Vehículo
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patente</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Móvil</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca/Modelo</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidad</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conductor</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Km Actual</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {vehicles.data.map((vehicle) => (
                                    <tr key={vehicle.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{vehicle.plate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{vehicle.mobile_code || 'S/C'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.brand} {vehicle.model} ({vehicle.year})</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.department?.name || 'Sin asignar'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.assigned_driver?.name || 'Sin asignar'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                vehicle.status === 'available' ? 'bg-green-100 text-green-800' :
                                                vehicle.status === 'in_use' ? 'bg-blue-100 text-blue-800' :
                                                vehicle.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {vehicle.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.current_km} km</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link
                                                href={route('vehicles.edit', vehicle.id)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                                            >
                                                Editar
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="mt-6 flex flex-col gap-4 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="text-sm text-gray-500">
                                {vehicles.total > 0 ? (
                                    <>
                                        Mostrando {vehicles.from} a {vehicles.to} de {vehicles.total} vehiculos
                                    </>
                                ) : (
                                    'No hay vehiculos registrados'
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                {vehicles.links.map((link) => (
                                    link.url ? (
                                        <Link
                                            key={link.label}
                                            href={link.url}
                                            preserveScroll
                                            className={`rounded-md border px-3 py-2 text-sm font-medium ${
                                                link.active
                                                    ? 'border-indigo-600 bg-indigo-600 text-white'
                                                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span
                                            key={link.label}
                                            className="rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-400"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
