"use client";

import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    const handleSignIn = async () => {
        await gitHubSignIn();
    };

    const handleSignOut = async () => {
        await firebaseSignOut();
    };

    return (
        <div className="flex flex-col items-center justify-center">

            {user ? (
                <h1 className="shadow-xs text-white font-bold m-4">
                    Welcome, {user.displayName} ({user.email})
                </h1>
            ) : (
                <h1 className="shadow-xs text-white font-bold m-4">
                    Not signed in
                </h1>
            )}

            <button onClick={handleSignIn} className="hover:bg-white text-gray-600 hover:text-gray-800 p-3 m-4 bg-gray-300 rounded-2xl shadow-xs text-black font-semibold">
                Sign in with GitHub
            </button>
            <button onClick={handleSignOut} className="hover:bg-white text-gray-600 hover:text-gray-800 p-3 m-4 bg-gray-300 rounded-2xl shadow-xs text-black font-semibold">
                Sign out
            </button>
        </div>
    );
}