<?php

namespace Database\Factories;

use App\Models\Department;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Vehicle>
 */
class VehicleFactory extends Factory
{
    protected $model = Vehicle::class;

    public function definition(): array
    {
        $vehicles = [
            ['brand' => 'Toyota', 'model' => 'Hilux', 'type' => 'Camioneta'],
            ['brand' => 'Nissan', 'model' => 'Navara', 'type' => 'Camioneta'],
            ['brand' => 'Mitsubishi', 'model' => 'L200', 'type' => 'Camioneta'],
            ['brand' => 'Chevrolet', 'model' => 'D-Max', 'type' => 'Camioneta'],
            ['brand' => 'Hyundai', 'model' => 'H-1', 'type' => 'Furgón'],
            ['brand' => 'Peugeot', 'model' => 'Partner', 'type' => 'Furgón'],
            ['brand' => 'Mercedes-Benz', 'model' => 'Sprinter', 'type' => 'Van'],
            ['brand' => 'Suzuki', 'model' => 'Grand Vitara', 'type' => 'SUV'],
        ];

        $vehicle = fake()->randomElement($vehicles);

        return [
            'mobile_code' => null,
            'plate' => strtoupper(fake()->bothify('??####')),
            'brand' => $vehicle['brand'],
            'model' => $vehicle['model'],
            'year' => fake()->numberBetween(2016, 2025),
            'type' => $vehicle['type'],
            'status' => 'available',
            'current_km' => fake()->numberBetween(8000, 140000),
            'department_id' => Department::query()->inRandomOrder()->value('id'),
            'assigned_driver_id' => null,
            'parking_location' => fake()->randomElement([
                'Edificio Consistorial, Puerto Montt',
                'Bodega Municipal, Puerto Montt',
                'Rio Chagual, Pichipelluco, Puerto Montt',
                'Dirección de Operaciones, Puerto Montt',
                'Estacionamiento Municipal, Puerto Montt',
            ]),
        ];
    }

    public function mobileNumber(int $number): static
    {
        return $this->state(fn (array $attributes) => [
            'mobile_code' => sprintf('M-%02d', $number),
            'plate' => sprintf('MUN%04d', $number),
        ]);
    }
}
