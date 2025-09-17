<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
use App\Http\Controllers\ContactController;



Route::get('/contacts', [ContactController::class, 'index']);       // Get all
Route::post('/contacts', [ContactController::class, 'store']);      // Create
Route::put('/contacts/{id}', [ContactController::class, 'update']); // Update

// new:
Route::post('/contacts/{contact}/archive', [ContactController::class, 'archive']);
Route::post('/contacts/{contact}/restore', [ContactController::class, 'restore']);
Route::delete('/contacts/{id}', [ContactController::class, 'destroy']);

