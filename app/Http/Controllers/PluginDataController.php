<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;


class PluginDataController extends Controller
{
    const CACHE_KEY = 'V1_WP_plugin:%s';

    public function getPluginData(){
        $path=public_path('/packages');
        $files = collect(scandir($path))->slice(3)->values();
        $slugs=[];
        $pluginDetails=[];

        foreach ($files as $file){
            array_push($slugs,rtrim($file,'.zip'));
        }

//      TO POPULATE PLUGINDETAIL ARRAY USING SLUGS AND API
        foreach ($slugs as $slug){
            array_push($pluginDetails,$this->getPluginDetails($slug));
        }


//        To REMOVE NULL ELEMENTS FROM ARRAY
        foreach($pluginDetails as $key => $value)
            if(empty($value))
                unset($pluginDetails[$key]);
        foreach ($pluginDetails as &$pluginDetail){
            $pluginDetail['download_url']=str_replace('http','https',$pluginDetail['download_url']);
        }

        return array_values($pluginDetails);
    }


    public function getPluginDetails($slug){

        $request=Http::get('https://wp-plugins.nativerank.com/wp-update-server/',[
            'action'=>'get_metadata',
            'slug'=>$slug
        ]);
        return $request->json();
    }
}
