import { SwiperSlide } from "swiper/react";
import CustomSliderContainer from "../components/CustomSliderContainer";
import NewEventCard from "../components/NewEventCard"

export default function TrendingEventComponent(){
    return(
        <div>
            <CustomSliderContainer
                breakpoints={
                {
                    640: {
                        "slidesPerView": 2,
                    },
                    1024: {
                        "slidesPerView": 3
                    }
                }}
            >
                {
                    [1, 2, 3, 4, 5].map((ev, i)=>(
                        <SwiperSlide key={i}>
                            <div className='mb-4'>
                                <NewEventCard isTrending />
                            </div>
                        </SwiperSlide>
                    ))
                }
            </CustomSliderContainer>
        </div>
    )
}