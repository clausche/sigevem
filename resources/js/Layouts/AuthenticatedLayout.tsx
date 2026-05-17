import { User } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

interface MenuItem {
    label: string;
    route: string;
    active: string;
    count: string | null;
    adminOnly?: boolean;
}

const menuSections: { label: string; items: MenuItem[] }[] = [
    {
        label: 'Panel',
        items: [
            { label: 'Inicio', route: 'dashboard', active: 'dashboard', count: null },
        ],
    },
    {
        label: 'Flota',
        items: [
            { label: 'Vehiculos', route: 'vehicles.index', active: 'vehicles.*', count: '101' },
            { label: 'Mantenciones', route: 'maintenances.index', active: 'maintenances.*', count: '11' },
            { label: 'Documentos', route: 'documents.index', active: 'documents.*', count: '7' },
            { label: 'Bitacoras', route: 'trip-logs.index', active: 'trip-logs.*', count: null },
        ],
    },
    {
        label: 'Operacion',
        items: [
            { label: 'Solicitudes', route: 'requests.index', active: 'requests.*', count: '14' },
            { label: 'Asignaciones', route: 'assignments.index', active: 'assignments.*', count: null },
        ],
    },
    {
        label: 'Organizacion',
        items: [
            { label: 'Departamentos', route: 'departments.index', active: 'departments.*', count: '105' },
            { label: 'Usuarios', route: 'users.index', active: 'users.*', count: null, adminOnly: true },
        ],
    },
];

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode; user?: User }>) {
    const user = usePage().props.auth.user;
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const sidebar = (
        <>
            <div className="flex h-20 items-center gap-3 border-b border-stone-200 px-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-900 text-lg font-semibold text-white">
                    S
                </div>
                <div>
                    <div className="font-semibold tracking-wide text-slate-950">SIGEVEM</div>
                    <div className="text-xs text-slate-500">I. Mun. de Puerto Montt</div>
                </div>
            </div>

            <nav className="space-y-7 px-4 py-6">
                {menuSections.map((section) => (
                    <div key={section.label}>
                        <div className="mb-2 px-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                            {section.label}
                        </div>
                        <div className="space-y-1">
                            {section.items
                                .filter((item) => !item.adminOnly || user.role === 'admin')
                                .map((item) => {
                                    const active = route().current(item.active);

                                    return (
                                        <Link
                                            key={item.label}
                                            href={route(item.route)}
                                            onClick={() => setShowMobileMenu(false)}
                                            className={`flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium ${
                                                active
                                                    ? 'bg-blue-100 text-blue-950'
                                                    : 'text-slate-700 hover:bg-stone-100'
                                            }`}
                                        >
                                            <span>{item.label}</span>
                                            {item.count && (
                                                <span className="rounded bg-stone-200 px-2 py-0.5 text-xs text-slate-600">
                                                    {item.count}
                                                </span>
                                            )}
                                        </Link>
                                    );
                                })}
                        </div>
                    </div>
                ))}
            </nav>
        </>
    );

    return (
        <div className="sigevem-shell min-h-screen bg-[#f4f2ed] text-slate-900">
            <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-stone-200 bg-[#fbfaf7] lg:block">
                {sidebar}
            </aside>

            {showMobileMenu && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <button
                        type="button"
                        className="absolute inset-0 bg-slate-950/30"
                        onClick={() => setShowMobileMenu(false)}
                        aria-label="Cerrar menu"
                    />
                    <aside className="relative h-full w-64 border-r border-stone-200 bg-[#fbfaf7] shadow-xl">
                        {sidebar}
                    </aside>
                </div>
            )}

            <div className="lg:pl-64">
                <header className="sticky top-0 z-20 border-b border-stone-200 bg-[#fbfaf7]/95 backdrop-blur">
                    <div className="flex h-20 items-center justify-between gap-4 px-5 lg:px-6">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setShowMobileMenu(true)}
                                className="rounded-md border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 lg:hidden"
                            >
                                Menu
                            </button>
                            <div className="hidden items-center gap-2 text-sm text-slate-500 md:flex">
                                <span>Panel</span>
                                <span>/</span>
                                <span className="font-semibold text-slate-900">
                                    {route().current('dashboard') ? 'Inicio' : 'Modulo'}
                                </span>
                            </div>
                        </div>

                        <div className="hidden min-w-0 flex-1 justify-center md:flex">
                            <div className="flex w-full max-w-xl items-center rounded-md border border-stone-200 bg-white px-4 py-2.5 text-sm text-slate-500 shadow-sm">
                                <span className="mr-3">Buscar</span>
                                <span className="truncate">movil, patente, solicitud o funcionario...</span>
                                <span className="ml-auto rounded border border-stone-200 px-2 py-0.5 text-xs text-slate-400">⌘K</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-slate-600">
                            <div className="hidden text-right sm:block">
                                <div className="font-medium text-slate-900">{user.name}</div>
                                <div className="text-xs text-slate-500">{user.email}</div>
                            </div>
                            <div className="hidden h-6 w-px bg-stone-200 sm:block" />
                            <Link href={route('profile.edit')} className="hidden rounded-md px-3 py-2 hover:bg-stone-100 sm:block">
                                Perfil
                            </Link>
                            <Link href={route('logout')} method="post" as="button" className="rounded-md px-3 py-2 hover:bg-stone-100">
                                Salir
                            </Link>
                        </div>
                    </div>
                </header>

                {header && (
                    <section className="border-b border-stone-200 bg-white">
                        <div className="px-5 py-5 lg:px-6">
                            {header}
                        </div>
                    </section>
                )}

                <main>{children}</main>
            </div>
        </div>
    );
}
