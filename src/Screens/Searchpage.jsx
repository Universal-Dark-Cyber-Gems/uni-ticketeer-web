import { useSearchParams } from "react-router-dom"
import Section from "../components/Section"
import Header from "../components/Header"
import { Images } from "../images"
import SearchResultComponent from "../modules/SearchResultComponent"

export default function Searchpage(){
    let [searchParams] = useSearchParams()
    let query = searchParams.get("q")
    return(
        <>
            <div className='relative' style={{backgroundImage: `url(${Images.newHero})`, backgroundPosition: "center", backgroundSize: "cover"}}>
                <div className='bg-[#000]/70 py-4'>
                    <Section>
                        <Header />
                        <div className="md:w-[70%] m-auto py-4 my-2">
                            <p className='text-white text-center text-[28px] md:text-[80px] leading-[1.2]'>Search <span className='text-primary-orange'>Events</span> Around You</p>
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
                <SearchResultComponent />
            </Section>
        </>
    )
}