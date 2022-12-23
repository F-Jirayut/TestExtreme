<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class Accounts extends Controller
{
    function addAccounts(Request $request){
        try {
            $rules = [
                'name' => 'required|string|max:255',
                'phone' => 'required|digits:10',
                'email' => 'required|string|regex:/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ix|max:255|unique:users,email',
                'password' => 'required|min:6|max:255',
                'username' => 'required|min:6|max:255|unique:users,username',
                'company' => 'required|string|max:255',
                'nationality' => 'required|string|max:255'
                // 'company' => 'required|string|min:3|max:255',
                // 'nationality' => 'required|string|min:3|max:255'
            ];
    
            $validated = Validator::make($request->all() , $rules);
            if($validated->fails()) {
                Log::channel('test')->info("Add accounts bad request.");
                return response()->json($validated->errors() , 400);
            }

            $insert_user = User::insert([
                [
                    'name' => $request->name,
                    'phone' => $request->phone,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'username' => $request->username,
                    'company' => $request->company,
                    'nationality' => $request->nationality
                ]
            ]);

            Log::channel('test')->info("Add accounts success !! {username:".$request->username."}");

            return response()->json("Success !!" , 200);

        } catch (\Exception $ex) {
            Log::channel('test')->info("Request failed with status code 500 {addAccounts}");
            return response()->json($ex , 500);
        }
    }

    function getAccounts(Request $request, $id){
        try {
            $input = ["id" => $id];

            $rules = ['id' => 'required|exists:users,id',];

            // echo $id;
            $validated = Validator::make($input , $rules);
            if($validated->fails()) {
                Log::channel('test')->info("Get accounts bad request.");
                return response()->json($validated->errors() , 400);
            }
            
            $data = User::select('id', 'name', 'phone', 'email', 'username', 'company', 'nationality')->where('id', $request->id)->first();
            Log::channel('test')->info("Get accounts {id:".$data->id."}");

            return response($data, 200);

        } catch (\Exception $ex) {
            Log::channel('test')->info("Request failed with status code 500 {getAccounts}");
            return response()->json($ex , 500);
        }
    }

    function updateAccounts(Request $request){
        try {
            $rules = [
                'id' => 'required|exists:users,id',
                'name' => 'required|string|max:255',
                'phone' => 'required|digits:10',
                'company' => 'required|string|max:255',
                'nationality' => 'required|string|max:255'
            ];
    
            $validated = Validator::make($request->all() , $rules);
            if($validated->fails()) {
                Log::channel('test')->info("Update accounts bad request.");
                return response()->json($validated->errors() , 400);
            }

            User::where('id', $request->id)
            ->update([
                'name' => $request->name,
                'phone' => $request->phone,
                'company' => $request->company,
                'nationality' => $request->nationality
            ]);

            Log::channel('test')->info("Update accounts success !! {id:".$request->id."}");

            return response()->json("Success !!" , 200);

        } catch (\Exception $ex) {
            Log::channel('test')->info("Request failed with status code 500 {updateAccounts}");
            return response()->json($ex , 500);
        }
    }

    function deleteAccounts(Request $request){
        try {
            $rules = [
                'id' => 'required|exists:users,id',
            ];
    
            $validated = Validator::make($request->all() , $rules);
            if($validated->fails()) {
                Log::channel('test')->info("Delete accounts bad request.");
                return response()->json($validated->errors() , 400);
            }
            Log::channel('test')->info("Delete accounts success !! {id:".$request->id."}");
            User::where('id', $request->id)->delete();

            return response()->json("Success !!" , 200);

        } catch (\Exception $ex) {
            Log::channel('test')->info("Request failed with status code 500 {deleteAccounts}");
            return response()->json($ex , 500);
        }
    }

    function listAccounts(Request $request){
        try 
        {
            // $data = DB::select( DB::raw("select id, name, phone, email, username, company, nationality, '{<p>test</p>}' as action 
            // FROM users") 
            // ); 
            
            $data = User::select('id', 'name', 'phone', 'email', 'username', 'company', 'nationality')->get();
            Log::channel('test')->info("Accounts output ".count($data)." record");

            return response($data, 200);

        } catch (\Exception $ex) {
            Log::channel('test')->info("Request failed with status code 500 {listAccounts}");
            return response()->json($ex , 500);
        }
    }

    function login(Request $request){

        $rules = [
            'username' => 'required|string|max:255',
            'password' => 'required|min:6|max:255',
        ];

        $validated = Validator::make($request->all() , $rules);

        if($validated->fails()) {
            Log::channel('test')->info("Login bad request.");
            return response()->json($validated->errors() , 401);
        }

        $user = user::where('username', $request->username)->first();

        if($user == null){
            Log::channel('test')->info("login invalid.");
            return response()->json("login invalid." , 401);
        }

        if(!Hash::check($request->password , $user->password)){
            Log::channel('test')->info("login invalid.");
            return response()->json("login invalid.");
        }
        $user->tokens()->delete();
        $token = $user->createToken('test');
        Log::channel('test')->info("login success. ", [
            "id" => $user->id
        ]);
        return response()->json(["token" => $token->plainTextToken]);
    }
}
