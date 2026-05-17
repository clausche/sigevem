import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import type { PageProps as AppPageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface UserRow {
    id: number;
    name: string;
    email: string;
    role: string;
    department?: {
        name: string;
    } | null;
}

interface PageProps extends AppPageProps {
    users: {
        data: UserRow[];
    };
    flash?: {
        message?: string | null;
    };
}

const roleLabels: Record<string, string> = {
    admin: 'Administrador',
    fleet_manager: 'Encargado de flota',
    requester: 'Solicitante',
};

export default function Index() {
    const { users, flash } = usePage<PageProps>().props;

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Usuarios</h2>}
        >
            <Head title="Usuarios" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900">Administracion de usuarios</h3>
                        </div>

                        {flash?.message && (
                            <div className="mb-4 rounded-md bg-green-100 p-4 text-green-700">
                                {flash.message}
                            </div>
                        )}

                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Nombre</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Correo</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Rol</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Unidad</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {users.data.map((user) => (
                                    <tr key={user.id}>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{user.name}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{user.email}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{roleLabels[user.role] ?? user.role}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{user.department?.name ?? 'Sin unidad'}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                            <Link href={route('users.edit', user.id)} className="text-indigo-600 hover:text-indigo-900">
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
