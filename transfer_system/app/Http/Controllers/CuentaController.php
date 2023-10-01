<?php

namespace App\Http\Controllers;

use App\Models\Cuenta;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class CuentaController extends Controller
{
    function crearCuenta(Request $request){

        DB::beginTransaction();
        try {
            $cuenta = new Cuenta();
            $cuenta->id_usuario = $request->id_usuario;
            $cuenta->saldo =  $request->saldo;
            $cuenta->tipo_cuenta = $request->tipo_cuenta;
            $cuenta->alias = $request->alias;
            $cuenta->save();

            DB::commit();
            return response()->json([
                'data'=>$cuenta,
                'message'=>'cuenta creada con exito',
                'status'=>Response::HTTP_OK
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'error'=>'error al crear la cuenta '.$th->getMessage(),
                'status'=>Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
    }

    function eliminarCuenta(Request $request){

    }

    function verCuenta(Request $request){
        try {
            $cuenta = Cuenta::join('users','users.id','acounts.id_usuario')
                ->where('id',$request->cuenta_id)
                ->select('users.nombre', 'users.apellidos','acounts.*')
                ->fist();
            if($cuenta){
                return response()->json([
                    'message'=>'no existe la cuenta',
                    'status'=>Response::HTTP_NOT_FOUND
                ]);
            }

            return response()->json([
                'data'=>$cuenta,
                'message'=>'cuenta encontrada con exito',
                'status'=>Response::HTTP_OK
            ]);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}
