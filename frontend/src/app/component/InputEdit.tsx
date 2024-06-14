import Image from 'next/image'
import React from 'react'
import Edit from "../../assets/Edit.svg"
import moment from 'moment';

const InputEdit = ({ lable, disable, type, name, value, onChange, handelOnStatus, error }: { lable: String, disable: Boolean, type: String, name: String, value: string, onChange?: (e: any) => void, handelOnStatus: (name: String, status: Boolean) => void, error?: string }) => {

    const handleKeyDown = (e: { key: string; preventDefault: () => void }) => {
        // Allow only numeric digits
        if (!/^\d$/.test(e.key) && e.key !== 'Backspace') {
            e.preventDefault();
        }
    };
    const handleTextKeyDown = (e: { key: string; preventDefault: () => void }) => {
        // Allow only numeric digits
        if (!/^[a-zA-Z\s]*$/.test(e.key) && e.key !== 'Backspace') {
            e.preventDefault();
        }
    };

    const handleDoubleClick = () => {
        handelOnStatus(name, false)
    };
    return (
        <div>
            <button className="h-11 w-full min-w-[200px]" >
                <label
                    className="font-medium text-base text-[#A8C6DF] flex gap-2">
                    {lable} {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
                </label>
                <div className="relative">
                    {disable && <button className="absolute w-full h-full" onDoubleClick={handleDoubleClick}></button>}
                    {disable && <Image src={Edit} alt="edit icon" onClick={() => handelOnStatus(name, false)} className='absolute right-1 cursor-pointer' />}
                    {type === 'date' ? <input placeholder={`${lable}`}
                        name={`${name}`}
                        value={`${value ? value : ""}`}
                        onChange={onChange}
                        onKeyDown={handleKeyDown}
                        min={moment(new Date()).format("YYYY-MM-DD")}
                        disabled={disable ? true : false}
                        type={`${type}`}
                        className="h-full text-lg w-full border-b border-[#0003] -mt-2 bg-transparent pt-4 pb-1.5 font-sans font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0" /> :
                        <input placeholder={`${lable}`}
                            name={`${name}`}
                            value={`${value ? value : ""}`}
                            onChange={onChange}
                            disabled={disable ? true : false}
                            onDoubleClick={handleDoubleClick}
                            onKeyDown={name === "phone" || name === 'phoneNumber' || name === 'countryCode' ? handleKeyDown : name === "name" ? handleTextKeyDown : undefined}
                            type={`${type}`}
                            className="h-full text-lg w-full border-b border-[#0003] -mt-2 bg-transparent pt-4 pb-1.5 font-sans font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0" />}
                </div>
            </button>
        </div>
    )
}

export default InputEdit