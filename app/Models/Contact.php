<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    // Define the fillable attributes for mass assignment
    protected $fillable = [
    'name', 'email', 'subject', 'message', 'is_archived'
];

    // Optionally, you can add relationships, casting, etc. based on your requirements
}
