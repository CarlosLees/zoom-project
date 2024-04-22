import { ReactNode } from 'react';

import type { Metadata } from 'next';

import StreamVideoProvider from '@/providers/StreamClientProvider';

export const metadata: Metadata = {
    title: 'Zoom Project',
    description: 'Video calling App',
    icons: {
        icon: '/icons/logo.svg',
    },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <StreamVideoProvider>
            <main>{children}</main>
        </StreamVideoProvider>
    );
};

export default RootLayout;
