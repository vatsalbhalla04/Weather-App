import { Layout } from '@/components/layout'
import { ThemeProvider } from '@/components/theme-provider'
import Routing from '@/PageRoutes/Routing'
import { BrowserRouter } from 'react-router-dom'

export default function WeatherAppMain() {
  return (
    <BrowserRouter>
    <ThemeProvider defaultTheme='dark'>
    <Layout>
        <Routing/>
    </Layout>
    </ThemeProvider>
    </BrowserRouter>
  )
}