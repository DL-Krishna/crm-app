'use client'
import React, { useMemo, useState } from 'react'
import Contact from "../../assets/employee_contact.svg"
import Image from 'next/image'
import OpportunitieDetail from './OpportunitieDetail';
import { LeadeData } from '@/app/component/Type';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { getSingleLead } from '@/lib/features/lead/leadSlice';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import Activity from '../leads/Activity';

const EditOpportunitiet = ({ handelOnSet, opportunity }: { opportunity?: any, handelOnSet: (id: number, data: LeadeData[]) => void }) => {
    const dispatch = useAppDispatch()
    const [activeTab, setActiveTab] = useState<String>('Details');
    const { SingleLead } = useAppSelector((state) => state?.lead)
    console.log("🚀 ~ EditOpportunitiet ~ SingleLead:", SingleLead)
    useMemo(() => {
        if (opportunity?.[0]?.id) {
            dispatch(getSingleLead(opportunity?.[0]?.id))
        }
    }, [opportunity?.[0]?.id])

    const handleTabChange = (tabName: String) => {
        setActiveTab(tabName);
    };
    return (
        <div className="w-[fit-content] lg:w-full">
            <div className="m-5 rounded-lg sborder-4 border-zinc-100 shadow-lg">
                <div className="flex gap-3 items-center px-5 py-2 border-b border-b-neutral-400">
                    <div onClick={() => handelOnSet(-1, [])} className="flex gap-1 cursor-pointer"><MdOutlineArrowBackIosNew size={25} /> Back</div>
                    <div className="flex gap-3 items-center">
                        <Image src={Contact} alt="Contact icon" />
                        <h2 className="text-black text-lg font-semibold">{SingleLead?.name}</h2>
                    </div>

                </div>
                <div className="py-2 px-14 flex flex-wrap justify-between">
                    <div className="min-w-48 mb-2">
                        <p className="text-black mb-1 text-base font-medium">Lead Source</p>
                        <span className="text-sky-600 text-sm font-semibold">{SingleLead?.leadSource}</span>
                    </div>
                    <div className="min-w-48 mb-2">
                        <p className="text-black mb-1 text-base font-medium">Phone</p>
                        <span className="text-sky-600 text-sm font-semibold">+{SingleLead?.countryCode + ' ' + SingleLead?.phone}</span>
                    </div>
                    <div className="min-w-48 mb-2">
                        <p className="text-black mb-1 text-base font-medium">Email</p>
                        <span className="text-sky-600 text-sm font-semibold">{SingleLead?.email}</span>
                    </div>
                    <div className="min-w-48 mb-2">
                        <p className="text-black mb-1 text-base font-medium">Status</p>
                        <span className="text-green-500 text-sm font-semibold ">Contacted</span>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-sm border-4 border-zinc-100 shadow-lg px-3 mx-5" >
                <div className="text-sm font-medium text-center text-gray-500 border-b border-neutral-400">
                    <ul className="flex flex-wrap -mb-px">
                        <li className="me-2">
                            <a href="#" onClick={() => handleTabChange('Details')} className={`inline-block p-4 border-b-2 rounded-t-lg text-sm font-semibold ${activeTab === 'Details' ? 'text-black border-blue-600' : 'hover:text-gray-600 hover:border-gray-300 text-neutral-500 border-transparent'}`}>
                                Details
                            </a>
                        </li>
                        <li className="me-2">
                            <a href="#" onClick={() => handleTabChange('Activity')} className={`inline-block p-4 border-b-2 rounded-t-lg text-sm font-semibold ${activeTab === 'Activity' ? 'text-black border-blue-600' : 'hover:text-gray-600 hover:border-gray-300 text-neutral-500 border-transparent'}`} aria-current="page">
                                Activity
                            </a>
                        </li>
                    </ul>
                </div>

                <div className='py-5'>
                    {activeTab === "Details" ? <OpportunitieDetail handelOnSet={handelOnSet} /> : activeTab === "Activity" ? <Activity /> : null}
                </div>
            </div>
        </div>

    )
}

export default EditOpportunitiet