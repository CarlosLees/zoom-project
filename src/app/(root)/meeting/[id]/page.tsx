'use client';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';

import MeetingSetup from '@/components/meeting/meetingSetup/MeetingSetup';
import MeetingRoom from '@/components/meeting/meetingRoom/MeetingRoom';
import Loader from '@/components/loader/Loader';
import { useGetCallById } from '@/hooks/useGetCallById';

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
    const { isLoaded } = useUser();
    const [isSetupComplete, setIsSetupComplete] = useState<boolean>(false);
    const { call, isCallLoading } = useGetCallById(id);

    if (!isLoaded || isCallLoading) return <Loader />;
    return (
        <div className="h-screen w-full">
            <StreamCall call={call}>
                <StreamTheme>
                    {!isSetupComplete ? (
                        <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
                    ) : (
                        <MeetingRoom />
                    )}
                </StreamTheme>
            </StreamCall>
        </div>
    );
};

export default Meeting;
