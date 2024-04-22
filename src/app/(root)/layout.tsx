import { ReactNode } from 'react';

import StreamVideoProvider from '@/providers/StreamClientProvider';

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <StreamVideoProvider>
            <main>{children}</main>
        </StreamVideoProvider>
    );
};

export default RootLayout;
