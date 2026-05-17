<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>SIGEVEM - Resumen de panel</title>
    <style>
        @page { margin: 22px; }
        * { box-sizing: border-box; }
        body {
            margin: 0;
            background: #f4f2ed;
            color: #172033;
            font-family: "DejaVu Sans", sans-serif;
            font-size: 11px;
        }
        .page { background: #f4f2ed; }
        .topbar {
            border: 1px solid #ded9cf;
            background: #fbfaf7;
            padding: 16px 18px;
            margin-bottom: 16px;
        }
        .brand { display: table; width: 100%; }
        .brand-left, .brand-right { display: table-cell; vertical-align: middle; }
        .brand-right { text-align: right; color: #667085; font-size: 10px; }
        .logo {
            display: inline-block;
            width: 34px;
            height: 34px;
            line-height: 34px;
            margin-right: 10px;
            border-radius: 6px;
            background: #183b8d;
            color: white;
            text-align: center;
            font-weight: 700;
            font-size: 16px;
            vertical-align: middle;
        }
        .brand-title { display: inline-block; vertical-align: middle; }
        .brand-title strong { display: block; font-size: 15px; letter-spacing: .04em; }
        .brand-title span { display: block; color: #667085; font-size: 10px; }
        .eyebrow {
            margin-top: 18px;
            color: #64748b;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: .18em;
            text-transform: uppercase;
        }
        h1 {
            margin: 8px 0 4px;
            color: #111827;
            font-family: "DejaVu Serif", serif;
            font-size: 30px;
            font-weight: 400;
        }
        h1 span { color: #667085; }
        .subtitle { margin: 0 0 8px; font-size: 13px; color: #344054; }
        .description { max-width: 620px; line-height: 1.6; color: #667085; }
        .grid-4 { width: 100%; border-collapse: separate; border-spacing: 8px; margin: 0 -8px 12px; }
        .grid-4 td { width: 25%; vertical-align: top; }
        .card {
            border: 1px solid #ded9cf;
            border-radius: 9px;
            background: #fff;
            padding: 14px;
        }
        .label { color: #667085; font-size: 10px; font-weight: 700; }
        .metric {
            margin-top: 10px;
            font-family: "DejaVu Serif", serif;
            font-size: 30px;
            color: #172033;
        }
        .metric.green { color: #28744e; }
        .metric.blue { color: #183b8d; }
        .metric.amber { color: #a96117; }
        .metric.red { color: #a33a2e; }
        .detail { margin-top: 8px; color: #667085; font-size: 10px; line-height: 1.4; }
        .two-col { width: 100%; border-collapse: separate; border-spacing: 10px; margin: 0 -10px 12px; }
        .two-col > tbody > tr > td { vertical-align: top; }
        .wide { width: 66%; }
        .narrow { width: 34%; }
        .section-title { margin: 0 0 4px; font-size: 14px; font-weight: 700; color: #111827; }
        .section-subtitle { margin: 0 0 12px; color: #667085; }
        .vehicle { width: 100%; border-collapse: collapse; }
        .vehicle-photo {
            width: 170px;
            min-height: 145px;
            text-align: center;
            vertical-align: middle;
            background: repeating-linear-gradient(135deg,#eef2ff 0,#eef2ff 7px,#fff 7px,#fff 16px);
            border-right: 1px solid #ded9cf;
        }
        .vehicle-code { margin-top: 8px; font-family: "DejaVu Serif", serif; font-size: 28px; color: #183b8d; }
        .plate { margin-top: 2px; font-weight: 700; letter-spacing: .14em; color: #475467; }
        .vehicle-info { padding: 12px 14px; }
        .info-grid { width: 100%; border-collapse: collapse; }
        .info-grid td { width: 50%; padding: 6px 8px 10px 0; vertical-align: top; }
        .info-label { color: #667085; font-size: 9px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
        .info-value { margin-top: 5px; font-size: 11px; color: #1f2937; }
        .status-row { width: 100%; border-collapse: collapse; }
        .status-row td { padding: 7px 0; border-bottom: 1px solid #ebe7df; }
        .dot { display: inline-block; width: 8px; height: 8px; margin-right: 8px; border-radius: 2px; }
        .bg-green { background: #28744e; }
        .bg-blue { background: #183b8d; }
        .bg-violet { background: #5b4bb2; }
        .bg-amber { background: #b26b17; }
        .bg-red { background: #a33a2e; }
        .bg-slate { background: #667085; }
        .activity { margin: 0; padding: 0; list-style: none; }
        .activity li { margin: 0 0 11px; padding-left: 16px; border-left: 1px solid #ded9cf; }
        .activity strong { display: block; font-weight: 500; color: #1f2937; }
        .activity span { color: #667085; font-family: monospace; font-size: 10px; }
        table.data { width: 100%; border-collapse: collapse; }
        table.data th {
            padding: 9px 8px;
            border-bottom: 1px solid #ded9cf;
            color: #667085;
            font-size: 9px;
            letter-spacing: .12em;
            text-align: left;
            text-transform: uppercase;
        }
        table.data td { padding: 9px 8px; border-bottom: 1px solid #ebe7df; vertical-align: top; }
        .badge { display: inline-block; border-radius: 999px; padding: 4px 8px; font-size: 9px; font-weight: 700; }
        .badge.pending { background: #fef3c7; color: #92400e; }
        .badge.assigned, .badge.approved { background: #dbeafe; color: #1e3a8a; }
        .badge.rejected { background: #fee2e2; color: #991b1b; }
        .footer {
            margin-top: 14px;
            padding-top: 10px;
            border-top: 1px solid #ded9cf;
            color: #667085;
            font-size: 9px;
            text-align: right;
        }
    </style>
</head>
<body>
<div class="page">
    <div class="topbar">
        <div class="brand">
            <div class="brand-left">
                <span class="logo">S</span>
                <span class="brand-title">
                    <strong>SIGEVEM</strong>
                    <span>I. Mun. de Puerto Montt</span>
                </span>
            </div>
            <div class="brand-right">
                Generado {{ $generatedAt->format('d/m/Y H:i') }}<br>
                {{ $departmentCount }} unidades municipales
            </div>
        </div>

        <div class="eyebrow">Sistema operativo · resumen exportado</div>
        <h1>SIGEVEM <span>/ Panel de control</span></h1>
        <p class="subtitle">Sistema de Gestión Vehicular Municipal</p>
        <div class="description">
            Panel centralizado para controlar inventario, disponibilidad, solicitudes, despachos,
            mantenciones y trazabilidad de la flota de vehículos municipales.
        </div>
    </div>

    <table class="grid-4">
        <tr>
            @foreach (array_slice($stats, 0, 4) as $index => $stat)
                <td>
                    <div class="card">
                        <div class="label">{{ $stat['label'] }}</div>
                        <div class="metric {{ $index === 1 ? 'green' : ($index === 2 ? 'blue' : ($index === 3 ? 'amber' : '')) }}">{{ $stat['value'] }}</div>
                        <div class="detail">{{ $stat['detail'] }}</div>
                    </div>
                </td>
            @endforeach
        </tr>
        <tr>
            @foreach (array_slice($stats, 4, 4) as $index => $stat)
                <td>
                    <div class="card">
                        <div class="label">{{ $stat['label'] }}</div>
                        <div class="metric {{ $index === 0 ? 'amber' : ($index === 2 ? 'red' : '') }}">{{ $stat['value'] }}</div>
                        <div class="detail">{{ $stat['detail'] }}</div>
                    </div>
                </td>
            @endforeach
        </tr>
    </table>

    <table class="two-col">
        <tr>
            <td class="wide">
                <div class="card">
                    <h2 class="section-title">Móvil destacado</h2>
                    <p class="section-subtitle">Vehículo asignado a la unidad</p>
                    <table class="vehicle">
                        <tr>
                            <td class="vehicle-photo">
                                <div class="info-label">Foto vehículo</div>
                                <div class="vehicle-code">{{ $featuredVehicle?->mobile_code ?? 'M-05' }}</div>
                                <div class="plate">{{ $featuredVehicle?->plate ?? 'SRJJ75' }}</div>
                            </td>
                            <td class="vehicle-info">
                                <table class="info-grid">
                                    <tr>
                                        <td><div class="info-label">Marca / modelo</div><div class="info-value">{{ trim(($featuredVehicle?->brand ?? 'Great Wall').' '.($featuredVehicle?->model ?? 'Poer')) }} · {{ $featuredVehicle?->year ?? '2023' }}</div></td>
                                        <td><div class="info-label">Tipo</div><div class="info-value">{{ $featuredVehicle?->type ?? 'Camioneta' }}</div></td>
                                    </tr>
                                    <tr>
                                        <td><div class="info-label">Kilometraje</div><div class="info-value">{{ number_format($featuredVehicle?->current_km ?? 40700, 0, ',', '.') }} km</div></td>
                                        <td><div class="info-label">Unidad</div><div class="info-value">{{ $featuredVehicle?->department?->name ?? 'Dirección de Turismo' }}</div></td>
                                    </tr>
                                    <tr>
                                        <td><div class="info-label">Conductor asignado</div><div class="info-value">{{ $featuredVehicle?->assignedDriver?->name ?? 'Sin asignar' }}</div></td>
                                        <td><div class="info-label">Estacionamiento</div><div class="info-value">{{ $featuredVehicle?->parking_location ?? 'No informado' }}</div></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
            <td class="narrow">
                <div class="card">
                    <h2 class="section-title">Estado operativo de la flota</h2>
                    <p class="section-subtitle">Distribución actual</p>
                    <table class="status-row">
                        <tr><td><span class="dot bg-green"></span>Disponible</td><td>{{ $vehicleStatuses['available'] }}</td></tr>
                        <tr><td><span class="dot bg-blue"></span>En uso</td><td>{{ $vehicleStatuses['in_use'] }}</td></tr>
                        <tr><td><span class="dot bg-violet"></span>Reservado</td><td>{{ $vehicleStatuses['reserved'] }}</td></tr>
                        <tr><td><span class="dot bg-amber"></span>En mantención</td><td>{{ $vehicleStatuses['maintenance'] }}</td></tr>
                        <tr><td><span class="dot bg-red"></span>Fuera de servicio</td><td>{{ $vehicleStatuses['out_of_service'] }}</td></tr>
                        <tr><td><span class="dot bg-slate"></span>Otros</td><td>{{ $vehicleStatuses['other'] }}</td></tr>
                    </table>
                </div>
            </td>
        </tr>
    </table>

    <table class="two-col">
        <tr>
            <td class="wide">
                <div class="card">
                    <h2 class="section-title">Últimas solicitudes</h2>
                    <p class="section-subtitle">Movimientos recientes de la municipalidad</p>
                    <table class="data">
                        <thead>
                        <tr>
                            <th>Folio</th>
                            <th>Fecha</th>
                            <th>Funcionario</th>
                            <th>Unidad</th>
                            <th>Estado</th>
                        </tr>
                        </thead>
                        <tbody>
                        @forelse ($latestRequests as $request)
                            <tr>
                                <td>SOL-{{ str_pad((string) $request->id, 4, '0', STR_PAD_LEFT) }}</td>
                                <td>{{ $request->created_at?->format('d/m/Y H:i') }}</td>
                                <td>{{ $request->user?->name ?? 'Sin funcionario' }}</td>
                                <td>{{ $request->department?->name ?? 'Sin unidad' }}</td>
                                <td><span class="badge {{ $request->status }}">{{ $request->status }}</span></td>
                            </tr>
                        @empty
                            <tr><td colspan="5">No hay solicitudes registradas.</td></tr>
                        @endforelse
                        </tbody>
                    </table>
                </div>
            </td>
            <td class="narrow">
                <div class="card">
                    <h2 class="section-title">Actividad de hoy</h2>
                    <p class="section-subtitle">Eventos destacados</p>
                    <ul class="activity">
                        @forelse ($latestRequests->take(5) as $request)
                            <li>
                                <strong>{{ ucfirst($request->status) }} · {{ $request->department?->name ?? 'Solicitud' }}</strong>
                                <span>{{ $request->created_at?->format('H:i') }}</span>
                            </li>
                        @empty
                            <li><strong>Sin actividad registrada</strong><span>--:--</span></li>
                        @endforelse
                    </ul>
                </div>
            </td>
        </tr>
    </table>

    <table class="two-col">
        <tr>
            <td class="wide">
                <div class="card">
                    <h2 class="section-title">Documentación vehicular</h2>
                    <table class="data">
                        <tbody>
                        @forelse ($documents as $document)
                            <tr>
                                <td>{{ $document->vehicle?->mobile_code ?? 'S/C' }} · {{ $document->vehicle?->plate ?? 'Sin patente' }}</td>
                                <td>{{ $document->type ?? 'Documento' }}</td>
                                <td>{{ optional($document->expiry_date)->format('d/m/Y') ?? 'Sin vencimiento' }}</td>
                            </tr>
                        @empty
                            <tr><td>No hay documentos próximos registrados.</td></tr>
                        @endforelse
                        </tbody>
                    </table>
                </div>
            </td>
            <td class="narrow">
                <div class="card">
                    <h2 class="section-title">Servicios programados</h2>
                    <table class="data">
                        <tbody>
                        @forelse ($maintenances as $maintenance)
                            <tr>
                                <td>{{ $maintenance->vehicle?->mobile_code ?? 'S/C' }}</td>
                                <td>{{ optional($maintenance->date)->format('d/m/Y') ?? 'Sin fecha' }}</td>
                            </tr>
                        @empty
                            <tr><td>No hay mantenciones programadas.</td></tr>
                        @endforelse
                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </table>

    <div class="footer">SIGEVEM · Laravel · Inertia · React · I. Municipalidad de Puerto Montt</div>
</div>
</body>
</html>
