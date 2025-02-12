import { useEffect } from "react";
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
import { redirectToBrowser } from "../src/utils/utils";

export default function App({ Component, pageProps }) {
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
  //   const clearCookies = () => {
  //     // Get all cookies for the current domain
  //     const cookies = document.cookie.split("; ");
  //     cookies.forEach((cookie) => {
  //       // Get the cookie name
  //       const name = cookie.split("=")[0];
  //       // Set the cookie with an expired date to delete it
  //       document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  //     });
  //     console.log("All cookies for this website have been cleared.");
  //   };

  //   const handleRightClick = (e) => {
  //     // Prevent the default right-click menu
  //     e.preventDefault();
  //   };

  //   // Function to handle key detection
  //   const detectDevTools = (e) => {
  //     // Detect F12 key
  //     if (e.key === "F12" || e.keyCode === 123) {
  //       // Clear the entire document's HTML
  //       document.documentElement.innerHTML = "";

  //       // Clear localStorage and sessionStorage
  //       localStorage.clear();
  //       sessionStorage.clear();
  //       console.clear();
  //       clearCookies();

  //       // Stop ongoing network requests
  //       if (window.stop) {
  //         window.stop(); // Modern browsers
  //       }
  //       if ("caches" in window) {
  //         caches.keys().then((keys) => {
  //           keys.forEach((key) => {
  //             caches.delete(key);
  //           });
  //         });
  //       }
  //       e.preventDefault();
  //     }
  //   };

  //   const checkDevTools = () => {
  //     // const isMobile = isMobileDevice();
  //     // const devtoolsOpened =
  //     //   window.outerWidth - window.innerWidth > 100 ||
  //     //   window.outerHeight - window.innerHeight > 200;
  //     const start = performance.now();
  //     console.log('Checking...');
  //     const end = performance.now();
  //     if (end - start > 100) {
  //       // Clear the entire document's HTML
  //       document.documentElement.innerHTML = "";

  //       // Clear localStorage and sessionStorage
  //       localStorage.clear();
  //       sessionStorage.clear();
  //       console.clear();
  //       clearCookies();

  //       // Stop ongoing network requests
  //       if (window.stop) {
  //         window.stop(); // Modern browsers
  //       }
  //       if ("caches" in window) {
  //         caches.keys().then((keys) => {
  //           keys.forEach((key) => {
  //             caches.delete(key);
  //           });
  //         });
  //       }

  //       window.location.href = "about:blank";
  //     }
  //   }

  //   checkDevTools();
  //   // Add event listener for keydown
  //   document.addEventListener("keydown", detectDevTools);
  //   document.addEventListener("contextmenu", handleRightClick);

  //   // Detect DevTools with specific behaviors
  //   const interval = setInterval(() => {
  //     checkDevTools();
  //   }, 1000);

  //   // Cleanup event listener and interval
  //   return () => {
  //     document.removeEventListener("keydown", detectDevTools);
  //     clearInterval(interval);
  //   };
  // }, []);

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

      <GoogleOAuthProvider clientId="195908018380-ehemlqtqp4b7kej9ah7hpglqtjict07r.apps.googleusercontent.com">
        <Component {...pageProps} />
      </GoogleOAuthProvider>

      <ToastContainer />
    </>
  );
}
