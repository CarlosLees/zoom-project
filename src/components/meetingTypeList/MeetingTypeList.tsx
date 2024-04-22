'use client';

import { useState } from 'react';

import { useUser } from '@clerk/nextjs';

import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

import { useRouter } from 'next/navigation';

import HomeCard from '@/components/meetingTypeList/homeCard/HomeCard';
import MeetingModal from '@/components/meetingTypeList/meetingModal/MeetingModal';
import { useToast } from '@/components/ui/use-toast';

const MeetingTypeList = () => {
    const router = useRouter();
    const { toast } = useToast();

    const [meetingState, setMeetingState] = useState<
        'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
    >();

    const { user } = useUser();
    const client = useStreamVideoClient();

    const [values, setValues] = useState({
        datetime: new Date(),
        link: '',
        description: '',
    });

    const [callDetail, setCallDetail] = useState<Call>();

    const createMeeting = async () => {
        if (!user || !client) return;

        try {
            const id = crypto.randomUUID();
            const call = client.call('default', id);
            if (!call) throw new Error('call failed');

            const startAt = values.datetime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant Meeting';

            await call.getOrCreate({
                data: {
                    starts_at: startAt,
                    custom: {
                        description,
                    },
                },
            });
            setCallDetail(call);

            if (!values.description) {
                router.push(`/meeting/${call.id}`);
            }

            toast({ title: 'Meeting Created' });
        } catch (e) {
            console.log(e);
            toast({ title: 'Failed to create meeting' });
        }
    };

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
