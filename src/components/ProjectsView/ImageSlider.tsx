import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { REACT_DEFAULT_IMAGE_URL } from "@config";

interface ImageSliderProps {
  photos: string[];
  photoHeight?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ photos, photoHeight }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = REACT_DEFAULT_IMAGE_URL; // Replace with default image on error
    e.currentTarget.onerror = null; // Prevent infinite loops
  };
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      slidesPerView={1}
      loop={photos.length > 1} // Enable loop only if there are at least 2 slides
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      className="location-card-slider"
    >
      {photos.map((img, index) => {
        // Fallback to default image if img is an empty string
        const validImg = img && img.trim() !== "" ? img : REACT_DEFAULT_IMAGE_URL;
        return (
          <SwiperSlide key={index}>
            <img
              loading="lazy"
              src={validImg}
              alt={`slide-${index}`}
              style={{ width: "100%", height: photoHeight }}
              onError={handleImageError}
            />
          </SwiperSlide>
        );
      })}

      {/* Custom Navigation Buttons to Stop Propagation */}
      <div className="swiper-button-prev" onClick={(e) => e.stopPropagation()}></div>
      <div className="swiper-button-next" onClick={(e) => e.stopPropagation()}></div>
    </Swiper>
  );
};

export default ImageSlider;
