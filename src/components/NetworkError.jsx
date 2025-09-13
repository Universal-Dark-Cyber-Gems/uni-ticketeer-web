export default function NetworkError(){
    return(
        <div>
            <div className="md:w-[45%] m-auto pt-[30%] md:pt-[5%]">
                <a href="https://storyset.com/web">
                    <img src="/networkerror.svg" />
                </a>
                <p className="font-bold text-red-500 text-2xl text-center">
                    Network Error
                </p>
                <div onClick={()=> location.reload()} className="text-primary-dark font-medium cursor-pointer w-[100px] mt-4 m-auto p-2 border-[1px] text-center rounded-full border-primary-dark">
                    Try again
                </div>
            </div>
        </div>
    )
}