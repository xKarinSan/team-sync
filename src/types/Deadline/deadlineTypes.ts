// the base
export type Deadline = {
    userId: string;
    description: string;

    // for the actual deadline
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
};

// taken from the form
export interface DeadlineFormInput extends Deadline {
    // either team or user (individual)
    teamId: string;
}

// generate timestamps with given inputs, to put inside db
export interface DeadlineWithTimestamp extends DeadlineFormInput {
    // impt timestamps
    // timestamp based on year,month,day,hour,minute
    deadlineDateTime: any;

    // timestamp of current time for both
    // only during initial creation
    addedDateTime: any;

    // initial creation & during updates
    updatedDateTime: any;
}

// for retrieval
export interface DeadlineRecord extends DeadlineWithTimestamp {
    // id after its taken
    id: string;
}
