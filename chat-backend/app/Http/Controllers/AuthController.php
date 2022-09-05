<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Message;
use App\Models\Register;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
//        $this->middleware('auth:api', [
//            'except' => ['login']
//        ]);
        $this->middleware('auth:api', [
            'except' => ['register', 'login']
        ]);
    }

    public function register(Request $request) {
//        echo 'hello';
//        dd();
        $validator = Validator::make($request->all(), [
            "fname" => "required|max:191",
            "lname" => "required|max:191",
            "email"    => "required|max:191",
            "password"  => "required|max:191",
            "image" => "required",
        ]);
        // Create user
        if($validator->fails()) {
            return response()->json([
                "status" => 401,
                "validate_err" => $validator->messages()
            ]);
        } else {
            $register = new Register;
            $register->fname = $request->input('fname');
            $register->lname = $request->input('lname');
            $register->email = $request->input('email');
            $register->password = Hash::make($request->input('password'));
//            $register->created_at = Carbon::now()->addSeconds(5)->diffForHumans();

            if($request->hasFile('image')) {
//                echo 'hello';
//                dd();
                $image = $request->file('image');
//                print_r($image);
//                dd();
                $extension = $image->getClientOriginalExtension();
//                echo $extension;
//                dd();
                $fileName = time().'.'.$extension;
//                echo $fileName;
//                dd();
                $image->move(public_path('images'), $fileName);
                $register->image = '/images/'.$fileName;
            }
            $register->save();

            return response()->json([
                'message' => 'Registered Successfully'
            ]);
        }
    }

    /**
     * Get a JWT token via given credentials.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "email"    => "required|max:191",
            "password"  => "required|max:191",
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 404,
                'validate_err' => $validator->messages()
            ]);
        } else {
//            $current = auth()->user();
//            print_r($current);
            $users = Register::all();
            $messages = Message::all();
            $credentials = $request->only('email', 'password');
//            print_r($credentials);
            $token = $this->guard()->attempt($credentials);
            if (!$token) {
                return response()->json([
                    'status' => 401,
                    'error' => 'Incorrect email or password'
                ]);
            } else {
                return $this->respondWithToken($token, $users, $messages);
            }
        }

//        $credentials = $request->only('email', 'password');
////        print_r($credentials);
//        $token = $this->guard()->attempt($credentials);
//
//        if (!$token) {
//            return response()->json(['status' => 401, 'error' => 'Incorrect email or password']);
//        } else {
//            return $this->respondWithToken($token);
//        }

    }

    /**
     * Get the authenticated User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json($this->guard()->user());
    }

    /**
     * Log the user out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->guard()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token, $users, $messages)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60 * 6000,
            'users' => $users->except(auth()->user()->id),
            'messages' => $messages,
            'user' => auth()->user()
        ]);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return Auth::guard();
    }

    public function allUser() {
        $allUser = Register::all();
        return response()->json([
            'users' => $allUser->except(auth()->user()->id),
        ]);
    }
}
