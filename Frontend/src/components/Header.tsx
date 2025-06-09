import { Link } from "react-router-dom";
import { useTheme } from "./theme-provider";
import { Sun , Moon } from "lucide-react";

export function Header(){

    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";
    
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="text-3xl flex justify-start pt-4 pl-5 pb-4 font-medium">
            <Link
              to={"/"}
              className={isDark ? "text-white" : "text-gray-950"}
            >
              Weather App
            </Link>
          </div>

          <div>
            {/* Search bar */}
            {/* theme toggle */}
            <div className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark?"rotate-0":"rotate-180"}`} onClick={()=>{
                setTheme(isDark ? "light" : "dark")
            }}> {isDark ? (
                <Moon className="h-6 w-6 text-white rotate-0 transition-all"/>
            ):(
                <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all"/>
            )}
            </div>
          </div>
        </div>
      </header>
    );
}