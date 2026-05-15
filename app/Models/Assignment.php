<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    protected $fillable = ['request_id', 'vehicle_id', 'driver_id', 'assigned_at'];

    protected function casts(): array
    {
        return [
            'assigned_at' => 'datetime',
            'request_id' => 'integer',
            'vehicle_id' => 'integer',
            'driver_id' => 'integer',
        ];
    }

    public function request()
    {
        return $this->belongsTo(VehicleRequest::class, 'request_id');
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function driver()
    {
        return $this->belongsTo(User::class, 'driver_id');
    }

    public function tripLog()
    {
        return $this->hasOne(TripLog::class);
    }
}
