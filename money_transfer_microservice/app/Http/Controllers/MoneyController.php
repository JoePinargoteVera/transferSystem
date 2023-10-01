<?php

namespace App\Http\Controllers;

use App\Models\Transferencia;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use GuzzleHttp\Client;

class MoneyController extends Controller
{
    function Transferencia(Request $request){

        DB::beginTransaction();
        try {
            $transferencia = new Transferencia();
            $transferencia->monto = $request->monto;
            $transferencia->id_cuenta_emisor = $request->id_cuenta_emisor;
            $transferencia->id_cuenta_receptor = $request->id_cuenta_receptor;
            $transferencia->fecha_transferencia = $request->cedula;
            $transferencia->descripcion = $request->descripcion;
            $transferencia->direccion = $request->direccion;
            $transferencia->save();

            
            DB::commit();
            return response()->json([
                'data' => $transferencia,
                'message'=>'transferencia realizada con exito',
                'status' => Response::HTTP_CREATED
            ]);
            
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'error'=>'error: Ocurrio un error al realizar la transaccion, 
                vuelva a intentarlo mas tarde'.$th->getMessage(),
                'status'=>Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
    }
}
