'use client'
import React, { useState } from 'react';
import { OpportunitiyData } from '../component/Type';
import CoursesPage from './CoursesPage';

const Page = () => {
    const [courses, setCourses] = useState<OpportunitiyData[] | null>(null);
    const [id, setID] = useState<number>(-1);


    const handelOnSet = (id: number, data: OpportunitiyData[]) => {
        setID(id);
        setCourses(data);
    };


    return (
        <>
            {/* {id === -1 ? ( */}
            <CoursesPage handelOnSet={handelOnSet} />
            {/* ) : (
               <EditLearner handelOnSet={handelOnSet} learner={learner} />
            )} */}
        </>
    );
};

export default Page;
