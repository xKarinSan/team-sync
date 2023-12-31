export type Membership = {
    // id of team user joined
    teamId: string;

    // id of member
    userId: string;

    // date when joined
    joinedDate: any;

};

export type MembershipDisplay = {
    teamId: string;
    teamName: string;
    createdDate: any;
};
