import { HostItem, PriorityItem } from "@/app/component/Type";
import { useEffect } from "react";

export const navigation = [
    { name: 'Home', href: '/home', current: true },
    { name: 'Leads', href: '/leads', current: false, children: [{ name: 'Create Lead' }] },
    { name: 'Opportunities', href: '/opportunities', current: false, children: [{ name: 'Create Opportunity' }, { name: 'Visited' }, { name: 'Demo Attended' }] },
    { name: 'Learners', href: '/learner', current: false },
    { name: 'Courses', href: '/courses', current: false },
    { name: 'Activities', href: '#', current: false },
    { name: 'Analytics', href: '#', current: false },
];

export const LeadSource = [
    "None",
    "Walk In",
    "Student Referral",
    "Demo",
    "WebSite",
    "Website Chat",
    "Inbound Call",
    "Google AdWords",
    "Facebook Ads",
    "Google My Business",
    "WhatsApp - Digital Lync",
]

export const LeadStatus = [
    "None",
    "NotContacted",
    "Attempted",
    "Warm Lead",
    "Opportunity",
    "Attended Demo",
    "Visited",
    "Registered",
    "Cold Lead",
]

export const TechStack = [
    "Career Counselling",
    "Business Stack",
    "ServiceNow",
    "DataStack",
    "FullStack",
    "Salesforce",
    "Cloud Ops",
]

export const ClassMode = [
    "International Online",
    "India Online",
    "BLR ClassRoom",
    "HYD ClassRoom",
]
export const BatchTiming = [
    "7AM-8AM",
    "8AM-9AM",
    "9AM-10AM",
    "10AM-11AM",
    "11AM-12PM",
    "12PM-1PM",
    "1PM-2PM",
    "2PM-3PM",
    "3PM-4PM",
    "4PM-5PM",
    "5PM-6PM",
    "6PM-7PM",
    "7PM-8PM",
    "8PM-9PM",
]

export const Prioritydata: PriorityItem[] = [
    { lable: "High", value: "High" },
    { lable: "Low", value: "Low" },
    { lable: "Medium", value: "Medium" },
]

export const DealListView: HostItem[] = [
    { lable: "All Leads", value: "all_leads" },
    { lable: "My Leads", value: "my_leads" },
    { lable: "Today’s Leads", value: "todays_leads" },
    { lable: "Yesterday’s Leads", value: "yesterdays_leads" },
    { lable: "This Week Leads", value: "this_week_leads" },
    { lable: "This Month Leads", value: "this_month_leads" },
    { lable: "LastMonth Leads", value: "lastmonth_leads" },
];
export const OpportunitiesListView: HostItem[] = [
    { lable: "My Opportunities", value: "my_opportunities" },
    { lable: "Today’s Opportunities", value: "todays_opportunities" },
    { lable: "Yesterday’s Opportunities", value: "yesterdays_opportunities" },
    { lable: "This Week Opportunities", value: "this_week_opportunities" },
    { lable: "This Month Opportunities", value: "this_month_opportunities" },
    { lable: "Last Month Opportunities", value: "last_month_opportunities" },
    { lable: "All Opportunities", value: "all_opportunities" },
];

export const LearnerPageView: HostItem[] = [
    { lable: "Today’s Registrations", value: "todays_registrations" }
]
export const CoursePageView: HostItem[] = [
    { lable: "Courses", value: "courses" }
]

export const OpportunityStage = [
    'None',
    'Advanced Discussion',
    'Ready To Join',
    'Visiting',
    'Fees Negotiation',
    'Batch Allocation',
    'Intersted in Demo',
    'Need Time This week',
    'Need Time Next Week',
    'Need Time This Month',
    'Needs Time Next Month',
    'Special Requirements',
    'Payment Link Sent',
    'Closed Won(Registered)',
    'Busy & Asked a call back',
    'Closed Lost',
]

export const DemoAttendedStage = [
    'None',
    'Ready to Join',
    'Advanced Discussion',
    'Call Not Answered',
    'Visiting',
    'Fees Negotiation',
    'Batch Allocation',
    'Need time this Week',
    'Need Time Next Week',
    'Need Time This Month',
    'Need Time Next Month',
    'Special Requirements',
    'Closed Won(Registered)',
    'Closed Lost(Cold Lead)',
]

export const VisitedStage = [
    'None',
    'Call Not Answered',
    'Ready To Join',
    'Fees Negotiation',
    'Batch Allocation',
    'Interested Demo',
    'Special Requirements',
    'Need Time This week',
    'Need Time Next Week',
    'Need Time This Month',
    'Need Time Next Month',
    'Closed Won(Registered)',
    'Closed Lost(Cold Lead)',
]

