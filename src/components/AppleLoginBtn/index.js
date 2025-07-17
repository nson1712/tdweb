import { signIn, signOut, useSession } from "next-auth/react";

export default function AppleLoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn("apple")}>Sign in with Apple</button>
    </>
  );
}