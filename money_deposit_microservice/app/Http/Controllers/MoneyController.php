<?php

namespace App\Http\Controllers;

use App\Models\Deposito;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class MoneyController extends Controller
{
    function Deposito (Request $request){
        DB::beginTransaction();
        try {
            $deposito = new Deposito();
            $deposito->monto = $request->monto;
            $deposito->fecha_deposito = $request->fecha_deposito;
            $deposito->id_cuenta = $request->id_cuenta;

            $deposito->save();
            
            DB::commit();
            return response()->json([
                'data' => $deposito,
                'status' => Response::HTTP_CREATED,
                'menssage'=>'Deposito realizado con exito'
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'error' => 'error: Hubo un error al realizar el deposito, intentelo más tarde'. $e->getMessage(),
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
    }
}
