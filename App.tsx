
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import ImageGallery from './components/ImageGallery';
import ImageModal from './components/ImageModal';
import { GeneratedImage, ImageGenerationConfig } from './types';
import { generateImage } from './services/geminiService';

const App: React.FC = () => {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (prompt: string, config: ImageGenerationConfig) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = await generateImage(prompt, config);
      const newImage: GeneratedImage = {
        id: Math.random().toString(36).substring(7),
        url,
        prompt,
        timestamp: Date.now(),
      };
      setImages((prev) => [newImage, ...prev]);
    } catch (err: any) {
      setError(err.message || "Failed to generate image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pb-20">
      <Header />
      
      <main className="flex-1 flex flex-col container mx-auto">
        <PromptInput onGenerate={handleGenerate} isLoading={isLoading} />
        
        {error && (
          <div className="max-w-4xl mx-auto w-full px-4 mb-8">
            <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-start gap-4 text-red-400">
              <i className="fa-solid fa-circle-exclamation mt-1"></i>
              <div>
                <p className="font-bold">Error Occurred</p>
                <p className="text-sm opacity-90">{error}</p>
              </div>
              <button 
                onClick={() => setError(null)}
                className="ml-auto p-1 hover:text-red-200"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        )}

        <div className="px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8 px-2">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <i className="fa-solid fa-images text-indigo-400"></i>
                Session Gallery
                <span className="ml-2 px-2 py-0.5 bg-slate-800 rounded text-xs font-mono text-slate-400">
                  {images.length}
                </span>
              </h2>
              {images.length > 0 && (
                <button 
                  onClick={() => {
                    if (confirm("Clear session history?")) setImages([]);
                  }}
                  className="text-xs text-slate-500 hover:text-red-400 transition-colors flex items-center gap-1"
                >
                  <i className="fa-solid fa-trash-can"></i> Clear All
                </button>
              )}
            </div>

            <ImageGallery 
              images={images} 
              onImageClick={setSelectedImage} 
            />
          </div>
        </div>
      </main>

      <ImageModal 
        image={selectedImage} 
        onClose={handleCloseModal} 
      />

      {/* Persistent Call-to-Action / Status indicator for mobile */}
      {isLoading && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 px-6 py-3 bg-indigo-600/90 backdrop-blur shadow-2xl rounded-full border border-indigo-400/50 flex items-center gap-3 animate-bounce">
          <i className="fa-solid fa-spinner fa-spin"></i>
          <span className="text-sm font-bold">Dreaming up your vision...</span>
        </div>
      )}
    </div>
  );
};

export default App;
