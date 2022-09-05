<?php

namespace App\Http\Controllers;

use App\Events\MessageSend;
use App\Models\Register;
use Illuminate\Http\Request;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class MessageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function user_message($id=null) {
        $currentId = auth()->user()->id;
        $user = Register::query()->findOrFail($id);
        $message = Message::query()->where(function ($q) use($id, $currentId){
            $q->where('user_id', $currentId);
            $q->where('to_id', $id);
        })->orWhere(function ($q) use($id, $currentId) {
            $q->where('user_id', $id);
            $q->where('to_id', $currentId);
        })->get();
        return response()->json([
            'messages' => $message,
            'user' => $user
        ]);
    }

    public function send_message(Request $request) {
        if($request->ajax()) {
            abort('/404');
        }
        $currentId = auth()->user()->id;
        $messages = Message::create([
            'message' => $request->message,
            'user_id' => $currentId,
            'to_id' => $request->user_id,
            'type' => 0,
            'created_at' => Carbon::now()->diffForHumans()
        ]);
        broadcast(new MessageSend($messages, $currentId))->toOthers();
//        $messages = Message::create([
//            'message' => $request->message,
//            'user_id' => $currentId,
//            'to_id' => $request->user_id,
//            'type' => 1
//        ]);

        return response()->json($messages, 200);
    }
}
