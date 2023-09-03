import { Link } from 'react-router-dom'
import HeroImg from '../images/Hero-image.png'
import OrganiseImg from '../images/Organise-image.jpg'
import Section from '../components/Section'
import PaymentImg from '../images/Payment-image.png'
import { useEffect} from 'react'


export default function Home(){

    function initTestimonySlider(){
        const swiperEl = document.querySelector('swiper-container')
        console.log(swiperEl)
        const swiperParams = {
            autoplay:{
                delay: 3000,

            },
            breakpoints: {
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            },
            on: {
              init(swiper) {
                
              },
            },
          };
        
          // now we need to assign all parameters to Swiper element
          Object.assign(swiperEl, swiperParams);
        
          // and now initialize it
          swiperEl.initialize();
    }

    useEffect(()=>{
        initTestimonySlider()
    },[])

    return(
        <>
        <Section>
        <div className="flex h-[100vh] md:h-auto justify-center flex-col md:flex-row items-center">
            <div className="md:w-[50%]">
                <h1 className="text-5xl text-white font-bold md:leading-normal">
                    Online Event Ticketing with <span className="text-primary-orange">Uniticketeer</span>
                </h1>
                <p className='my-7 text-xl text-white font-medium'>
                    Tickets for All your favourite events,
                    <br></br>
                    Upload Events sell and buy tickets
                </p>
                <div className='md:w-[35%] text-[#6C0C49] hover:bg-transparent hover:text-primary-orange border-2 text-center font-medium py-2 bg-primary-orange rounded-full'>
                    <Link to={"/auth/signup"}>
                        Get Started
                    </Link>
                </div>
            </div>
            <div className='hidden md:block'>
                <img src={HeroImg} alt='Two tickets, orange and blue with no background' />
            </div>
        </div>

        <div className='flex flex-col md:flex-row justify-between items-center mt-4 mb-6 pt-4'>
            <div className='md:w-[40%] rounded-full'>
                <img src={OrganiseImg}  className='rounded-[44%] rotate-[-17deg]' alt='Orange and blue cartoon figures celebrating' />
            </div>
            <div className='md:w-[40%]'>
                <h2 className='text-5xl text-white font-bold md:leading-normal'>
                    Get <span className='text-primary-orange'>Organised</span> and get <span className='text-primary-orange'>Selling</span>
                </h2>
                <p className='my-7 text-xl text-white font-medium'>
                    We make ticketing and event management stress free, also manage and track your ticket sales online
                </p>
                <div className='md:w-[45%] text-[#6C0C49] hover:bg-transparent hover:text-primary-orange border-2 text-center font-medium py-2 bg-primary-orange rounded-full'>
                    <Link to={"/events"}>
                        See Events
                    </Link>
                </div>
            </div>
        </div>
        </Section>

        <div className='bg-primary-orange'>
        <Section>
            <div className='py-10 flex flex-col md:flex-row items-center'>
                <div className='md:w-[50%]'>
                    <h2 className='text-5xl text-black font-bold md:leading-normal'>
                        Secure <span className='text-secondary-text'>payments</span>, <span className='text-secondary-text'>Stress</span> free
                    </h2>
                    <p className='my-7 text-xl text-black font-medium md:w-[70%]'>
                        Our secure and fast payment systems protect you from financial conflicts, and our rates are budget friendly
                    </p>
                    <div className='md:w-[45%] text-primary-light hover:bg-transparent hover:text-primary-dark border-2 text-center font-medium py-2 bg-primary-dark rounded-full'>
                        <Link>
                            View Our Pricing
                        </Link>
                    </div>
                </div>
                <div className='hidden md:block'>
                    <img src={PaymentImg} alt='Three atm cards' />
                </div>
            </div>
        </Section>
        </div>

        <Section>
            <div className='py-10'>
                <h1 className='md:w-[45%] m-auto py-20 text-4xl text-white font-bold text-center'>
                    Here's What Our Customers Are Saying
                </h1>
                <div>
                    <swiper-container init="false" space-between='20'>
                        <swiper-slide>
                            <TestimonyTabs name={"Dj Hackangel"} title={"Disk Jockey"} testimony={""} />
                        </swiper-slide>
                        <swiper-slide>
                            <TestimonyTabs name={"Onwenu Money"} title={"User"} testimony={""} />
                        </swiper-slide>
                        <swiper-slide>
                            <TestimonyTabs name={"Laurenzoh"} title={"Event Planner"} testimony={""} />
                        </swiper-slide> 
                    </swiper-container>
                </div>
          
            </div>
        </Section>

        <Section>
            <div className='w-full bg-gradient-to-r from-[#6B12B6] to-[#B07949] pt-12 pb-5 my-4 rounded-xl'>
                <h1 className='w-[90%] md:w-[45%] text-white text-center text-4xl font-bold m-auto capitalize'>Go Get Yourself that ticket now</h1>
                <div className='w-[90%] md:w-[30%] bg-primary-dark mx-auto mt-12 p-4 text-center text-primary-light rounded-full text-xl font-bold'>
                    <Link to={"/auth/signup"}>
                        Get Started
                    </Link>
                </div>
            </div>
        </Section>
        </>
    )
}

function TestimonyTabs({name, title, testimony}){
    return(
        <div className='hidden first:block md:block w-full rounded-xl bg-[#6B12B6] p-5 mt-[50px] relative'>
            <img src={OrganiseImg} className='w-[100px] rounded-full absolute top-[-25%] contrast-50 left-[50%] -translate-x-[50%]' alt="user" />
            <div className='text-center mt-7'>
                <h3 className='text-white text-xl font-medium'> {name} </h3>
                <h4 className='font-medium text-primary-orange'>{title}</h4>
                <p className='text-white text-sm py-3'>
                    Ever since i started using uniticketeer, all my worries have vanished like a lorem ipsum dolor that i don't know
                </p>
            </div>
        </div>
    )
}