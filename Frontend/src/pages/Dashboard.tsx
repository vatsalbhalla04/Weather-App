import AppSkeleton from "@/components/loadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { useForecastQuery, useReverseGeoCodeQuery, useWeatherQuery } from "@/hooks/useWeather";
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
    return <AppSkeleton />;
  }

  if (locationError) {
   return(
    <Alert variant="destructive">
    <AlertTriangle className="h-4 w-4"/>
    <AlertTitle>Location Error</AlertTitle>
    <AlertDescription className="flex flex-col gap-4">
      <p>{locationError}</p>
      <Button onClick={getLocation} variant={"outline"} className="w-fit">
          <MapPin className="mr-2 h-4 w-4"/>Enable Location
      </Button>
    </AlertDescription>
  </Alert>
   );
  }
  if (!coordinates) {
   return(
    <Alert variant="destructive">
    <AlertTitle>Location Required</AlertTitle>
    <AlertDescription className="flex flex-col gap-4">
      <p>Please enable the location to see your local weather</p>
      <Button onClick={getLocation} variant={"outline"} className="w-fit">
          <MapPin className="mr-2 h-4 w-4"/>Enable Location
      </Button>
    </AlertDescription>
  </Alert>
   );
  }

  return (
    <div className="space-y-4">
      {/* Favorite Cities */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl pl-5 font-semibold tracking-tighter">My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          // disabled={} 
        >
          <RefreshCcw className="h-4 w-4"></RefreshCcw>
        </Button>
      </div>
      {/* Current and Hourly Weather */}
    </div>
  );
}
