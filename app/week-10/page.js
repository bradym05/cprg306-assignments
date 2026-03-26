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

    const card =
        "w-full max-w-md rounded-2xl border border-white/10 bg-white/10 p-6 shadow-lg backdrop-blur";
    const title = "text-2xl font-semibold tracking-tight text-white";
    const subtitle = "mt-2 text-sm text-white/70";

    const btnBase =
        "inline-flex w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
    const btnPrimary =
        btnBase + " bg-white text-gray-900 hover:bg-white/90";
    const btnSecondary =
        btnBase + " bg-white/10 text-white hover:bg-white/15 border border-white/15";
    const btnDanger =
        btnBase + " bg-rose-500/90 text-white hover:bg-rose-500";

    const linkBtn =
        btnBase + " bg-emerald-500/90 text-white hover:bg-emerald-500";

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-12">
            <div className="mx-auto flex max-w-3xl items-center justify-center">
                <section className={card}>
                    {user ? (
                        <>
                            <h1 className={title}>Welcome</h1>
                            <p className={subtitle}>
                                Signed in as{" "}
                                <span className="font-medium text-white">
                                    {user.displayName ?? "GitHub User"}
                                </span>{" "}
                                <span className="text-white/60">({user.email})</span>
                            </p>

                            <div className="mt-6 space-y-3">
                                <a
                                    href="./week-10/shopping-list"
                                    className={linkBtn + " cursor-pointer"}
                                >
                                    Go to Shopping List
                                </a>

                                <button onClick={handleSignOut} className={btnDanger}>
                                    Sign out
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className={title}>Not signed in</h1>
                            <p className={subtitle}>
                                Sign in to access your shopping list.
                            </p>

                            <div className="mt-6 space-y-3">
                                <button
                                    onClick={handleSignIn}
                                    className={btnPrimary + " cursor-pointer"}
                                >
                                    Sign in with GitHub
                                </button>

                                <button onClick={handleSignOut} className={btnSecondary}>
                                    Sign out
                                </button>
                            </div>
                        </>
                    )}
                </section>
            </div>
        </main>
    );
}