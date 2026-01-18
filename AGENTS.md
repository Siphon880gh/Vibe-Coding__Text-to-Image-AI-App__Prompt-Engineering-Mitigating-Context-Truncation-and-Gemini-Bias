
# AGENTS.md (High-Level Overview)
*Note: Approximate code-location references are intentional to maintain accuracy across edits.*

## Project Description
**Gemini Visionary** is a single-page React application that allows users to generate high-quality images from text prompts using the Google Gemini API (`gemini-2.5-flash-image`). It features a local session-based gallery and a zoomable lightbox for detailed viewing.

## Tech Stack
- **Frontend:** React, Tailwind CSS, Font Awesome
- **AI Integration:** `@google/genai` (Gemini API)
- **Styling:** Glassmorphism and dark mode aesthetics

## Architecture & Code Flow
The app follows a standard React component hierarchy with a centralized state in `App.tsx`.

1. **User Input:** `PromptInput.tsx` captures the text and aspect ratio.
2. **Generation:** `App.tsx` calls `geminiService.ts`, which communicates with the Gemini API.
3. **Storage:** Generated Base64 URLs are stored in the `images` state (local session).
4. **Display:** `ImageGallery.tsx` renders thumbnails.
5. **Detailed View:** `ImageModal.tsx` provides zooming and panning capabilities using CSS transforms and React state.

## File Tree
- `index.html`: Main shell and Tailwind configuration.
- `index.tsx`: React entry point.
- `App.tsx`: Main logic, state management, and orchestration.
- `types.ts`: Interface definitions for `GeneratedImage` and `ImageGenerationConfig`.
- `services/geminiService.ts`: Gemini API client and image processing logic.
- `components/`:
    - `Header.tsx`: UI navigation and branding.
    - `PromptInput.tsx`: Form for user prompts and settings.
    - `ImageGallery.tsx`: Grid display of generated images.
    - `ImageModal.tsx`: Zoomable lightbox modal.

## Key Code Locations
- **API Call Logic:** Found in the middle of `services/geminiService.ts` within the `generateImage` function.
- **Main State:** The `images` array and `handleGenerate` function are located in the top half of `App.tsx`.
- **Zoom Logic:** Scale and position state management is handled in the top 25% of `components/ImageModal.tsx`.
- **Image Rendering (Modal):** The panning/zooming `img` tag is rendered near the bottom of `components/ImageModal.tsx`.
