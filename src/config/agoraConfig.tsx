type RTC = {
    client: any;
    localAudioTrack: any;
    localVideoTrack: any;
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
};

export const options: Options = {
    // Pass your app ID here
    appId: process.env.NEXT_PUBLIC_AGODA_APP_ID,
    // Pass a token if your project enables the App Certificate
    token: null,
};
