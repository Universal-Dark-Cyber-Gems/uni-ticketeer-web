import { Link } from 'react-router-dom'
import HeroImg from '../images/Hero-image.png'
import OrganiseImg from '../images/Organise-image.jpg'
import Section from '../components/Section'
import PaymentImg from '../images/Payment-image.png'
import { useEffect} from 'react'
import Header from '../components/Header'
import Footer from "../components/Footer"
import GlassSearchBar from '../modules/GlassSearchBar'
import { Images } from '../images'
import NewEventCard from '../components/NewEventCard'
import { Swiper, SwiperSlide } from "swiper/react"


import { TbMicrophone2 } from 'react-icons/tb'
import { MdOutlineFastfood, MdPalette } from 'react-icons/md'
import { PiHandsPrayingFill } from 'react-icons/pi'
import { BiParty } from 'react-icons/bi'
import { RiBriefcase4Line } from 'react-icons/ri'
import GenreCards from '../modules/GenreCards'
import RibbonComponent from '../modules/RibbonComponent'
import CustomSliderContainer from '../components/CustomSliderContainer'
import TrendingEventComponent from '../modules/TrendingEventComponent'

const genreList = [
    {
        icon: <TbMicrophone2 className='text-primary-orange' size={25} />,
        text: "Music Concert"
    },
    {
        icon: <MdOutlineFastfood className='text-primary-orange' size={25} />,
        text: "Food and Recreation"
    },
    {
        icon: <MdPalette className='text-primary-orange' size={25} />,
        text: "Art and Culture"
    },
    {
        icon: <PiHandsPrayingFill className='text-primary-orange' size={25} />,
        text: "Spirituality and Religion"
    },
    {
        icon: <BiParty className='text-primary-orange' size={25} />,
        text: "Party and Nightlife"
    },
    {
        icon: <RiBriefcase4Line className='text-primary-orange' size={25} />,
        text: "Business and Career"
    }
]


