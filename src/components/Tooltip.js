export default function Tooltip({text}){
    return(
        <div className='absolute hidden group-hover:block bg-white text-sm border-[1px] border-primary-dark p-[2px] bottom-0 left-12 rounded-md'>{text}</div>
    )
}