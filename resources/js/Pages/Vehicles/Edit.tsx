import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import type { PageProps as AppPageProps } from '@/types';

interface Vehicle {
    id: number;
    plate: string;
    brand: string;
    model: string;
    year: number;
    type: string;
    status: string;
    current_km: number;
    department_id: number | null;
}

interface Department {
    id: number;
    name: string;
}

interface PageProps extends AppPageProps {
    vehicle: Vehicle;
    departments: Department[];
}

export default function Edit() {
    const { vehicle, departments } = usePage<PageProps>().props;
    const { data, setData, put, processing, errors } = useForm({
        plate: vehicle.plate,
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        type: vehicle.type,
        status: vehicle.status,
        current_km: vehicle.current_km,
        department_id: vehicle.department_id || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('vehicles.update', vehicle.id));
    };

    return (
        <AuthenticatedLayout
            user={usePage().props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Vehículo</h2>}
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Patente</label>
                                <input
                                    type="text"
                                    value={data.plate}
                                    onChange={e => setData('plate', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.plate && <div className="text-red-500 text-xs mt-1">{errors.plate}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Marca</label>
                                <input
                                    type="text"
                                    value={data.brand}
                                    onChange={e => setData('brand', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.brand && <div className="text-red-500 text-xs mt-1">{errors.brand}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Modelo</label>
                                <input
                                    type="text"
                                    value={data.model}
                                    onChange={e => setData('model', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.model && <div className="text-red-500 text-xs mt-1">{errors.model}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Año</label>
                                <input
                                    type="number"
                                    value={data.year}
                                    onChange={e => setData('year', Number(e.target.value))}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.year && <div className="text-red-500 text-xs mt-1">{errors.year}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tipo de Vehículo</label>
                                <input
                                    type="text"
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.type && <div className="text-red-500 text-xs mt-1">{errors.type}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Estado</label>
                                <select
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="available">Disponible</option>
                                    <option value="in_use">En Uso</option>
                                    <option value="maintenance">En Mantención</option>
                                    <option value="out_of_service">Fuera de Servicio</option>
                                </select>
                                {errors.status && <div className="text-red-500 text-xs mt-1">{errors.status}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Kilometraje Actual</label>
                                <input
                                    type="number"
                                    value={data.current_km}
                                    onChange={e => setData('current_km', Number(e.target.value))}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.current_km && <div className="text-red-500 text-xs mt-1">{errors.current_km}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Unidad Asignada</label>
                                <select
                                    value={data.department_id}
                                    onChange={e => setData('department_id', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="">Sin asignar</option>
                                    {departments.map(dept => (
                                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                                    ))}
                                </select>
                                {errors.department_id && <div className="text-red-500 text-xs mt-1">{errors.department_id}</div>}
                            </div>
                            <div className="md:col-span-2 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                                >
                                    Actualizar Vehículo
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
