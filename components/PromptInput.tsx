
import React, { useState } from 'react';
import { ImageGenerationConfig } from '../types';

interface PromptInputProps {
  onGenerate: (prompt: string, config: ImageGenerationConfig) => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<ImageGenerationConfig['aspectRatio']>('1:1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onGenerate(prompt, { aspectRatio });
    }
  };

  const ratios: { label: string; value: ImageGenerationConfig['aspectRatio'] }[] = [
    { label: '1:1', value: '1:1' },
    { label: '16:9', value: '16:9' },
    { label: '9:16', value: '9:16' },
    { label: '4:3', value: '4:3' },
    { label: '3:4', value: '3:4' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-12">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative group">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to create... (e.g., 'A futuristic cyberpunk city at neon sunset, 8k resolution')"
            className="w-full h-32 bg-slate-800/50 border border-slate-700 rounded-2xl p-6 pr-12 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none shadow-inner"
            disabled={isLoading}
          />
          <div className="absolute right-4 bottom-4 flex gap-2">
            {prompt && (
              <button
                type="button"
                onClick={() => setPrompt('')}
                className="p-2 text-slate-500 hover:text-slate-300 transition-colors"
                title="Clear prompt"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Aspect Ratio:</span>
            <div className="flex gap-1 p-1 bg-slate-800/80 rounded-lg border border-slate-700">
              {ratios.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setAspectRatio(r.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    aspectRatio === r.value
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className={`px-8 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${
              isLoading || !prompt.trim()
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl shadow-indigo-500/20 active:scale-95'
            }`}
          >
            {isLoading ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin"></i>
                Generating...
              </>
            ) : (
              <>
                <i className="fa-solid fa-magic"></i>
                Generate Image
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptInput;
