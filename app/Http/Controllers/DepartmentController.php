<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class DepartmentController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Departments/Index', [
            'departments' => Department::orderBy('name')->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Departments/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:50',
            'manager_id' => 'nullable|exists:users,id',
        ]);

        Department::create($validated);

        return Redirect::route('departments.index')->with('message', 'Departamento creado con éxito.');
    }

    public function edit(Department $department): Response
    {
        return Inertia::render('Departments/Edit', [
            'department' => $department,
        ]);
    }

    public function update(Request $request, Department $department)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:50',
            'manager_id' => 'nullable|exists:users,id',
        ]);

        $department->update($validated);

        return Redirect::route('departments.index')->with('message', 'Departamento actualizado con éxito.');
    }

    public function destroy(Department $department)
    {
        $department->delete();

        return Redirect::route('departments.index')->with('message', 'Departamento eliminado.');
    }
}
