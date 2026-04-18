'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { KeyboardEvent, useState } from "react";

const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
    title: "Abstract Forms",
    category: "Graphic Design",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    title: "Design System",
    category: "UI Design",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800",
    title: "Brand Identity",
    category: "Graphic Design",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800",
    title: "Generative Art",
    category: "Graphic Design",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800",
    title: "Type Exploration",
    category: "Graphic Design",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    title: "Portrait Study",
    category: "App Screenshots",
  },
  {
    id: 7,
    url: "/images/project-1.jpg",
    title: "Beauty Editor",
    category: "App Screenshots",
  },
  {
    id: 8,
    url: "/images/project-3.jpg",
    title: "Unblur App",
    category: "App Screenshots",
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800",
    title: "Color Theory",
    category: "UI Design",
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    title: "Analytics Dashboard",
    category: "SaaS",
  },
  {
    id: 11,
    url: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800",
    title: "Landing Page",
    category: "Websites",
  },
  {
    id: 12,
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800",
    title: "SaaS Platform",
    category: "SaaS",
  },
];

export function GalleryGridBlock() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "UI Design", "Websites", "SaaS", "App Screenshots", "Graphic Design"];

  const filteredImages =
    filter === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter);

  const handleNext = () => {
    if (selectedImage !== null) {
      const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage);
      setSelectedImage(galleryImages[(currentIndex + 1) % galleryImages.length].id);
    }
  };

  const handlePrev = () => {
    if (selectedImage !== null) {
      const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage);
      setSelectedImage(galleryImages[(currentIndex - 1 + galleryImages.length) % galleryImages.length].id);
    }
  };

  const selectedImageData = galleryImages.find((img) => img.id === selectedImage);

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>, imageId: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedImage(imageId);
    }
  };

  return (
    <section
      className="art-gallery"
      aria-labelledby="gallery-heading"
      id="gallery"
    >
      <div className="container">
        {/* Header — original ArtGallery texts */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: '32px' }}
        >
          <div className="section-label reveal" style={{ justifyContent: "center" }}>
            My Art Gallery
          </div>
          <h2 className="section-title reveal mt-4" id="gallery-heading">
            Selected <span className="gradient-text">Visuals</span>
          </h2>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2"
          style={{ marginBottom: '32px' }}
          role="group"
          aria-label="Gallery categories"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              style={{
                padding: '8px 20px',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: filter === category ? 'none' : '1px solid rgba(255,255,255,0.12)',
                background: filter === category ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                color: filter === category ? '#000' : 'var(--text-muted)',
              }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Gallery items"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                role="listitem"
              >
                <Card
                  className="group relative cursor-pointer overflow-hidden border-border bg-transparent transition-all hover:border-ring hover:shadow-xl"
                  onClick={() => setSelectedImage(image.id)}
                  onKeyDown={(event) => handleCardKeyDown(event, image.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${image.title}`}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <motion.img
                      src={image.url}
                      alt={image.title}
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
                      aria-hidden="true"
                    >
                      <ZoomIn className="mb-2 h-8 w-8 text-white" />
                      <h3 className="mb-1 text-center text-lg font-semibold text-white">
                        {image.title}
                      </h3>
                      <Badge variant="secondary">{image.category}</Badge>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && selectedImageData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              onClick={() => setSelectedImage(null)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="lightbox-title"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[90vh] max-w-5xl"
              >
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute -right-12 top-0 text-white hover:bg-white/10"
                  onClick={() => setSelectedImage(null)}
                  aria-label="Close"
                >
                  <X className="h-6 w-6" />
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute -left-16 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 h-12 w-12 rounded-full border border-white/20"
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute -right-16 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 h-12 w-12 rounded-full border border-white/20"
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  aria-label="Next"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                <motion.img
                  key={selectedImage}
                  src={selectedImageData.url}
                  alt={selectedImageData.title}
                  className="max-h-[80vh] w-auto rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-4 text-center text-white"
                >
                  <h3 className="mb-2 text-xl font-semibold" id="lightbox-title">
                    {selectedImageData.title}
                  </h3>
                  <Badge variant="secondary">{selectedImageData.category}</Badge>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
