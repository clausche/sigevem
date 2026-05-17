import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

const metrics = [
    { label: 'Vehiculos municipales', value: '101' },
    { label: 'Unidades activas', value: '105' },
    { label: 'Trazabilidad', value: '24/7' },
];

const workflows = [
    'Solicitudes por unidad municipal',
    'Asignacion de vehiculo y conductor',
    'Control de kilometraje, documentos y mantenciones',
];

export default function Welcome({ auth }: PageProps) {
    return (
        <>
            <Head title="SIGEVEM" />

            <div className="min-h-screen bg-slate-50 text-slate-900">
                <header className="border-b border-slate-200 bg-white">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald-700 text-white">
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M5 17h14M7 17l1.2-5.4A3 3 0 0 1 11.13 9h1.74a3 3 0 0 1 2.93 2.6L17 17M8 17v2M16 17v2M8.5 13.5h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9 6h6l1 3H8l1-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-base font-semibold tracking-wide">SIGEVEM</div>
                                <div className="text-xs text-slate-500">Control de flota municipal</div>
                            </div>
                        </Link>

                        <nav className="flex items-center gap-2">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                                >
                                    Ir al sistema
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                                    >
                                        Iniciar sesion
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
                                    >
                                        Solicitar acceso
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <main>
                    <section className="border-b border-slate-200 bg-white">
                        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
                            <div className="flex flex-col justify-center">
                                <div className="mb-5 inline-flex w-fit items-center rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800">
                                    Municipalidad de Puerto Montt
                                </div>
                                <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
                                    Gestion centralizada de vehiculos, conductores y solicitudes.
                                </h1>
                                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                                    Plataforma operativa para registrar la flota municipal, controlar disponibilidad,
                                    asignar viajes, mantener documentos vigentes y respaldar cada movimiento con trazabilidad.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    <Link
                                        href={auth.user ? route('dashboard') : route('login')}
                                        className="rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                                    >
                                        {auth.user ? 'Abrir tablero' : 'Entrar al sistema'}
                                    </Link>
                                    {!auth.user && (
                                        <Link
                                            href={route('register')}
                                            className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                                        >
                                            Registrar funcionario
                                        </Link>
                                    )}
                                </div>

                                <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                                    {metrics.map((metric) => (
                                        <div key={metric.label} className="border-l-2 border-emerald-600 pl-4">
                                            <div className="text-2xl font-semibold text-slate-950">{metric.value}</div>
                                            <div className="mt-1 text-xs leading-5 text-slate-500">{metric.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="min-h-[420px] overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm">
                                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900 px-5 py-4 text-white">
                                    <div>
                                        <div className="text-sm font-semibold">Tablero operacional</div>
                                        <div className="text-xs text-slate-300">Estado de flota en tiempo real</div>
                                    </div>
                                    <div className="rounded-md bg-emerald-500 px-3 py-1 text-xs font-semibold text-emerald-950">
                                        En servicio
                                    </div>
                                </div>

                                <div className="grid gap-4 p-5">
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            ['Disponibles', '74', 'bg-emerald-50 text-emerald-800'],
                                            ['Asignados', '21', 'bg-sky-50 text-sky-800'],
                                            ['Mantencion', '6', 'bg-amber-50 text-amber-800'],
                                        ].map(([label, value, classes]) => (
                                            <div key={label} className={`rounded-md border border-white p-4 ${classes}`}>
                                                <div className="text-2xl font-semibold">{value}</div>
                                                <div className="mt-1 text-xs font-medium">{label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="rounded-md bg-white p-4">
                                        <div className="mb-4 flex items-center justify-between">
                                            <div>
                                                <div className="text-sm font-semibold text-slate-900">Solicitudes pendientes</div>
                                                <div className="text-xs text-slate-500">Priorizadas por unidad solicitante</div>
                                            </div>
                                            <div className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">Hoy</div>
                                        </div>
                                        <div className="space-y-3">
                                            {[
                                                ['Direccion de Turismo', 'M-05', 'Salida a terreno'],
                                                ['DIDECO', 'M-18', 'Traslado equipo social'],
                                                ['Operaciones', 'M-42', 'Inspeccion ruta'],
                                            ].map(([unit, vehicle, task]) => (
                                                <div key={`${unit}-${vehicle}`} className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-md border border-slate-200 px-3 py-3">
                                                    <div>
                                                        <div className="text-sm font-medium text-slate-900">{unit}</div>
                                                        <div className="text-xs text-slate-500">{task}</div>
                                                    </div>
                                                    <div className="rounded-md bg-slate-900 px-2 py-1 text-xs font-semibold text-white">{vehicle}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="rounded-md bg-white p-4">
                                        <div className="mb-3 text-sm font-semibold text-slate-900">Cumplimiento documental</div>
                                        <div className="space-y-3">
                                            {[
                                                ['Permisos de circulacion', '92%'],
                                                ['Revision tecnica', '88%'],
                                                ['Mantenciones al dia', '81%'],
                                            ].map(([label, value]) => (
                                                <div key={label}>
                                                    <div className="mb-1 flex justify-between text-xs text-slate-600">
                                                        <span>{label}</span>
                                                        <span>{value}</span>
                                                    </div>
                                                    <div className="h-2 rounded-full bg-slate-100">
                                                        <div className="h-2 rounded-full bg-emerald-600" style={{ width: value }} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                        <div className="grid gap-5 md:grid-cols-3">
                            {workflows.map((workflow, index) => (
                                <div key={workflow} className="rounded-lg border border-slate-200 bg-white p-5">
                                    <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-slate-900 text-sm font-semibold text-white">
                                        {index + 1}
                                    </div>
                                    <h2 className="text-base font-semibold text-slate-950">{workflow}</h2>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        Control simple para que cada accion quede vinculada a funcionario, unidad y vehiculo.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
