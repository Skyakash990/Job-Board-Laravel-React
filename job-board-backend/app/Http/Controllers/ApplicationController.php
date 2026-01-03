<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use illuminate\Support\Facades\Storage;
use App\Models\Job;


class ApplicationController extends Controller
{

    public function employerApplications()
    {
        $user = Auth::user();
        //Fetch all applications for jobs created by this employer

        $applications = Application::with(['job', 'user'])
            ->whereHas('job', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->get();
        return response()->json($applications);
    }
    public function updateStatus(Request $request, Application $application)
    {
        $request->validate([
            'status' => 'required|in:pending,hired,rejected'
        ]);
        $employer = Auth::user();

        //Ensure this employer owns this jobs being updated

        if ($application->job->user_id !== $employer->id) {
            return response()->json(['message' => 'Unauthorized']);
        }
        $application->update(['status' => $request->status]);

        return response()->json(['message' => 'Application status updated successfully']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Application::with('job')->where('user_id', Auth::id())->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Job $job)
    {
        $request->validate([
            'cover_letter' => 'nullable|string',
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            'location' => 'nullable|string|max:255',
            'expected_salary' => 'nullable|integer|min:0',
            'availability' => 'nullable|string|max:100',

        ]);

        $user = Auth::user();
        // Check if already applied
        $exists = Application::where('job_id', $job->id)
            ->where('user_id', $user->id)
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'You have already applied for this job.'
            ], 409);
        }
        //store file of uploaded
        $resumePath = null;
        if ($request->hasFile('resume')) {
            $resumePath = $request->file('resume')->store('resumes', 'public');
        }
        Application::create([
            'user_id' => Auth::id(),
            'job_id' => $job->id,
            'cover_letter' => $request->cover_letter,
            'resume' => $resumePath,
            'location' => $request->location,
            'expected_salary' => $request->expected_salary,
            'availability' => $request->availability,
        ]);

        return response()->json([
            'message' => 'Application submitted successfully!'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $application = Application::with('job')
            ->where('id', $id)
            ->where('user_id', Auth::id()) // ensure ownership
            ->first();

        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }
        if ($application->resume) {
            $application->resume = asset('storage/' . $application->resume);
        }
        return response()->json($application);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Application $application)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Application $application)
    {
        if ($application->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'cover_letter' => 'nullable|string|max:2000',
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            'location' => 'nullable|string|max:255',
            'expected_salary' => 'nullable|integer|min:0',
            'availability' => 'nullable|string|max:100',
        ]);

        // Handle resume upload first
        if ($request->hasFile('resume')) {
            if ($application->resume && Storage::disk('public')->exists($application->resume)) {
                Storage::disk('public')->delete($application->resume);
            }
            $application->resume = $request->file('resume')->store('resumes', 'public');
        }

        // Update other fields manually
        $application->cover_letter = $request->cover_letter ?? $application->cover_letter;
        $application->location = $request->location ?? $application->location;
        $application->expected_salary = $request->expected_salary ?? $application->expected_salary;
        $application->availability = $request->availability ?? $application->availability;

        $application->save();

        return response()->json(['message' => 'Application updated successfully!'], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Application $application)
    {
        // Check if the authenticated user owns this application
        if ($application->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $application->delete();

        return response()->json(['message' => 'Application withdrawn successfully'], 200);
    }
}
