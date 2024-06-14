'use client'
import * as React from 'react'
import Contact from "../../assets/employee_contact.svg"
import { AgGridReact } from 'ag-grid-react';
import { CellClickedEvent, ColDef, SelectionChangedEvent } from 'ag-grid-community';
import { useRef, useState, useEffect, useMemo } from 'react'
import { LeadeData } from '../component/Type';
import TableHeader from '../component/TableHeader'
import Loader from '../component/Loader';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { deleteLeadsData, getLeadData, getLeadFilter } from '@/lib/features/lead/leadSlice';
import { toast } from 'react-toastify';
import { dataFilter, OpportunitiesListView, filterId } from '@/api/CommonData';
import { getUser } from '@/lib/features/auth/authSlice';
import moment from 'moment';
import { CreateOpportunityStatus } from '@/lib/features/navbar/navbarSlice';
import { getUserID } from '@/assets/utils/auth.util';
import CreateOpportunitie from './CreateOpportunitie';
import LeadsKanban from '../leads/LeadsKanban';


const initialColumnDefs: ColDef[] = [
    {
        field: 'created_on', headerName: "Created on",
        minWidth: 215, maxWidth: 350,
        cellRenderer: (params: { data: any; }) => {
            const data = params.data;
            return (
                <div className='flex items-center gap-2 capitalize '>
                    {data?.createdAt ? moment(data?.createdAt).format("DD MMM, YYYY, h:mm A") : "-"}
                </div>
            );
        },
        checkboxSelection: true,
        headerCheckboxSelection: true
    },
    {
        field: 'leadStatus', headerName: "Lead Status",
        minWidth: 215, maxWidth: 350,
    },
    {
        field: 'name', headerName: "Name",
        minWidth: 215, maxWidth: 350,
    },
    {
        field: 'phone', headerName: "Phone",
        minWidth: 210, maxWidth: 350,
        cellRenderer: (params: { data: any; }) => {
            const data = params.data;
            return (
                <div className='flex items-center gap-2'>
                    {'+ ' + data?.countryCode + ' ' + data?.phone}
                </div>
            );
        },
    },
    {
        field: 'techStack', headerName: "Tech Stack",
        minWidth: 110, maxWidth: 350,
        cellRenderer: (params: { data: any; }) => {
            const data = params.data;
            return (
                <div className='flex items-center capitalize w-full'>
                    <span className={` w-full h-7 mt-1.5 px-4 rounded-full text-gray-500 relative`}><p className={`${data?.techStack === "DataStack" ? 'bg-orange-400' : data?.techStack === "Salesforce" ? 'bg-yellow-400' : data?.techStack === "Cloud Ops" ? 'bg-blue-300' : data?.techStack === "Career Counselling" ? 'bg-lime-400' : data?.techStack === "Business Stack" ? 'bg-teal-400' : data?.techStack === "ServiceNow" ? 'bg-rose-400' : data?.techStack === 'Cloud Ops' ? 'bg-green-400' : ''}  ${data?.techStack ? 'text-neutral-100' : ''} flex justify-center rounded-full absolute w-36 h-7 items-center`}>{data?.techStack ? data?.techStack : '-'}</p></span>
                </div>
            );
        },
    },
    {
        field: 'classMode', headerName: "Class Mode",
        minWidth: 220, maxWidth: 350,
        cellRenderer: (params: { data: any; }) => {
            const data = params.data;
            return (
                <div className='flex items-center capitalize w-full'>
                    <span className={` w-full h-7 mt-1.5 px-4 rounded-full ${data?.classMode ? 'text-neutral-100' : ''} relative`}><p className={`${data?.classMode === "International Online" ? 'bg-fuchsia-400' : data?.classMode === "India Online" ? 'bg-emerald-300' : data?.classMode === "BLR ClassRoom" ? 'bg-violet-300' : data?.classMode === "HYD ClassRoom" ? 'bg-indigo-400' : ''} flex justify-center rounded-full absolute w-36 h-7 items-center`}>{data?.classMode ? data?.classMode : '-'}</p></span>
                </div>
            );
        },
    },
];

