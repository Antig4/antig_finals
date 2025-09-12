<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/home', function () {
    return view('home');
});

Route::post('/students', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'age' => 'required|integer',
        'email' => 'required|email|unique:students,email',
        'gender' => 'required'
    ]);

    // save to database
    Student::create([
        'name' => $request->name,
        'age' => $request->age,
        'email' => $request->email,
        'gender' => $request->gender,
    ]);
    return back()->with('success', 'Student saved!');
});

Route::get('/{any?}', function () {
    return view('welcome');
})->where('any', '^(?!api),"$');
