import { Link } from "react-router-dom";
import Section from "./Section";
import { HiChevronDown } from "react-icons/hi2";

export default function Footer(){
    return(
        <div className="relative bg-gradient-to-br from-primary-dark via-primary-dark via-90% to-primary-orange to-100% mt-8">
             {/* Ticket notch row at top */}
            {/* desktop */}
            <div className="absolute hidden top-0 left-0 right-0 md:flex justify-around pointer-events-none z-20">
            {Array.from({ length: 22 }).map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-[#FFFFFF] -translate-y-1/2" />
            ))}
            </div>
            {/* mobile notches */}
            <div className="absolute md:hidden top-0 left-0 right-0 flex justify-between pointer-events-none z-20">
            {Array.from({ length: 11 }).map((_, i) => (
                <div key={i} className="w-4 h-4 rounded-full bg-[#FFFFFF] -translate-y-1/2" />
            ))}
            </div>
            <Section>
                <div className="flex flex-col text-center md:text-left md:flex-row justify-between mt-8 mb-8">
                    <div className="w-full md:w-[60%] md:flex justify-between">
                        <div>
                            <img src="new-logo.png" alt="emume-logo" className=""/>
                        </div>
                        <div>
                            <FooterHeaders title={'Explore'} />
                            <ul>
                            <FooterNav title={"Discover"} />
                            <FooterNav title={"Categories"} />
                            <FooterNav title={"Upcoming"} />
                            <FooterNav title={"Completed Events"} />
                            <FooterNav title={"Live Events"} />
                            </ul>
                        </div>
                        <div>
                            <FooterHeaders title={"Company"} />
                            <ul>
                                <FooterNav title={"Organizers"} />
                                <FooterNav title={"Careers"} />
                                <FooterNav title={"Place an advert"} />
                                <FooterNav title={"About"} />
                                <FooterNav title={"Sponsorship"} />
                            </ul>
                        </div>
                        <div>
                            <FooterHeaders title={"Support"} />
                            <ul>
                                <FooterNav title={"Help Center"} />
                                <FooterNav title={"Contact"} />
                                <FooterNav title={"Privacy Policy"} />
                            </ul>
                        </div>
                    </div>
                    <div className="mb-4 md:w-[30%]">
                        <h5 className="text-white">Sign up for our newsletter</h5>
                        <p className="my-4 text-white text-[16px]">
                            Stay updated with upcoming events, events due date and be notified with all information
                        </p>
                        <div className="flex justify-between bg-[#6B12B6] rounded-full p-2 ">
                            <input type="email" placeholder="Email Address" className="pl-2 w-[70%] bg-transparent focus:border-0 focus:outline-0 text-white" />
                        </div>
                        <div className="w-full md:w-20 my-2 text-center text-white font-medium p-1 bg-primary-orange hover:bg-[#6B12B6] rounded-full cursor-pointer transition-all ease-in-out duration-300 ">Submit</div>
                    </div>
                </div>
            </Section>

            <div className="h-3 bg-gradient-to-r from-[#6B12B6] to-[#B07949] w-full" />
        </div>
    )
}

function FooterHeaders({title}){
    return(
        <div className="flex justify-between">
            <h4 className="text-white font-bold md:text-[20px] md:font-medium mb-2">{title}</h4>
            <HiChevronDown color="white" className="md:hidden" />
        </div>
    )
}

function FooterNav({title, link}){
    return(
        <li className="my-4 text-white font-regular md:text-[18] hover:text-primary-orange"> <Link>{title}</Link></li>
    )
}