const LeadeDatas = [
    { name: "test", leadStatus: "tq", phone: "91 1525525252", techStack: "jkfhjkd", classMode: "jhsdfjkdfjk" }
]
const OpportunitiesPage = ({ handelOnSet }: { handelOnSet: (id: number, data: LeadeData[]) => void }) => {
    const dispatch = useAppDispatch()
    const tableRef = useRef<any>(null);
    const [selectedCell, setSelectedCell] = useState<any>([]);
    const [fieldStatus, setFieldStatus] = useState<Boolean>(true);
    const [active, setActive] = useState<string>('table')
    const [searchValue, setSearchValue] = useState<string>('');
    const [filterData, setFilterData] = useState<any>(OpportunitiesListView?.[0]?.value);
    const { lead, nav } = useAppSelector((state) => state)

    useEffect(() => {
        dispatch(getLeadData('opportunity'))
    }, []);

    const [columnDefs] = useState<ColDef[]>(initialColumnDefs);

    const defaultColDef = {
        sortable: true,
        flex: 1,
        headerComponentParams: { placeholder: 'Enter Member ID' },
        resizable: true,
        suppressMovable: true,
        //cellClass: "uppercase",
        cellStyle: {
            color: '#181818',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '400',
            fontFamily: 'Inter',
        },
        headerClass: "whitespace-normal",
        wrapText: true,
        autoHeight: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
    }


    const handleCellClicked = (param: CellClickedEvent<LeadeData, any>) => {
        if (param?.rowIndex !== null && param?.data !== undefined) {
            handelOnSet(param?.rowIndex, [param?.data]);
        }
    }

    const gridOptions = {
        rowClass: 'custom-row-hover',
        // domLayout: 'autoHeight',
    };

    const onGridReady = (params: { api: any }) => {
        tableRef.current = params.api;
    };

    const handleSelectionChanged = (e: SelectionChangedEvent<LeadeData>) => {
        const selectedData = e.api.getSelectedRows();
        if (selectedData.length > 0) {
            setFieldStatus(false)
            setSelectedCell(selectedData)
        } else {
            setFieldStatus(true)
            setSelectedCell([])
        }
    }

    const handelOnContactModel = () => {
        dispatch(CreateOpportunityStatus(!nav?.OpportunityStatus))
        dispatch(getUser())
    }

    const handelOnSave = () => {
        handelOnContactModel()
        dispatch(getLeadData('opportunity'))
    }
    const handelOnFilter = (data: string) => {
        if (data === 'my_opportunities') {
            const filterData = `userId=${getUserID()}`
            dispatch(getLeadFilter({ leadStage: "opportunity", data: filterData }))
        } else if (data === 'yesterdays_opportunities') {
            const filterData = `fromDate=${moment(new Date()).subtract(1, 'days').format("YYYY-MM-DD")}&toDate=${moment(new Date()).format("YYYY-MM-DD")}`
            dispatch(getLeadFilter({ leadStage: "opportunity", data: filterData }))
        } else if (data === 'todays_opportunities') {
            const filterData = `fromDate=${moment(new Date()).format("YYYY-MM-DD")}&toDate=${moment(new Date()).add(1, 'days').format("YYYY-MM-DD")}`
            dispatch(getLeadFilter({ leadStage: "opportunity", data: filterData }))
        } else if (data === 'this_week_opportunities') {
            const filterData = `fromDate=${moment().startOf('week').format('YYYY-MM-DD')}&toDate=${moment().endOf('week').format('YYYY-MM-DD')}`
            dispatch(getLeadFilter({ leadStage: "opportunity", data: filterData }))
        } else if (data === 'this_month_opportunities') {
            const filterData = `fromDate=${moment().startOf('month').format('YYYY-MM-DD')}&toDate=${moment().endOf('month').add(1, 'days').format('YYYY-MM-DD')}`
            dispatch(getLeadFilter({ leadStage: "opportunity", data: filterData }))
        } else if (data === 'last_month_opportunities') {
            const filterData = `fromDate=${moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD')}&toDate=${moment().subtract(1, 'months').endOf('month').add(1, 'days').format('YYYY-MM-DD')}`
            dispatch(getLeadFilter({ leadStage: "opportunity", data: filterData }))
        } else if (data === 'all_opportunities') {
            dispatch(getLeadData('opportunity'))
        }

        setFilterData(data)
    }

    const TopHeader = useMemo(() => OpportunitiesListView?.filter?.((item: any) => item?.value === filterData)?.[0]?.lable, [filterData])

    const handelOnTableChange = (data: string) => {
        setActive(data)
    }
    const handelOnDelete = () => {
        dispatch(deleteLeadsData(filterId(selectedCell))).unwrap().then((res: any) => {
            if (res) {
                toast.success(res?.data?.message ? res?.data?.message : "Leads Delete Successfully");
                dispatch(getLeadData('opportunity'))
                setFieldStatus(true)
            }
        })
            .catch((err: any) => {
                const error = JSON.parse(err?.message)
                toast.error(error?.message ? error?.message : "Something went wrong");
            })

    }

    const handelOnSearch = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchValue(e?.target.value)
    }

    const filteredActivities = React.useMemo(() => {
        if (lead?.LeadData?.leads?.length > 0) {
            if (searchValue) {
                return dataFilter(
                    lead?.LeadData?.leads?.map((item: any) => ({
                        ...item,
                    })),
                    searchValue,
                    ['name', 'techStack', 'phone', 'classMode', 'leadStatus']
                );
            } else {
                return lead?.LeadData?.leads;
            }
        } else {
            return [];
        }
    }, [lead?.LeadData, searchValue]);

    return (
        <div className="lg:w-full">
            <div className="mx-5 my-2.5 py-2.5 shadow-lg border-2 bg-[#FFF] rounded-lg">
                <TableHeader handelOnSearch={handelOnSearch} searchValue={searchValue} active={active} handelOnTableChange={handelOnTableChange} filterData={filterData} handelOnFilter={handelOnFilter} filterList={OpportunitiesListView} headerImg={Contact} headerLable={TopHeader} headerBtnLable="Create Opportunitiy" headerBtnOnClick={handelOnContactModel} deletBtnStatus={fieldStatus} isdelLoader={lead?.isdelLoader} handelOnDelete={handelOnDelete} />
                {active === 'table' ?
                    <div className="w-full px-5 gap-6 xl:h-full">
                        <div className={`flex min-h-[70vh] xl:min-h-[73vh] xl:h-full w-${lead?.isLoader ? '[fit-content]' : 'full'} mx-auto ag-theme-alpine`}>
                            {
                                lead?.isLoader ? ( // Check if contactData is null
                                    <Loader size={10} />
                                ) :
                                    <div className='relative overflow-auto' style={{ width: "100%" }}>
                                        <AgGridReact
                                            ref={tableRef}
                                            rowData={filteredActivities}
                                            columnDefs={columnDefs}
                                            defaultColDef={defaultColDef}
                                            enableBrowserTooltips={true}
                                            //tooltipShowDelay={{ tooltipShowDelay: 2 }}
                                            rowSelection='multiple'
                                            pagination={true}
                                            onCellClicked={handleCellClicked}
                                            gridOptions={gridOptions}
                                            paginationAutoPageSize={true}
                                            onSelectionChanged={(e) => handleSelectionChanged(e)}
                                            onGridReady={onGridReady}
                                            animateRows={true}
                                            suppressRowClickSelection={true}
                                            overlayNoRowsTemplate={'Leads data no found'}
                                        />
                                    </div>}
                        </div>
                    </div> : <LeadsKanban />}
            </div>
            {
                nav?.OpportunityStatus && <CreateOpportunitie handelOnContactModel={handelOnContactModel} handelOnSave={handelOnSave} />
            }
        </div>
    )
}

export default OpportunitiesPage