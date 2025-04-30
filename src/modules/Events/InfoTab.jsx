
export function InfoTab({info, currentTab}){
    let active = info?.split(" ")[0].toLowerCase() === currentTab ? true : false
    return(
        <div className={`${active ? "bg-primary-dark" : "bg-[#F7F7F7]"} p-2 w-full mx-2 text-center text-primary-orange rounded-lg`}>
            {info}
        </div>
    )
}