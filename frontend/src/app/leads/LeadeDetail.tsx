'use client'
import React, { useEffect, useState } from 'react'
import Edit from "../../assets/Edit.svg"
import Image from 'next/image'
import { LeadeDataView, HostItem, LeadeData, RowDataStatus, RowDataView } from '@/app/component/Type'
import JointBtn from '@/app/component/JointBtn'
import InputEdit from '../component/InputEdit'
import SingleSelece from '../component/SingleSelece'
import { BatchTiming, ClassMode, DateFormate, FilterLableAndValue, LeadSource, LeadStatus, TechStack } from '@/api/CommonData'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { getSingleLead, updateLeadData } from '@/lib/features/lead/leadSlice'
import { getUserID } from '@/assets/utils/auth.util'
import { getCourses } from '@/lib/features/courses/coursesSlice'
import MultiSelectDropdown from '../component/MultiSelectDropdown'

const LeadeDetail = ({ handelOnSet }: { handelOnSet: (id: number, data: LeadeData[]) => void }) => {
    const dispatch = useAppDispatch()
    const [disableData, setDisableData] = useState<RowDataStatus>(RowDataView)
    const [leadeData, setLeadeData] = useState<LeadeData>(LeadeDataView)
    const [error, setError] = useState<LeadeData>(LeadeDataView)
    const [changeContactData, setChangeContactData] = useState<LeadeData>(LeadeDataView)
    const [changeStatus, setChangeStatus] = useState<Boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { SingleLead } = useAppSelector((state) => state?.lead)
    const handelOnStatus = (name: String, value: Boolean) => {
        setDisableData({ ...RowDataView, [`${name}`]: value })
    }
    const { CoursesData } = useAppSelector((state) => state?.courses)

    const Courses: HostItem[] = CoursesData?.courses?.map((item: any) => { return { lable: item?.name, value: item?.id } })

    useEffect(() => {
        dispatch(getCourses())
    }, [])

    const handelOnChange = (e: any, name1?: any) => {
        if (name1 === 'courseId') {
            setLeadeData({ ...leadeData, [`${name1}`]: e })
            setError({ ...error, [`${name1}`]: '' })
        } else {
            const { name, value } = e.target;
            setLeadeData({ ...leadeData, [`${name}`]: value })
            setError({ ...error, [`${name}`]: '' })
        }
    }
    useEffect(() => {
        if (SingleLead) {
            handelonClear()
        }
    }, [SingleLead])


    useEffect(() => {
        if (leadeData) {
            const value = JSON.stringify(changeContactData) === JSON.stringify(leadeData)
            setChangeStatus(value)
        }
    }, [leadeData])


    const handelOnCancel = () => {
        setDisableData(RowDataView)
        setLeadeData(leadeData)
        handelOnSet(-1, [])
    }

    const handelonClear = () => {
        setLeadeData(SingleLead)
        setChangeContactData(SingleLead)
    }

    const vaidation = () => {
        let formValid = true;
        const regex = /^[\w-]+(\.[\w-]+)*@([a-z\d]+(-[a-z\d]+)*\.)+[a-z]{2,}$/i;
        const newError: any = {};

        if (!leadeData?.email?.trim()) {
            formValid = false
            newError["email"] = "Please enter email"
        } else if (!regex.test(leadeData?.email)) {
            formValid = false;
            newError["email"] = "Please enter a valid email address";
        }
        if (!leadeData?.name?.trim()) {
            formValid = false
            newError["name"] = "Please enter name"
        }
        if (!leadeData?.countryCode?.trim()) {
            formValid = false
            newError["countryCode"] = "Please enter cc"
        } else if (leadeData?.countryCode?.length > 4) {
            formValid = false
            newError["countryCode"] = "Please enter maximum 4 digit cc"
        }
        if (!leadeData?.phone?.trim()) {
            formValid = false
            newError["phone"] = "Please enter phone number"
        } else if (!(leadeData?.phone?.length === 10)) {
            formValid = false
            newError["phone"] = "Please enter valid phone number"
        }

        {/*
         if (!leadeData?.leadSource?.trim()) {
            formValid = false
            newError["leadSource"] = "Please select lead source"
        }
        if (!leadeData?.techStack?.trim()) {
            formValid = false
            newError["techStack"] = "Please select tech stack"
        }
        if (!(leadeData?.courseId?.length > 0)) {
            formValid = false
            newError["courseId"] = "Please select course"
        }
        if (!leadeData?.feeQuoted) {
            formValid = false
            newError["feeQuoted"] = "Please enter fee quoted"
        }
        if (!leadeData?.classMode) {
            formValid = false
            newError["classMode"] = "Please select classMode"
        }
        if (!leadeData?.batchTiming) {
            formValid = false
            newError["batchTiming"] = "Please select batch timimng"
        }
        if (!leadeData?.description?.trim()) {
            formValid = false
            newError["description"] = "Please enter description"
        }
        if (!leadeData?.leadStatus) {
            formValid = false
            newError["leadStatus"] = "Please select lead status"
        }
        if (!leadeData?.nextFollowUp) {
            formValid = false
            newError["nextFollowUp"] = "Please select next followUp"
        }
        */}

        setError(newError);
        return formValid;
    };


    const handelOnSave = () => {
        if (vaidation()) {
            setIsLoading(true);
            const data = {
                name: leadeData?.name,
                leadSource: leadeData?.leadSource,
                techStack: leadeData?.techStack,
                countryCode: leadeData?.countryCode,
                phone: leadeData?.phone,
                courseId: leadeData?.courseId,
                email: leadeData?.email,
                classMode: leadeData?.classMode,
                feeQuoted: leadeData?.feeQuoted,
                batchTiming: leadeData?.batchTiming,
                leadStatus: leadeData?.leadStatus,
                description: leadeData?.description,
                nextFollowUp: leadeData?.nextFollowUp,
                userId: getUserID()
            }
            dispatch(updateLeadData({ id: SingleLead?.id, data: data })).unwrap()
                .then((res: any) => {
                    if (res) {
                        toast.success(res?.message ? res?.message : "Leade Update Successfully");
                        setError(LeadeDataView)
                        handelOnCancel()
                        dispatch(getSingleLead(SingleLead?.id))
                    }
                })
                .catch((err: any) => {
                    const error = JSON.parse(err?.message)
                    toast.error(error?.message ? error?.message : "Something went wrong");
                }).finally(() => {
                    setIsLoading(false);
                })
        }
    }


    return (
        <>
            <div>
                <div className="p-4 md:p-5">
                    <div className="grid gap-10 mb-8 md:grid-cols-2">
                        <InputEdit lable="Name" disable={disableData?.name} name="name" error={error?.name} type="text" value={leadeData?.name} onChange={handelOnChange} handelOnStatus={handelOnStatus} />
                        {disableData?.leadStatus ? <InputEdit lable="Lead Status" disable={disableData?.leadStatus} name="leadStatus" error={error?.leadStatus} type="text" value={leadeData?.leadStatus ? FilterLableAndValue(LeadStatus)?.filter((item) => item?.value === leadeData?.leadStatus)?.[0]?.lable : ''} onChange={handelOnChange} handelOnStatus={handelOnStatus} />
                            : <SingleSelece onChange={handelOnChange} value={leadeData?.leadStatus} error={error?.leadStatus} name="leadStatus" lableValue="Lead Status" data={FilterLableAndValue(LeadStatus)} />}


                        <InputEdit lable="CC" disable={disableData?.countryCode} name="countryCode" error={error?.countryCode} type="text" value={leadeData?.countryCode} onChange={handelOnChange} handelOnStatus={handelOnStatus} />
                        {disableData?.leadSource ? <InputEdit lable="Lead Source" disable={disableData?.leadSource} name="leadSource" error={error?.leadSource} type="text" value={leadeData?.leadSource ? FilterLableAndValue(LeadSource)?.filter((item) => item?.value === leadeData?.leadSource)?.[0]?.lable : ''} onChange={handelOnChange} handelOnStatus={handelOnStatus} />
                            : <SingleSelece onChange={handelOnChange} value={leadeData?.leadSource} error={error?.leadSource} name="leadSource" lableValue="Lead Source" data={FilterLableAndValue(LeadSource)} />}

                        <InputEdit lable="Phone" disable={disableData?.phone} name="phone" error={error?.phone} type="text" value={leadeData?.phone} onChange={handelOnChange} handelOnStatus={handelOnStatus} />
                        {disableData?.techStack ? <InputEdit lable="Tech Stack" disable={disableData?.techStack} name="techStack" error={error?.techStack} type="text" value={leadeData?.techStack ? FilterLableAndValue(TechStack)?.filter((item) => item?.value === leadeData?.techStack)?.[0]?.lable : ''} onChange={handelOnChange} handelOnStatus={handelOnStatus} />
                            : <SingleSelece onChange={handelOnChange} value={leadeData?.techStack} error={error?.techStack} name="techStack" lableValue="Tech Stack" data={FilterLableAndValue(TechStack)} />}

                        <InputEdit lable="Email" disable={disableData?.email} name="email" error={error?.email} type="email" value={leadeData?.email} onChange={handelOnChange} handelOnStatus={handelOnStatus} />
                        {disableData?.courseId ? <InputEdit lable="Course" disable={disableData?.courseId} name="courseId" error={error?.courseId} type="text" value={leadeData?.courseId ? Courses?.filter((item) => item?.value === leadeData?.courseId)?.[0]?.lable : ''} onChange={handelOnChange} handelOnStatus={handelOnStatus} />
                            :
                            <MultiSelectDropdown onChange={(e) => handelOnChange(e, 'courseId')} value={leadeData?.courseId} error={error?.courseId} name="courseId" lableValue="Course" data={Courses} />
                        }

                        <InputEdit lable="Fee Quoted" disable={disableData?.feeQuoted} name="feeQuoted" error={error?.feeQuoted} type="number" value={leadeData?.feeQuoted} onChange={handelOnChange} handelOnStatus={handelOnStatus} />
                        {disableData?.classMode ? <InputEdit lable="Class Mode" disable={disableData?.classMode} name="classMode" error={error?.classMode} type="text" value={leadeData?.classMode ? FilterLableAndValue(ClassMode)?.filter((item) => item?.value === leadeData?.classMode)?.[0]?.lable : ''} onChange={handelOnChange} handelOnStatus={handelOnStatus} />
                            : <SingleSelece onChange={handelOnChange} value={leadeData?.classMode} error={error?.classMode} name="classMode" lableValue="Class Mode" data={FilterLableAndValue(ClassMode)} />}


                        {disableData?.batchTiming ? <InputEdit lable="Batch Timing" disable={disableData?.batchTiming} name="batchTiming" error={error?.batchTiming} type="text" value={leadeData?.batchTiming ? FilterLableAndValue(BatchTiming)?.filter((item) => item?.value === leadeData?.batchTiming)?.[0]?.lable : ''} onChange={handelOnChange} handelOnStatus={handelOnStatus} />
                            : <SingleSelece onChange={handelOnChange} value={leadeData?.batchTiming} error={error?.batchTiming} name="batchTiming" lableValue="Batch Timing" data={FilterLableAndValue(BatchTiming)} />}

                        <InputEdit lable="Next FollowUp" disable={disableData?.nextFollowUp} name="nextFollowUp" error={error?.nextFollowUp} type="date" value={DateFormate(leadeData?.nextFollowUp)} onChange={handelOnChange} handelOnStatus={handelOnStatus} />

                    </div>
                    <InputEdit lable="Description" disable={disableData?.description} name="description" error={error?.description} type="text" value={leadeData?.description} onChange={handelOnChange} handelOnStatus={handelOnStatus} />
                </div>
                <div className="flex items-center gap-2 justify-center h-32 py-14  mt-7">
                    {!changeStatus && <JointBtn button1="Cancel" button2="Save" onClick1={handelonClear} isLoading={isLoading} onClick2={handelOnSave} />}
                </div>
            </div >
        </>
    )
}

export default LeadeDetail