import { Head, Link, usePage } from '@inertiajs/react';
import type { PageProps } from '@/types';

const menuSections = [
    {
        label: 'Panel',
        items: [{ label: 'Inicio', route: 'dashboard', count: null }],
    },
    {
        label: 'Flota',
        items: [
            { label: 'Vehiculos', route: 'vehicles.index', count: '101' },
            { label: 'Mantenciones', route: 'maintenances.index', count: '11' },
            { label: 'Documentos', route: 'documents.index', count: '7' },
            { label: 'Bitacoras', route: 'trip-logs.index', count: null },
        ],
    },
    {
        label: 'Operacion',
        items: [
            { label: 'Solicitudes', route: 'requests.index', count: '14' },
            { label: 'Asignaciones', route: 'assignments.index', count: null },
        ],
    },
    {
        label: 'Organizacion',
        items: [
            { label: 'Departamentos', route: 'departments.index', count: '105' },
            { label: 'Usuarios', route: 'users.index', count: null },
        ],
    },
];

const stats = [
    { label: 'Total de vehiculos', value: '101', detail: 'Flota M-01 -> M-101', color: 'text-slate-950', delta: null },
    { label: 'Disponibles', value: '62', detail: 'Listos para asignacion', color: 'text-emerald-700', delta: '+4' },
    { label: 'En uso', value: '24', detail: 'Despachados hoy', color: 'text-blue-800', delta: '+2' },
    { label: 'En mantencion', value: '9', detail: 'Taller municipal y externos', color: 'text-amber-700', delta: '0' },
    { label: 'Solicitudes pendientes', value: '14', detail: 'Esperando aprobacion', color: 'text-amber-700', delta: '+3' },
    { label: 'Solicitudes aprobadas', value: '38', detail: 'En curso esta semana', color: 'text-emerald-700', delta: '+11' },
    { label: 'Docs. por vencer', value: '7', detail: 'Proximos 30 dias', color: 'text-red-700', delta: '+2' },
    { label: 'Mantenciones proximas', value: '11', detail: 'Programadas y pendientes', color: 'text-slate-950', delta: null },
];

const quickAccess = [
    { label: 'Vehiculos', description: 'Inventario y fichas', route: 'vehicles.index' },
    { label: 'Solicitudes', description: 'Aprobacion y seguimiento', route: 'requests.index' },
    { label: 'Crear solicitud', description: 'Nuevo requerimiento', route: 'requests.create' },
    { label: 'Mantenciones', description: 'Planificacion y bitacora', route: 'maintenances.index' },
    { label: 'Documentos', description: 'Permisos, RT, SOAP, seguros', route: 'documents.index' },
    { label: 'Departamentos', description: '105 unidades municipales', route: 'departments.index' },
];

const fleetStatus = [
    { label: 'Disponible', value: 62, percent: '61%', color: 'bg-emerald-700' },
    { label: 'En uso', value: 24, percent: '24%', color: 'bg-blue-800' },
    { label: 'Reservado', value: 2, percent: '2%', color: 'bg-violet-700' },
    { label: 'En mantencion', value: 9, percent: '9%', color: 'bg-amber-700' },
    { label: 'Fuera de servicio', value: 4, percent: '4%', color: 'bg-red-700' },
    { label: 'Pdte. de devolucion', value: 0, percent: '0%', color: 'bg-slate-500' },
];

const activity = [
    ['Aprobada SOL-2026-0481 · M-12 KXLT38', '09:14', 'bg-emerald-700'],
    ['Salida registrada · M-05 SRJJ75 (Turismo)', '08:42', 'bg-blue-800'],
    ['Ingreso a taller · M-77 (mantencion preventiva)', '08:30', 'bg-amber-700'],
    ['Devolucion completada · M-08 GBKR52', '08:11', 'bg-slate-500'],
    ['Nueva solicitud · DIDECO', '07:55', 'bg-blue-800'],
    ['Documento por vencer · M-19 (perm. circulacion)', '07:40', 'bg-red-700'],
];

