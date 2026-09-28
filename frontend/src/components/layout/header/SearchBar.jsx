
"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();


  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative w-full"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search here...."
        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pl-24 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
      />

      {query && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute left-16 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"
          aria-label="delete"
        >
          <X size={18} />
        </button>
      )}

      <button
        type="submit"
        className="absolute left-1 top-1 flex h-10 w-12 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700"
        aria-label="search"
      >
        <Search size={20} />
      </button>
    </form>
  );
};

export default SearchBar;