export default function Home(){

    return(
        <>
        <div className='relative' style={{backgroundImage: `url(${Images.newHero})`, backgroundPosition: "center", backgroundSize: "cover"}}>
            <div className='bg-[#000]/60 py-4'>
                <Section>
                    <Header />
                    <div className="md:w-[70%] m-auto py-4 my-2">
                        <p className='text-white text-center text-[28px] md:text-[80px] leading-[1.2]'>Discover Unforgettable <span className='text-primary-orange'>Events</span> Around You</p>
                        <p className='text-center text-white tex-[14px] md:text-[20px]'>
                            Explore handpicked events nearby, from chill hangouts to all‑night festivals. Lock in tickets fast and manage every outing without the group‑chat chaos.
                        </p>
                        <div className='flex justify-center my-8'>
                            <GlassSearchBar />
                        </div>
                        <div className='flex justify-between md:w-[40%] md:m-auto my-4 py-2'>
                            <Link to={"/events"}>
                                <div className='bg-primary-dark py-2 px-4 rounded-3xl text-primary-orange'>
                                    Browse Events
                                </div>
                            </Link>
                            <Link to={"/auth/signup"}>
                                <div className='bg-primary-orange py-2 px-4 rounded-3xl text-primary-dark'>
                                    Sell your Events
                                </div>
                            </Link>
                        </div>
                    </div>
                </Section>
            </div>
            {/* Ticket notch row at bottom */}
            {/* desktop */}
            <div className="absolute hidden bottom-0 left-0 right-0 md:flex justify-around pointer-events-none">
            {Array.from({ length: 22 }).map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-[#FFFFFF] translate-y-1/2" />
            ))}
            </div>
            {/* mobile notches */}
            <div className="absolute md:hidden bottom-0 left-0 right-0 flex justify-between pointer-events-none">
            {Array.from({ length: 11 }).map((_, i) => (
                <div key={i} className="w-4 h-4 rounded-full bg-[#FFFFFF] translate-y-1/2" />
            ))}
            </div>
        </div>
        <Section>
            <div className='flex justify-end'>
                <img src={Images.trending} />
            </div>
            <div>
                <h2 className='mb-4 text-center text-primary-orange text-[28px] md:text-[50px] font-bold'><span className='text-primary-dark'>Trending</span> This Week</h2>
                <TrendingEventComponent />
            </div>
        </Section>
        <div className='my-6'>
            <RibbonComponent />
            <Section>
                <div className='flex flex-col justify-center items-center mb-6'>
                    <h2 className='text-primary-dark text-center text-[28px] lg:text-[53px] font-bold mb-6'>We Cover all <span className='text-primary-orange'>Events Genre</span></h2>
                    <div className='grid place-items-center gap-5 grid-cols-3 grid-rows-2 w-full xl:w-[70%]'>
                        {
                            genreList.map((item, i)=>(
                                <GenreCards icon={item.icon} text={item.text} />
                            ))
                        }
                    </div>
                </div>
                
            </Section>
            <RibbonComponent />
        </div>
        <Section>
        <div className='flex flex-col md:flex-row gap-5 items-center mt-4 mb-6 pt-4'>
            <div className='md:w-[40%] rounded-full'>
                <img src={Images.organiserImg2}  className='w-full' alt='Orange and blue cartoon figures celebrating' />
            </div>
            <div className='md:w-[45%] text-center md:text-left'>
                <h2 className='md:text-[50px] text-[28px] text-primary-dark font-bold md:leading-normal'>
                    Get <span className='text-primary-orange'>Organised</span> and get <span className='text-primary-orange'>Selling</span>
                </h2>
                <p className='my-7 text-[14px] md:text-[28px] text-primary-dark font-medium'>
                    We make ticketing and event management stress free, also manage and track your ticket sales online with updated analytics
                </p>
                <div className='md:w-[45%] text-[#6C0C49] hover:bg-transparent hover:text-primary-orange border-2 text-center font-medium py-2 bg-primary-orange rounded-full cursor-pointer transition-all duration-300 ease-in-out'>
                    <Link to={"/events"}>
                        Create Event
                    </Link>
                </div>
            </div>
        </div>
        </Section>

        {/* <div className='bg-primary-orange'>
        <Section>
            <div className='py-10 flex flex-col md:flex-row items-center'>
                <div className='md:w-[50%]'>
                    <h2 className='text-5xl text-black font-bold md:leading-normal'>
                        Secure <span className='text-secondary-text'>payments</span>, <span className='text-secondary-text'>Stress</span> free
                    </h2>
                    <p className='my-7 text-xl text-black font-medium md:w-[70%]'>
                        Our secure and fast payment systems protect you from financial conflicts, and our rates are budget friendly
                    </p>
                    <div className='md:w-[45%] text-primary-light hover:bg-transparent hover:text-primary-dark border-2 text-center font-medium py-2 bg-primary-dark rounded-full cursor-pointer transition-all ease-in-out duration-300'>
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
        </div> */}

        {/* <Section>
            <div className='py-10'>
                <h1 className='md:w-[45%] m-auto py-20 text-4xl text-primary-dark font-bold text-center'>
                    Here's What Our Customers Are Saying
                </h1>
                <div>
                    <Swiper spaceBetween={20}>
                        <SwiperSlide>
                            <TestimonyTabs name={"Dj Hackangel"} title={"Disk Jockey"} testimony={""} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <TestimonyTabs name={"Onwenu Money"} title={"User"} testimony={""} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <TestimonyTabs name={"Onwenu Money"} title={"User"} testimony={""} />
                        </SwiperSlide>
                    </Swiper>
                </div>
          
            </div>
        </Section> */}

        <Section>
            <h2 className='text-center text-[28px] lg:text-[50px] font-bold text-primary-dark my-8'>
                Why Choose <span className='text-primary-orange'>Us</span>
            </h2>
            <div className='flex my-8 flex-col md:flex-row md:justify-between gap-5'>
                <div className='text-primary-dark flex flex-col items-center gap-2 w-full md:w-[30%]'>
                    <img src={Images.chooseus1} />
                    <h3 className='text-[24px] md:text-[36px] text-center'>Secure Payments</h3>
                    <p className='text-[16px] md:text-[20px] text-center'>
                        Our secure and fast payment systems protect you from any financial conflict, and our rates are budget friendly 
                    </p>
                </div>
                <div className='text-primary-dark flex flex-col items-center gap-2 w-full md:w-[30%]'>
                    <img src={Images.chooseus2} />
                    <h3 className='text-[24px] md:text-[36px] text-center'>24/7 Support</h3>
                    <p className='text-[16px] md:text-[20px] text-center'>
                       Our ticketing platform offers true 24/7 customer support with real agents available every second of the year via life chat, toll-free phone, WhatApp, email and social media DMs.
                    </p>
                </div>
                <div className='text-primary-dark flex flex-col items-center gap-2 w-full md:w-[30%]'>
                    <img src={Images.chooseus3} />
                    <h3 className='text-[24px] md:text-[36px] text-center'>Hassle-free Experience</h3>
                    <p className='text-[16px] md:text-[20px] text-center'>
                        Easy transfers, digital wallets entry, Real-time seat maps, instant delivery, last-minute tickets, buy anytime, anywhere in seconds and exclusive presales.
                    </p>
                </div>
            </div>
            <div className='flex justify-center'>
                <img src={Images.getTicket} />
            </div>
        </Section>

        {/* <Section>
            <div className='w-full bg-gradient-to-r from-[#6B12B6] to-[#B07949] pt-12 pb-5 my-4 rounded-xl'>
                <h1 className='w-[90%] md:w-[45%] text-white text-center text-4xl font-bold m-auto capitalize'>Go Get Yourself that ticket now</h1>
                <div className='w-[90%] md:w-[30%] bg-primary-dark mx-auto mt-12 p-4 text-center text-primary-light rounded-full text-xl font-bold hover:bg-[#b07949] cursor-pointer transition-all ease-in-out duration-300'>
                    <Link to={"/auth/signup"}>
                        Get Started
                    </Link>
                </div>
            </div>
        </Section> */}
        <Footer />
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
                    Ever since i started using emume, all my worries have vanished like a lorem ipsum dolor that i don't know
                </p>
            </div>
        </div>
    )
}
