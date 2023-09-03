export default function ProgressBar({total, sold}){
    let calcProgress = (sold * 100) / total
    let progress = calcProgress.toString() + "%"

    return(
        <div className="bg-primary-light rounded-full h-[10px] w-[100%]">
            <div style={{width: progress}} className={`bg-primary-orange rounded-full h-[100%]`}>
                <span className="ml-auto text-[10px] text-primary-dark">{progress}</span>
            </div>
        </div>
    )
}
