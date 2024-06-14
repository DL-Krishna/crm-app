'use client'
import JointBtn from '@/app/component/JointBtn'
import { WhatsAppRowData, WhatsAppView } from '@/app/component/Type'
import CustomInput from '@/app/component/CustomInput'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { addMessage, getMessage } from '@/lib/features/lead/leadSlice'
import { getUserID } from '@/assets/utils/auth.util'
import SingleBtn from '../component/SingleBtn'
import Table from '../component/Table'
import { ColDef } from 'ag-grid-community'
import CustomModel from '../component/CustomModel'


const WhatsApp = () => {
    const [whatsAppData, setWhatsAppData] = useState<WhatsAppRowData>(WhatsAppView)
    const [error, setError] = useState<WhatsAppRowData>(WhatsAppView)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModel, setIsModel] = useState<boolean>(false);
    const dispatch = useAppDispatch()
    const { SingleLead, message, isLoader } = useAppSelector((state) => state?.lead)

    useEffect(() => {
        dispatch(getMessage())
    }, [])

    const initialColumnDefs: ColDef[] = [
        {
            field: 'phoneNumber', headerName: "Phone",
            minWidth: 215, maxWidth: 450,
        },
        {
            field: 'messageContent', headerName: "Message",
            minWidth: 215, maxWidth: 750,
        },
    ];


    const handelOnChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target
        setWhatsAppData({ ...whatsAppData, [`${name}`]: value })
        setError({ ...error, [`${name}`]: '' })
    }

    const handelOnData = (name?: string, data?: any[]) => {
        setWhatsAppData({ ...whatsAppData, [`${name}`]: data })
        setError({ ...error, [`${name}`]: '' })
    }


    const vaidation = () => {
        let formValid = true;
        const newError: any = {};

        if (!(whatsAppData?.phoneNumber?.length > 0)) {
            formValid = false
            newError["phoneNumber"] = "Please enter phone"
        }
        if (!whatsAppData?.messageContent?.trim()) {
            formValid = false
            newError["messageContent"] = "Please enter message"
        }

        setError(newError);
        return formValid;
    };

    const handelOnCreate = () => {
        if (vaidation()) {
            setIsLoading(true);
            const data = {
                phoneNumber: '+91' + whatsAppData?.phoneNumber,
                messageContent: whatsAppData?.messageContent,
                type: "text",
                leadId: SingleLead?.id,
                userId: getUserID(),
            }
            dispatch(addMessage(data)).unwrap()
                .then((res: any) => {
                    if (res?.status === 200) {
                        handelOnCancel()
                        dispatch(getMessage())
                        toast.success(res?.data?.messageContent ? res?.data?.messageContent : "Message send successfully");
                    }
                })
                .catch((err: any) => {
                    const error = JSON.parse(err?.messageContent)
                    toast.error(error?.errorMessage ? error?.errorMessage : "Something went wrong");
                }).finally(() => {
                    setIsLoading(false);
                });
        }

    }



    const handelOnCancel = () => {
        setWhatsAppData(WhatsAppView)
        setError(WhatsAppView)
        setIsModel(!isModel)
    }

    return (
        <div className="px-5 py-11">
            {isModel && <CustomModel lable="WhatsApp" onCancel={handelOnCancel} onSave={handelOnCreate} isLoading={isLoading}>
                <div className="mb-8">
                    <CustomInput name="phoneNumber" value={whatsAppData?.phoneNumber} error={error?.phoneNumber} onChange={handelOnChange} lableValue="Phone" placeholder="Phone" typeValue="text" />
                </div>
                <CustomInput name="messageContent" value={whatsAppData?.messageContent} error={error?.messageContent} onChange={handelOnChange} lableValue="Message" placeholder="Message" typeValue="text" />
            </CustomModel>}
            <div className='grid gap-2'>
                <div className="flex justify-between px-4">
                    <h2 className="text-black text-lg font-semibold">WhatsApp</h2>
                    <SingleBtn name="+ New WhatsApp" bgcolor="sky" onClick={() => { setIsModel(!isModel) }} />
                </div>
                <Table noDataFoundMsg='WhatsApp data no found' isLoader={isLoader} initialColumnDefs={initialColumnDefs} datas={message?.messages} />
            </div>
        </div>
    )
}

export default WhatsApp;