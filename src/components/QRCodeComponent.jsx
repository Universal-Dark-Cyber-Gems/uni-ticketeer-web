import QRCode from "react-qr-code"

export default function QRCodeComponent({link}){
    return(
        <div className="rounded-md md:w-[50%] m-auto w-auto flex justify-center items-center">
            <QRCode
                value={link || "https://emume.org"}
            />
        </div>
    )
}