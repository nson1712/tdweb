import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import "../public/styles/styles.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-circular-progressbar/dist/styles.css";
import "../public/styles/react-datetime.scss";
import "../public/styles/styles.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GlobalStore from "../src/stores/GlobalStore";
import { redirectToBrowser, isCocCoc } from "../src/utils/utils";
import FacebookSDK from "../src/components/FacebookSDK";
import CommonLayout from "../src/layouts/CommonLayout/CommonLayout";
import ShortLogin from "../src/pages/Login/ShortLogin";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { Alert, Image, Modal } from "antd";

const MODAL_STORAGE_KEY = "lastPreviewShownDate";

function App({ Component, pageProps }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const lastShown = localStorage.getItem(MODAL_STORAGE_KEY);

    if (lastShown !== today) {
      setVisible(true);
      localStorage.setItem(MODAL_STORAGE_KEY, today);
    }
  }, []);

  useEffect(() => {
    // Function to handle text selection
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        GlobalStore.copyData = true;
      }
    };

    // Function to handle text copying
    const handleCopy = (e) => {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        GlobalStore.copyData = true;

        // Optional: Modify the copied text
        e.preventDefault(); // Prevent default copy behavior
      }
    };

    isCocCoc().then((result) => {
      if (result) {
        setOpen(true);
        console.log("Người dùng đang sử dụng trình duyệt Cốc Cốc.");
      } else {
        setOpen(false);
        console.log("Không phải trình duyệt Cốc Cốc.");
      }
    });

    // Redirect to browser instead of open webview
    redirectToBrowser();

    // Add event listeners
    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("copy", handleCopy);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("copy", handleCopy);
    };
  }, []);

  // useEffect(() => {
  //   (function () {
  //     // Create an alias for the decodeString function.
  //     const getDecodedString = decodeString;

  //     // This IIFE reorders the obfuscated array until a target sum is reached.
  //     (function (getArray, targetSum) {
  //       const decode = decodeString,
  //         obfuscatedArray = getArray();
  //       while (true) {
  //         try {
  //           const calculatedSum =
  //             parseInt(decode(0x160)) / 1 +
  //             (-parseInt(decode(0x14f)) / 2) * (parseInt(decode(0x159)) / 3) +
  //             (-parseInt(decode(0x157)) / 4) * (-parseInt(decode(0x15c)) / 5) +
  //             (parseInt(decode(0x153)) / 6) * (-parseInt(decode(0x14e)) / 7) +
  //             (-parseInt(decode(0x150)) / 8) * (parseInt(decode(0x15d)) / 9) +
  //             (-parseInt(decode(0x162)) / 10) *
  //               (-parseInt(decode(0x15f)) / 11) +
  //             (-parseInt(decode(0x15b)) / 12) * (parseInt(decode(0x15a)) / 13);
  //           if (calculatedSum === targetSum) break;
  //           else obfuscatedArray.push(obfuscatedArray.shift());
  //         } catch (error) {
  //           obfuscatedArray.push(obfuscatedArray.shift());
  //         }
  //       }
  //     })(getObfuscatedArray, 0xb7a63);

  //     // This function will execute several window actions after a short delay.
  //     const onOpen = () => {
  //       setTimeout(() => {
  //         const decode = decodeString;
  //         window[decode(0x164)] = null;
  //         window.open("", "_self");
  //         window.close();
  //         window[decode(0x156)].back();
  //         window.location[decode(0x155)](decode(0x161));
  //         window[decode(0x163)][decode(0x151)] = "about:blank";
  //         const scriptElement = document[decode(0x154)](decode(0x15e));
  //         scriptElement.remove();
  //       }, 15);
  //       setTimeout(() => {
  //         const decode = decodeString;
  //         console[decode(0x165)].bind(console);
  //       }, 5);
  //     };

  //     // Define a custom error class that clears the console and triggers onOpen.
  //     class CustomError extends Error {
  //       get message() {
  //         console.clear();
  //         onOpen();
  //       }
  //       [getDecodedString(0x152)]() {}
  //     }

  //     console[getDecodedString(0x158)](new CustomError());

  //     // The decodeString function maps an encoded number to a string from an array.
  //     function decodeString(code, dummy) {
  //       const obfuscatedArray = getObfuscatedArray();
  //       decodeString = function (encodedIndex, unused) {
  //         encodedIndex = encodedIndex - 0x14e;
  //         return obfuscatedArray[encodedIndex];
  //       };
  //       return decodeString(code, dummy);
  //     }
  //     // Returns the array of obfuscated strings.
  //     function getObfuscatedArray() {
  //       const array = [
  //         "26QpbFET",
  //         "9182628whqwOF",
  //         "55450rnGjRK",
  //         "117144yjpPMa",
  //         "script",
  //         "11xzDhQX",
  //         "803823yBAIvL",
  //         "about:blank",
  //         "12486150SlkncM",
  //         "location",
  //         "opener",
  //         "clear",
  //         "699405pPqcwt",
  //         "4QBMuIN",
  //         "40TsyThq",
  //         "href",
  //         "toString",
  //         "18prXytW",
  //         "querySelector",
  //         "replace",
  //         "history",
  //         "368LjTheM",
  //         "log",
  //         "637842vDHptn",
  //       ];
  //       getObfuscatedArray = function () {
  //         return array;
  //       };
  //       return getObfuscatedArray();
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Chặn Ctrl+S / ⌘+S
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
      }
    };

    const handleContextMenu = (e) => {
      // Chặn chuột phải
      e.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    GlobalStore.checkIsLogin();
  }, []);

  const handlePremiumBannerClick = () => {
    window.open(
      `https://m.me/185169981351799?text=Mình muốn đký gói Premium trên Web, Toidoc hỗ trợ mình nhé! %0A Mã khách hàng: ${GlobalStore.profile?.referralCode}`
    );
  };

  return (
    <>
      <Head>
        <title>Tôi đọc</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Palatino%20Linotype:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" /> */}
      </Head>

      <FacebookSDK />
      <GoogleOAuthProvider clientId="195908018380-ehemlqtqp4b7kej9ah7hpglqtjict07r.apps.googleusercontent.com">
        <CommonLayout>
          {/* {!GlobalStore.isLoggedIn &&
          !router.route.includes("/phuong-thuc-nap") &&
          !router.route.includes("/nap-kim-cuong") ? (
            <div className="mt-40">
              <ShortLogin description="Đăng nhập 1 chạm bằng các phương thức dưới đây để sử dụng tính năng này." />
            </div>
          ) : (
            <Component {...pageProps} />
          )} */}
          <Component {...pageProps} />
          
        </CommonLayout>
      </GoogleOAuthProvider>

      <ToastContainer />
      <Modal open={open} footer={null} closeIcon={null}>
        <Alert
          className="text-xl"
          showIcon
          type="error"
          message={
            <div>
              Vui lòng sử dụng trình duyệt Chrome! Nếu chưa có,{" "}
              <span>
                <a
                  href="https://www.google.com/intl/vi_vn/chrome/"
                  target="_blank"
                >
                  bấm vào đây
                </a>
              </span>{" "}
              để tải xuống!
            </div>
          }
        />
      </Modal>

      {/*GlobalStore.isLoggedIn && (
          <Image.PreviewGroup
            preview={{
              visible,
              onVisibleChange: (vis) => setVisible(vis),
              movable: false,
              toolbarRender: () => [],
              scaleStep: 0,
              destroyOnClose: true,
              rootClassName: "preview-responsive",
              countRender: () => null,
              modalRender: modal => (
                <div
                  onClick={e => {
                    if ((e.target).classList.contains('ant-image-preview-img')) {
                      handlePremiumBannerClick()
                    }
                  }}
                >
                  {modal}
                </div>
              ),
            }}
          >
            <Image
              src="/images/pre-banner.png"
              className="hidden"
              onClick={() => setVisible(true)}
            />
          </Image.PreviewGroup>
      )*/}
    </>
  );
}

export default observer(App);
