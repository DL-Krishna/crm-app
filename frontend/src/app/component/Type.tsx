export interface LeadeData {
    name: string;
    phone: string;
    countryCode: string;
    email: string;
    leadSource: string;
    techStack: string;
    courseId: any;
    classMode: string;
    feeQuoted: any;
    batchTiming: string;
    leadStatus: string;
    description: string;
    nextFollowUp: string;
}
export interface LeadeData1 {
    [key: string]: any | null; // Define the structure of the leade object
}
export const LeadeDataView = {
    name: "",
    phone: "",
    countryCode: "",
    email: "",
    leadSource: "",
    techStack: "",
    courseId: [],
    classMode: "",
    feeQuoted: "",
    batchTiming: "",
    leadStatus: "",
    description: "",
    nextFollowUp: "",
}
export interface RowDataStatus {
    name: boolean;
    phone: boolean;
    countryCode: boolean;
    email: boolean;
    leadSource: boolean;
    techStack: boolean;
    courseId: boolean;
    classMode: boolean;
    feeQuoted: boolean;
    batchTiming: boolean;
    leadStatus: boolean;
    description: boolean;
    nextFollowUp: boolean;
}

export const RowDataView = {
    name: true,
    phone: true,
    countryCode: true,
    email: true,
    leadSource: true,
    techStack: true,
    courseId: true,
    classMode: true,
    feeQuoted: true,
    batchTiming: true,
    leadStatus: true,
    description: true,
    nextFollowUp: true,
}

export interface AccordionItemProps {
    data: Array<[]>,
    content: string;
    linkText?: string;
    links?: { url: string; text: string }[];
}

export interface ActivityAccordionTaskData {
    id: number;
    title: string;
    data?: {
        new_task?: {
            title: string;
            description: string;
        };
        new_meeting?: {
            title: string;
            description: string;
        };
        email?: {
            title: string;
            description: string;
        };
    }[];
}
interface Task {
    title: string;
    description: string;
}[]

export type DataItem = {
    [key: string]: Task;
};

export interface PriorityItem {
    lable: string;
    value: string;
}
export interface HostItem {
    lable: string;
    value: string;
}

export interface TaskRowData {
    subject: string;
    dueDate: string;
    priority: string;
    owner: string;
}
export const TaskType = {
    subject: '',
    dueDate: '',
    priority: '',
    owner: '',
    salesperson: '', // Assuming these are part of TaskRowData
    email: '',
    phoneNumber: ''
}
export interface AttendanceRowData {
    userId: string;
    clockIn: string;
    clockOut: string;
    workingHours: string;
}
export interface TaskRowData {
    salesperson: string;
    email: string;
    phoneNumber: string;
}

export type ErrorObject = {
    [key: string]: string; // Define a string index signature
};

export interface NewTaskRowData {
    userId: string;
    priority: string;
    dueDate: string;
    subject: string;
}
export const NewTaskView = {
    userId: '',
    priority: '',
    dueDate: '',
    subject: '',
}
export interface EmailRowData {
    to: string;
    bcc: string;
    from: string;
    subject: string;
    html: string;
}
export const EmailView = {
    to: '',
    bcc: '',
    from: '',
    html: '',
    subject: '',
}
export interface MeetingRowData {
    hostId: string;
    participants: string;
    meetingName: string;
    location: string;
    startTime: string;
    endTime: string;
}
export const MeetingView = {
    hostId: '',
    participants: '',
    meetingName: '',
    location: '',
    startTime: '',
    endTime: '',
}
export interface WhatsAppRowData {
    phoneNumber: string;
    messageContent: string;
}
export const WhatsAppView = {
    phoneNumber: '',
    messageContent: '',
}
export interface MessageRowData {
    phoneNumber: string;
    messageContent: string;
}
export const MessageView = {
    phoneNumber: '',
    messageContent: '',
}
export interface LogCallRowData {
    callTo: string;
    callType: string;
    outgoingCallStatus: string;
    callStartTime: string;
    callEndTime: string;
    subject: string;
    voiceRecording: string;
}
export const LogCallView = {
    callTo: '',
    callType: '',
    outgoingCallStatus: '',
    callStartTime: '',
    callEndTime: '',
    subject: '',
    voiceRecording: '',
}
export interface TrackingRowData {
    latitude: string;
    longitude: string;
    address: string;
    id: string
}



export interface OpportunitiyData {
    name: string;
    phone: string;
    email: string;
    demoAttendedDate: string;
    opportunityStage: string;
    demoAttendedStage: string;
    visitedStage: string;
    coldLeadReason: string;
}

export interface OpportunitiyData1 {
    [key: string]: any | null; // Define the structure of the leade object
}

export const OpportunitiyDataView = {
    name: "",
    phone: "",
    email: "",
    demoAttendedDate: "",
    opportunityStage: "",
    demoAttendedStage: "",
    visitedStage: "",
    coldLeadReason: "",
}
export const OpportunitiyDisableDataView = {
    name: true,
    opportunityStatus: true,
    phone: true,
    opportunityStage: true,
    email: true,
    demoAttendedStage: true,
    feeQuoted: true,
    visitedStage: true,
    batchTiming: true,
    coldLeadReason: true,
    description: true,
}


export interface LearnerData {
    fullName: string;
    dateofBirth: string;
    phone: string;
    email: string;
    techstack: string;
    courseDetails: string;
    source: string;
    registeredDate: string;
    attendedDemo: string;
    modeofClass: string;
    learnerImage: any;

}
export const LearnerDataView = {
    fullName: "",
    dateofBirth: "",
    phone: "",
    email: "",
    techstack: "",
    courseDetails: "",
    source: "",
    registeredDate: "",
    attendedDemo: "",
    modeofClass: "",
    learnerImage: '',
}

export interface LearnerDisableData {
    fullName: boolean;
    dateofBirth: boolean;
    phone: boolean;
    email: boolean;
    techstack: boolean;
    courseDetails: boolean;
    source: boolean;
    registeredDate: boolean;
    attendedDemo: boolean;
    modeofClass: boolean;
    learnerImage: boolean;

}
export const LearnerDisableDataView = {
    fullName: true,
    dateofBirth: true,
    phone: true,
    email: true,
    techstack: true,
    courseDetails: true,
    source: true,
    registeredDate: true,
    attendedDemo: true,
    modeofClass: true,
    learnerImage: true,
}


export interface CoursesData {
    courseName: string;
    courseFee: string;
    description: string;
    courseBrochure: any;
    courseImage: any;

}
export const CoursesDataView = {
    courseName: "",
    courseFee: "",
    description: "",
    courseBrochure: "",
    courseImage: "",
}