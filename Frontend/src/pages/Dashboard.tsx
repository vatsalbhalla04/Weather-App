import { CurrentWeather } from "@/components/currentWeather";
import { HourlyTemperature } from "@/components/HourlyTemp";
import AppSkeleton from "@/components/loadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import {
  useForecastQuery,
  useReverseGeoCodeQuery,
  useWeatherQuery,
} from "@/hooks/useWeather";
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react";

export function Dashboard() {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: LocationLoading,
  } = useGeoLocation();

  const locationQuery = useReverseGeoCodeQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);

  function handleRefresh() {
    getLocation();
    if (coordinates) {
      // reload weather data
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  }
  if (LocationLoading) {
    // return <AppSkeleton />;
  }

  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable the location to see your local weather</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to Fetch the weather data please try again</p>
          <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <AppSkeleton />;
  }

  return (
    <div className="space-y-4">
      {/* Favorite Cities */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl pl-5 font-semibold tracking-tighter">
          My Location
        </h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCcw
            className={`h-4 w-4 
            ${weatherQuery.isFetching ? "animate-spin" : ""}`}
          ></RefreshCcw>
        </Button>
      </div>
      <div className="grid gap-6">
       <div className="flex flex-col lg:flex-row gap-4">
         <CurrentWeather data={weatherQuery.data} locationName={locationName}/>
        {/* <HourlyTemperature data={forecastQuery.data}/> */}
       </div>
        </div>
      <div>
        {/* Deatils */}
        {/* Forecast */}
      </div>
    </div>
  );
}
