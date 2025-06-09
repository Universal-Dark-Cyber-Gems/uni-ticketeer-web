import React from "react"
import { IoClose } from "react-icons/io5"
import ReactModal from "react-modal"

export default function CustomModal({isOpen, showCloseBtn, shouldCloseOnOverlayClick, closeModal, children}){
    return(
        <ReactModal 
            isOpen={isOpen}
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick || true}
            onRequestClose={closeModal}
            style={{overlay: {zIndex: 100}, content: {width: '50%', margin: 'auto', borderRadius: 20, scrollbarWidth: 'none'}}}
        >
            <div>
                {showCloseBtn && <div className="absolute right-2 top-2 cursor-pointer" onClick={closeModal}> <IoClose size={20} /> </div>}
                {children}
            </div>
        </ReactModal>
    )
}