<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CuentaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->prefix('auth')->group(function(){
    Route::post('singup','registro');
    Route::post('login','login');
    Route::post('logout','logout')->middleware('jwt.verified');
});


Route::controller(CuentaController::class)->prefix('cuenta')->group(function(){
    Route::post('crear','crearCuenta');
    Route::delete('eliminar','eliminarCuenta');
    Route::get('ver','verCuenta');
});