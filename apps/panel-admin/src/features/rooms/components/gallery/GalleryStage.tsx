"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGalleryStage } from "./hooks/useGalleryStage";

export const GalleryStage = () => {
  const {
    images,
    dragIndex,
    error,
    isMaxReached,
    handleFilesAdded,
    handleRemove,
    handleDragStart,
    handleDragEnd,
    handleDrop,
  } = useGalleryStage();

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Galería de Imágenes</h1>
        <p className="text-white/70 text-sm">
          Subí entre 1 y 10 imágenes. Arrastrá para reordenar.
        </p>
      </header>

      {/* Hint */}
      <div className="flex items-start gap-2 bg-white/10 border border-white/20 rounded-lg p-3 mb-6 text-white/70 text-sm">
        <span className="shrink-0 mt-0.5">ℹ️</span>
        <p>
          La primera imagen se asigna como Principal. Formatos: JPG, PNG, WebP. Máximo 5 MB por
          imagen.
        </p>
      </div>

      {/* Drop zone */}
      <div
        role="button"
        tabIndex={isMaxReached ? -1 : 0}
        aria-disabled={isMaxReached}
        aria-label="Subir imágenes"
        className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 mb-6 transition-colors ${
          isMaxReached
            ? "border-white/10 opacity-40 cursor-not-allowed"
            : "border-white/30 hover:border-emerald-400 hover:bg-white/5 cursor-pointer"
        }`}
        onClick={() => !isMaxReached && inputRef.current?.click()}
        onKeyDown={(e) =>
          !isMaxReached && (e.key === "Enter" || e.key === " ") && inputRef.current?.click()
        }
        onDragOver={(e) => {
          if (!isMaxReached) e.preventDefault();
        }}
        onDrop={(e) => {
          if (isMaxReached) return;
          e.preventDefault();
          if (e.dataTransfer.files.length > 0) handleFilesAdded(e.dataTransfer.files);
        }}
      >
        <span className="text-4xl text-white/40">⬆</span>
        <span className="text-white font-medium text-sm">Subir imágenes</span>
        <span className="text-white/50 text-xs">Hacé clic o arrastrá imágenes aquí</span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        aria-hidden="true"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFilesAdded(e.target.files);
            e.target.value = "";
          }
        }}
      />

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
          {images.map((image, index) => (
            <div
              key={image.id}
              draggable={!image.isUploading}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all select-none ${
                image.isUploading
                  ? "border-white/20 cursor-default"
                  : dragIndex === index
                    ? "border-emerald-400 opacity-50 scale-95 cursor-grabbing"
                    : "border-white/20 hover:border-white/40 cursor-grab"
              }`}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
              onDragEnd={handleDragEnd}
            >
              <Image
                src={image.url}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                unoptimized
              />

              {image.isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {!image.isUploading && (
                <button
                  type="button"
                  className="absolute top-1.5 right-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold z-10 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(image.id);
                  }}
                  aria-label="Eliminar imagen"
                >
                  ✕
                </button>
              )}

              {index === 0 && (
                <span className="absolute bottom-1.5 left-1.5 bg-emerald-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full z-10">
                  Principal
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm mb-4" role="alert">
          {error}
        </p>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="bg-white/10 text-white border border-white/20 hover:bg-white/20 rounded-xl px-6 py-2 text-sm transition-colors"
          onClick={() => window.history.back()}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl px-6 py-2 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={images.length === 0 || images.some((img) => img.isUploading)}
          onClick={() => alert("Galería guardada (mock)")}
        >
          Guardar Galería
        </button>
      </div>
    </div>
  );
};
