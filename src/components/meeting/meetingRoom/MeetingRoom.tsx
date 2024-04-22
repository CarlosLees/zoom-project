'use client';

import { useState } from 'react';

import {
    CallControls,
    CallingState,
    CallParticipantsList,
    CallStatsButton,
    PaginatedGridLayout,
    SpeakerLayout,
    useCallStateHooks,
} from '@stream-io/video-react-sdk';

import { LayoutList, Users } from 'lucide-react';

import { useSearchParams } from 'next/navigation';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { cn } from '@/lib/utils';
import EndCallButton from '@/components/endCallButton/EndCallButton';
import Loader from '@/components/loader/Loader';

export type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
    const searchParams = useSearchParams();
    const isPersonalRoom = !!searchParams.get('personal');
    const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
    const [showParticipants, setShowParticipants] = useState(false);

    const { useCallCallingState } = useCallStateHooks();
    const callCallingState = useCallCallingState();

    if (callCallingState !== CallingState.JOINED) {
        return <Loader />;
    }

    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />;
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition="left" />;
            default:
                return <SpeakerLayout participantsBarPosition="right" />;
        }
    };

    return (
        <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
            <div className="relative flex size-full items-center justify-center">
                <div className=" flex size-full max-w-[1000px] items-center">
                    <CallLayout />
                </div>
                <div
                    className={cn('h-[calc(100vh-86px)] px-6 py-8 mb-14 bg-dark-1 rounded-2xl', {
                        'show-block': showParticipants,
                        hidden: !showParticipants,
                    })}
                >
                    <CallParticipantsList
                        onClose={() => {
                            setShowParticipants(true);
                        }}
                    />
                </div>
            </div>
            <div className="flex-wrap fixed bottom-0 flex w-full items-center justify-center gap-5">
                <CallControls />
                <DropdownMenu>
                    <div className="flex items-center">
                        <DropdownMenuTrigger
                            className="cursor-pointer rounded-2xl
                         bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]"
                        >
                            <LayoutList size={20} className="text-white" />
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
                        {[
                            { id: 1, name: 'Grid' },
                            { id: 2, name: 'Speaker-Left' },
                            { id: 3, name: 'Speaker-Right' },
                        ].map((item) => {
                            return (
                                <div key={item.id}>
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        onClick={() =>
                                            setLayout(item.name.toLowerCase() as CallLayoutType)
                                        }
                                    >
                                        {item.name}
                                    </DropdownMenuItem>
                                </div>
                            );
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
                <CallStatsButton />
                <button onClick={() => setShowParticipants((prev) => !prev)}>
                    <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
                        <Users className="text-white" size={20} />
                    </div>
                </button>
                {!isPersonalRoom && <EndCallButton />}
            </div>
        </section>
    );
};

export default MeetingRoom;
