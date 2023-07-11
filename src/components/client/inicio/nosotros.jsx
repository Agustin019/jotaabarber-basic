import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Nosotros() {
    const images = [
        "https://i.ibb.co/9cpJt1n/barbpesada3-optimized.jpg",
        "https://i.ibb.co/Db5QJDD/barberia-home-minif.webp",
        "https://i.ibb.co/wY6b33B/barbpesada2-optimized.jpg",
        "https://i.ibb.co/wY6b33B/barbpesada2-optimized.jpg",

    ];
    const settings = {
        infinite: true,
        speed: 500,

        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]

    };
    return (
        <section id='trabajos' className='  mx-auto  '>
            <article className=' h-auto p-9  relative'>
                <h2 className='font-bold text-[32px]  text-center py-5'>Mis trabajos</h2>
                <p className='font-light text-sm text-center lg:w-[80%] lg:mx-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit rem fugiat earum ducimus aperiam, ea dolorum, natus, autem qui
                </p>
                <Slider {...settings}>
                    {
                        images.map((image, index) => (

                            <div
                                key={index}
                            >
                                <div className={` 
                                    flex flex-col items-center justify-center  rounded-3xl max-h-[300px] min-h-[300px] w-[300px] mx-auto my-2
                                    ${index == 1
                                        ? 'lg:max-w-[32rem] lg:min-w-[22rem] lg:min-h-[25rem]'
                                        : 'lg:max-w-[351px] lg:max-h-[256px] lg:min-h-[372px] lg:pt-14 '
                                    }
                                    `}>
                                    <img
                                        className={`rounded-3xl object-top h-[300px] max-h-[328px] w-[300px] 
                                            ${index == 1
                                                ? 'lg:max-w-[510px] lg:min-w-[22rem] lg:min-h-[21rem] '
                                                : 'lg:h-[16rem] lg:min-w-[16rem] '
                                            }
                                        `}
                                        src={image}
                                        alt={`Imagen ${index + 1}`}
                                    />
                                </div>
                            </div>
                        ))}
                </Slider>

            </article>
        </section>
    )
}

const CustomPrevArrow = (props) => {
    const { className, onClick, style } = props;

    return (
        <div className='h-full z-10 flex-col content-center justify-end relative hidden md:flex'>

            <img
                onClick={onClick}
                className='cursor-pointer w-[30px] absolute top-[86px]'
                src="https://i.ibb.co/yVbp3vh/arrow-circle-left.png" alt=""

            />
        </div>
    );
};

// Componente de flecha de navegación personalizada para ir hacia adelante
const CustomNextArrow = (props) => {
    const { className, onClick, style } = props;

    return (
        <div className='h-full z-10 hidden md:flex flex-col content-center justify-end relative'>

            <img
                onClick={onClick}
                className='cursor-pointer w-[30px] absolute bottom-[227px] lg:bottom-[177px] xl:bottom-[154px] right-0'
                src="https://i.ibb.co/ZNfcQjP/arrow-circle-right.png" alt=''
            />
        </div>
    );
};

