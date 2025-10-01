import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[darkslategrey] shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold">AI Tools Hub</h1>
        {/* Logo here */}
        <div className="hidden md:flex gap-6 text-white font-medium">
          <a href="#video" className="hover:text-gray-200">Video to Text</a>
          <a href="#image" className="hover:text-gray-200">Image to Text</a>
          <a href="#speech" className="hover:text-gray-200">Text ↔ Speech</a>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col bg-purple-700 px-6 pb-4 text-white">
          <a href="#video" className="py-2">Video to Text</a>
          <a href="#image" className="py-2">Image to Text</a>
          <a href="#speech" className="py-2">Text ↔ Speech</a>
        </div>
      )}
    </nav>
  );
}
