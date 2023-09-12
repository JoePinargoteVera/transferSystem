<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function registro(Request $request)
    {
        DB::beginTransaction();
        try {
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = hash::make($request->password);
            $user->tipo_usuario = $request->tipo_usuario;
            $user->cedula = $request->cedula;
            $user->telefono = $request->telefono;
            $user->direccion = $request->direccion;
            $user->save();
            // event(new Registered($user));
            $token = JWTAuth::fromUser($user);
            DB::commit();
            return response()->json([
                'data' => $user,
                'token'=>$token,
                'status' => Response::HTTP_CREATED
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'error' => 'Error creating user: ' . $e->getMessage(),
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'error' => 'email o contraseña incorrectos'
                ], 400);
            }

            $user = User::where('email',$request->email)->first();
            

            if(!$user){
                return response()->json([
                    'error' => 'no existe el usuario'
                ], 400);
            }
        return response()->json([
            'token' => $token,
            'status' => Response::HTTP_OK,
            'user' => $user
        ], 200);

        } catch (JWTException $e) {
            response()->json([
                'error' => 'not create token'
            ], 500);
        }

        
    }

    public function logout() {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['mensaje' => 'Logout exitoso']);
    }
}
