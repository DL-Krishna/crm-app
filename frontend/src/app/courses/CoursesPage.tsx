'use client'
import * as React from 'react'
import Contact from "../../assets/employee_contact.svg"
import { AgGridReact } from 'ag-grid-react';
import { CellClickedEvent, ColDef, SelectionChangedEvent } from 'ag-grid-community';
import { useRef, useState, useEffect, useMemo } from 'react'
import { OpportunitiyData } from '../component/Type'
import TableHeader from '../component/TableHeader'
import Loader from '../component/Loader';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { toast } from 'react-toastify';
import { CoursePageView } from '@/api/CommonData';
import { getUser } from '@/lib/features/auth/authSlice';
import CreateCourses from './CreateCourses';
import { getCourses } from '@/lib/features/courses/coursesSlice';


const initialColumnDefs: ColDef[] = [
    {
        field: 'name', headerName: "Course",
        minWidth: 230, maxWidth: 400,
        checkboxSelection: true,
        headerCheckboxSelection: true
    },
    {
        field: 'description', headerName: "Description",
        minWidth: 600, maxWidth: 1050,
    },
    {
        field: 'courseFee', headerName: "Course Fee",
        minWidth: 230, maxWidth: 400,
        cellRenderer: (params: { data: any; }) => {
            const data = params.data;
            return (
                <div className='flex items-center gap-2 capitalize '>
                    {data?.courseFee ? data?.courseFee : "-"}
                </div>
            );
        },
    },

];

const LearnerPage = ({ handelOnSet }: { handelOnSet: (id: number, data: OpportunitiyData[]) => void }) => {
    const dispatch = useAppDispatch()
    const tableRef = useRef<any>(null);
    const [courseModel, setCourseModel] = useState<Boolean>(false);
    const [selectedCell, setSelectedCell] = useState<any>([]);
    const [filterData, setFilterData] = useState<any>(CoursePageView?.[0]?.value);
    const { isLoader, CoursesData } = useAppSelector((state) => state?.courses)

    useEffect(() => {
        dispatch(getCourses())
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


    const handleCellClicked = (param: CellClickedEvent<OpportunitiyData, any>) => {
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

    const handleSelectionChanged = (e: SelectionChangedEvent<OpportunitiyData>) => {
        const selectedData = e.api.getSelectedRows();
        if (selectedData.length > 0) {
            setSelectedCell(selectedData)
        } else {
            setSelectedCell([])
        }
    }

    const handelOnCoursesModel = () => {
        setCourseModel(!courseModel);
        dispatch(getUser())
    }

    const handelOnSave = () => {
        handelOnCoursesModel()
    }
    const handelOnFilter = (data: string) => {
        setFilterData(data)
    }

    const TopHeader = useMemo(() => CoursePageView?.filter?.((item: any) => item?.value === filterData)?.[0]?.lable, [filterData])

    return (
        <div className="lg:w-full">
            <div className="mx-5 my-2.5 py-2.5 shadow-lg border-2 bg-[#FFF] rounded-lg">
                <TableHeader filterData={filterData} handelOnFilter={handelOnFilter} filterList={CoursePageView} headerImg={Contact} headerLable={TopHeader} headerBtnLable="Create Course" headerBtnOnClick={handelOnCoursesModel} />
                <div className="w-full px-5 gap-6 xl:h-full">
                    <div className={`flex min-h-[70vh] xl:min-h-[73vh] xl:h-full w-${isLoader ? '[fit-content]' : 'full'} mx-auto ag-theme-alpine`}>
                        {
                            isLoader ? ( // Check if contactData is null
                                <Loader size={10} />
                            ) :
                                <div className='relative overflow-auto' style={{ width: "100%" }}>
                                    <AgGridReact
                                        ref={tableRef}
                                        rowData={CoursesData?.courses?.length > 0 ? CoursesData?.courses : []}
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
                                        overlayNoRowsTemplate={'Learner data no found'}
                                    />
                                </div>}
                    </div>
                </div>
            </div>
            {
                courseModel && <CreateCourses handelOnCoursesModel={handelOnCoursesModel} handelOnSave={handelOnSave} />
            }
        </div>
    )
}

export default LearnerPage