import moment from 'moment';
import React from 'react';

const KanbanCard = ({
    onDragLeave,
    onDragEnter,
    onDragEnd,
    onDragOver,
    onDragStart,
    onDrop,
    data,
    name,
    headerName,
}: {
    onDragLeave?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragEnter?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDrop?: (e: React.DragEvent<HTMLDivElement>, data: string) => void;
    data?: any;
    name: string;
    headerName: string;
}) => {
    const getBackgroundColor = () => {
        switch (headerName) {
            case 'Not Contacted':
                return 'bg-green-100 border-t-green-300';
            case 'Attempted':
                return 'bg-blue-100 border-t-blue-300';
            case 'Opportunity':
                return 'bg-orange-100 border-t-stone-400';
            case 'Cold Lead':
                return 'bg-indigo-100 border-t-slate-400';
            default:
                return '';
        }
    };

    return (
        <div className="h-full grid gap-4">
            <div
                className={`${getBackgroundColor() || ''
                    } border-t-4 rounded-t-md h-20 min-w-96 py-3 px-5`}
            >
                <h3 className="text-base font-semibold">{headerName}</h3>
                <p className="text-sm font-semibold">
                    ₹ 0.00 <span className="text-sm font-medium"> . 0 Leads</span>
                </p>
            </div>
            <div
                onDragLeave={onDragLeave}
                onDragEnter={onDragEnter}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop && onDrop(e, name)}
                className="bg-gray-200 h-[63vh] px-0.5 max-w-96 flex items-center justify-center rounded"
            >
                {data?.length > 0 ? (
                    <div className="w-full h-full py-1 overflow-auto flex flex-col gap-3">
                        {data?.map((item: any) => (
                            <div
                                key={item?.id}
                                id={item.id}
                                draggable
                                onDragStart={onDragStart}
                                onDragEnd={onDragEnd}
                                className="bg-white rounded py-3 px-5 cursor-move"
                            >
                                <div className="text-black text-base font-semibold">
                                    {item?.name}
                                </div>
                                <div className="text-black text-sm font-medium">
                                    {moment(item?.createdAt).format("DD/MM/YYYY, h:mm A")}
                                </div>
                                <div className="text-black text-sm font-medium">
                                    {'+' + item?.countryCode + ' ' + item?.phone}
                                </div>
                                <div className="text-black text-sm font-medium">
                                    Need Counselling
                                </div>
                                <div className="text-black text-sm font-medium">
                                    03/04/2024
                                </div>
                                <div className="text-black text-sm font-medium">
                                    Nishan : she is from invest banki...
                                </div>
                                {/* <p>{item?.status}</p> */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <span className="text-sm font-medium">No leads found.</span>
                )}
            </div>
        </div>
    );
};

export default KanbanCard;
