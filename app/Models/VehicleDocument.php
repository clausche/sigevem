<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleDocument extends Model
{
    protected $fillable = ['vehicle_id', 'type', 'expiry_date', 'file_path'];

    protected function casts(): array
    {
        return [
            'expiry_date' => 'date',
            'vehicle_id' => 'integer',
        ];
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
}
