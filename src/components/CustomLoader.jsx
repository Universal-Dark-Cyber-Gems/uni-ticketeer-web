export default function CustomLoader({size = 50}){
    let formatedSize = size.toString()+"px"
    
    return(
        <div className={`flex justify-center items-center`}>
            <div className={`animate-spin rounded-full h-[${formatedSize}] w-[${formatedSize}] border-t-2 border-b-2 border-t-primary-dark border-b-primary-orange`}></div>
        </div>
    )
}