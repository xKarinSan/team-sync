type RTC = {
    // for client
    client: any;

    // for local track
    localAudioTrack: any;
    localVideoTrack: any;

    screenShareClient: any;
    // for screen sharing
    localScreenShareVideoTrack: any;
    localScreenShareAudioTrack: any;

    // remoteScreenShareVideoTrack: any;
    // remoteScreenShareAudioTrack: any;
};
type Options = {
    appId?: string;
    token: string | null;
};

export let rtc: RTC = {
    // For the local client
    client: null,
    // For the local audio and video tracks

    localAudioTrack: null,
    localVideoTrack: null,

    screenShareClient: null,
    // for screen sharing
    // if you are the one sharing
    localScreenShareVideoTrack: null,
    localScreenShareAudioTrack: null,

    // if someone else is sharing his/her screen
    // remoteScreenShareVideoTrack: null,
    // remoteScreenShareAudioTrack: null,
};

export const options: Options = {
    // Pass your app ID here
    appId: process.env.NEXT_PUBLIC_AGODA_APP_ID,
    // Pass a token if your project enables the App Certificate
    token: null,
};
