import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import 'react-datepicker/dist/react-datepicker.css';

import '@stream-io/video-react-sdk/dist/css/styles.css';

import { Toaster } from '@/components/ui/toaster';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Zoom Project',
    description: 'Video calling App',
    icons: {
        icon: '/icons/logo.svg',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider
            appearance={{
                layout: {
                    logoImageUrl: '/icons/yoom-logo.svg',
                },
            }}
        >
            <html lang="en">
                <body className={`${inter.className} bg-dark-2`}>
                    <main>{children}</main>
                    <Toaster />
                </body>
            </html>
        </ClerkProvider>
    );
}
