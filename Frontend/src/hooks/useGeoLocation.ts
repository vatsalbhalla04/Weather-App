import type { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";

interface GeoLocationState{
    coordinates : Coordinates | null;
    error : string | null; 
    isLoading: boolean;
}; 

export function useGeoLocation(){
    const [locationData,setlocationData] = useState<GeoLocationState>({
        coordinates :null,
        error: null, 
        isLoading: true
    });
    function getLocation(){
        setlocationData((prev)=>({
            ...prev,
            isLoading:true,
            error: null
        }));

        if(!navigator.geolocation){
            setlocationData({
                coordinates:null,
                error: "Geolocation is not supported by your browser",
                isLoading: false
            });
            return;
        }
        navigator.geolocation.getCurrentPosition((position)=>{
            setlocationData({
                coordinates:{
                    lat:position.coords.latitude ,
                    lon: position.coords.latitude
                },
                error: null,
                isLoading:true
            })
        },(error)=>{
            let errorMessage : string;
            switch(error.code){
                case error.PERMISSION_DENIED: errorMessage = "Location permission denied. Please enable location access";
                break;
                case error.POSITION_UNAVAILABLE: errorMessage ="Location information is unavaible";
                break;
                case error.TIMEOUT:
                errorMessage ="Location request timed out";
                break;
                default: errorMessage= "An unknow error occured"
            }
            setlocationData({
                coordinates:null,
                error:errorMessage,
                isLoading:false
            })
        },{
            enableHighAccuracy:true,
            timeout:5000,
            maximumAge:0
        })
    };

    useEffect(()=>{
        getLocation();
    },[])

    return {
        ...locationData,
        getLocation
    }
}