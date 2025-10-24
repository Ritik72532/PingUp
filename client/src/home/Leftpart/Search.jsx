import React from 'react'
import { FaSearch } from "react-icons/fa";
function Search() {
  return (
   <div className='h-[10vh]'>
     <div className='px-6 py-4'>
      <form action="">
        <div className='flex space-x-3'>
          <label className="border border-gray-700 bg-slate-900 p-3 rounded-lg flex items-center gap-2 w-[80%]">
            <input type="search" className='outline-none' required placeholder="Search" />
          
          </label>
            <button>
                <FaSearch
                className='text-5xl p-2 hover:bg-gray-600 rounded-full duration-300'
                 />
            </button>
        </div>
      </form>
    </div>
   </div>
  )
}

export default Search

