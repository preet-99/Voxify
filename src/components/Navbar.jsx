import { useState } from "react";
import { Menu, X, Mic } from "lucide-react"; // Added Mic for logo icon

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[darkslategrey] shadow-md">
      <div className="max-w-7xl mx-auto px-2 py-4 flex items-center justify-between"> 
  
        <div className="flex items-center gap-2">
       
          <img className="h-10 w-10" src="/microphone.gif" alt="" />
      
          <h1 className="text-white text-2xl font-bold">Voxify</h1> {/* Name */}
        </div>

        
        <div className="hidden md:flex items-center gap-2"> {/* Reduced gap, aligned right */}
          <a 
            href="#features" 
            className="flex items-center gap-1 bg-white text-[darkslategrey] px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors"
          >
            <Mic className="w-5 h-5 text-green-950 font-extrabold" /> 
            {/* <img className="h-8 w-8" src="/public/mic2.webp" alt="" /> */}
            Explore Tools
          </a>
        </div>

        {/* Mobile menu button, fully right */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col bg-[darkslategrey] px-6 pb-4 text-white">
          <a 
            href="#features" 
            className="py-2 flex items-center gap-1 hover:text-gray-300 transition-colors"
          >
            <Mic className="w-5 h-5 text-green-950 font-extrabold" /> {/* Added icon for creativity */}
            Explore Tools
          </a>
        </div>
      )}
    </nav>
  );
}