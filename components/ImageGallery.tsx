
import React from 'react';
import { GeneratedImage } from '../types';

interface ImageGalleryProps {
  images: GeneratedImage[];
  onImageClick: (image: GeneratedImage) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-500 animate-in fade-in duration-700">
        <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6 border border-slate-700">
          <i className="fa-regular fa-image text-3xl opacity-30"></i>
        </div>
        <p className="text-lg font-medium">Your creative journey begins here.</p>
        <p className="text-sm">Describe something and hit generate to see the magic.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 pb-12">
      {images.map((img, index) => (
        <div
          key={img.id}
          className="group relative bg-slate-800/30 rounded-2xl overflow-hidden border border-slate-700 hover:border-indigo-500/50 transition-all cursor-pointer shadow-lg hover:shadow-indigo-500/10"
          onClick={() => onImageClick(img)}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="aspect-square w-full overflow-hidden">
            <img
              src={img.url}
              alt={img.prompt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform">
            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
              {img.prompt}
            </p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-[10px] text-slate-500">
                {new Date(img.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <button className="text-indigo-400 text-xs hover:text-indigo-300 flex items-center gap-1">
                <i className="fa-solid fa-expand"></i> View
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
