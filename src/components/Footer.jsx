import { Link } from "react-router-dom";
import Section from "./Section";

export default function Footer(){
    return(
        <>
        
        <Section>
            <div className="flex flex-col-reverse text-center md:text-left md:flex-row justify-between mt-24 mb-8 bg-primary-dark">
                <div className="w-full md:flex justify-around">
                <div>
                    <h2 className="text-white text-xl font-bold mb-4">Emume</h2>
                </div>
                <div>
                    <FooterHeaders title={'Main'} />
                    <ul>
                       <FooterNav title={"Home"} />
                       <FooterNav title={"Events"} />
                       <FooterNav title={"How it works"} />
                       <FooterNav title={"Privacy Policy"} />
                       <FooterNav title={"Terms & Conditions"} />
                    </ul>
                </div>
                <div>
                    <FooterHeaders title={"Affiliate"} />
                    <ul>
                        <FooterNav title={"Organizers"} />
                        <FooterNav title={"Place an advert"} />
                        <FooterNav title={"Sponsorship"} />
                    </ul>
                </div>
                <div>
                    <FooterHeaders title={"Contact Us"} />
                    <ul>
                        <FooterNav title={"Facebook"} />
                        <FooterNav title={"Twitter"} />
                        <FooterNav title={"Instagram"} />
                    </ul>
                </div>
                </div>
                <div className="mb-4">
                    <FooterHeaders title={"Get email notifications"} />
                    <div className="flex justify-between bg-[#6B12B6] rounded-full p-2 ">
                        <input type="email" placeholder="Email Address" className="pl-2 w-[70%] bg-transparent focus:border-0 focus:outline-0 text-white" />
                        <div className="w-20 text-center text-white font-medium p-1 bg-primary-orange hover:bg-[#6B12B6] rounded-full cursor-pointer transition-all ease-in-out duration-300 ">Submit</div>
                    </div>
                </div>
            </div>
        </Section>

        <div className="h-3 bg-gradient-to-r from-[#6B12B6] to-[#B07949] w-full">

        </div>
        </>
    )
}

function FooterHeaders({title}){
    return(
        <h4 className="text-white font-bold md:font-medium mb-2">{title}</h4>
    )
}

function FooterNav({title, link}){
    return(
        <li className="my-4 text-white hover:text-primary-orange"> <Link>{title}</Link></li>
    )
}