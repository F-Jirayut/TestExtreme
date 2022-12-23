<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ItemGame extends Controller
{
    private $items = [
        [
            "name" => "Small Potion Heal",
            "game_item_id" => 1050,
            "chance" => 0.12,
            "stock" => 1000,
        ],
        [
            "name" => "Medium Potion Heal",
            "game_item_id" => 3315,
            "chance" => 0.08,
            "stock" => 80,
        ],
        [
            "name" => "Big Potion Heal",
            "game_item_id" => 5830,
            "chance" => 0.06,
            "stock" => 15,
        ],
        [
            "name" => "Full Potion Heal",
            "game_item_id" => 1650,
            "chance" => 0.04,
            "stock" => 10,
        ],
        [
            "name" => "Small MP Potion",
            "game_item_id" => 10235,
            "chance" => 0.12,
            "stock" => 1000,
        ],
        [
            "name" => "Medium MP Potion",
            "game_item_id" => 892,
            "chance" => 0.08,
            "stock" => 80,
        ],
        [
            "name" => "Big MP Potion",
            "game_item_id" => 14736,
            "chance" => 0.06,
            "stock" => 15,
        ],
        [
            "name" => "Full MP Potion",
            "game_item_id" => 19001,
            "chance" => 0.04,
            "stock" => 8,
        ],
        [
            "name" => "Attack Ring",
            "game_item_id" => 135007,
            "chance" => 0.05,
            "stock" => 10,
        ],
        [
            "name" => "Defense Ring",
            "game_item_id" => 68411,
            "chance" => 0.05,
            "stock" => 10,
        ],
        [
            "name" => "Lucky Key",
            "game_item_id" => 118930,
            "chance" => 0.15,
            "stock" => 1000,
        ],
        [
            "name" => "Silver Key",
            "game_item_id" => 117462,
            "chance" => 0.15,
            "stock" => 1000,
        ],
    ];

    function getAll(){
        Log::channel('test')->info("Items output ".count($this->items)." record");
        return response()->json($this->items, 200);
    }

    function RandomItem(){
        $items = $this->items;
        // $percenItems = [];

        // foreach ($items as $item => $value) {
        //     for ($i=0; $i < $value["chance"] * 100 ; $i++) {
        //         array_push($percenItems, $value);
        //         // $indexs[] # random 0-99 index
        //     }
        // }

        // $indexs = [0,99,85,42,.....]
        // $newItems = []
        // foreach ($indexs as $index => $i) {
        //     array_push($newItems, $percenItems[$i]);
        // }
        
        $count = count($items);
        $sum_weight = 0;
        for ($i=0; $i < $count ; $i++) {
            $items[$i]["start_weight"] = $sum_weight;
            $sum_weight += ($items[$i]["chance"] * 100);
            $items[$i]["end_weight"] = $sum_weight - 1;
        }

        $newItems = [];
        $key = 1;
        $i = 0;
        while ($i < 100) {
            $random = rand(0,99);
            for ($k=0; $k < $count; $k++) {
                if($random >= $items[$k]["start_weight"] && $random <= $items[$k]["end_weight"]){
                    if($items[$k]["stock"] == 0){
                        $i--;
                        break;
                    }
                    $item = $items[$k];
                    $item["key"] = $key; # for gui
                    array_push($newItems, $item);
                    $items[$k]["stock"]--;
                    // echo $random."|";
                    // echo "Your number ".$random." is in between of range [".$items[$k]["start_weight"]."] - [".$items[$k]["end_weight"]."]";
                    // echo "\n";
                    $key++;
                }
            }
            $i++;
        }
        Log::channel('test')->info("Random items output 100 record");
        return $newItems ;
    }
}
