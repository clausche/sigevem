# SIGEVEM

Sistema de Gestión Vehicular Municipal para la Ilustre Municipalidad de Puerto Montt.

SIGEVEM centraliza el inventario de vehículos municipales, solicitudes de uso, asignaciones, conductores, documentos, mantenciones, bitácoras y reportes operativos de la flota.

## Estado Actual

El sistema incluye:

- Panel de control con indicadores de flota, solicitudes, documentos y mantenciones.
- Portada institucional para acceso al sistema.
- Inventario de vehículos municipales.
- Registro de solicitudes por unidad municipal.
- Asignación de vehículo y conductor.
- Gestión de mantenciones.
- Gestión de documentos vehiculares.
- Departamentos/unidades municipales cargadas desde `database/data`.
- Administración de usuarios y roles.
- Exportación del resumen del panel a PDF.

## Stack

- Laravel 13
- PHP 8.3+
- MySQL
- Inertia 2
- React 18
- TypeScript
- Tailwind CSS
- Vite 8
- Dompdf

## Requisitos Técnicos

- PHP 8.3 o superior
- Composer
- MySQL 8 o compatible
- Node.js 20.19 o superior
- npm

> Nota: Vite 8 requiere Node `20.19+` o `22.12+`. Con Node `20.17` el build falla.

## Instalación Local

Configurar el entorno local según `.env.example`, crear la base MySQL correspondiente y ejecutar:

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed
npm install --legacy-peer-deps
npm run build
```

Servidor local:

```bash
php artisan serve
```

## Usuario Inicial

El seeder crea un usuario administrador de desarrollo. Revisar `DatabaseSeeder` antes de usar en ambientes compartidos o productivos.

Desde el módulo `Usuarios`, un administrador puede asignar:

- `Solicitante`
- `Encargado de flota`
- `Administrador`

## Unidades Municipales

Las unidades se cargan desde:

```text
database/data/organigrama_municipalidad_puerto_montt_105_unidades.csv
```

Para recargar solo unidades:

```bash
php artisan db:seed --class=DepartmentsSeeder
```

## Comandos Útiles

Ejecutar tests:

```bash
php artisan test
```

Compilar frontend:

```bash
npm run build
```

Modo desarrollo frontend:

```bash
npm run dev
```

Limpiar cachés Laravel:

```bash
php artisan optimize:clear
```

## Exportación PDF

Desde el dashboard, el botón `Exportar resumen` genera un PDF con estilo visual del panel de control.

Ruta:

```text
GET /dashboard/export-summary
```

El PDF incluye:

- KPIs de flota.
- Estado operativo de vehículos.
- Móvil destacado.
- Últimas solicitudes.
- Actividad reciente.
- Documentación vehicular.
- Mantenciones/servicios registrados.

## Notas de Desarrollo

- La tabla de solicitudes se llama `requests`; el modelo `VehicleRequest` define explícitamente esa tabla.
- Las páginas autenticadas usan un sidebar persistente desde `AuthenticatedLayout`.
- El dashboard tiene un layout propio inspirado en el diseño de referencia del panel.
- Algunos indicadores del dashboard son visuales/operativos y deberán conectarse progresivamente a datos reales más específicos.

## Validación Recomendada Antes de Publicar

```bash
npm run build
php artisan test
```

## Licencia

Proyecto interno para gestión vehicular municipal.
