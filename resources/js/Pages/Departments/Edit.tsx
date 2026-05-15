import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import type { PageProps as AppPageProps } from '@/types';

interface Department {
    id: number;
    name: string;
    code: string | null;
    manager_id: number | null;
}

interface PageProps extends AppPageProps {
    department: Department;
}

export default function Edit() {
    const { department } = usePage<PageProps>().props;
    const { data, setData, put, processing, errors } = useForm({
        name: department.name,
        code: department.code || '',
        manager_id: department.manager_id || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('departments.update', department.id));
    };

    return (
        <AuthenticatedLayout
            user={usePage().props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Departamento</h2>}
        >
            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nombre de la Unidad</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Código (Opcional)</label>
                                <input
                                    type="text"
                                    value={data.code}
                                    onChange={e => setData('code', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.code && <div className="text-red-500 text-xs mt-1">{errors.code}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">ID Responsable (Manager)</label>
                                <input
                                    type="number"
                                    value={data.manager_id}
                                    onChange={e => setData('manager_id', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.manager_id && <div className="text-red-500 text-xs mt-1">{errors.manager_id}</div>}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                                >
                                    Actualizar Departamento
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
