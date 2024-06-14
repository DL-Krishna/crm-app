'use client'
import React, { useEffect, useState } from 'react'
import CustomInput from '../component/CustomInput'
import SingleSelece from '../component/SingleSelece'
import { LearnerDataView, LearnerData, HostItem } from '../component/Type'
import CustomModel from '../component/CustomModel'
import Contact from "../../assets/employee_contact.svg"
import Person from "../../assets/person_logo.svg"
import { toast } from 'react-toastify'
import { ClassMode, DemoAttendedStage, FilterLableAndValue, LeadSource, TechStack } from '@/api/CommonData'
import { useAppDispatch, useAppSelector } from '../../lib/store';
import Image from 'next/image'
import { BiEditAlt } from 'react-icons/bi'
import { getCourses } from '@/lib/features/courses/coursesSlice'

const CreateLearner = ({ handelOnContactModel, handelOnSave }: { handelOnSave: () => void, handelOnContactModel: () => void }) => {
    const [learner, setLearner] = useState<LearnerData>(LearnerDataView)
    const [error, setError] = useState<LearnerData>(LearnerDataView)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch()

    const { CoursesData } = useAppSelector((state) => state?.courses)
    useEffect(() => {
        dispatch(getCourses())
    }, [])
    const Courses: HostItem[] = CoursesData?.courses?.map((item: any) => { return { lable: item?.name, value: item?.id } })

    const handelOnChang = (e: { target: { name: any; value: any; files: any; } }) => {
        const { name, value, files } = e.target
        if (name === 'learnerImage') {
            setLearner({ ...learner, [`${name}`]: files?.[0] })
        } else {
            setLearner({ ...learner, [`${name}`]: value })
        }
        setError({ ...error, [`${name}`]: '' })
    }

    const vaidation = () => {
        let formValid = true;
        const regex = /^[\w-]+(\.[\w-]+)*@([a-z\d]+(-[a-z\d]+)*\.)+[a-z]{2,}$/i;
        const newError: any = {};

        if (!learner?.email?.trim()) {
            formValid = false
            newError["email"] = "Please enter email"
        } else if (!regex.test(learner?.email)) {
            formValid = false;
            newError["email"] = "Please enter a valid email address";
        }
        if (!learner?.fullName?.trim()) {
            formValid = false
            newError["fullName"] = "Please enter full name"
        }
        if (!learner?.phone?.trim()) {
            formValid = false
            newError["phone"] = "Please enter phone number"
        } else if (!(learner?.phone?.length === 10)) {
            formValid = false
            newError["phone"] = "Please enter valid phone number"
        }
        if (!learner?.dateofBirth?.trim()) {
            formValid = false
            newError["dateofBirth"] = "Please select date of birth"
        }
        if (!learner?.techstack?.trim()) {
            formValid = false
            newError["techstack"] = "Please select tech stack"
        }
        if (!learner?.courseDetails?.trim()) {
            formValid = false
            newError["courseDetails"] = "Please select course details"
        }
        if (!learner?.source?.trim()) {
            formValid = false
            newError["source"] = "Please select source"
        }
        if (!learner?.registeredDate?.trim()) {
            formValid = false
            newError["registeredDate"] = "Please select registered date"
        }
        if (!learner?.attendedDemo?.trim()) {
            formValid = false
            newError["attendedDemo"] = "Please select attended demo"
        }
        if (!learner?.modeofClass?.trim()) {
            formValid = false
            newError["modeofClass"] = "Please select mode of class"
        }
        if (!learner?.learnerImage) {
            formValid = false
            newError["learnerImage"] = "Please select learner image"
        }



        setError(newError);
        return formValid;
    };

    const handelOnSubmit = () => {
        if (vaidation()) {
            //setIsLoading(true);
            const data = {

            }
            {/* dispatch(updateLeadData(data)).unwrap()
                .then((res: any) => {
                    if (res?.status === 201) {
                        toast.success(res?.data?.message ? res?.data?.message : "Contact Create Successfully");
                        setLearner(LearnerDataView)
                        setError(LearnerDataView)
                        handelOnSave()
                    }
                })
                .catch((err) => {
                    toast.error(err?.message ? err?.message : "Something went wrong");
                }).finally(() => {
                    setIsLoading(false);
                });
            */}
        }
    }

    const handelOnCancel = () => {
        setError(LearnerDataView);
        handelOnContactModel();
    }

    return (
        <>
            <CustomModel headerImg={Contact} lable="Create Learner" onCancel={handelOnCancel} onSave={handelOnSubmit} isLoading={isLoading}>
                <div className="grid gap-4">
                    <h3 className="text-lg font-medium">Learner Image</h3>
                    <div>
                        <div className='flex gap-4'>
                            <Image src={learner?.learnerImage instanceof File ? URL.createObjectURL(learner?.learnerImage) : Person} width={80} height={80} alt='Person' className='rounded-full' />
                            <div className='flex items-end gap-4'>
                                <label htmlFor="dropzone-file">
                                    <div className='flex gap-0.5 cursor-pointer'>
                                        <BiEditAlt className='mb-0.5' />
                                        <span className='text-sm'>Edit</span>
                                    </div>
                                    <input id="dropzone-file" name='learnerImage' type="file" className="hidden" accept="image/*" onChange={handelOnChang} />
                                </label>
                                {error?.learnerImage && <span className="text-red-500 text-sm mt-1">{error?.learnerImage}</span>}
                            </div>
                        </div>
                        <span className="text-base font-normal ml-2">Full Name</span>
                    </div>
                    <h2 className='text-lg font-medium'>Learner Information</h2>
                </div>
                <div className="grid gap-6 my-8 md:grid-cols-2">
                    <CustomInput onChange={handelOnChang} lableValue="Full Name" value={learner?.fullName} error={error?.fullName} name="fullName" placeholder="Full Name" typeValue="text" />
                    <CustomInput onChange={handelOnChang} lableValue="Date of Birth" value={learner?.dateofBirth} error={error?.dateofBirth} name="dateofBirth" placeholder="Date of Birth" typeValue="date" />
                    <CustomInput onChange={handelOnChang} lableValue="Phone" value={learner?.phone} error={error?.phone} name="phone" placeholder="Phone" typeValue="text" />
                    <CustomInput onChange={handelOnChang} lableValue="Email" value={learner?.email} error={error?.email} name="email" placeholder="Email" typeValue="email" />
                    <SingleSelece onChange={handelOnChang} value={learner?.techstack} error={error?.techstack} name="techstack" lableValue="Techstack" data={FilterLableAndValue(TechStack)} />
                    <SingleSelece onChange={handelOnChang} value={learner?.courseDetails} error={error?.courseDetails} name="courseDetails" lableValue="Course Details" data={Courses} />
                    <SingleSelece onChange={handelOnChang} value={learner?.source} error={error?.source} name="source" lableValue="Source" data={FilterLableAndValue(LeadSource)} />
                    <CustomInput onChange={handelOnChang} lableValue="Registered Date" value={learner?.registeredDate} error={error?.registeredDate} name="registeredDate" placeholder="Registered Date" typeValue="date" />
                    <SingleSelece onChange={handelOnChang} value={learner?.attendedDemo} error={error?.attendedDemo} name="attendedDemo" lableValue="Attended Demo" data={FilterLableAndValue(DemoAttendedStage)} />
                    <SingleSelece onChange={handelOnChang} value={learner?.modeofClass} error={error?.modeofClass} name="modeofClass" lableValue="Mode of Class" data={FilterLableAndValue(ClassMode)} />
                </div>
            </CustomModel>
        </>
    )
}

export default CreateLearner