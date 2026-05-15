import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
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
}

interface Vehicle {
    id: number;
    plate: string;
}

interface PageProps extends AppPageProps {
    maintenance: Maintenance;
    vehicles: Vehicle[];
}

export default function Edit() {
    const { maintenance, vehicles } = usePage<PageProps>().props;
    const { data, setData, put, processing, errors } = useForm({
        vehicle_id: maintenance.vehicle_id,
        type: maintenance.type,
        description: maintenance.description,
        date: maintenance.date,
        cost: maintenance.cost,
        km: maintenance.km,
        workshop: maintenance.workshop,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('maintenances.update', maintenance.id));
    };

    return (
        <AuthenticatedLayout
            user={usePage().props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Mantención</h2>}
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Vehículo</label>
                                <select
                                    value={data.vehicle_id}
                                    onChange={e => setData('vehicle_id', Number(e.target.value))}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="">Seleccione Vehículo</option>
                                    {vehicles.map(v => (
                                        <option key={v.id} value={v.id}>{v.plate}</option>
                                    ))}
                                </select>
                                {errors.vehicle_id && <div className="text-red-500 text-xs mt-1">{errors.vehicle_id}</div>}
                            </div>
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Tipo de Servicio</label>
                                <input
                                    type="text"
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.type && <div className="text-red-500 text-xs mt-1">{errors.type}</div>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Descripción Detallada</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    rows={3}
                                />
                                {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
                            </div>
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Fecha</label>
                                <input
                                    type="date"
                                    value={data.date}
                                    onChange={e => setData('date', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.date && <div className="text-red-500 text-xs mt-1">{errors.date}</div>}
                            </div>
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Costo</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.cost}
                                    onChange={e => setData('cost', Number(e.target.value))}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.cost && <div className="text-red-500 text-xs mt-1">{errors.cost}</div>}
                            </div>
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Kilometraje</label>
                                <input
                                    type="number"
                                    value={data.km}
                                    onChange={e => setData('km', Number(e.target.value))}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.km && <div className="text-red-500 text-xs mt-1">{errors.km}</div>}
                            </div>
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Taller / Servicio</label>
                                <input
                                    type="text"
                                    value={data.workshop}
                                    onChange={e => setData('workshop', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.workshop && <div className="text-red-500 text-xs mt-1">{errors.workshop}</div>}
                            </div>
                            <div className="md:col-span-2 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                                >
                                    Actualizar Mantención
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
