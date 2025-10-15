export default function TicketInput({type, required=false, list, placeholder, tagType="input", options, value, name, label, onChange, min, ...props }){
    return(
        <div className="w-full my-2">
            {label && <div className="text-left font-medium">{label} {required && "*"}</div>}
            <div className="w-full border-2 border-primary-dark rounded-md bg-[#F7F7F7]">
                {tagType === "input" && <input type={type} disabled={props.disabled} placeholder={placeholder} name={name} required={required} value={value} onChange={onChange} min={min} className="w-full bg-transparent placeholder:text-primary-dark outline-none p-[2px]" {...props} /> }
                {tagType === "textarea" && <textarea placeholder={placeholder} disabled={props.disabled} name={name} value={value} required={required} onChange={onChange} className="w-full outline-none p-2" {...props}></textarea>}
                {
                    tagType === "select"
                    &&
                    <select value={value} autoComplete="on" name={name} onChange={onChange} className="w-full">
                        <option>{placeholder}</option>
                        {options?.map((option, i)=> {
                            return typeof option === "string" 
                            ?
                            <option key={`option${i}`} value={option}>{option}</option>
                            :
                            <option key={`option${i}`} value={option.value}>{option.label}</option>
                        })}
                    </select>
                }             
            </div>
        </div>
    )
}