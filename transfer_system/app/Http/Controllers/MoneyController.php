<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class MoneyController extends Controller
{
    function transferUpdate(Request $request){

        DB::beginTransaction();
        try {
            $monto = $request->monto;
            $id_cuenta_emisor = $request->id_cuenta_emisor;
            $id_cuenta_receptor = $request->id_cuenta_receptor;

            $cuenta = DB::table('acounts')
                ->whereIn('id',[$id_cuenta_emisor,$id_cuenta_receptor])
                ->update(
                    [
                        'saldo' => DB::raw("CASE 
                            WHEN id = $id_cuenta_emisor THEN saldo - $monto 
                            WHEN id = $id_cuenta_receptor THEN saldo + $monto 
                            ELSE saldo 
                        END")
                    ]
                );

            DB::commit();
            return response()->json([
                'message'=>'transaccion realizada con exito',
                'data'=>$cuenta,
                'status'=>Response::HTTP_OK
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'error'=>'ocurrio un problema al realizar la transaccion, intentelo mas tarde'.$th->getMessage(),
                'status'=>Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

    }

    function depositUpdate(Request $request){

        DB::beginTransaction();
        try {
            $monto = $request->monto;
            $id_cuenta = $request->id_cuenta_emisor;
            // $id_cuenta_receptor = $request->id_cuenta_receptor;

            // $cuenta = DB::table('acounts')
            //     ->whereIn('id',[$id_cuenta])
            //     ->update(
            //         [
            //             'saldo' => DB::raw("saldo + $monto")
            //         ]
            //     );

            DB::table('acounts')->increment('saldo', $monto, ['id' => $id_cuenta]);
            DB::commit();
            return response()->json([
                'message'=>'transaccion realizada con exito',
                'status'=>Response::HTTP_OK
            ]);    
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'error'=>'ocurrio un problema al realizar la transaccion, intentelo mas tarde'.$th->getMessage(),
                'status'=>Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

    }
}
