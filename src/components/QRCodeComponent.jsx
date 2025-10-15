import QRCode from "react-qr-code"

export default function QRCodeComponent({link}){
    return(
        <div className="border-[1px] rounded-md md:w-[50%] m-auto border-primary-dark w-auto bg-white flex justify-center items-center p-2">
            <QRCode
                value={link || "https://emume.org"}
            />
        </div>
    )
}