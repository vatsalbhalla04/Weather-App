import type { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEY={
    weather:(coords:Coordinates)=>["weather",coords] as const,
    forecast:(coords:Coordinates)=>["forecast",coords] as const,
    location:(coords:Coordinates)=>["location",coords] as const
} as const

export  function useWeatherQuery(coordinates:Coordinates|null){
    return(
        useQuery({
            queryKey: WEATHER_KEY.weather(coordinates ??{
                lon:0, 
                lat:0
            }),
            queryFn:()=>coordinates?weatherAPI.getCurrentWeather(coordinates):null,
                enabled: !!coordinates
        })
    )
}

export  function useForecastQuery(coordinates:Coordinates|null){
    return(
        useQuery({
            queryKey: WEATHER_KEY.forecast(coordinates ??{
                lon:0, 
                lat:0
            }),
            queryFn:()=>coordinates?weatherAPI.getForecast(coordinates):null,
                enabled: !!coordinates
        })
    )
}

export  function useReverseGeoCodeQuery(coordinates:Coordinates|null){
    return(
        useQuery({
            queryKey: WEATHER_KEY.forecast(coordinates ??{
                lon:0, 
                lat:0
            }),
            queryFn:()=>coordinates?weatherAPI.reverseGeoCode(coordinates):null,
                enabled: !!coordinates
        })
    )
}