'use client';

import { useRouter } from 'next/navigation';

import { Call, CallRecording } from '@stream-io/video-react-sdk';

import { useEffect, useState } from 'react';

import { useGetCalls } from '@/hooks/useGetCalls';
import MeetingCard from '@/components/meetingCard/MeetingCard';
import Loader from '@/components/loader/Loader';
import { useToast } from '@/components/ui/use-toast';

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
    const { endedCalls, upcomingCalls, recordings, isLoading } = useGetCalls();
    const [callRecordings, setCallRecordings] = useState<CallRecording[]>([]);

    const router = useRouter();
    const { toast } = useToast();

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'recordings':
                return callRecordings;
            case 'upcoming':
                return upcomingCalls;
            default:
                return [];
        }
    };

    const meetingIcon = () => {
        switch (type) {
            case 'ended':
                return '/icons/previous.svg';
            case 'recordings':
                return '/icons/recordings.svg';
            case 'upcoming':
                return '/icons/upcoming.svg';
            default:
                return '';
        }
    };

    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return 'No Previous Calls';
            case 'recordings':
                return 'No Recordings Calls';
            case 'upcoming':
                return 'No Upcoming Calls';
            default:
                return '';
        }
    };

    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const callData = await Promise.all(
                    recordings?.map((meet) => meet.queryRecordings()) ?? [],
                );

                const records = callData
                    .filter((call) => call.recordings.length > 0)
                    .flatMap((call) => call.recordings);

                setCallRecordings(records);
            } catch (e) {
                toast({
                    title: 'Error fetching recordings,Try again later',
                });
            }
        };

        if (type === 'recordings') {
            fetchRecordings().then();
        }
    }, [type, recordings]);

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();

    if (isLoading) return <Loader />;
    return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {calls && calls.length > 0 ? (
                calls.map((meeting: Call | CallRecording) => {
                    return (
                        <MeetingCard
                            key={(meeting as Call).id}
                            date={
                                (meeting as Call).state?.startsAt?.toLocaleString() ||
                                (meeting as CallRecording).start_time
                            }
                            handleClick={
                                type === 'recordings'
                                    ? () => {
                                          router.push(`${(meeting as CallRecording).url}`);
                                      }
                                    : () => {
                                          router.push(`/meeting/${(meeting as Call).id}`);
                                      }
                            }
                            icon={meetingIcon()}
                            link={
                                type === 'recordings'
                                    ? (meeting as CallRecording).url
                                    : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
                            }
                            title={
                                (meeting as Call).state?.custom.description.substring(0, 26) ||
                                (meeting as CallRecording).filename.substring(0, 26) ||
                                'No Description'
                            }
                            isPreviousMeeting={type === 'ended'}
                            buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
                            buttonText={type === 'recordings' ? 'Play' : 'Start'}
                        />
                    );
                })
            ) : (
                <h1>{noCallsMessage}</h1>
            )}
        </div>
    );
};

export default CallList;
