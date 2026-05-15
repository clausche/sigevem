import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import type { PageProps as AppPageProps } from '@/types';

interface Vehicle {
    id: number;
    plate: string;
}

interface PageProps extends AppPageProps {
    vehicles: Vehicle[];
}

export default function Create() {
    const { vehicles } = usePage<PageProps>().props;
    const { data, setData, post, processing, errors } = useForm({
        vehicle_id: '',
        type: '',
        expiry_date: '',
        file_path: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('documents.store'));
    };

    return (
        <AuthenticatedLayout
            user={usePage().props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Registrar Documento</h2>}
        >
            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Vehículo</label>
                                <select
                                    value={data.vehicle_id}
                                    onChange={e => setData('vehicle_id', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="">Seleccione Vehículo</option>
                                    {vehicles.map(v => (
                                        <option key={v.id} value={v.id}>{v.plate}</option>
                                    ))}
                                </select>
                                {errors.vehicle_id && <div className="text-red-500 text-xs mt-1">{errors.vehicle_id}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tipo de Documento</label>
                                <select
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="">Seleccione Tipo</option>
                                    <option value="soap">SOAP (Seguro Obligatorio)</option>
                                    <option value="technical_review">Revisión Técnica</option>
                                    <option value="circulation_permit">Permiso de Circulación</option>
                                </select>
                                {errors.type && <div className="text-red-500 text-xs mt-1">{errors.type}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Fecha de Vencimiento</label>
                                <input
                                    type="date"
                                    value={data.expiry_date}
                                    onChange={e => setData('expiry_date', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.expiry_date && <div className="text-red-500 text-xs mt-1">{errors.expiry_date}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Ruta del Archivo (URL/Path)</label>
                                <input
                                    type="text"
                                    value={data.file_path}
                                    onChange={e => setData('file_path', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.file_path && <div className="text-red-500 text-xs mt-1">{errors.file_path}</div>}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                                >
                                    Guardar Documento
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
