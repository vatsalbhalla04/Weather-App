import { useTheme } from "next-themes"

export function Footer(){
    useTheme
    return (
        <footer className="border-t backdrop-blur py-10 supports-[backdrop-filter]:bg-background/60 ">
        <div className="container mx-auto px-4 text-center text-gray-200">
        <p className="">
             <a href="https://github.com/vatsalbhalla04/Weather-App">Developed By Vatsal</a>
         </p>
        </div>
     </footer>
    )
}