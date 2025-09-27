<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;


class UserController extends Controller
{
    public function register(Request $request)
    {
        try {
            $validated = $request->validate([
                'username' => 'required|string|max:50|unique:users',
                'email' => 'required|string|email|max:100|unique:users',
                'password' => 'required|string|min:6',
                'nama' => 'required|string|max:100',
            ]);

            $user = User::create([
                'username' => $validated['username'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'nama' => $validated['nama'],
            ]);

            return response()->json([
                'message' => 'Registrasi Berhasil',
                'user' => $user
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Registrasi gagal, terjadi kesalahan pada server.'
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('username', 'password');

        if (
            !$token = Auth::guard('api')->attempt([
                'username' => $credentials['username'],
                'password' => $credentials['password']
            ])
        ) {
            return response()->json(['message' => 'Username atau password salah.'], 401);
        }

        return $this->respondWithToken($token);
    }


    public function profile()
    {
        try {
            $user = auth('api')->user();
            if (!$user) {
                return response()->json(['message' => 'Unauthorized - token tidak valid'], 401);
            }
            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error decode token',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function index(Request $request)
    {
        $users = User::query()
            ->when($request->input('search'), function ($query, $search) {
                $query->where('nama', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%");
            })
            ->get();

        return response()->json($users);
    }


    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if (auth('api')->id() != $user->id) {
            return response()->json(['message' => 'Akses ditolak.'], 403);
        }


        $validated = $request->validate([
            'username' => [
                'sometimes',
                'string',
                'max:50',
                Rule::unique('users')->ignore($user->id),
            ],
            'email' => [
                'sometimes',
                'string',
                'email',
                'max:100',
                Rule::unique('users')->ignore($user->id),
            ],
            'nama' => 'sometimes|string|max:100',
        ]);

        $user->update($validated);

        return response()->json([
            'message' => 'Data user berhasil diperbarui',
            'user' => $user
        ], 200);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);

        if (auth('api')->id() != $user->id) {
            return response()->json(['message' => 'Akses ditolak.'], 403);
        }

        $user->delete();

        return response()->json(['message' => 'User berhasil dihapus.'], 200);
    }

    public function logout()
    {
        Auth::guard('api')->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'message' => 'Login berhasil',
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl') * 60
        ]);
    }
}
