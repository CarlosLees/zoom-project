'use server';

import { currentUser } from '@clerk/nextjs/server';
import { StreamClient } from '@stream-io/node-sdk';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
    const user = await currentUser();

    if (!user) throw new Error('No user provided');
    if (!apiKey) throw new Error('No api key provided');
    if (!apiSecret) throw new Error('No api secret provided');

    const client = new StreamClient(apiKey, apiSecret, { timeout: 3000 });

    // exp is optional (by default the token is valid for an hour)
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

    const issued = Math.floor(new Date().getTime() / 1000) - 60;

    return client.createToken(user.id, exp, issued);
};
