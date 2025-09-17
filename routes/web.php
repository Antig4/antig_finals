<?php
use App\Http\Controllers\ContactController;


Route::get('/{any}', function () {
    return view('contacts'); // your Blade file name
})->where('any', '.*');