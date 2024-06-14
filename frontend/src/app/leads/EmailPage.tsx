'use client'
import JointBtn from '@/app/component/JointBtn'
import CustomInput from '@/app/component/CustomInput'
import QuillEditor from '@/app/component/QuillEditor'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { EmailRowData, EmailView } from '../component/Type'
import { toast } from 'react-toastify'
import { addEmail, getEmail } from '@/lib/features/lead/leadSlice'
import ButtonInput from '../component/ButtonInput'
import { getUserID } from '@/assets/utils/auth.util'
import SingleBtn from '../component/SingleBtn'
import Table from '../component/Table'
import moment from 'moment'
import { ColDef } from 'ag-grid-community'
import CustomModel from '../component/CustomModel'

const EmailPage = () => {
    const [emailData, setEmailData] = useState<EmailRowData>(EmailView)
    const [error, setError] = useState<EmailRowData>(EmailView)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const [textError, setTextError] = useState<string>('');
    const [isModel, setIsModel] = useState<boolean>(false);
    const dispatch = useAppDispatch()
    const { SingleLead, email, isLoader } = useAppSelector((state) => state?.lead)


    useEffect(() => {
        dispatch(getEmail())
    }, [SingleLead])


    const initialColumnDefs: ColDef[] = [
        {
            field: 'from', headerName: "From",
            minWidth: 215, maxWidth: 350,
        },
        {
            field: 'to', headerName: "To",
            minWidth: 215, maxWidth: 350,
        },
        {
            field: 'bcc', headerName: "Bcc",
            minWidth: 215, maxWidth: 350,
        },
        {
            field: 'subject', headerName: "Subject",
            minWidth: 210, maxWidth: 350,
        },
        {
            field: 'body', headerName: "Body",
            minWidth: 210, maxWidth: 430,
        },
    ];



    const handleChange = (value: string) => {
        setText(value);
        setTextError("")
    };

    const handelOnChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target
        setEmailData({ ...emailData, [`${name}`]: value })
        setError({ ...error, [`${name}`]: '' })
    }

    const handelOnData = (name?: string, data?: any[]) => {
        setEmailData({ ...emailData, [`${name}`]: data })
        setError({ ...error, [`${name}`]: '' })
    }

    const vaidation = () => {
        let formValid = true;
        const regex = /^[\w-]+(\.[\w-]+)*@([a-z\d]+(-[a-z\d]+)*\.)+[a-z]{2,}$/i;
        const newError: any = {};

        if (!(emailData?.to?.length > 0)) {
            formValid = false
            newError["to"] = "Please enter to"
        }
        if (!emailData?.from?.trim()) {
            formValid = false
            newError["from"] = "Please enter from"
        } else if (!regex.test(emailData?.from)) {
            formValid = false;
            newError["from"] = "Please enter a valid email address";
        }
        if (!(emailData?.bcc?.length > 0)) {
            formValid = false
            newError["bcc"] = "Please enter bcc"
        }
        if (!emailData?.subject) {
            formValid = false
            newError["subject"] = "Please enter subject"
        }
        if (!text) {
            formValid = false
            setTextError('Please enter message')
        }

        setError(newError);
        return formValid;
    };

    const handelOnSave = () => {
        //if (vaidation()) {
        setIsLoading(true);
        const data = {
            to: emailData?.to,
            bcc: emailData?.bcc,
            from: emailData?.from,
            subject: emailData?.subject,
            body: text,
            leadId: SingleLead?.id,
            userId: getUserID(),
        }
        dispatch(addEmail(data)).unwrap()
            .then((res: any) => {
                if (res) {
                    toast.success(res?.data?.message ? res?.data?.message : "Email sent successfully");
                    handelOnCancel()
                    dispatch(getEmail())
                }
            })
            .catch((err: any) => {
                const error = JSON?.parse(err?.message)
                toast.error(error?.error ? error?.error : "Something went wrong");
            }).finally(() => {
                setIsLoading(false);
            });
        // }
    }

    const handelOnCancel = () => {
        setText('')
        setEmailData(EmailView)
        setError(EmailView)
        setIsModel(!isModel)
    }

    return (
        <div>
            <div className="px-5 pt-7 pb-6">
                {isModel && <CustomModel lable="New Email" onCancel={handelOnCancel} onSave={handelOnSave} isLoading={isLoading}>
                    <>
                        <div className="grid gap-8 mb-8 md:grid-cols-2">
                            <CustomInput name="from" value={emailData?.from} error={error?.from} onChange={handelOnChange} lableValue="From" placeholder="From" typeValue="email" />
                            <ButtonInput placeholder="To" value={emailData?.to} name="to" typeValue="email" handelOnData={handelOnData} lableValue="To" error={error?.to} />
                            <ButtonInput placeholder="Bcc" value={emailData?.bcc} name="bcc" typeValue="email" handelOnData={handelOnData} lableValue="Bcc" error={error?.bcc} />
                            <CustomInput name="subject" value={emailData?.subject} error={error?.subject} onChange={handelOnChange} lableValue="Subject" placeholder="Subject" typeValue="text" />
                        </div>
                        <div className='mb-8'>
                            <span className="text-red-500 text-sm mt-1">{textError}</span>
                            <QuillEditor handleChange={handleChange} text={text} />
                        </div>
                    </>
                </CustomModel>}

                <div className='grid gap-2'>
                    <div className="flex justify-between px-4">
                        <h2 className="text-black text-lg font-semibold">Email</h2>
                        <SingleBtn name="+ New Email" bgcolor="sky" onClick={() => { setIsModel(!isModel) }} />
                    </div>
                    <Table noDataFoundMsg='Email data no found' isLoader={isLoader} initialColumnDefs={initialColumnDefs} datas={email?.emails} />
                </div>
            </div>
        </div>
    )
}

export default EmailPage