const requests = [
    ['SOL-2026-0481', '16/05/2026 09:14', 'Marcela Oyarzun Vera', 'Direccion de Obras Municipales', 'Inspeccion obra Av. Diego Portales', 'M-12 · KXLT38', 'Aprobada'],
    ['SOL-2026-0480', '16/05/2026 08:42', 'Claudio Scheuermann A.', 'Direccion de Turismo', 'Visita guiada a Caleta Angelmo', 'M-05 · SRJJ75', 'En uso'],
    ['SOL-2026-0479', '15/05/2026 17:01', 'Patricia Soto Maldonado', 'DIDECO', 'Operativo social Pichi-Pelluco', 'M-44 · PFHX21', 'Pendiente'],
    ['SOL-2026-0478', '15/05/2026 14:36', 'Rodrigo Carcamo Bahamonde', 'Direccion de Aseo y Ornato', 'Retiro de escombros sector Mirasol', 'M-71 · JJDS44', 'Aprobada'],
    ['SOL-2026-0477', '15/05/2026 11:22', 'Andrea Vidal Maldonado', 'Departamento de Salud Municipal', 'Traslado de medicamentos a Alerce', 'M-22 · LXKM09', 'En uso'],
    ['SOL-2026-0476', '15/05/2026 09:50', 'Juan Perez Llanquinao', 'Secretaria de Planificacion', 'Reunion tecnica MOP Puerto Varas', '-', 'Rechazada'],
];

const roleLabels: Record<string, string> = {
    admin: 'Administrador',
    fleet_manager: 'Encargado de flota',
    requester: 'Solicitante',
};

function statusClass(status: string) {
    if (status === 'Aprobada') return 'bg-emerald-100 text-emerald-800';
    if (status === 'En uso') return 'bg-blue-100 text-blue-800';
    if (status === 'Pendiente') return 'bg-amber-100 text-amber-800';
    return 'bg-red-100 text-red-800';
}

