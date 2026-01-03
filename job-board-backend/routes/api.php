<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ApplicationController;

// --- Public test route ---
Route::get('/test', function () {
    return response()->json(['message' => 'API works!']);
});

// --- Auth routes ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/sanctum/csrf-cookie', [\Laravel\Sanctum\Http\Controllers\CsrfCookieController::class, 'show']);

// --- Public job routes ---
Route::get('/jobs', [JobController::class, 'index']);

// --- Protected routes (Sanctum) ---
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'user']);
Route::post('/jobs/{job}/apply', [ApplicationController::class, 'store'])->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {
    //User
    // Route::get('/user',[AuthController::class],'user');
    
    // Jobs
    Route::get('/jobs/{job}', [JobController::class, 'show']);
    Route::post('/jobs', [JobController::class, 'store']);
    Route::put('/jobs/{job}', [JobController::class, 'update']);
    Route::delete('/jobs/{job}', [JobController::class, 'destroy']);

    // Applications
    Route::post('/jobs/{job}/apply', [ApplicationController::class, 'store']);   // create
    Route::put('/applications/{application}', [ApplicationController::class, 'update']); // update
    Route::get('/applications', [ApplicationController::class, 'index']); // list user's applications
    Route::get('/applications/{id}', [ApplicationController::class, 'show']);//show logged in users applications
    Route::delete('/applications/{application}', [ApplicationController::class, 'destroy']);//withdraw application


    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);

     // For employers to view applications for their posted jobs
    Route::get('/employer/applications', [ApplicationController::class, 'employerApplications']);
    // Update application status
    Route::put('/applications/{application}/status', [ApplicationController::class, 'updateStatus']);
    //Only employer see there posted jobs
    Route::get('/employer/jobs', [JobController::class, 'emp_posted']);
});
