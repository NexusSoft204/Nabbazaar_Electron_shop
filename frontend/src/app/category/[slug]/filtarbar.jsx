import React from "react";
import {
  SlidersHorizontal,
  ArrowUpDown,
  Grid,
} from "lucide-react";

const Filtarbar = ({
  filteredProducts,
  selectedBrand,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 p-4 mb-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
      
      {/* Left Side */}
      <div className="flex items-center gap-2">
        <SlidersHorizontal
          size={18}
          className="text-slate-400"
        />

        <span className="text-sm font-bold text-slate-700">
          Showing {filteredProducts.length} Products
        </span>

        {selectedBrand !== "All" && (
          <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded-full border border-blue-100">
            Brand: {selectedBrand}
          </span>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        
        {/* Sort Button */}
        <button
          type="button"
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 border border-slate-200 rounded-xl px-3 py-2 hover:bg-slate-50 transition-colors"
        >
          <ArrowUpDown size={15} />

          <span>Sort by</span>

          <span className="text-slate-900">
            Latest
          </span>
        </button>

        {/* Grid Button */}
        <button
          type="button"
          className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-colors"
        >
          <Grid size={17} />
        </button>

      </div>
    </div>
  );
};

export default Filtarbar;