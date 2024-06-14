'use client'
import React, { useState } from 'react';
import { LeadeData } from '../component/Type';
import LearnerPage from './LearnerPage';
import EditLearner from './EditLearner';

const Page = () => {
    const [learner, setLearner] = useState<LeadeData[] | null>(null);
    const [id, setID] = useState<number>(-1);


    const handelOnSet = (id: number, data: LeadeData[]) => {
        setID(id);
        setLearner(data);
    };


    return (
        <>
            {id === -1 ? (
                <LearnerPage handelOnSet={handelOnSet} />
            ) : (
                <EditLearner handelOnSet={handelOnSet} learner={learner} />
            )}
        </>
    );
};

export default Page;
