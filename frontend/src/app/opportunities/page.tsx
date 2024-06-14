'use client'
import React, { useState } from 'react';
import { LeadeData } from '../component/Type';
import { useAppDispatch } from '@/lib/store';
import { getUser } from '@/lib/features/auth/authSlice';
import OpportunitiesPage from './OpportunitiesPage';
import EditOpportunitiet from './EditOpportunitiet';

const Page = () => {
    const [opportunity, setOpportunity] = useState<LeadeData[] | null>(null);
    const [id, setID] = useState<number>(-1);
    const dispatch = useAppDispatch()


    const handelOnSet = (id: number, data: LeadeData[]) => {
        setID(id);
        setOpportunity(data);
        if (id !== -1) {
            dispatch(getUser())
        }
    };


    return (
        <>
            {id === -1 ? (
                <OpportunitiesPage handelOnSet={handelOnSet} />
            ) : (
                <EditOpportunitiet handelOnSet={handelOnSet} opportunity={opportunity} />
            )}
        </>
    );
};

export default Page;
