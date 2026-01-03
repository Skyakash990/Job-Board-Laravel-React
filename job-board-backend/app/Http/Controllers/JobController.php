<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JobController extends Controller
{
    /**
     * Display all jobs.
     */
    public function index()
    {
        return response()->json(
            Job::with('user:id,name,email')
                ->latest()
                ->get()
        );
    }

    //store new job
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Check if user is employer
        $user = $request->user();
        if ($user->role !== 'employer') {
            return response()->json(['message' => 'Only employers can post jobs.'], 403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'type' => 'required|string|max:50',
            'salary' => 'nullable|integer',
            'company' => 'required|string|max:255',
        ]);
        $job = Job::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'location' => $request->location,
            'type' => $request->type,
            'company' => $request->company,
            'salary' => $request->salary,
            'status' => 'open',
        ]);

        return response()->json(['message'=>'Job Posted Successfully!'], 201);
    }

    /**
     * Show single job
     */
    public function show(Job $job)
    {
        return  response()->json($job->load('user:id,name,email'));
    }
    //Show Employer posted Jobs only
    public function emp_posted()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        if ($user->role !== 'employer') {
            return response()->json(['message' => "Unauthorized"], 403);
        }

        $jobs = Job::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($jobs);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Job $job)
    {
        //
    }

    /**
     * Update a job
     */
    public function update(Request $request, Job $job)
    {
        if ($job->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'location' => 'sometimes|string|max:255',
            'type' => 'sometimes|string|max:50',
            'salary' => 'nullable|integer',
            'status' => 'in:open,closed',
        ]);

        $job->update($request->only([
            'title',
            'description',
            'location',
            'type',
            'salary',
            'status'
        ]));

        return response()->json(['message'=>'Job Updated Successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Job $job)
    {
        if ($job->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $job->delete();

        return response()->json(['message' => 'Job deleted successfully']);
    }
}
