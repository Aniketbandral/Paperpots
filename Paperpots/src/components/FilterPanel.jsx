import { useState } from 'react';

function FilterPanel({ filters, onFilterChange, uniqueValues }) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="fixed left-0 top-16 h-full z-40 transition-all duration-300 bg-gray-800 shadow-lg w-64 text-white border-r border-gray-700"
         style={{transform: isVisible ? 'translateX(0)' : 'translateX(-100%)'}}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="absolute right-0 translate-x-full top-4 p-2 rounded-r-lg bg-gray-800 shadow hover:scale-105 transition-transform"

      >
        {isVisible ? '←' : '→'}
      </button>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Stream</label>
            <select
              value={filters.stream}
              onChange={(e) => onFilterChange('stream', e.target.value)}
                className="w-full rounded-lg p-2 bg-gray-700 text-white"

            >
              <option value="">All Streams</option>
              {uniqueValues.streams.map(stream => (
                <option key={stream} value={stream}>{stream}</option>
              ))}
            </select>
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm font-medium mb-1">Branch</label>
            <select
              value={filters.branch}
              onChange={(e) => onFilterChange('branch', e.target.value)}
                className="w-full rounded-lg p-2 bg-gray-700 text-white"

            >
              <option value="">All Branches</option>
              {uniqueValues.branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>

          {/* Semester */}
          <div>
            <label className="block text-sm font-medium mb-1">Semester</label>
            <select
              value={filters.sem}
              onChange={(e) => onFilterChange('sem', e.target.value)}
                className="w-full rounded-lg p-2 bg-gray-700 text-white"

            >
              <option value="">All Semesters</option>
              {uniqueValues.sems.map(sem => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <select
              value={filters.year}
              onChange={(e) => onFilterChange('year', e.target.value)}
                className="w-full rounded-lg p-2 bg-gray-700 text-white"

            >
              <option value="">All Years</option>
              {uniqueValues.years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <select
              value={filters.subject}
              onChange={(e) => onFilterChange('subject', e.target.value)}
                className="w-full rounded-lg p-2 bg-gray-700 text-white"

            >
              <option value="">All Subjects</option>
              {uniqueValues.subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;