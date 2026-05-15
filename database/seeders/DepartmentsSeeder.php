<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;
use RuntimeException;

class DepartmentsSeeder extends Seeder
{
    public function run(): void
    {
        $path = storage_path('app/public/organigrama_municipalidad_puerto_montt_106_unidades.csv');

        if (! file_exists($path)) {
            throw new RuntimeException("No se encontro el archivo de unidades municipales: {$path}");
        }

        $handle = fopen($path, 'r');

        if ($handle === false) {
            throw new RuntimeException("No se pudo abrir el archivo de unidades municipales: {$path}");
        }

        $header = fgetcsv($handle);

        if ($header === false) {
            fclose($handle);

            return;
        }

        $header[0] = preg_replace('/^\xEF\xBB\xBF/', '', $header[0]);
        $now = now();
        $departments = [];

        while (($row = fgetcsv($handle)) !== false) {
            $record = array_combine($header, $row);

            if (! $record || ($record['activa'] ?? '0') !== '1') {
                continue;
            }

            $departments[] = [
                'name' => $record['nombre'],
                'code' => 'MUN-'.$record['id'],
                'manager_id' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        fclose($handle);

        Department::upsert(
            $departments,
            ['code'],
            ['name', 'manager_id', 'updated_at']
        );
    }
}
