import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function SobreNosotros() {
  const settings = {
    centerMode: true,
    centerPadding: '0',
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const images = [
    "https://i.ibb.co/MfTsL05/barba1.jpg",
    "https://i.ibb.co/QJVNxWJ/116458ad3a32cb261cd88428a17058f6.jpg",
    "https://i.ibb.co/2KTNbB5/6c6236144da2821d79b0559a448bcb5e.jpg"
  ];

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img
            className={index === 1 ? 'w-[451px] h-[316px]' : 'w-[351px] h-[256px]'}
            src={image}
            alt={`Imagen ${index + 1}`}
          />
        </div>
      ))}
    </Slider>
  );
}



{/** className='w-[351px] h-[256px] */}