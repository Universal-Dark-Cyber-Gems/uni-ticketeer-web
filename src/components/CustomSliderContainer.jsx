import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper } from 'swiper/react';
import { Navigation, Pagination } from "swiper/modules"

export default function CustomSliderContainer({children, breakpoints, slidesPerGroup, slidesPerView, ...props }){
    return(
        <Swiper 
            modules={[Navigation, Pagination]}
            breakpoints={breakpoints}
            slidesPerGroup={slidesPerGroup || 1}
            slidesPerView={slidesPerView || 1}
            spaceBetween={props.spaceBetween || 20}
            direction='horizontal'
            pagination={{type: "bullets", dynamicBullets: true, dynamicMainBullets: 1}}
            className={props.className}
            {...props}
        >
            {children}
        </Swiper>
    )
}