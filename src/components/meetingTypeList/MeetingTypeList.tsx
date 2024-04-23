'use client';

import { useState } from 'react';

import { useUser } from '@clerk/nextjs';

import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

import { useRouter } from 'next/navigation';

import ReactDatePicker from 'react-datepicker';

import HomeCard from '@/components/meetingTypeList/homeCard/HomeCard';
import MeetingModal from '@/components/meetingTypeList/meetingModal/MeetingModal';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

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

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

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
                handleClick={() => router.push('/recordings')}
                className="bg-purple-400"
            />
            <HomeCard
                imageUrl="/icons/join-meeting.svg"
                title="Join Meeting"
                description="via invitation link"
                handleClick={() => setMeetingState('isJoiningMeeting')}
                className="bg-yellow-400"
            />

            {!callDetail ? (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title="Create Meeting"
                    className="text-center"
                    handleClick={createMeeting}
                >
                    <div className="flex flex-col gap-2.5">
                        <label className="text-base text-normal leading-[22px] text-sky-300">
                            Add Description
                        </label>
                        <Textarea
                            className="border-none bg-black focus-visible:right-0 focus-visible:ring-offset-0"
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex w-full flex-col gap-2.5">
                        <label className="text-base text-normal leading-[22px] text-sky-300">
                            Select Date and Time
                        </label>
                        <ReactDatePicker
                            selected={values.datetime}
                            onChange={(date) => {
                                setValues({ ...values, datetime: date! });
                            }}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="w-full rounded bg-dark-2 focus:outline-none"
                        />
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title="Meeting Created"
                    className="text-center"
                    handleClick={() => {
                        toast({ title: 'Link copied' });
                        navigator.clipboard.writeText(meetingLink).then();
                    }}
                    image="/icons/checked.svg"
                    buttonIcon="/icons/copy.svg"
                    buttonText="Copy Meeting Link"
                />
            )}

            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Start an Instant Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />

            <MeetingModal
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Type the link here"
                className="text-center"
                buttonText="Join Meeting"
                handleClick={() => {
                    router.push(values.link);
                }}
            >
                <Input
                    placeholder="Meeting link"
                    onChange={(e) => setValues({ ...values, link: e.target.value })}
                    className="border-none text-black bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </MeetingModal>
        </section>
    );
};

export default MeetingTypeList;