export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    return (
        <>
            <Head title="Panel de control" />

            <div className="min-h-screen bg-[#f4f2ed] text-slate-900">
                <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-stone-200 bg-[#fbfaf7] lg:block">
                    <Link
                        href="/"
                        className="flex h-20 items-center gap-3 border-b border-stone-200 px-6 hover:bg-stone-100"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-900 text-lg font-semibold text-white">
                            S
                        </div>
                        <div>
                            <div className="font-semibold tracking-wide">SIGEVEM</div>
                            <div className="text-xs text-slate-500">I. Mun. de Puerto Montt</div>
                        </div>
                    </Link>

                    <nav className="space-y-7 px-4 py-6">
                        {menuSections.map((section) => (
                            <div key={section.label}>
                                <div className="mb-2 px-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                                    {section.label}
                                </div>
                                <div className="space-y-1">
                                    {section.items
                                        .filter((item) => item.route !== 'users.index' || user.role === 'admin')
                                        .map((item) => (
                                            <Link
                                                key={item.label}
                                                href={route(item.route)}
                                                className={`flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium ${
                                                    item.route === 'dashboard'
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
                                        ))}
                                </div>
                            </div>
                        ))}
                    </nav>
                </aside>

                <div className="lg:pl-64">
                    <header className="sticky top-0 z-20 border-b border-stone-200 bg-[#fbfaf7]/95 backdrop-blur">
                        <div className="flex h-20 items-center justify-between gap-4 px-5 lg:px-6">
                            <div className="hidden items-center gap-2 text-sm text-slate-500 md:flex">
                                <span>Panel</span>
                                <span>/</span>
                                <span className="font-semibold text-slate-900">Inicio</span>
                            </div>

                            <div className="flex min-w-0 flex-1 justify-center">
                                <div className="flex w-full max-w-xl items-center rounded-md border border-stone-200 bg-white px-4 py-2.5 text-sm text-slate-500 shadow-sm">
                                    <span className="mr-3">Buscar</span>
                                    <span className="truncate">movil, patente, solicitud o funcionario...</span>
                                    <span className="ml-auto rounded border border-stone-200 px-2 py-0.5 text-xs text-slate-400">⌘K</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-slate-600">
                                <button className="hidden rounded-md px-3 py-2 hover:bg-stone-100 sm:block">Actualizar</button>
                                <div className="hidden h-6 w-px bg-stone-200 sm:block" />
                                <div className="hidden font-mono text-xs md:block">Sab 16 May · 09:24</div>
                                <Link href={route('logout')} method="post" as="button" className="rounded-md px-3 py-2 hover:bg-stone-100">
                                    Salir
                                </Link>
                            </div>
                        </div>
                    </header>

                    <main className="px-5 py-8 lg:px-6">
                        <div className="mb-7 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
                            <div>
                                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                                    Sistema operativo · sincronizado hace 2 min
                                </div>
                                <h1 className="font-serif text-4xl text-slate-950">
                                    SIGEVEM <span className="text-slate-500">/ Panel de control</span>
                                </h1>
                                <p className="mt-3 text-base font-medium text-slate-700">Sistema de Gestion Vehicular Municipal</p>
                                <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">
                                    Panel centralizado para controlar inventario, disponibilidad, solicitudes, despachos,
                                    mantenciones y trazabilidad de la flota de vehiculos municipales.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <a
                                    href={route('dashboard.export-summary')}
                                    className="rounded-md border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-stone-50"
                                >
                                    Exportar resumen
                                </a>
                                <Link
                                    href={route('requests.create')}
                                    className="rounded-md bg-blue-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-950"
                                >
                                    Nueva solicitud
                                </Link>
                            </div>
                        </div>

                        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            {stats.map((stat) => (
                                <div key={stat.label} className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
                                    <div className="flex items-center justify-between text-sm font-semibold text-slate-500">
                                        <span>{stat.label}</span>
                                        {stat.delta && <span className="text-xs text-emerald-700">▲ {stat.delta}</span>}
                                    </div>
                                    <div className={`mt-4 font-serif text-4xl ${stat.color}`}>{stat.value}</div>
                                    <div className="mt-4 flex justify-between text-sm text-slate-500">
                                        <span>{stat.detail}</span>
                                        <span>{stat.value}</span>
                                    </div>
                                </div>
                            ))}
                        </section>

                        <section className="mt-6 grid gap-5 xl:grid-cols-[2fr_1fr]">
                            <div className="rounded-lg border border-stone-200 bg-white shadow-sm">
                                <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
                                    <div>
                                        <h2 className="font-semibold text-slate-950">Movil destacado</h2>
                                        <p className="mt-1 text-sm text-slate-500">Vehiculo asignado a tu unidad</p>
                                    </div>
                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-900">En uso</span>
                                </div>

                                <div className="grid md:grid-cols-[250px_1fr]">
                                    <div className="flex min-h-56 flex-col items-center justify-center border-b border-stone-200 bg-[repeating-linear-gradient(135deg,#eef2ff_0,#eef2ff_8px,#ffffff_8px,#ffffff_18px)] md:border-b-0 md:border-r">
                                        <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Foto vehiculo</div>
                                        <div className="mt-3 font-serif text-4xl text-blue-950">M-05</div>
                                        <div className="mt-1 text-sm font-semibold tracking-widest text-slate-600">SRJJ75</div>
                                    </div>

                                    <div className="grid gap-6 p-6 md:grid-cols-2">
                                        {[
                                            ['Marca / modelo', 'Great Wall Poer · 2023'],
                                            ['Tipo', 'Camioneta'],
                                            ['Kilometraje', '40.700 km'],
                                            ['Unidad', 'Direccion de Turismo'],
                                            ['Conductor asignado', 'Claudio Scheuermann Arriagada'],
                                            ['Estacionamiento', 'Rio Chagual, Pichi-Pelluco, Puerto Montt'],
                                        ].map(([label, value]) => (
                                            <div key={label}>
                                                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</div>
                                                <div className="mt-2 text-base text-slate-900">{value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 px-6 py-4 text-sm">
                                    <div className="flex flex-wrap gap-5 text-slate-500">
                                        <span>Ultima bitacora: hoy 08:42</span>
                                        <span>Documentos al dia</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link href={route('vehicles.index')} className="rounded-md border border-stone-200 px-4 py-2 font-medium text-slate-700 hover:bg-stone-50">
                                            Ver ficha
                                        </Link>
                                        <Link href={route('trip-logs.index')} className="rounded-md bg-blue-900 px-4 py-2 font-medium text-white hover:bg-blue-950">
                                            Bitacora
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg border border-stone-200 bg-white shadow-sm">
                                <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
                                    <div>
                                        <h2 className="font-semibold text-slate-950">Accesos rapidos</h2>
                                        <p className="mt-1 text-sm text-slate-500">Atajos a los modulos del sistema</p>
                                    </div>
                                    <span className="text-xs text-slate-500">7 modulos</span>
                                </div>

                                <div className="grid grid-cols-2">
                                    {quickAccess.map((item) => (
                                        <Link key={item.label} href={route(item.route)} className="min-h-32 border-b border-r border-stone-200 p-5 hover:bg-stone-50">
                                            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-blue-100 text-blue-900">
                                                +
                                            </div>
                                            <div className="font-semibold text-slate-950">{item.label}</div>
                                            <div className="mt-2 text-sm leading-5 text-slate-500">{item.description}</div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="mt-6 grid gap-5 xl:grid-cols-[2fr_1fr]">
                            <div className="rounded-lg border border-stone-200 bg-white shadow-sm">
                                <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
                                    <div>
                                        <h2 className="font-semibold text-slate-950">Estado operativo de la flota</h2>
                                        <p className="mt-1 text-sm text-slate-500">Distribucion actual de los 101 moviles municipales</p>
                                    </div>
                                    <div className="rounded-md bg-stone-100 p-1 text-sm">
                                        <button className="rounded bg-white px-3 py-1 shadow-sm">Hoy</button>
                                        <button className="px-3 py-1 text-slate-500">7d</button>
                                        <button className="px-3 py-1 text-slate-500">30d</button>
                                    </div>
                                </div>

                                <div className="grid gap-8 p-7 lg:grid-cols-[220px_1fr]">
                                    <div className="flex items-center justify-center">
                                        <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-[conic-gradient(#2f7650_0_61%,#1e3f96_61%_85%,#5b4bb2_85%_87%,#b26b17_87%_96%,#b23a2e_96%_100%)]">
                                            <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
                                                <div className="font-serif text-4xl">101</div>
                                                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">Vehiculos</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-x-8 md:grid-cols-2">
                                        {fleetStatus.map((status) => (
                                            <div key={status.label} className="flex items-center border-b border-stone-200 py-4 text-sm">
                                                <span className={`mr-3 h-3 w-3 rounded-sm ${status.color}`} />
                                                <span className="flex-1 text-slate-800">{status.label}</span>
                                                <span className="w-10 text-right font-medium text-slate-900">{status.value}</span>
                                                <span className="w-12 text-right text-slate-500">{status.percent}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg border border-stone-200 bg-white shadow-sm">
                                <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
                                    <h2 className="font-semibold text-slate-950">Actividad de hoy</h2>
                                    <span className="text-xs uppercase tracking-[0.18em] text-slate-500">Sab · 16 May</span>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-5 border-l border-stone-200 pl-5">
                                        {activity.map(([label, time, color]) => (
                                            <div key={`${label}-${time}`} className="relative">
                                                <span className={`absolute -left-[25px] top-1.5 h-2.5 w-2.5 rounded-full ${color}`} />
                                                <div className="text-sm text-slate-900">{label}</div>
                                                <div className="mt-1 font-mono text-xs text-slate-500">{time}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="mt-6 rounded-lg border border-stone-200 bg-white shadow-sm">
                            <div className="flex flex-col justify-between gap-4 border-b border-stone-200 px-6 py-5 md:flex-row md:items-center">
                                <div>
                                    <h2 className="font-semibold text-slate-950">Ultimas solicitudes</h2>
                                    <p className="mt-1 text-sm text-slate-500">Movimientos recientes de la unidad y de toda la municipalidad</p>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <button className="rounded-md bg-stone-100 px-3 py-2 text-slate-800">Todas</button>
                                    <button className="rounded-md px-3 py-2 text-slate-500 hover:bg-stone-100">Mi unidad</button>
                                    <button className="rounded-md px-3 py-2 text-slate-500 hover:bg-stone-100">Pendientes</button>
                                    <Link href={route('requests.index')} className="px-3 py-2 font-medium text-blue-900">Ver todas →</Link>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-stone-200 text-sm">
                                    <thead className="bg-[#fbfaf7] text-xs uppercase tracking-[0.18em] text-slate-500">
                                        <tr>
                                            <th className="px-5 py-4 text-left">Folio</th>
                                            <th className="px-5 py-4 text-left">Fecha</th>
                                            <th className="px-5 py-4 text-left">Funcionario</th>
                                            <th className="px-5 py-4 text-left">Unidad</th>
                                            <th className="px-5 py-4 text-left">Motivo</th>
                                            <th className="px-5 py-4 text-left">Vehiculo</th>
                                            <th className="px-5 py-4 text-left">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone-200">
                                        {requests.map(([folio, date, person, unit, reason, vehicle, status]) => (
                                            <tr key={folio} className="hover:bg-stone-50">
                                                <td className="whitespace-nowrap px-5 py-4 font-mono text-blue-900">{folio}</td>
                                                <td className="whitespace-nowrap px-5 py-4 font-mono text-slate-500">{date}</td>
                                                <td className="whitespace-nowrap px-5 py-4 text-slate-900">{person}</td>
                                                <td className="whitespace-nowrap px-5 py-4 text-slate-700">{unit}</td>
                                                <td className="whitespace-nowrap px-5 py-4 text-slate-900">{reason}</td>
                                                <td className="whitespace-nowrap px-5 py-4 font-mono text-slate-700">{vehicle}</td>
                                                <td className="whitespace-nowrap px-5 py-4">
                                                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(status)}`}>
                                                        {status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex items-center justify-between px-6 py-4 text-sm text-slate-500">
                                <span>Mostrando 6 de 482 solicitudes</span>
                                <span>← → para navegar</span>
                            </div>
                        </section>

                        <section className="mt-6 grid gap-5 pb-10 lg:grid-cols-2">
                            <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="font-semibold text-slate-950">Documentacion vehicular en los proximos 30 dias</h2>
                                    <Link href={route('documents.index')} className="text-sm font-medium text-blue-900">Gestionar →</Link>
                                </div>
                                {['M-19 · HXKD41 · vence 22/05/2026', 'M-33 · LLPW70 · vence 28/05/2026', 'M-05 · SRJJ75 · vence 04/06/2026'].map((item, index) => (
                                    <div key={item} className="flex items-center justify-between border-t border-stone-200 py-4 text-sm">
                                        <span className="text-slate-700">{item}</span>
                                        <span className="font-mono text-lg text-amber-700">{[6, 12, 19][index]} DIAS</span>
                                    </div>
                                ))}
                            </div>

                            <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="font-semibold text-slate-950">Servicios programados y pendientes</h2>
                                    <Link href={route('maintenances.index')} className="text-sm font-medium text-blue-900">Calendario →</Link>
                                </div>
                                {['M-05 · 40.700 km · 21/05/2026', 'M-44 · 82.140 km · 24/05/2026', 'M-08 · 55.300 km · 30/05/2026'].map((item) => (
                                    <div key={item} className="border-t border-stone-200 py-4 text-sm text-slate-700">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
}
