import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";


function Button({ children, className, ...props }) {
    
  return (
    <button
      className={`px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  return (
    <nav className="bg-white  shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-auto items-center py-4 md:py-6">
          {/* Logo */}
          <div className="absolute top-2 left-15">
            <img src='logo.png' alt="logo" className="h-12 md:h-20 w-auto" />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 ml-auto ">
            <li onClick={()=>navigate('/')} className="text-gray-600 cursor-pointer  hover:text-gray-900">Home</li>
            <li onClick={()=>navigate('/solution')} className="text-gray-600 cursor-pointer  hover:text-gray-900">Solution</li>
            <li onClick={()=>navigate('/calculator')} className="text-gray-600  cursor-pointer hover:text-gray-900">Calculator</li>
            
          </ul>

          {/* Sign In Button */}
          <div className="hidden md:block">
            <Button onClick={()=>navigate('/authentication')} className="px-4 py-2 ml-4 cursor-pointer">Sign In</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-auto">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md py-4 px-6">
          <a href="#" className="block py-2 text-gray-600 hover:text-gray-900">Home</a>
          <a href="#" className="block py-2 text-gray-600 hover:text-gray-900">About</a>
          <a href="#" className="block py-2 text-gray-600 hover:text-gray-900">Services</a>
          <a href="#" className="block py-2 text-gray-600 hover:text-gray-900">Contact</a>
          <Button className="mt-4 w-full">Sign In</Button>
        </div>
      )}
    </nav>
  );
}