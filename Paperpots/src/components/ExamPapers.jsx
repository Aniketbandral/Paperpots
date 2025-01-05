import { useState, useEffect, useRef } from 'react';
import examPapers from '../data/examPapers';
import FilterPanel from './FilterPanel';

function ExamPapers() {
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [zoom, setZoom] = useState(100);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const [filters, setFilters] = useState({
    stream: '',
    branch: '',
    sem: '',
    year: '',
    subject: ''
  });
  const [filteredPapers, setFilteredPapers] = useState(examPapers);

  // Get unique values for filters
  const uniqueValues = {
    streams: [...new Set(examPapers.map(paper => paper.stream))],
    branches: [...new Set(examPapers.map(paper => paper.branch))],
    sems: [...new Set(examPapers.map(paper => paper.sem))],
    years: [...new Set(examPapers.map(paper => paper.year))],
    subjects: [...new Set(examPapers.map(paper => paper.subject))]
  };

  // Filter papers when filters change
  useEffect(() => {
    let result = examPapers;
    
    if (filters.stream) result = result.filter(paper => paper.stream === filters.stream);
    if (filters.branch) result = result.filter(paper => paper.branch === filters.branch);
    if (filters.sem) result = result.filter(paper => paper.sem === parseInt(filters.sem));
    if (filters.year) result = result.filter(paper => paper.year === parseInt(filters.year));
    if (filters.subject) result = result.filter(paper => paper.subject === filters.subject);

    setFilteredPapers(result);
  }, [filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return (
    <div className="pt-20 flex min-h-screen bg-gray-900 text-white">
      <FilterPanel 
      filters={filters}
      onFilterChange={handleFilterChange}
      uniqueValues={uniqueValues}
      />

      <div className="flex-1 pl-64">

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPapers.map((paper) => (
            <div 
              key={paper.id} 
                className="rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gray-800/90 backdrop-blur-sm border border-gray-700"

            >
              <div className="relative group cursor-pointer" onClick={() => setSelectedPaper(paper)}>
                <img 
                  src={paper.imageUrl} 
                  alt={paper.subject}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-lg shadow">
                      View Paper
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{paper.subject}</h3>
                  <a 
                    href={paper.imageUrl}
                    download
                    className="p-2 rounded-full hover:bg-gray-700"

                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>
                <div className="mt-2 text-sm text-gray-300">
                  <p>Stream: {paper.stream}</p>
                  <p>Branch: {paper.branch}</p>
                  <p>Semester: {paper.sem}</p>
                  <p>Year: {paper.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* Modal for viewing paper */}
        {selectedPaper && (
          <div 
          className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPaper(null)}
          >
          <div 
            className="w-full h-full max-w-7xl mx-auto rounded-2xl shadow-2xl overflow-hidden bg-gray-900/90 backdrop-blur-lg border border-gray-700"

            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-full flex flex-col">
            {/* Header with controls */}
            <div className="p-4 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-black/20 rounded-lg p-2">
              <button 
                onClick={() => setZoom(prev => Math.max(20, prev - 10))}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="text-white font-medium min-w-[4rem] text-center">{zoom}%</span>
              <button 
                onClick={() => setZoom(prev => Math.min(200, prev + 10))}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              </div>
                <div className="text-sm text-gray-400">
              <span>Drag to move • Scroll to zoom</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <a 
              href={selectedPaper.imageUrl}
              download
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200"

              onClick={e => e.stopPropagation()}
              >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              </a>
              <button 
              onClick={() => setSelectedPaper(null)}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200"

              >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              </button>
            </div>
            </div>

            {/* Image Container */}
            <div 
            className="flex-1 overflow-hidden relative flex items-center justify-center bg-black/40"
            onMouseDown={(e) => {
              setIsDragging(true);
              setDragStart({ 
              x: e.clientX - position.x, 
              y: e.clientY - position.y 
              });
            }}
            onMouseMove={(e) => {
              if (isDragging) {
              setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
              });
              }
            }}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onWheel={(e) => {
              const delta = e.deltaY * -0.01;
              setZoom(prev => Math.min(Math.max(20, prev + delta * 10), 200));
            }}
            >
              <img 
              ref={imageRef}
              src={selectedPaper.imageUrl} 
              alt={selectedPaper.subject}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom / 100})`,
                cursor: isDragging ? 'grabbing' : 'grab',
                transition: isDragging ? 'none' : 'transform 0.2s'
              }}
              className="max-h-[90vh] w-auto object-contain shadow-2xl"
              />
            </div>

            {/* Paper Info */}
            <div className="p-4 border-t border-gray-700">
              <h3 className="text-lg font-semibold">{selectedPaper.subject}</h3>
              <div className="mt-1 text-sm text-gray-400">
              {selectedPaper.stream} • {selectedPaper.branch} • Semester {selectedPaper.sem} • {selectedPaper.year}
              </div>
            </div>
            </div>
          </div>
          </div>
        )}
          </div>
        </div>
        );
      }

      export default ExamPapers;
