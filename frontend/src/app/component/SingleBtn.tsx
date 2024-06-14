import React from 'react'
import Loader from './Loader'

const SingleBtn = ({ name, onClick, color, bgcolor, disable = false, loader = false }: { name: string, onClick?: () => void, color?: string, bgcolor?: String, disable?: Boolean, loader?: boolean }) => {
    return (
        <div>

            <button
                onClick={onClick}
                type="button"
                disabled={disable || loader ? true : false}
                className={`h-8 px-3 text-base font-normal focus:outline-none rounded border ${disable ? "border-neutral-500 text-neutral-500" : color === "red" ? "text-red-600 border-red-600" : color === "sky" ? "border-sky-600 text-sky-600" : ""} ${bgcolor === "sky" ? "border-sky-600 bg-sky-600 text-white" : "bg-white hover:bg-gray-100"}`}
            >
                {loader ? <Loader label={name} size={4} color={color} /> : name}
            </button>
        </div>
    )
}

export default SingleBtn