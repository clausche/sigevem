<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Seeder;

class FleetVehiclesSeeder extends Seeder
{
    public function run(): void
    {
        $tourism = Department::where('code', 'MUN-95')
            ->orWhere('name', 'Dirección de Turismo')
            ->first();

        $driver = User::where('email', 'clausche@gmail.com')
            ->orWhere('name', 'like', '%Claudio Scheuermann%')
            ->first();

        if ($driver && $tourism && ! $driver->department_id) {
            $driver->update(['department_id' => $tourism->id]);
        }

        Vehicle::updateOrCreate(
            ['plate' => 'SRJJ75'],
            [
                'mobile_code' => 'M-05',
                'brand' => 'Great Wall',
                'model' => 'Poer',
                'year' => 2023,
                'type' => 'Camioneta',
                'status' => 'available',
                'current_km' => 40700,
                'department_id' => $tourism?->id,
                'assigned_driver_id' => $driver?->id,
                'parking_location' => 'Rio Chagual, Pichipelluco, Puerto Montt',
            ]
        );

        for ($number = 1; $number <= 101; $number++) {
            if ($number === 5) {
                continue;
            }

            $mobileCode = sprintf('M-%02d', $number);
            $attributes = Vehicle::factory()
                ->mobileNumber($number)
                ->make()
                ->getAttributes();

            unset($attributes['mobile_code']);

            Vehicle::updateOrCreate(
                ['mobile_code' => $mobileCode],
                $attributes
            );
        }
    }
}
