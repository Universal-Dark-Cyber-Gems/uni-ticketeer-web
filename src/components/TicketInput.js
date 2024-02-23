export default function TicketInput({type, placeholder, tagType, options, value, name, label, onChange }){
    return(
        <div className="w-full my-2">
            {label && <div className="text-left font-medium">{label}</div>}
            <div className="w-full border-2 border-primary-dark rounded-md bg-[#F7F7F7]">
                {tagType === "input" && <input type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} className="w-full bg-transparent placeholder:text-primary-dark outline-none p-[2px]" /> }
                {tagType === "number" && <input type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} className="w-full bg-transparent placeholder:text-primary-dark outline-none p-[2px]" />}
                {tagType === "textarea" && <textarea placeholder={placeholder} name={name} value={value} onChange={onChange} className="w-full outline-none p-2"></textarea>}
                {
                    tagType === "select"
                    &&
                    <select value={value} name={name} onChange={onChange} className="w-full">
                        <option>{placeholder}</option>
                        {options?.map((option, i)=> <option key={`option${i}`} value={option}>{option}</option>)}
                    </select>
            
                }               
            </div>
        </div>
    )
}