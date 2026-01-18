
import React, { useState, useEffect } from 'react';
import { GeneratedImage } from '../types';

interface ImageModalProps {
  image: GeneratedImage | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!image) {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    }
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [image, onClose]);

  if (!image) return null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => {
    setZoom(prev => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY
      }));
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-6xl max-h-full flex flex-col items-center gap-4 z-10 pointer-events-none">
        {/* Controls Header */}
        <div className="w-full flex justify-between items-center text-white px-2 pointer-events-auto">
          <div className="flex-1 max-w-[70%]">
            <p className="text-sm sm:text-lg font-medium truncate opacity-90">{image.prompt}</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex bg-slate-800/80 rounded-lg p-1 border border-slate-700">
              <button 
                onClick={handleZoomOut}
                className="p-2 hover:bg-slate-700 rounded transition-colors"
                title="Zoom Out"
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <div className="px-3 py-2 text-xs font-mono min-w-[3rem] text-center">
                {Math.round(zoom * 100)}%
              </div>
              <button 
                onClick={handleZoomIn}
                className="p-2 hover:bg-slate-700 rounded transition-colors"
                title="Zoom In"
              >
                <i className="fa-solid fa-plus"></i>
              </button>
              <button 
                onClick={handleReset}
                className="p-2 hover:bg-slate-700 rounded transition-colors ml-1"
                title="Reset"
              >
                <i className="fa-solid fa-rotate-left"></i>
              </button>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 bg-slate-800/80 hover:bg-red-500/80 rounded-lg flex items-center justify-center transition-all border border-slate-700 hover:border-red-400"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div 
          className="relative w-full flex-1 min-h-0 overflow-auto flex items-center justify-center rounded-2xl bg-slate-900 cursor-grab active:cursor-grabbing border border-white/5 pointer-events-auto"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <img
            src={image.url}
            alt={image.prompt}
            draggable={false}
            className="max-w-full max-h-full w-auto h-auto object-contain select-none transition-transform duration-200 ease-out"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            }}
          />
          
          {zoom === 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm text-[10px] sm:text-xs text-white/60 pointer-events-none">
              Use the controls above or zoom in to drag
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="flex gap-4 pointer-events-auto">
          <a 
            href={image.url} 
            download={`gemini-gen-${image.id}.png`}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-indigo-600/20"
          >
            <i className="fa-solid fa-download"></i>
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
