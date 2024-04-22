'use client';

import { useState } from 'react';

import HomeCard from '@/components/meetingTypeList/homeCard/HomeCard';
import MeetingModal from '@/components/meetingTypeList/meetingModal/MeetingModal';

const MeetingTypeList = () => {
    // const router = useRouter();

    const [meetingState, setMeetingState] = useState<
        'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
    >();

    const createMeeting = () => {};

    return (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <HomeCard
                imageUrl="/icons/add-meeting.svg"
                title="New Meeting"
                description="Start an instant Meeting"
                handleClick={() => setMeetingState('isInstantMeeting')}
                className="bg-orange-400"
            />
            <HomeCard
                imageUrl="/icons/schedule.svg"
                title="Schedule Meeting"
                description="Plan your meeting"
                handleClick={() => setMeetingState('isScheduleMeeting')}
                className="bg-blue-400"
            />
            <HomeCard
                imageUrl="/icons/recordings.svg"
                title="View Recordings"
                description="Start an instant Meeting"
                handleClick={() => setMeetingState('isJoiningMeeting')}
                className="bg-purple-400"
            />
            <HomeCard
                imageUrl="/icons/join-meeting.svg"
                title="Join Meeting"
                description="via invitation link"
                handleClick={() => setMeetingState('isJoiningMeeting')}
                className="bg-yellow-400"
            />

            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Start an Instant Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />
        </section>
    );
};

export default MeetingTypeList;
