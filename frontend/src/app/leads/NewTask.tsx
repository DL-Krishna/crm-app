'use client'
import CustomInput from '@/app/component/CustomInput'
import React, { useEffect, useState } from 'react'
import { ActivityAccordionTaskData, NewTaskRowData, NewTaskView } from '@/app/component/Type'
import SingleSelece from '@/app/component/SingleSelece'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { toast } from 'react-toastify'
import { addTask } from '@/lib/features/lead/leadSlice'
import { getUserID } from '@/assets/utils/auth.util'
import { Prioritydata } from '@/api/CommonData'
import { getTaskIdData } from '@/lib/features/task/taskSlice'
import CustomModel from '../component/CustomModel'
import SingleBtn from '../component/SingleBtn'
import Table from '../component/Table'
import { ColDef } from 'ag-grid-community'
import moment from 'moment'

const datas: ActivityAccordionTaskData[] = [
    {
        id: 1,
        title: "Upcoming & Overdue",
        data: [
            {
                new_task: {
                    title: "Test",
                    description: "You have an upcoming Task You have an upcoming Task"
                }
            },
            {
                new_meeting: {
                    title: "Test",
                    description: "You have an upcoming Task You have an upcoming Task"
                }
            },
            {
                email: {
                    title: "Test",
                    description: "You have an upcoming Task You have an upcoming Task"
                }
            }
        ]
    },
]

const NewTask = () => {
    const [newTaskData, setNewTaskData] = useState<NewTaskRowData>(NewTaskView)
    const [error, setError] = useState<NewTaskRowData>(NewTaskView)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModel, setIsModel] = useState<boolean>(false);
    const { SingleLead } = useAppSelector((state) => state?.lead)
    const data = useAppSelector((state) => state?.lead)
    const dispatch = useAppDispatch()
    const { taskData, isLoader } = useAppSelector((state) => state?.task)

    useEffect(() => {
        dispatch(getTaskIdData(SingleLead?.userId))
    }, [SingleLead])

    const handelOnChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target
        setNewTaskData({ ...newTaskData, [`${name}`]: value })
        setError({ ...error, [`${name}`]: '' })
    }


    const initialColumnDefs: ColDef[] = [
        {
            field: 'subject', headerName: "Subject",
            minWidth: 215, maxWidth: 450,
        },
        {
            field: 'dueDate', headerName: "Due Date",
            minWidth: 215, maxWidth: 450,
            cellRenderer: (params: { data: any; }) => {
                const data = params.data;
                return (
                    <div className='flex items-center gap-2 capitalize '>
                        {data?.dueDate ? moment.utc(data?.dueDate).format("DD MMM, YYYY, h:mm A") : "-"}
                    </div>
                );
            },
        },
        {
            field: 'priority', headerName: "Priority",
            minWidth: 215, maxWidth: 450,
        },
        {
            field: 'userId', headerName: "Owner",
            minWidth: 210, maxWidth: 450,
            cellRenderer: (params: { data: any; }) => {
                return (
                    <div className='flex items-center gap-2'>
                        {SingleLead?.name}
                    </div>
                );
            },
        },
    ];

    const vaidation = () => {
        let formValid = true;
        const newError: any = {};

        if (!newTaskData?.dueDate?.trim()) {
            formValid = false
            newError["dueDate"] = "Please select due date"
        }
        if (!newTaskData?.subject?.trim()) {
            formValid = false
            newError["subject"] = "Please enter subject"
        }
        if (!newTaskData?.priority?.trim()) {
            formValid = false
            newError["priority"] = "Please select priority"
        }

        setError(newError);
        return formValid;
    };

    const handelOnSave = () => {
        if (vaidation()) {
            setIsLoading(true);
            const data = {
                leadId: SingleLead?.id,
                subject: newTaskData?.subject,
                dueDate: newTaskData?.dueDate,
                priority: newTaskData?.priority,
                userId: getUserID(),
            }
            dispatch(addTask(data)).unwrap()
                .then((res: any) => {
                    if (res?.status === 201) {
                        toast.success(res?.data?.message ? res?.data?.message : "Task created successfully");
                        handelOnCancel()
                        dispatch(getTaskIdData(SingleLead?.userId))
                    }
                })
                .catch((err: any) => {
                    toast.error(err?.message ? err?.message : "Something went wrong");
                }).finally(() => {
                    setIsLoading(false);
                });

        }
    }
    const handelOnCancel = () => {
        setNewTaskData(NewTaskView)
        setError(NewTaskView)
        setIsModel(!isModel)
    }

    return (
        <div className="px-5 py-11">
            {isModel && <CustomModel lable="New Task" onCancel={handelOnCancel} onSave={handelOnSave} isLoading={isLoading}>
                <div className="grid gap-8 mb-8 md:grid-cols-2">
                    <CustomInput name="subject" error={error?.subject} onChange={handelOnChange} value={newTaskData?.subject} lableValue="Subject" placeholder="Subject" typeValue="text" />
                    <CustomInput name="dueDate" error={error?.dueDate} onChange={handelOnChange} value={newTaskData?.dueDate} lableValue="Due Date" placeholder="Due Date" typeValue="datetime-local" />
                    <SingleSelece name="priority" error={error?.priority} onChange={handelOnChange} value={newTaskData?.priority} lableValue="Priority" data={Prioritydata} />
                    <CustomInput name="userId" error={error?.userId} onChange={handelOnChange} disabled={true} value={newTaskData?.userId || SingleLead?.name} lableValue="Owner" placeholder="Owner" typeValue="text" />
                </div>
            </CustomModel>}
            <div className='grid gap-2'>
                <div className="flex justify-between px-4">
                    <h2 className="text-black text-lg font-semibold">New Task</h2>
                    <SingleBtn name="+ New Task" bgcolor="sky" onClick={() => { setIsModel(!isModel) }} />
                </div>
                <Table noDataFoundMsg='Task data no found' isLoader={isLoader} initialColumnDefs={initialColumnDefs} datas={taskData?.tasks} />
            </div>
            {/* {taskData?.tasks?.length > 0 &&
                <div className="border-t border-t-neutral-300 mt-10">
                    {datas?.map((item) => {
                    return <ActivityAccordion key={item?.id} item={item} />
                })} 
                    <ActivityAccordion item={taskData?.tasks} />
                </div>
            } */}
        </div>
    )
}

export default NewTask