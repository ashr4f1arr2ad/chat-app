<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessageController;

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

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::middleware('auth:api')->group( function () {
    Route::get('user_message/{id}', [MessageController::class, 'user_message']);
    Route::post('send_message', [MessageController::class, 'send_message']);
    Route::get('register', [AuthController::class, 'allUser']);
});

//Route::middleware('auth:api')->get('/registers', function (Request $request) {
//    return $request->user();
//});

//Route::apiResource('login', 'App\Http\Controllers\AuthController');

//Route::post('login', [AuthController::class, 'login']);
//Route::post('register', [AuthController::class, 'register']);
//Route::get('user_message/{id}', [MessageController::class, 'user_message']);
//Route::get('users', [AuthController::class, 'index']);
//Route::middleware('api')->get('');
//Route::post('logout', 'AuthController@logout');
//Route::post('refresh', 'AuthController@refresh');
//Route::post('me', 'AuthController@me');
