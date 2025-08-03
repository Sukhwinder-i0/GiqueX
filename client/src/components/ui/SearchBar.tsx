'use client'

import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

const  SearchBar = ({
  placeholder = 'Search...',
  onSearch,
  className = ''
}: SearchBarProps) => {

  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (onSearch) onSearch(query)
  }

  return (
    <div
      className={`flex items-center gap-2  rounded-md backdrop-blur-md bg-white/10 border border-white/20 shadow-md text-white ${className}`}
    >
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        placeholder={placeholder}
        className="bg-transparent px-4 py-1 focus:outline-none text-white placeholder-white/50 w-[85%]"
      />
      <FiSearch className="text-white/70 text-xl cursor-pointer" />
    </div>
  )
}

export default SearchBar
