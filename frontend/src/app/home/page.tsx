'use client'
import Image from 'next/image'
import React from 'react'
import Home from "../../assets/home.png"
import Person from "../../assets/person.svg"
import LineCharts from '../component/LineCharts'
import PieChart from '../component/PieChart'

const page = () => {
    return (
        <>
            <div className="bg-[#F4F6F9] h-full px-10 py-7">
                <div>
                    {/* <p className='text-sm font-bold'>Hey Mariana - <span className='font-normal'>here’s what’s happening with your store today</span></p> */}
                </div>
                <div className="flex gap-5 mt-7 mx-5 flex-wrap">
                    <div className='bg-white gap-5 h-24 w-64 rounded-2xl shadow flex items-center px-4 py-5'>
                        <Image src={Person} alt="Person" />
                        <div>
                            <p className="text-sm text-[#A8C6DF] font-medium">Today’s Leads</p>
                            <p className='text-2xl font-bold'>350</p>
                        </div>
                    </div>
                    <div className='bg-white gap-5 h-24 w-64 rounded-2xl shadow flex items-center px-4 py-5'>
                        <Image src={Person} alt="Person" />
                        <div>
                            <p className="text-sm text-[#A8C6DF] font-medium">Total Follow up Leads</p>
                            <p className='text-2xl font-bold'>642</p>
                        </div>
                    </div>
                    <div className='bg-white gap-5 h-24 w-64 rounded-2xl shadow flex items-center px-4 py-5'>
                        <Image src={Person} alt="Person" />
                        <div>
                            <p className="text-sm text-[#A8C6DF] font-medium">Opportunity Leads</p>
                            <p className='text-2xl font-bold'>350</p>
                        </div>
                    </div>
                    <div className='bg-white gap-5 h-24 w-64 rounded-2xl shadow flex items-center px-4 py-5'>
                        <Image src={Person} alt="Person" />
                        <div>
                            <p className="text-sm text-[#A8C6DF] font-medium">Warm Leads</p>
                            <p className='text-2xl font-bold'>100</p>
                        </div>
                    </div>
                    <div className='bg-white gap-5 h-24 w-64 rounded-2xl shadow flex items-center px-4 py-5'>
                        <Image src={Person} alt="Person" />
                        <div>
                            <p className="text-sm text-[#A8C6DF] font-medium">Attempted Leads</p>
                            <p className='text-2xl font-bold'>1000</p>
                        </div>
                    </div>
                    <div className='flex gap-7 w-full mt-8 flex-wrap xl:flex-nowrap'>
                        <LineCharts />
                        <PieChart />
                    </div>
                </div>
            </div>
        </>
    )
}

export default page
