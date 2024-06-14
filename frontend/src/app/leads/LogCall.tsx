'use client'
import JointBtn from '@/app/component/JointBtn'
import { HostItem, LogCallRowData, LogCallView } from '@/app/component/Type'
import CustomInput from '@/app/component/CustomInput'
import DropdownInput from '@/app/component/DropdownInput'
import SingleSelece from '@/app/component/SingleSelece'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { addCall, getLogCall } from '@/lib/features/lead/leadSlice'
import { toast } from 'react-toastify'
import { getUserID } from '@/assets/utils/auth.util'
import SingleBtn from '../component/SingleBtn'
import Table from '../component/Table'
import moment from 'moment'
import { ColDef } from 'ag-grid-community'
import CustomModel from '../component/CustomModel'

const CallTypeData: HostItem[] = [
    { lable: "Lead", value: "Lead" },
]

const LogCall = () => {
    const [logCall, setLogCall] = useState<LogCallRowData>(LogCallView)
    const [error, setError] = useState<LogCallRowData>(LogCallView)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModel, setIsModel] = useState<boolean>(false);
    const dispatch = useAppDispatch()
    const { SingleLead, call, isLoader } = useAppSelector((state) => state?.lead)


    useEffect(() => {
        dispatch(getLogCall())
    }, [])

    const initialColumnDefs: ColDef[] = [
        {
            field: 'callTo', headerName: "Call To",
            minWidth: 215, maxWidth: 300,
        },
        {
            field: 'callType', headerName: "Call Type",
            minWidth: 210, maxWidth: 300,
        },
        {
            field: 'outgoingCallStatus', headerName: "Outgoing Call Statu",
            minWidth: 215, maxWidth: 300,
        },
        {
            field: 'callStartTime', headerName: "Call Start Time",
            minWidth: 180, maxWidth: 280,
            cellRenderer: (params: { data: any; }) => {
                const data = params.data;
                return (
                    <div className='flex items-center gap-2 capitalize '>
                        {data?.callStartTime ? moment.utc(data?.callStartTime).format("DD MMM, YYYY, h:mm A") : "-"}
                    </div>
                );
            },
        },
        {
            field: 'callEndTime', headerName: "Call End Time",
            minWidth: 180, maxWidth: 280,
            cellRenderer: (params: { data: any; }) => {
                const data = params.data;
                return (
                    <div className='flex items-center gap-2 capitalize '>
                        {data?.callEndTime ? moment.utc(data?.callEndTime).format("DD MMM, YYYY, h:mm A") : "-"}
                    </div>
                );
            },
        },
        {
            field: 'subject', headerName: "Subject",
            minWidth: 210, maxWidth: 450,
        },
    ];

    const handelOnChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target
        setLogCall({ ...logCall, [`${name}`]: value })
        setError({ ...error, [`${name}`]: '' })
    }

    const vaidation = () => {
        let formValid = true;
        const newError: any = {};

        if (!(logCall?.callTo)) {
            formValid = false
            newError["callTo"] = "Please select call to"
        }
        if (!logCall?.callType?.trim()) {
            formValid = false
            newError["callType"] = "Please enter call type"
        }
        if (!logCall?.outgoingCallStatus?.trim()) {
            formValid = false
            newError["outgoingCallStatus"] = "Please enter outgoing call status"
        }
        if (!logCall?.callStartTime) {
            formValid = false
            newError["callStartTime"] = "Please select call start time"
        }
        if (!logCall?.callEndTime) {
            formValid = false
            newError["callEndTime"] = "Please enter call durration"
        }
        if (!logCall?.subject?.trim()) {
            formValid = false
            newError["subject"] = "Please enter subject"
        }
        if (!logCall?.voiceRecording) {
            formValid = false
            newError["voiceRecording"] = "Please select voice recording"
        }


        setError(newError);
        return formValid;
    };

    const handelOnCreate = () => {
        //if (vaidation()) {
        setIsLoading(true);

        let data = new FormData();
        data.append('voiceRecording', logCall?.voiceRecording);
        data.append('leadId', SingleLead?.id);
        data.append('userId', getUserID());
        data.append('callType', logCall?.callType);
        data.append('outgoingCallStatus', logCall?.outgoingCallStatus);
        data.append('callStartTime', logCall?.callStartTime);
        data.append('callEndTime', logCall?.callEndTime);
        dispatch(addCall(data)).unwrap()
            .then((res: any) => {
                if (res) {
                    handelOnCancel()
                    dispatch(getLogCall())
                    toast.success(res?.message ? res?.message : "Call created successfully");
                }
            })
            .catch((err: any) => {
                const error = JSON.parse(err?.message)
                toast.error(error?.message ? error?.message : "Something went wrong");
            }).finally(() => {
                setIsLoading(false);
            });
        //}
    }

    const handelOnCancel = () => {
        setLogCall(LogCallView)
        setError(LogCallView)
        setIsModel(!isModel)
    }


    return (
        <div className="px-5 py-11">
            {isModel && <CustomModel lable="New Task" onCancel={handelOnCancel} onSave={handelOnCreate} isLoading={isLoading}>
                <div className="grid gap-8 mb-8 md:grid-cols-2">
                    {/* <DropdownInput /> */}
                    {/* <SingleSelece lableValue="Call Type" data={CallTypeData} /> */}
                    <SingleSelece lableValue="Call To" name="callTo" value={logCall?.callTo} error={error?.callTo} data={CallTypeData} onChange={handelOnChange} />
                    <CustomInput lableValue="Call Type" name='callType' error={error?.callType} value={logCall?.callType} placeholder="Call Type" onChange={handelOnChange} typeValue="text" />
                    <CustomInput lableValue="Outgoing Call Status" error={error?.outgoingCallStatus} name='outgoingCallStatus' value={logCall?.outgoingCallStatus} placeholder="Outgoing Call Status" onChange={handelOnChange} typeValue="text" />
                    <CustomInput lableValue="Call Start Time" name='callStartTime' error={error?.callStartTime} value={logCall?.callStartTime} placeholder="Call Start Time" onChange={handelOnChange} typeValue="datetime-local" />
                    <CustomInput lableValue="Call End Time" name='callEndTime' error={error?.callEndTime} value={logCall?.callEndTime} placeholder="Call End Time" onChange={handelOnChange} typeValue="datetime-local" />
                    <CustomInput lableValue="Subject" name='subject' value={logCall?.subject} error={error?.subject} placeholder="Subject" onChange={handelOnChange} typeValue="text" />
                    <CustomInput lableValue="Voice Recording" name='voiceRecording' error={error?.voiceRecording} value={logCall?.voiceRecording} placeholder="Voice Recording" onChange={handelOnChange} typeValue="file" accept='audio/*' />
                </div>
            </CustomModel>}

            <div className='grid gap-2'>
                <div className="flex justify-between px-4">
                    <h2 className="text-black text-lg font-semibold">Log Call</h2>
                    <SingleBtn name="+ New Log Call" bgcolor="sky" onClick={() => { setIsModel(!isModel) }} />
                </div>
                <Table noDataFoundMsg='Log Call data no found' isLoader={isLoader} initialColumnDefs={initialColumnDefs} datas={call?.calls} />
            </div>
        </div>
    )
}

export default LogCall