// the base
export type Meeting = {
    // team which meeting is occuring at
    teamId: string;
    hostId: string;
};

export interface MeetingWithTimestamp extends Meeting {
    // start & end
    startDate: any;
    // default is -1
    endDate: any;
}

// taken from the form
export interface MeetingRecord extends MeetingWithTimestamp {
    // id after its taken
    id: string;
}
