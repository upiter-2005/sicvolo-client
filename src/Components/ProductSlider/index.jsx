import './product-image-slider.scss';
// import PropTypes from 'prop-types'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Pagination } from "swiper/modules";
import { useState, useRef, useEffect } from 'react'

const ProductImagesSlider = props => {
    const swiper1 = useRef();
    const swiper2 = useRef();
    const [activeThumb, setActiveThumb] = useState()
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>';
        },
      };

    //   useEffect(()=>{
    //     return () => {
    //     }
    //   }, [])

    return <>
        <Swiper
            ref={swiper1}
            loop={true}
            spaceBetween={10}
            pagination={pagination}
            //navigation={true}
            modules={[Navigation, Thumbs, Pagination]}
            grabCursor={true}
            thumbs={{ swiper: activeThumb }}
            className='product-images-slider'
            breakpoints={{
                992: {
                    pagination: false
                },
              
              }}
        
           
        >
            {
             props.images && props.images.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img src={item.src} alt="product images" />
                    </SwiperSlide>
                ))
            }
        </Swiper>
        <Swiper  
            ref={swiper2}
            onSwiper={setActiveThumb}
            loop={true}
            direction={"vertical"}
            spaceBetween={10}
            slidesPerView={4}
            className='product-images-slider-thumbs'
            breakpoints={{
                992: {
                    slidesPerView: 2
                },
               
              }}
              modules={[Navigation, Thumbs]}
        >
            {
                props.images && props.images.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="product-images-slider-thumbs-wrapper">
                            <img src={item.src} alt="product images" />
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    </>
}

// ProductImagesSlider.propTypes = {
//     images: PropTypes.array.isRequired
// }

export default ProductImagesSlider