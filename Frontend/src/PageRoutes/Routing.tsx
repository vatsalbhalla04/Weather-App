import { CityPages } from "@/pages/CityPages";
import { Dashboard } from "@/pages/Dashboard";
import { Route, Routes } from "react-router-dom";

export default function Routing(){
    return (
         <Routes>
                <Route path='/' element={<Dashboard/>}/>
                <Route path='/city/:cityName' element={<CityPages/>}/>
        </Routes>
    )
}