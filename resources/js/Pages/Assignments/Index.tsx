import React from 'react';
import { Head, usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import type { PageProps as AppPageProps } from '@/types';

interface Assignment {
    id: number;
    vehicle: { plate: string };
    driver: { name: string };
    request: { reason: string };
}

interface PageProps extends AppPageProps {
    assignments: Assignment[];
}

export default function Index() {
    const { assignments } = usePage<PageProps>().props;
    const { data, setData, post, processing } = useForm({
        start_km: '',
        fuel_level_start: '',
        end_km: '',
        fuel_level_end: '',
        observations: '',
        incidents: '',
    });

    const startTrip = (id: number) => {
        post(route('trips.start', { assignment: id, ...data }));
    };

    const endTrip = (id: number) => {
        post(route('trips.end', { assignment: id, ...data }));
    };

    return (
        <AuthenticatedLayout
            user={usePage().props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Asignaciones Activas</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehículo</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conductor</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motivo</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {assignments.map((asgn) => (
                                    <tr key={asgn.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{asgn.vehicle.plate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asgn.driver.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asgn.request.reason}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => {
                                                    const km = prompt('Km Inicial:');
                                                    const fuel = prompt('Combustible Inicio:');
                                                    if (km && fuel) {
                                                        setData({ start_km: km, fuel_level_start: fuel });
                                                        startTrip(asgn.id);
                                                    }
                                                }}
                                                className="text-green-600 hover:text-green-900 mr-4"
                                            >
                                                Registrar Salida
                                            </button>
                                            <button
                                                onClick={() => {
                                                    const km = prompt('Km Final:');
                                                    const fuel = prompt('Combustible Final:');
                                                    const obs = prompt('Observaciones:');
                                                    if (km && fuel) {
                                                        setData({ end_km: km, fuel_level_end: fuel, observations: obs || '' });
                                                        endTrip(asgn.id);
                                                    }
                                                }}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                Registrar Retorno
                                            </button>
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
