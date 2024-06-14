'use client'
import React, { useEffect, useState } from 'react'
import { LearnerDataView, HostItem, LearnerData, LearnerDisableData, LearnerDisableDataView, LeadeData } from '@/app/component/Type'
import JointBtn from '@/app/component/JointBtn'
import InputEdit from '../component/InputEdit'
import SingleSelece from '../component/SingleSelece'
import { ClassMode, DemoAttendedStage, FilterLableAndValue, LeadSource, TechStack } from '@/api/CommonData'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { getSingleLead, updateLeadData } from '@/lib/features/lead/leadSlice'
import { getUserID } from '@/assets/utils/auth.util'
import { getCourses } from '@/lib/features/courses/coursesSlice'

const LearnerDetail = ({ handelOnSet }: { handelOnSet: (id: number, data: LeadeData[]) => void }) => {
    const dispatch = useAppDispatch()
    const [disableData, setDisableData] = useState<LearnerDisableData>(LearnerDisableDataView)
    const [learnerData, setLearnerData] = useState<LearnerData>(LearnerDataView)
    const [error, setError] = useState<LearnerData>(LearnerDataView)
    const [changeContactData, setChangeContactData] = useState<LearnerData>(LearnerDataView)
    const [changeStatus, setChangeStatus] = useState<Boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { SingleLead } = useAppSelector((state) => state?.lead)
    const handelOnStatus = (name: String, value: Boolean) => {
        setDisableData({ ...LearnerDisableDataView, [`${name}`]: value })
    }
    const { CoursesData } = useAppSelector((state) => state?.courses)

    const Courses: HostItem[] = CoursesData?.courses?.map((item: any) => { return { lable: item?.name, value: item?.id } })

    useEffect(() => {
        dispatch(getCourses())
    }, [])

    const handelOnChange = (e: { target: { name: String; value: String } }) => {
        const { name, value } = e.target;
        setLearnerData({ ...learnerData, [`${name}`]: value })
        setError({ ...error, [`${name}`]: '' })
    }
    useEffect(() => {
        if (SingleLead) {
            handelonClear()
        }
    }, [SingleLead])


    useEffect(() => {
        if (learnerData) {
            const value = JSON.stringify(changeContactData) === JSON.stringify(learnerData)
            setChangeStatus(value)
        }
    }, [learnerData])


    const handelOnCancel = () => {
        setDisableData(LearnerDisableDataView)
        setLearnerData(learnerData)
        handelOnSet(-1, [])
    }

    const handelonClear = () => {
        setLearnerData(SingleLead)
        setChangeContactData(SingleLead)
    }

    const vaidation = () => {
        let formValid = true;
        const regex = /^[\w-]+(\.[\w-]+)*@([a-z\d]+(-[a-z\d]+)*\.)+[a-z]{2,}$/i;
        const newError: any = {};

        if (!learnerData?.email?.trim()) {
            formValid = false
            newError["email"] = "Please enter email"
        } else if (!regex.test(learnerData?.email)) {
            formValid = false;
            newError["email"] = "Please enter a valid email address";
        }
        if (!learnerData?.fullName?.trim()) {
            formValid = false
            newError["fullName"] = "Please enter full name"
        }
        if (!learnerData?.phone?.trim()) {
            formValid = false
            newError["phone"] = "Please enter phone number"
        } else if (!(learnerData?.phone?.length === 10)) {
            formValid = false
            newError["phone"] = "Please enter valid phone number"
        }
        if (!learnerData?.dateofBirth?.trim()) {
            formValid = false
            newError["dateofBirth"] = "Please select date of birth"
        }
        if (!learnerData?.techstack?.trim()) {
            formValid = false
            newError["techstack"] = "Please select tech stack"
        }
        if (!learnerData?.courseDetails?.trim()) {
            formValid = false
            newError["courseDetails"] = "Please select course details"
        }
        if (!learnerData?.source?.trim()) {
            formValid = false
            newError["source"] = "Please select source"
        }
        if (!learnerData?.registeredDate?.trim()) {
            formValid = false
            newError["registeredDate"] = "Please select registered date"
        }
        if (!learnerData?.attendedDemo?.trim()) {
            formValid = false
            newError["attendedDemo"] = "Please select attended demo"
        }
        if (!learnerData?.modeofClass?.trim()) {
            formValid = false
            newError["modeofClass"] = "Please select mode of class"
        }

        setError(newError);
        return formValid;
    };


    const handelOnSave = () => {
        if (vaidation()) {
            setIsLoading(true);
            const data = {

                userId: getUserID()
            }
            dispatch(updateLeadData({ id: SingleLead?.id, data: data })).unwrap()
                .then((res: any) => {
                    if (res) {
                        toast.success(res?.message ? res?.message : "Leade Update Successfully");
                        setError(LearnerDataView)
                        handelOnCancel()
                        dispatch(getSingleLead(SingleLead?.id))
                    }
                })
                .catch((err: any) => {
                    toast.error(err?.message ? err?.message : "Something went wrong");
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
                        <InputEdit lable="Full Name" disable={disableData?.fullName} name="fullName" error={error?.fullName} type="text" value={learnerData?.fullName} onChange={handelOnChange} handelOnStatus={handelOnStatus} />
                        <InputEdit lable="Date of Birth" disable={disableData?.dateofBirth} name="dateofBirth" error={error?.dateofBirth} type="date" value={learnerData?.dateofBirth} onChange={handelOnChange} handelOnStatus={handelOnStatus} />

                        <InputEdit lable="Phone" disable={disableData?.phone} name="phone" error={error?.phone} type="text" value={learnerData?.phone} onChange={handelOnChange} handelOnStatus={handelOnStatus} />
                        <InputEdit lable="Email" disable={disableData?.email} name="email" error={error?.email} type="text" value={learnerData?.email} onChange={handelOnChange} handelOnStatus={handelOnStatus} />


                        {disableData?.techstack ? <InputEdit lable="Techstack" disable={disableData?.techstack} name="techstack" error={error?.techstack} type="text" value={learnerData?.techstack ? FilterLableAndValue(TechStack)?.filter((item) => item?.value === learnerData?.techstack)?.[0]?.lable : ''} onChange={handelOnChange} handelOnStatus={handelOnStatus} />
                            : <SingleSelece onChange={handelOnChange} value={learnerData?.techstack} error={error?.techstack} name="techstack" lableValue="Techstack" data={FilterLableAndValue(TechStack)} />}
                        {disableData?.courseDetails ? <InputEdit lable="Course Details" disable={disableData?.courseDetails} name="courseDetails" error={error?.courseDetails} type="text" value={learnerData?.courseDetails ? Courses?.filter((item) => item?.value === learnerData?.courseDetails)?.[0]?.lable : ''} onChange={handelOnChange} handelOnStatus={handelOnStatus} />
                            : <SingleSelece onChange={handelOnChange} value={learnerData?.courseDetails} error={error?.courseDetails} name="courseDetails" lableValue="Course Details" data={Courses} />}

                        {disableData?.source ? <InputEdit lable="Source" disable={disableData?.source} name="source" error={error?.source} type="text" value={learnerData?.source ? FilterLableAndValue(LeadSource)?.filter((item) => item?.value === learnerData?.source)?.[0]?.lable : ''} onChange={handelOnChange} handelOnStatus={handelOnStatus} />
                            : <SingleSelece onChange={handelOnChange} value={learnerData?.source} error={error?.source} name="source" lableValue="Source" data={FilterLableAndValue(LeadSource)} />}
                        <InputEdit lable="Registered Date" disable={disableData?.registeredDate} name="registeredDate" error={error?.registeredDate} type="date" value={learnerData?.registeredDate} onChange={handelOnChange} handelOnStatus={handelOnStatus} />

                        {disableData?.attendedDemo ? <InputEdit lable="Attended Demo" disable={disableData?.attendedDemo} name="attendedDemo" error={error?.attendedDemo} type="text" value={learnerData?.attendedDemo ? FilterLableAndValue(DemoAttendedStage)?.filter((item) => item?.value === learnerData?.attendedDemo)?.[0]?.lable : ''} onChange={handelOnChange} handelOnStatus={handelOnStatus} />
                            : <SingleSelece onChange={handelOnChange} value={learnerData?.attendedDemo} error={error?.attendedDemo} name="attendedDemo" lableValue="Attended Demo" data={FilterLableAndValue(DemoAttendedStage)} />}
                        {disableData?.modeofClass ? <InputEdit lable="Mode of Class" disable={disableData?.modeofClass} name="modeofClass" error={error?.modeofClass} type="text" value={learnerData?.modeofClass ? FilterLableAndValue(ClassMode)?.filter((item) => item?.value === learnerData?.modeofClass)?.[0]?.lable : ''} onChange={handelOnChange} handelOnStatus={handelOnStatus} />
                            : <SingleSelece onChange={handelOnChange} value={learnerData?.modeofClass} error={error?.modeofClass} name="modeofClass" lableValue="Mode of Class" data={FilterLableAndValue(ClassMode)} />}
                    </div>
                </div>
                <div className="flex items-center gap-2 justify-center h-32 py-14  mt-7">
                    {!changeStatus && <JointBtn button1="Cancel" button2="Save" onClick1={handelonClear} isLoading={isLoading} onClick2={handelOnSave} />}
                </div>
            </div >
        </>
    )
}

export default LearnerDetail