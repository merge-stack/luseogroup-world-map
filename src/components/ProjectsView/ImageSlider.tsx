import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ImageSliderProps {
  photos: string[];
  photoHeight?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ photos, photoHeight }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      slidesPerView={1}
      loop={true}
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
      {photos.map((img, index) => (
        <SwiperSlide key={index}>
          <img src={img} alt={`slide-${index}`} style={{ width: "100%", height: photoHeight }} />
        </SwiperSlide>
      ))}

      {/* Custom Navigation Buttons to Stop Propagation */}
      <div
        className="swiper-button-prev"
        onClick={(e) => e.stopPropagation()}
      ></div>
      <div
        className="swiper-button-next"
        onClick={(e) => e.stopPropagation()}
      ></div>
    </Swiper>
  );
};

export default ImageSlider;
