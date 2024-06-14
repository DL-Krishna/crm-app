import React, { useEffect, useState } from 'react'
import IconBox from "../../assets/person.svg"
import KanbanCard from '../component/KanbanCard';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { getLeadData, updateLeadData } from '@/lib/features/lead/leadSlice';
import { toast } from 'react-toastify';
import { getUserID } from '@/assets/utils/auth.util';
import { usePathname } from 'next/navigation';

const TASKS = [
    {
        id: 1,
        status: "New Order",
        image: IconBox,
        time: "8 hrs",
        days: "5 days left",
    },
    {
        id: 2,
        status: "In Progress",
        image: IconBox,
        time: "6 hrs",
        days: "6 days left",
        done: false,
    },
    {
        id: 3,
        status: "Completed",
        image: IconBox,
        time: "13 hrs",
        days: "4 days left",
    },
    {
        id: 4,
        status: "New Order",
        image: IconBox,
        time: "22 hrs",
        days: "2 days left",
        done: true,
    },
    {
        id: 5,
        status: "In Progress",
        image: IconBox,
        time: "2 hrs",
        days: "1 day left",
        newOrder: true,
        done: false,
    },
    {
        id: 6,
        status: "Completed",
        image: IconBox,
        time: "20 hrs",
        days: "11 days left",
        done: true,
    },
    {
        id: 7,
        status: "Delivered",
        image: IconBox,
        time: "2 hrs",
        days: "1 day left",
        done: false,
    },
    {
        id: 8,
        status: "Delivered",
        image: IconBox,
        time: "2 hrs",
        days: "1 day left",
        done: false,
    },
    {
        id: 9,
        status: "Delivered",
        image: IconBox,
        time: "2 hrs",
        days: "1 day left",
        done: false,
    },
];

const LeadsKanban = () => {

    const [tasks, setTasks] = useState<any>([]);
    const { LeadData } = useAppSelector((state) => state?.lead)
    const dispatch = useAppDispatch()
    const pathName = usePathname()


    useEffect(() => {
        setTasks(LeadData?.leads);
    }, [LeadData]);

    const onDragStart = (evt: {
        currentTarget: {
            [x: string]: any; id: any;
        }; dataTransfer: { setData: (arg0: string, arg1: any) => void; effectAllowed: string; };
    }) => {
        let element = evt.currentTarget;
        element.classList.add("dragged");
        evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
        evt.dataTransfer.effectAllowed = "move";
    };

    const onDragEnd = (evt: { currentTarget: { classList: { remove: (arg0: string) => void; }; }; }) => {
        evt.currentTarget.classList.remove("dragged");
    };

    const onDragEnter = (evt: { preventDefault: () => void; currentTarget: any; dataTransfer: { dropEffect: string; }; }) => {
        evt.preventDefault();
        let element = evt.currentTarget;
        element.classList.add("dragged-over");
        evt.dataTransfer.dropEffect = "move";
    };

    const onDragLeave = (evt: { currentTarget: any; relatedTarget: any; preventDefault: () => void; }) => {
        let currentTarget = evt.currentTarget;
        let newTarget = evt.relatedTarget;
        if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
            return;
        evt.preventDefault();
        let element = evt.currentTarget;
        element.classList.remove("dragged-over");
    };

    const onDragOver = (evt: { preventDefault: () => void; dataTransfer: { dropEffect: string; }; }) => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = "move";
    };

    const onDrop = (evt: React.DragEvent<HTMLDivElement>, leadStatus: string) => {
        evt.preventDefault();
        evt.currentTarget.classList.remove("dragged-over");
        const id = evt.dataTransfer.getData("text/plain");

        //Check if the task leadStatus is already the same as the target leadStatus
        const task = tasks.find((task: { id: { toString: () => string; }; }) => task.id.toString() === id.toString());

        const data = {
            name: task?.name,
            leadSource: task?.leadSource,
            techStack: task?.techStack,
            countryCode: task?.countryCode,
            phone: task?.phone,
            courseId: task?.courseId,
            email: task?.email,
            classMode: task?.classMode,
            feeQuoted: task?.feeQuoted,
            batchTiming: task?.batchTiming,
            leadStatus: leadStatus,
            description: task?.description,
            nextFollowUp: task?.nextFollowUp,
            userId: getUserID()
        }
        dispatch(updateLeadData({ id: task?.id, data: data })).unwrap()
            .then((res: any) => {
                if (res) {
                    toast.success(res?.message ? res?.message : "Leade Update Successfully");
                    dispatch(getLeadData(pathName === '/leads' ? 'lead' : 'opportunity'))
                }
            })
            .catch((err: any) => {
                const error = JSON.parse(err?.message)
                toast.error(error?.message ? error?.message : "Something went wrong");
            })


        if (task && task.leadStatus !== leadStatus) {
            const updatedTasks = tasks.map((task: { id: { toString: () => string; }; }) => {
                if (task.id.toString() === id.toString()) {
                    return { ...task, leadStatus };
                }
                return task;
            });
            setTasks(updatedTasks);
        }
    };

    let newOrder = tasks?.filter((data: { leadStatus: string; }) => data?.leadStatus === "NotContacted");
    let waiting = tasks?.filter((data: { leadStatus: string; }) => data?.leadStatus === "Attempted");
    let pending = tasks?.filter((data: { leadStatus: string; }) => data?.leadStatus === "Opportunity");
    let done = tasks?.filter((data: { leadStatus: string; }) => data?.leadStatus === "Cold Lead");


    return (
        <div className="w-[100%] overflow-auto px-5 h-full">
            <div className="flex gap-3">
                <KanbanCard headerName="Not Contacted" name='NotContacted' onDragLeave={onDragLeave} onDragEnter={onDragEnter} onDragEnd={onDragEnd} onDragOver={onDragOver} onDragStart={onDragStart} onDrop={onDrop} data={newOrder} />
                <KanbanCard headerName="Attempted" name='Attempted' onDragLeave={onDragLeave} onDragEnter={onDragEnter} onDragEnd={onDragEnd} onDragOver={onDragOver} onDragStart={onDragStart} onDrop={onDrop} data={waiting} />
                <KanbanCard headerName="Opportunity" name='Opportunity' onDragLeave={onDragLeave} onDragEnter={onDragEnter} onDragEnd={onDragEnd} onDragOver={onDragOver} onDragStart={onDragStart} onDrop={onDrop} data={pending} />
                <KanbanCard headerName="Cold Lead" name='Cold Lead' onDragLeave={onDragLeave} onDragEnter={onDragEnter} onDragEnd={onDragEnd} onDragOver={onDragOver} onDragStart={onDragStart} onDrop={onDrop} data={done} />
            </div>
        </div>
    )
}

export default LeadsKanban