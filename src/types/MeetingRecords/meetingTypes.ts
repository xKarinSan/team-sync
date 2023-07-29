// the base
export type Meeting = {
    // team which meeting is occuring at
    // teamId: string;
    // start & end
    startDate: any;
    // default is -1
    endDate: any;
};

// taken from the form
export interface MeetingRecord extends Meeting {
    // id after its taken
    id: string;
}
