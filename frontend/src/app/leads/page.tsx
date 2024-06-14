'use client'
import React, { useState } from 'react';
import { LeadeData } from '../component/Type';
import EditLeade from '@/app/leads/EditLeade';
import LeadesPage from '@/app/leads/LeadesPage';
import { useAppDispatch } from '@/lib/store';
import { getUser } from '@/lib/features/auth/authSlice';

const Page = () => {
    const [leade, setLeade] = useState<LeadeData[] | null>(null);
    const [id, setID] = useState<number>(-1);
    const dispatch = useAppDispatch()


    const handelOnSet = (id: number, data: LeadeData[]) => {
        setID(id);
        setLeade(data);
        if (id !== -1) {
            dispatch(getUser())
        }
    };


    return (
        <>
            {id === -1 ? (
                <LeadesPage handelOnSet={handelOnSet} />
            ) : (
                <EditLeade handelOnSet={handelOnSet} leade={leade} />
            )}
        </>
    );
};

export default Page;
