import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./index.css"

interface ImageSliderProps {
  photos: string[];
  photoHeight: string
}

const CustomPrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div className="custom-arrow custom-prev" onClick={(event) => {
    event.stopPropagation();
    onClick?.();
  }}>
    <FaChevronLeft size={25} />
  </div>
);

const CustomNextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div className="custom-arrow custom-next" onClick={(event) => {
    event.stopPropagation();
    onClick?.();
  }}>
    <FaChevronRight size={25} />
  </div>
);

const ImageSlider: React.FC<ImageSliderProps> = ({ photos, photoHeight }) => {
  const settings = {
    infinite: photos.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: any) => (
      <div style={{ position: 'absolute', bottom: '20px', width: '100%' }} onClick={(event) => event.stopPropagation()}>
        <ul> {dots} </ul>
      </div>
    ), dots: true,
    nextArrow: photos.length > 1 ? <CustomNextArrow /> : undefined,
    prevArrow: photos.length > 1 ? <CustomPrevArrow /> : undefined,
  };

  return (
    <Slider {...settings} className="location-card-slider">
      {photos.map((photo, index) => (
        <div key={index} className="location-card-img-div">
          <img src={photo} alt={`Slide ${index}`} className="location-card-image" style={{ height: photoHeight }} />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
