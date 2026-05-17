import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import type { PageProps as AppPageProps, User } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React from 'react';

interface Department {
    id: number;
    name: string;
}

interface RoleOption {
    value: string;
    label: string;
}

interface PageProps extends AppPageProps {
    managedUser: User;
    departments: Department[];
    roles: RoleOption[];
}

export default function Edit() {
    const { managedUser, departments, roles } = usePage<PageProps>().props;
    const { data, setData, put, processing, errors } = useForm({
        role: managedUser.role ?? 'requester',
        department_id: managedUser.department_id?.toString() ?? '',
    });

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        put(route('users.update', managedUser.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Editar usuario</h2>}
        >
            <Head title="Editar usuario" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900">{managedUser.name}</h3>
                            <p className="mt-1 text-sm text-gray-500">{managedUser.email}</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rol</label>
                                <select
                                    id="role"
                                    value={data.role}
                                    onChange={(event) => setData('role', event.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    {roles.map((role) => (
                                        <option key={role.value} value={role.value}>
                                            {role.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.role && <div className="mt-1 text-xs text-red-500">{errors.role}</div>}
                            </div>

                            <div>
                                <label htmlFor="department_id" className="block text-sm font-medium text-gray-700">Unidad municipal</label>
                                <select
                                    id="department_id"
                                    value={data.department_id}
                                    onChange={(event) => setData('department_id', event.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">Sin unidad</option>
                                    {departments.map((department) => (
                                        <option key={department.id} value={department.id}>
                                            {department.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.department_id && <div className="mt-1 text-xs text-red-500">{errors.department_id}</div>}
                            </div>

                            <div className="flex items-center justify-end gap-4">
                                <Link href={route('users.index')} className="text-sm text-gray-600 underline hover:text-gray-900">
                                    Volver
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    Guardar cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
