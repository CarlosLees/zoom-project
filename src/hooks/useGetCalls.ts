import { useEffect, useState } from 'react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';

export const useGetCalls = () => {
    const [calls, setCalls] = useState<Call[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const client = useStreamVideoClient();
    const { user } = useUser();

    useEffect(() => {
        const loadCalls = async () => {
            if (!client || !user?.id) return;

            try {
                const response = await client.queryCalls({
                    sort: [{ field: 'starts_at', direction: -1 }],
                    filter_conditions: {
                        starts_at: { $exists: true },
                        $or: [
                            {
                                created_by_user_id: user.id,
                            },
                            { members: { $in: [user.id] } },
                        ],
                    },
                });
                setCalls(response.calls);
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        };
        loadCalls().then();
    }, [client, user?.id]);

    const now = new Date();
    const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
        return (startsAt && new Date(startsAt) < now) || !!endedAt;
    });
    const upcomingCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
        return startsAt && new Date(startsAt) > now;
    });

    return {
        endedCalls,
        upcomingCalls,
        recordings: calls,
        isLoading,
    };
};
