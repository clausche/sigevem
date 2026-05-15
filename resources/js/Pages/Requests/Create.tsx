import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import type { PageProps as AppPageProps } from '@/types';

interface Department {
    id: number;
    name: string;
}

interface PageProps extends AppPageProps {
    departments: Department[];
}

export default function Create() {
    const { departments } = usePage<PageProps>().props;
    const { data, setData, post, processing, errors } = useForm({
        department_id: '',
        reason: '',
        destination: '',
        start_date: '',
        end_date: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('requests.store'));
    };

    return (
        <AuthenticatedLayout
            user={usePage().props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Solicitar Vehículo</h2>}
        >
            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Unidad Solicitante</label>
                                <select
                                    value={data.department_id}
                                    onChange={e => setData('department_id', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="">Seleccione Unidad</option>
                                    {departments.map(dept => (
                                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                                    ))}
                                </select>
                                {errors.department_id && <div className="text-red-500 text-xs mt-1">{errors.department_id}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Motivo del Uso</label>
                                <textarea
                                    value={data.reason}
                                    onChange={e => setData('reason', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    rows={3}
                                />
                                {errors.reason && <div className="text-red-500 text-xs mt-1">{errors.reason}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Destino</label>
                                <input
                                    type="text"
                                    value={data.destination}
                                    onChange={e => setData('destination', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.destination && <div className="text-red-500 text-xs mt-1">{errors.destination}</div>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Fecha/Hora Salida</label>
                                    <input
                                        type="datetime-local"
                                        value={data.start_date}
                                        onChange={e => setData('start_date', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.start_date && <div className="text-red-500 text-xs mt-1">{errors.start_date}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Fecha/Hora Retorno Estimada</label>
                                    <input
                                        type="datetime-local"
                                        value={data.end_date}
                                        onChange={e => setData('end_date', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.end_date && <div className="text-red-500 text-xs mt-1">{errors.end_date}</div>}
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                                >
                                    Enviar Solicitud
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
