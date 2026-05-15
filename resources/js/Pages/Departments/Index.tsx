import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import type { PageProps as AppPageProps } from '@/types';

interface Department {
    id: number;
    name: string;
    code: string | null;
    manager_id: number | null;
}

interface PageProps extends AppPageProps {
    departments: {
        data: Department[];
        links: any;
    };
    flash: {
        message: string | null;
    };
}

export default function Index() {
    const { departments, flash } = usePage<PageProps>().props;

    return (
        <AuthenticatedLayout
            user={usePage().props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Departamentos</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between mb-6">
                            <h3 className="text-lg font-medium">Lista de Unidades Municipales</h3>
                            <Link
                                href={route('departments.create')}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                            >
                                Nuevo Departamento
                            </Link>
                        </div>

                        {flash.message && (
                            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
                                {flash.message}
                            </div>
                        )}

                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {departments.data.map((dept) => (
                                    <tr key={dept.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.code || 'N/A'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link
                                                href={route('departments.edit', dept.id)}
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
