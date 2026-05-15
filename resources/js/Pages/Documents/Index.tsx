import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import type { PageProps as AppPageProps } from '@/types';

interface VehicleDocument {
    id: number;
    vehicle_id: number;
    type: string;
    expiry_date: string;
    file_path: string | null;
    vehicle?: {
        plate: string;
    };
}

interface PageProps extends AppPageProps {
    documents: {
        data: VehicleDocument[];
        links: any;
    };
    flash: {
        message: string | null;
    };
}

export default function Index() {
    const { documents, flash } = usePage<PageProps>().props;

    const getExpiryStatus = (date: string) => {
        const today = new Date();
        const expiry = new Date(date);
        const diffTime = expiry.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return { label: 'Vencido', class: 'bg-red-100 text-red-800' };
        if (diffDays <= 30) return { label: 'Vence Pronto', class: 'bg-yellow-100 text-yellow-800' };
        return { label: 'Vigente', class: 'bg-green-100 text-green-800' };
    };

    return (
        <AuthenticatedLayout
            user={usePage().props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Documentación Vehicular</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between mb-6">
                            <h3 className="text-lg font-medium">Control de Vencimientos</h3>
                            <Link
                                href={route('documents.create')}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                            >
                                Registrar Documento
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documento</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vencimiento</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {documents.data.map((doc) => {
                                    const status = getExpiryStatus(doc.expiry_date);
                                    return (
                                        <tr key={doc.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{doc.vehicle?.plate}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.type}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.expiry_date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${status.class}`}>
                                                    {status.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    href={route('documents.edit', doc.id)}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                >
                                                    Editar
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
