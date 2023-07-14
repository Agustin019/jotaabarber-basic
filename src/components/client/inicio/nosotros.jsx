import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Nosotros() {
    const images = [
        "https://i.ibb.co/cvS9TZw/557792f7-db7d-4805-a5ba-34041ad16580-min.jpg",
        "https://i.ibb.co/SKvJ87S/7a8cd364-6631-413d-9a62-206a955720b1-min.jpg",
        "https://i.ibb.co/M5KPKbV/8ee5d30f-6713-4539-a953-96461dca09ae-min.jpg",
        "https://i.ibb.co/GpyXdJt/488d894f-026c-48b2-b818-81a7207fa5d0-min.jpg",
        "https://i.ibb.co/7tLGVL7/76a1a382-7d76-452e-a198-bac9024a5eb2-min.jpg",
        "https://i.ibb.co/jbFbtGz/aa18fa59-c963-467b-a72c-5a2a47f5d143-min.jpg",
        "https://i.ibb.co/DGK9KH6/b5636628-6314-48f3-b531-bd0912092589-min.jpg",
        "https://i.ibb.co/94VP3Z9/e1d72762-1dd9-4823-97b0-f5397a86846b-min.jpg",
        "https://i.ibb.co/MNwdp25/b0815e2f-5c71-4395-a774-be3d6e60ee30-min.jpg",
        

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
                                <div className={` lg:max-w-[351px] lg:max-h-[256px] lg:min-h-[372px] lg:pt-14
                                    flex flex-col items-center justify-center  rounded-3xl max-h-[300px] min-h-[300px] w-[300px] mx-auto my-2
                                    `}>
                                    <img
                                        className={`lg:h-[16rem] lg:min-w-[16rem] 
                                        rounded-3xl object-cover h-[300px] max-h-[328px] w-[300px] 
                                           
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

