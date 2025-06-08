import { Layout } from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import Routing from "@/PageRoutes/Routing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5*60*100, 
      gcTime: 10*60*1000, 
      retry: false,
      refetchOnWindowFocus: false,
    }
  }
});

export default function WeatherAppMain() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <Layout>
            <Routing />
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
