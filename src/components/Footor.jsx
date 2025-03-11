import { Leaf } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Footor = () => {
  return (
    
    <div className="bg-gray-900 text-white py-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold flex items-center">
            <Leaf className="mr-2 h-6 w-6" />
            CarbonTrack
          </h2>
          <p className="text-gray-400 mt-2">Building a greener tomorrow</p>
        </div>
        <div className="flex space-x-6">
          <Link href="#" className="hover:text-emerald-400 transition-colors">
            About
          </Link>
          <Link href="#" className="hover:text-emerald-400 transition-colors">
            Resources
          </Link>
          <Link href="#" className="hover:text-emerald-400 transition-colors">
            Contact
          </Link>
          <Link href="#" className="hover:text-emerald-400 transition-colors">
            Blog
          </Link>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
        <p>© {new Date().getFullYear()} SustainableFuture. All rights reserved.</p>
      </div>
    </div>
  </div>
  )
}

export default Footor