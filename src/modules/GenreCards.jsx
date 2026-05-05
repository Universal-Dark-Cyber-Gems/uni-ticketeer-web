import { Images } from "../images";

export default function GenreCards({icon, text}){
    return(
        <div className='flex flex-col xl:flex-row w-[55.5px] md:w-auto items-center gap-2 text-[12px] md:text-[24px]'>
            <div 
                style={{
                    backgroundImage: `url(${Images.genreLanding})`,
                    backgroundSize: "cover"
                }}
                className='w-[55.5px] h-[70px] md:w-[111px] md:h-[140px] flex justify-center items-center'
            >
                {icon}
            </div>
            <div className='text-center text-primary-dark max-w-[157px]'>
                {text}
            </div>
        </div>
    )
}