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
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        from: number | null;
        to: number | null;
        total: number;
    };
    flash?: {
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

                        {flash?.message && (
                            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
                                {flash.message}
                            </div>
                        )}

                        {departments.data.length > 0 ? (
                            <>
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

                                <div className="mt-6 flex flex-col gap-4 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="text-sm text-gray-500">
                                        Mostrando {departments.from} a {departments.to} de {departments.total} unidades
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                        {departments.links.map((link) => (
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
                            </>
                        ) : (
                            <div className="rounded-md border border-dashed border-gray-300 px-6 py-10 text-center">
                                <h4 className="text-base font-medium text-gray-900">No hay departamentos registrados</h4>
                                <p className="mt-2 text-sm text-gray-500">
                                    Crea las unidades municipales que podrán solicitar o administrar vehículos.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
