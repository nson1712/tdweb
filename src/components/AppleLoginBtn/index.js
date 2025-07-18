import { AppleFilled } from "@ant-design/icons";
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
    <div className="mx-auto w-[270px]">
      <button
        className="bg-black text-white py-2.5 w-full rounded-xl border-2 border-white flex gap-x-2 px-2"
        onClick={() =>
          signIn("apple", {
            callbackUrl: "https://tdweb-i3os.vercel.app",
          })
        }
      >
        <AppleFilled className="text-3xl" />
        <div className="self-center text-lg">Đăng nhập bằng APPLE</div>
      </button>
    </div>
  );
}
