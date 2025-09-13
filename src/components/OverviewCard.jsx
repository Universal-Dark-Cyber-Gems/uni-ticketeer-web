import NairaSymbol from "./NairaSymbol";

export default function OverviewCard({title, amount, active, isCurrencyCard, setActive}){
    return(
        <div className={`${active === title && "bg-gradient-to-tl from-primary-dark to-purple-400"} border-[1px] border-primary-dark p-3 rounded-2xl shadow-xl`}>
            <p className={`text-center ${active === title && "text-primary-light"} text-primary-dark capitalize text-lg font-medium`}>{title}</p>
            <p className={`text-center ${active === title && "text-primary-light"} text-primary-dark text-lg font-medium`}>
               {isCurrencyCard && <NairaSymbol />} {amount}
            </p>
        </div>
    )
}