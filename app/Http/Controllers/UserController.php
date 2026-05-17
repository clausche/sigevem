<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Users/Index', [
            'users' => User::with('department')
                ->orderBy('name')
                ->paginate(15),
        ]);
    }

    public function edit(User $user): Response
    {
        return Inertia::render('Users/Edit', [
            'managedUser' => $user->load('department'),
            'departments' => Department::orderBy('name')->get(['id', 'name']),
            'roles' => [
                ['value' => 'requester', 'label' => 'Solicitante'],
                ['value' => 'fleet_manager', 'label' => 'Encargado de flota'],
                ['value' => 'admin', 'label' => 'Administrador'],
            ],
        ]);
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'role' => ['required', Rule::in(['requester', 'fleet_manager', 'admin'])],
            'department_id' => ['nullable', 'exists:departments,id'],
        ]);

        $user->update($validated);

        return redirect()
            ->route('users.index')
            ->with('message', 'Usuario actualizado con exito.');
    }
}
