import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {  FacebookFilled } from "@ant-design/icons";
import Router from "next/router";
import toast from "react-toastify"; // hoặc thư viện bạn đang dùng
import { setAccessToken, setRefreshToken } from "../../utils/storage";
import * as Api from "../../api/api";
import GlobalStore from "../../stores/GlobalStore";
import { base64URLdecode } from "../../utils/utils";

export default function FacebookLoginBtn() {
  const { data: session, status } = useSession();

  console.log("Session data:", session);
  console.log("STATUS: ", status)

  useEffect(() => {
    if (session?.accessToken) {
      sendTokenToBackend(session.accessToken);
    }
  }, [session?.accessToken]);

  const sendTokenToBackend = async (token) => {
    try {
      const loginResult = await Api.post({
        url: "/customer/public/login-by-social",
        data: {
          token: token,
          socialType: "FACEBOOK",
        },
      });

      await setAccessToken(loginResult?.data?.accessToken);
      await setRefreshToken(loginResult?.data?.refreshToken);

      const tokens = loginResult?.data?.accessToken.split(".");
      const decoded = base64URLdecode(tokens[1]);
      const jsonObj = JSON.parse(decoded);
      GlobalStore.profile = {
        ...GlobalStore.profile,
        ...jsonObj,
      };
      GlobalStore.isLoggedIn = true;

      toast("Bạn đã đăng nhập thành công!", {
        type: "success",
        theme: "colored",
      });

      Router.reload();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

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
        className="bg-blue-500 text-white py-2.5 w-full rounded-xl border-2 border-white flex gap-x-2 px-2"
        onClick={() =>
          signIn("facebook")
        }
      >
        <FacebookFilled className="text-3xl" />
        <div className="self-center text-lg">Đăng nhập bằng FACEBOOK</div>
      </button>
    </div>
  );
}
