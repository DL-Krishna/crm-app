'use client'
import React, { useEffect, useState } from 'react'
import { OpportunitiyDataView, OpportunitiyDisableDataView, LeadeData, OpportunitiyData1 } from '@/app/component/Type'
import JointBtn from '@/app/component/JointBtn'
import InputEdit from '../component/InputEdit'
import SingleSelece from '../component/SingleSelece'
import { createOpportunityForm } from '@/api/CommonData'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { getSingleLead, updateLeadData } from '@/lib/features/lead/leadSlice'
import { getUserID } from '@/assets/utils/auth.util'

const EditLearner = ({ handelOnSet }: { handelOnSet: (id: number, data: LeadeData[]) => void }) => {
    const dispatch = useAppDispatch()
    const [disableData, setDisableData] = useState<OpportunitiyData1>(OpportunitiyDisableDataView)
    const [opportunitiyData, setOpportunitiyData] = useState<OpportunitiyData1>(OpportunitiyDataView)
    const [error, setError] = useState<OpportunitiyData1>(OpportunitiyDataView)
    const [changeContactData, setChangeContactData] = useState<OpportunitiyData1>(OpportunitiyDataView)
    const [changeStatus, setChangeStatus] = useState<Boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { SingleLead } = useAppSelector((state) => state?.lead)
    const handelOnStatus = (name: String, value: Boolean) => {
        setDisableData({ ...OpportunitiyDisableDataView, [`${name}`]: value })
    }

    const handelOnChange = (e: { target: { name: String; value: String } }) => {
        const { name, value } = e.target;
        setOpportunitiyData({ ...opportunitiyData, [`${name}`]: value })
        setError({ ...error, [`${name}`]: '' })
    }
    useEffect(() => {
        if (SingleLead) {
            handelonClear()
        }
    }, [SingleLead])


    useEffect(() => {
        if (opportunitiyData) {
            const value = JSON.stringify(changeContactData) === JSON.stringify(opportunitiyData)
            setChangeStatus(value)
        }
    }, [opportunitiyData])


    const handelOnCancel = () => {
        setDisableData(OpportunitiyDisableDataView)
        setOpportunitiyData(opportunitiyData)
        handelOnSet(-1, [])
    }

    const handelonClear = () => {
        setOpportunitiyData(SingleLead)
        setChangeContactData(SingleLead)
    }

    const vaidation = () => {
        let formValid = true;
        const regex = /^[\w-]+(\.[\w-]+)*@([a-z\d]+(-[a-z\d]+)*\.)+[a-z]{2,}$/i;
        const newError: any = {};

        if (!opportunitiyData?.email?.trim()) {
            formValid = false
            newError["email"] = "Please enter email"
        } else if (!regex.test(opportunitiyData?.email)) {
            formValid = false;
            newError["email"] = "Please enter a valid email address";
        }
        if (!opportunitiyData?.name?.trim()) {
            formValid = false
            newError["name"] = "Please enter name"
        }
        if (!opportunitiyData?.phone?.trim()) {
            formValid = false
            newError["phone"] = "Please enter phone number"
        } else if (!(opportunitiyData?.phone?.length === 10)) {
            formValid = false
            newError["phone"] = "Please enter valid phone number"
        }

        setError(newError);
        return formValid;
    };


    const handelOnSave = () => {
        if (vaidation()) {
            setIsLoading(true);
            const data = {
                name: opportunitiyData?.name ? opportunitiyData?.name : '',
                opportunityStatus: opportunitiyData?.opportunityStatus ? opportunitiyData?.opportunityStatus : null,
                phone: opportunitiyData?.phone ? opportunitiyData?.phone : '',
                countryCode: opportunitiyData?.countryCode ? opportunitiyData?.countryCode : '',
                opportunityStage: opportunitiyData?.opportunityStage ? opportunitiyData?.opportunityStage : null,
                email: opportunitiyData?.email ? opportunitiyData?.email : '',
                demoAttendedStage: opportunitiyData?.demoAttendedStage ? opportunitiyData?.demoAttendedStage : null,
                feeQuoted: opportunitiyData?.feeQuoted ? opportunitiyData?.feeQuoted : '',
                visitedStage: opportunitiyData?.visitedStage ? opportunitiyData?.visitedStage : null,
                batchTiming: opportunitiyData?.batchTiming ? opportunitiyData?.batchTiming : '',
                coldLeadReason: opportunitiyData?.coldLeadReason ? opportunitiyData?.coldLeadReason : null,
                description: opportunitiyData?.description ? opportunitiyData?.description : '',
                userId: getUserID()
            }
            dispatch(updateLeadData({ id: SingleLead?.id, data: data })).unwrap()
                .then((res: any) => {
                    if (res) {
                        toast.success(res?.message ? res?.message : "Opportunitiy Update Successfully");
                        setError(OpportunitiyDataView)
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
                    <div className="grid gap-10 mb-6 md:grid-cols-2">
                        {createOpportunityForm?.map((item: any) => {
                            return item?.type === 'input' ? <InputEdit lable={item?.lableValue} disable={disableData?.[item?.name]} name={item?.name} error={error?.[item?.name]} type={item?.typeValue} value={opportunitiyData?.[item?.name]} onChange={handelOnChange} handelOnStatus={handelOnStatus} /> : item?.type === 'select' ?
                                disableData?.[item?.name] ? <InputEdit lable={item?.lableValue} disable={disableData?.[item?.name]} name={item?.name} error={error?.[item?.name]} type="text" value={opportunitiyData?.[item?.name] ? item?.data?.filter((i: any) => i?.value === opportunitiyData?.[item?.name])?.[0]?.lable : ''} onChange={handelOnChange} handelOnStatus={handelOnStatus} />
                                    : <SingleSelece onChange={handelOnChange} value={opportunitiyData?.[item?.name]} error={error?.[item?.name]} name={item?.name} lableValue={item?.lableValue} data={item?.data} /> : null
                        })}
                    </div>
                    <div className="mb-6">
                        <InputEdit lable="Description" disable={disableData?.description} name="description" error={error?.description} type="text" value={opportunitiyData?.description} onChange={handelOnChange} handelOnStatus={handelOnStatus} />
                    </div>
                </div>
                <div className="flex items-center gap-2 justify-center h-32 py-14  mt-7">
                    {!changeStatus && <JointBtn button1="Cancel" button2="Save" onClick1={handelonClear} isLoading={isLoading} onClick2={handelOnSave} />}
                </div>
            </div >
        </>
    )
}

export default EditLearner