# Resumen de Avance SIGEVEM

Fecha: 15 de mayo de 2026

## Contexto del Proyecto

SIGEVEM es una aplicación Laravel + Inertia + React para gestionar vehículos municipales, solicitudes de uso, asignaciones, bitácoras, documentos y mantenciones.

Durante esta etapa se ordenó el modelo funcional alrededor de tres conceptos principales:

- Usuarios adscritos a una unidad municipal.
- Solicitudes de vehículos originadas desde la unidad del usuario.
- Flota municipal identificada por código interno de móvil `M-XX`.

## Repositorio y GitHub

Se inicializó Git en el proyecto local y se conectó con GitHub.

- Repositorio: `https://github.com/clausche/sigevem`
- Rama principal: `main`
- Último commit enviado: `f610bba Add department-backed requests and fleet seed data`

El proyecto quedó sincronizado con `origin/main`.

## Departamentos y Unidades Municipales

Se definió que el modelo existente `Department` representa las unidades, direcciones, departamentos y autoridades municipales que pueden participar en el flujo de solicitudes.

No se creó una tabla paralela para unidades municipales. En su lugar, se usó la tabla existente `departments`.

Se agregó `DepartmentsSeeder`, que lee el archivo:

```text
storage/app/public/organigrama_municipalidad_puerto_montt_106_unidades.csv
```

Ese seeder carga 106 unidades activas en `departments`.

El campo `code` usa el formato:

```text
MUN-{id_del_csv}
```

Ejemplo:

```text
Dirección de Turismo -> MUN-95
```

## Registro de Usuarios

Se ajustó el registro público para exigir que todo usuario quede adscrito a un departamento o unidad municipal.

Cambios principales:

- El formulario de registro carga la lista de departamentos.
- `department_id` es obligatorio al registrarse.
- El usuario queda guardado con su unidad de origen.
- El usuario administrador sigue pudiendo existir sin departamento si es creado fuera del registro público.

Archivos relevantes:

- `app/Http/Controllers/Auth/RegisteredUserController.php`
- `resources/js/Pages/Auth/Register.tsx`
- `app/Models/User.php`
- `tests/Feature/Auth/RegistrationTest.php`

## Solicitudes de Vehículos

Se corrigió el flujo de solicitudes para que el usuario no pueda elegir libremente la unidad solicitante.

Ahora la plataforma usa automáticamente el `department_id` del usuario autenticado.

Reglas implementadas:

- Si el usuario no tiene departamento, no puede solicitar vehículo.
- La pantalla de solicitud muestra la unidad adscrita.
- El backend valida que el usuario tenga departamento antes de crear la solicitud.
- La solicitud queda registrada con el departamento del usuario.

Archivos relevantes:

- `app/Http/Controllers/VehicleRequestController.php`
- `resources/js/Pages/Requests/Create.tsx`
- `resources/js/types/index.d.ts`

## Flota Municipal

Se incorporó el patrón operacional de móviles municipales:

```text
M-XX
```

Ejemplo:

```text
M-05
```

Se extendió la tabla `vehicles` con campos operacionales:

- `mobile_code`: código interno del móvil.
- `assigned_driver_id`: conductor asignado.
- `parking_location`: lugar de estacionamiento o base.

Archivos relevantes:

- `database/migrations/2026_05_15_000001_add_operational_fields_to_vehicles_table.php`
- `app/Models/Vehicle.php`
- `app/Http/Controllers/VehicleController.php`
- `resources/js/Pages/Vehicles/Create.tsx`
- `resources/js/Pages/Vehicles/Edit.tsx`
- `resources/js/Pages/Vehicles/Index.tsx`

## Vehículo Real M-05

Se cargó el vehículo real de la Dirección de Turismo.

Datos registrados:

- Móvil: `M-05`
- Patente: `SRJJ75`
- Marca: `Great Wall`
- Modelo: `Poer`
- Año: `2023`
- Tipo: `Camioneta`
- Kilometraje actual: `40700`
- Unidad asignada: `Dirección de Turismo`
- Conductor asignado: `claudio scheuermann arriagada`
- Correo conductor: `clausche@gmail.com`
- Estacionamiento: `Rio Chagual, Pichipelluco, Puerto Montt`

Además, el usuario `clausche@gmail.com` quedó adscrito a `Dirección de Turismo`.

## Factory y Seeder de Flota

Se creó `VehicleFactory` para generar vehículos sintéticos.

Se actualizó `FleetVehiclesSeeder` para cargar móviles desde:

```text
M-01
```

hasta:

```text
M-101
```

Regla importante:

- `M-05` se conserva con sus datos reales y no se sobrescribe.

En la base local quedaron 101 móviles con código interno.

Archivos relevantes:

- `database/factories/VehicleFactory.php`
- `database/seeders/FleetVehiclesSeeder.php`

## Interfaz

Se realizaron ajustes en la interfaz:

- Navegación principal con accesos a vehículos, solicitudes, mantenciones, documentos y departamentos.
- Vista de departamentos con estado vacío cuando no hay unidades cargadas.
- Registro de usuarios con selector de departamento.
- Formulario de solicitud mostrando unidad adscrita.
- Formulario y listado de vehículos con móvil, conductor asignado y estacionamiento.

## Validaciones Ejecutadas

Antes de subir a GitHub se ejecutaron:

```bash
composer test
npm run build
./vendor/bin/pint --dirty
```

Resultado:

- Tests PHP: OK, 25 tests.
- Build frontend: OK.
- Formato Laravel Pint: OK.

## Comandos Operacionales Usados

Para aplicar los cambios de base local:

```bash
php artisan migrate
php artisan db:seed --class=DepartmentsSeeder
php artisan db:seed --class=FleetVehiclesSeeder
```

## Próximos Pasos Sugeridos

- Crear gestión administrativa de usuarios y roles.
- Definir claramente roles: administrador, encargado de flota, autoridad, solicitante y conductor.
- Crear flujo de aprobación de solicitudes según unidad o autoridad.
- Mejorar asignación de vehículo desde solicitud pendiente.
- Reemplazar `prompt()` en aprobación por una interfaz formal de selección de vehículo y conductor.
- Agregar paginación visual en listados.
- Agregar búsqueda/filtros por móvil, patente, unidad, conductor y estado.
- Crear reportes de uso por unidad, vehículo y conductor.
- Gestionar vencimientos de documentos obligatorios.
- Completar bitácora de salida y retorno con kilometraje, combustible e incidentes.
