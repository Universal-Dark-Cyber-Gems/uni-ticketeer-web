import { Images } from "../images";

export default function RibbonComponent(){
    return(
        <div className="relative w-full">
            <img src={Images.admitRibbon1} />
            <img src={Images.admitRibbon2} className="absolute top-0" />
        </div>
    )
}