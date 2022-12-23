<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemGame;
use App\Http\Controllers\Accounts;

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

Route::middleware('auth:sanctum')->group(function () {

});

Route::get('getAllItems', [ItemGame::class, 'getAll']);
Route::get('randomItems', [ItemGame::class, 'RandomItem']);

Route::post('addAccounts ', [Accounts::class, 'addAccounts']);
Route::get('getAccounts/{id} ', [Accounts::class, 'getAccounts']);
Route::post('updateAccounts ', [Accounts::class, 'updateAccounts']);
Route::post('deleteAccounts ', [Accounts::class, 'deleteAccounts']);
Route::get('listAccounts ', [Accounts::class, 'listAccounts']);

Route::post('login ', [Accounts::class, 'login']);

// Route::get('/ ', [Accounts::class, 'login']);
