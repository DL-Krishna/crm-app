'use client'
import React, { useEffect, useRef, useState } from 'react';
import Logo from "../../assets/digital_lync.png";
import Menu_Icon from "../../assets/menu.svg"
import Down_Icon from "../../assets/downarrow.svg"
import { SlBell } from 'react-icons/sl';
import { FaRegUserCircle } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { logout } from '@/assets/utils/auth.util';
import { navigation, useOnClickOutsideMultiple } from '@/api/CommonData';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { CreateLeadeStatus, CreateOpportunityStatus } from '@/lib/features/navbar/navbarSlice';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<Boolean>(false);
    const [isLogout, setIsLogout] = useState<Boolean>(false);
    const [isNotification, setIsNotification] = useState<Boolean>(false);
    const [filter, setFilter] = useState<string>('')
    const [isNavbar, setIsNavbar] = useState(navigation);
    const router = useRouter();
    const pathname = usePathname()
    const logoutbtn = useRef<HTMLDivElement>(null);
    const notificationbtn = useRef<HTMLDivElement>(null);
    const filterbtn = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (pathname !== "#") {
            const data = navigation?.map((item) => {
                if (item?.href === pathname) {
                    return { ...item, current: true }
                } else {
                    return { ...item, current: false }
                }
            })
            setIsNavbar(data)
        }
    }, [pathname])

    const handleClickOutside = () => {
        setIsLogout(false)
        setIsNotification(false)
        setFilter('');
    };

    useOnClickOutsideMultiple([logoutbtn, notificationbtn, filterbtn], handleClickOutside);


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handelOnTabChange = (name: String, href: String) => {
        if (href !== "#") {
            router.push(`${href}`)
            const data = navigation?.map((item) => {
                if (item?.name === name) {
                    return { ...item, current: true }
                } else {
                    return { ...item, current: false }
                }
            })
            setIsNavbar(data)
        }
    }

    const handelOnlogout = () => {
        logout()
        router.push('/')
    }

    const handelOnFilterData = (data: string) => {
        debugger
        if (data === 'Create Lead') {
            router.push('/leads')
            dispatch(CreateLeadeStatus(true))
        } else if (data === 'Create Opportunity') {
            router.push('/opportunities')
            dispatch(CreateOpportunityStatus(true))
        } else if (data === filter) {
            setFilter('');
        }
        setFilter('');
    }

    return (
        <nav className="sticky top-0 z-10 bg-white">
            <div className="mx-auto z-10 bg-white flex justify-between relative shadow-lg items-center py-2 lg:py-0 lg:pt-4 px-2 lg:px-6 md:pr-4">
                <div className="flex items-center">

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden ml-auto p-2 focus:outline-none"
                        onClick={toggleMenu}
                    >
                        <svg
                            className="w-6 h-6 text-gray-600"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16m-7 6h7" />
                            )}
                        </svg>
                    </button>

                    {/* Company Logo */}
                    <div /* className="pr-4 lg:pb-3" */ className="flex gap-3 lg:pb-1">
                        <Image className="h-14" src={Menu_Icon} alt="Menu Icon" />
                        <Image className="w-40 h-14" src={Logo} alt="Company Logo" />
                    </div>
                </div>

                {/* Icons */}
                <div className="flex gap-4 xl:gap-7" ref={filterbtn}>
                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex">
                        {isNavbar?.map((item) => (
                            <div
                                key={item.name}
                                className={classNames(
                                    item.current ? 'bg-sky-200 relative border-b-2 border-b-sky-600' : 'hover:border-b-2 hover:border-b-sky-600',
                                    'items-center relative text-black rounded-t pb-4 text-base font-normal cursor-pointer flex gap-2 px-2 py-1.5 mx-0 xl:mx-1 xl:py-3 xl:px-3 xl:gap-3 xl:text-lg '
                                )}
                                aria-current={item?.current ? 'page' : undefined}
                            >
                                <span onClick={() => handelOnTabChange(item?.name, item?.href)}>{item?.name}</span>
                                {item?.name !== "Home" && (
                                    <div className='w-full'>
                                        <Image src={Down_Icon} alt="down arrow" onClick={() => setFilter(item?.name)} />
                                        {item?.children && item?.name === filter && (
                                            <div className="z-40 top-12 xl:top-14 left-0 absolute w-full bg-white divide-y-4 divide-neutral-400 border border-neutral-400 shadow ">
                                                <ul className="text-sm cursor-pointer text-gray-700">
                                                    {item?.children?.map((childItem, index) => (
                                                        <li
                                                            key={index}
                                                            className={`border-b border-b-neutral-300 ${childItem?.name === filter && 'bg-neutral-200'}`}
                                                            onClick={() => handelOnFilterData(childItem?.name)}
                                                        >
                                                            <span className="block px-2 py-2 hover:bg-gray-100">{childItem?.name}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 px-2 lg:pb-3 lg:px-0 relative">
                        <div ref={notificationbtn}>
                            <SlBell size={25} onClick={() => setIsNotification(!isNotification)} className='cursor-pointer' />
                            {isNotification && <div className="absolute px-4 py-2 z-50 w-auto text-sm bg-white border border-gray-100 rounded-lg shadow-md top-9 right-1.5">
                                <h1 className='text-xl border-b-2'>Notifications</h1>
                                <div className="p-2 pb-0 text-gray-900 md:pb-4">
                                    <ul className="space-y-3" aria-labelledby="mega-menu-dropdown-button">
                                        {/* <li>
                                            <p className="text-gray-500 cursor-pointer">
                                                Add Contact
                                            </p>
                                        </li> */}


                                    </ul>
                                </div>
                            </div>}
                        </div>
                        <div ref={logoutbtn}>
                            <FaRegUserCircle size={25} onClick={() => setIsLogout(!isLogout)} className='cursor-pointer' />
                            {/* onClick={() => handelOnlogout()} */}
                            {isLogout && <div className="absolute z-50 w-auto text-sm bg-white border border-gray-100 rounded-lg shadow-md top-9 right-0.5">
                                <div className="p-4 pb-0 text-gray-900 md:pb-4">
                                    <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                                        <li>
                                            <p onClick={() => handelOnlogout()} className="text-gray-500 text-base cursor-pointer">
                                                Logout
                                            </p>
                                        </li>

                                    </ul>
                                </div>
                            </div>}
                        </div>

                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white py-2 px-6 w-full">
                    {isNavbar?.map((item) => (
                        <div
                            key={item.name}
                            //onClick={() => { handelOnTabChange(item?.name, item?.href); toggleMenu() }}
                            className={classNames(
                                item.current ? 'text-gray-900 ' : 'text-gray-600 hover:text-gray-900',
                                'flex justify-between w-full py-2 px-4 text-lg font-normal'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                        >
                            <div className="w-full">
                                <span onClick={() => { handelOnTabChange(item?.name, item?.href); toggleMenu() }}>{item.name}</span>
                                {/* {item?.children && item?.name === filter && (
                                    <div className="w-full bg-white divide-y-4 divide-neutral-400 border border-neutral-400 shadow" onClick={() => alert("test")}>
                                        <ul className="text-sm cursor-pointer text-gray-700">
                                            {item?.children?.map((childItem, index) => (
                                                <li
                                                    key={index}
                                                    className={`border-b w-full border-b-neutral-300 ${childItem?.name === filter && 'bg-neutral-200'}`}
                                                    onClick={() => handelOnFilterData(childItem?.name)}
                                                >
                                                    <span className="block px-2 py-2 hover:bg-gray-100">{childItem?.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )} */}
                            </div>
                            {/* {item?.name !== "Home" && (
                                <div className='grid justify-end'>
                                    <Image src={Down_Icon} alt="down arrow" onClick={() => setFilter(item?.name)} />
                                </div>
                            )} */}
                        </div>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;