<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    //
    use HasFactory;
    protected $fillable=[
        'user_id',
        'title',
        'company',
        'description',
        'location',
        'type',
        'salary',
        'status',
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function application(){
        return $this->hasMany(Application::class);
    }
}
