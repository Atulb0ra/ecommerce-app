import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

export default function Auth() {
    return (
        <header>
            <SignedOut >
                <div className='bg-indigo-500 p-2 rounded-xl px-6'>
                    <SignInButton />
                </div>
            </SignedOut>
            <SignedIn>
                <div className='mt-2'>
                    <UserButton />
                </div>
            </SignedIn>
        </header >
    );
}