// base
// id is teamid
export type Conference = {
    // team which meeting is occuring at
    participants: Participant[];
    // is the meeting currenlty active?
    isActive: boolean;

    // the last time the meeting started (date object)
    // this is to add a meeting record when the meeting ends
    lastStarted: any;

    // userId of host
    hostId: string;
};

// id is uerId
export type Participant = {
    preferences: ParticipantPreferences;
};

export type ParticipantPreferences = {
    // id of participant
    // userId: string;
    // name of participant
    username: string;
    // is user's camera on?
    videoEnbaled: boolean;
    // is user's mic on?
    micEnabled: boolean;
    // is user screen-sharing?
    screenShareEnabled: boolean;
};