export const ColdLeadReason = [
    'None',
    'Invalid Number',
    'Not Interested',
    'Joined another institute',
    'Asking free course',
    'Pay after Placement',
]

export const OpportunityStatus = [
    'Visited',
    'Demo attended',
    'ColdLead',
]




// hooks
export const filterId = (selectedCell: any[]) => {
    return selectedCell?.map((item: any) => { return item?.id })?.join()
}

export const dataFilter = (options: any[], searchValue: string = '', fields: string[] = []) => {
    return options?.filter((option: any) => {
        // Check if any field in the option matches the search value
        return fields?.some((field: any) => {
            // Perform filtering logic for each field
            const fieldValue = option?.[field] || '';
            return fieldValue?.toLowerCase().indexOf(searchValue?.toLowerCase()) > -1;
        });
    });
};


export const extractFilename = (url: any) => {
    const pathname = new URL(url).pathname;
    // Extract filename from pathname
    const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
    return decodeURIComponent(filename);
}

type Ref<T> = React.RefObject<T>;

type EventHandler = (event: MouseEvent | TouchEvent) => void;

export function useOnClickOutsideMultiple(refs: Ref<any>[], handler: EventHandler): void {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            // Check if the event target is not contained in any of the refs
            if (refs.every(ref => !ref.current || !ref.current.contains(event.target as Node))) {
                handler(event);
            }
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [refs, handler]);
}

export const FilterLableAndValue = (datas: any) => {
    const data: HostItem[] = datas?.map((item: any) => { return { lable: item, value: item } })
    return data
}

export const DateFormate = (data: string) => {
    if (data) {
        const date = new Date(data);
        const convertedDate = date.toISOString().split('T')[0];
        return convertedDate
    }
    return ''
}









//create leade
export const createLeadForm: any = [
    { name: 'name', lableValue: 'Name', placeholder: 'Name', typeValue: 'text', type: "input" },
    { name: 'leadStatus', lableValue: 'Lead Status', data: FilterLableAndValue(LeadStatus), type: "select" },
    { name: 'countryCode', lableValue: 'CC', placeholder: 'CC', typeValue: 'text', type: "input" },
    { name: 'leadSource', lableValue: 'Lead Source', data: FilterLableAndValue(LeadSource), type: "select" },
    { name: 'phone', lableValue: 'Phone', placeholder: 'Phone', typeValue: 'text', type: "input" },
    { name: 'techStack', lableValue: 'Tech Stack', data: FilterLableAndValue(TechStack), type: "select" },
    { name: 'email', lableValue: 'Email', placeholder: 'Email', typeValue: 'email', type: "input" },
    { name: 'courseId', lableValue: 'Course', type: "multiSelect" },
    { name: 'feeQuoted', lableValue: 'Fee Quoted', placeholder: 'Fee Quoted', typeValue: 'number', type: "input" },
    { name: 'classMode', lableValue: 'Class Mode', data: FilterLableAndValue(ClassMode), type: "select" },
    { name: 'batchTiming', lableValue: 'Batch Timing', data: FilterLableAndValue(BatchTiming), type: "select" },
    { name: 'nextFollowUp', lableValue: 'Next FollowUp', placeholder: 'Next FollowUp', typeValue: 'date', type: "input" },
]

//create Opportunity
export const createOpportunityForm: any = [
    { name: 'name', lableValue: 'Name', placeholder: 'Name', typeValue: 'text', type: "input" },
    { name: 'opportunityStatus', lableValue: 'Opportunity Status', data: FilterLableAndValue(OpportunityStatus), type: "select" },
    { name: 'countryCode', lableValue: 'CC', placeholder: 'CC', typeValue: 'text', type: "input" },
    { name: 'opportunityStage', lableValue: 'Opportunity Stage', data: FilterLableAndValue(OpportunityStage), type: "select" },
    { name: 'phone', lableValue: 'Phone', placeholder: 'Phone', typeValue: 'text', type: "input" },
    { name: 'demoAttendedStage', lableValue: 'Demo Attended Stage', data: FilterLableAndValue(DemoAttendedStage), type: "select" },
    { name: 'email', lableValue: 'Email', placeholder: 'Email', typeValue: 'email', type: "input" },
    { name: 'visitedStage', lableValue: 'Visited Stage', data: FilterLableAndValue(VisitedStage), type: "select" },
    { name: 'feeQuoted', lableValue: 'Fee Quoted', placeholder: 'Fee Quoted', typeValue: 'number', type: "input" },
    { name: 'coldLeadReason', lableValue: 'Cold Lead Reason', data: FilterLableAndValue(ColdLeadReason), type: "select" },
    { name: 'batchTiming', lableValue: 'Batch Timing', placeholder: 'Batch Timing', typeValue: 'text', type: "input" },
]
