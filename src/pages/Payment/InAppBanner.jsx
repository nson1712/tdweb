import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

const InAppBrowserBanner = () => {
  const [show, setShow] = useState(false);

  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const isInApp = /FBAN|FBAV|Instagram|Line\/|Zalo|Zing|TikTok/i.test(ua);
  const isIOS   = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);

  const pageUrl = "https://toidoc.vn/nap-kim-cuong"; // use your real domain
  const chromeIOS = "googlechromes://toidoc.vn/nap-kim-cuong";
  const chromeAndroidIntent =
    "intent://toidoc.vn/nap-kim-cuong#Intent;scheme=https;package=com.android.chrome;end";

  useEffect(() => {
    if (isInApp) setShow(true);
  }, [isInApp]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      alert("Đã copy link. Hãy mở Safari/Chrome và dán link để nạp nhé!");
    } catch {
      // Fallback for old in-app browsers
      prompt("Copy link sau:", pageUrl);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-md w-full rounded-2xl bg-white p-5 shadow-xl">
        <h3 className="text-lg font-semibold text-red-600 mb-2">
          Mở trang nạp ngoài trình duyệt trong app
        </h3>
        <p className="text-sm text-gray-700 mb-4">
          Bạn đang mở trong trình duyệt của ứng dụng (Messenger/Instagram/…).
          Hãy mở bằng Safari hoặc Chrome để nạp thành công.
        </p>

        {isIOS && (
          <>
            <Link  href={chromeIOS} passHref>
            <a
              className="block w-full text-center rounded-xl border px-4 py-2 mb-2"
            >
              Thử mở bằng Chrome (iOS)
            </a></Link>
            <button
              onClick={copy}
              className="block w-full text-center rounded-xl bg-black text-white px-4 py-2 mb-2"
            >
              Copy link → Mở Safari rồi dán
            </button>
            <details className="text-sm text-gray-600">
              <summary className="cursor-pointer">Cách mở bằng Safari</summary>
              <ol className="list-decimal ml-5 mt-2 space-y-1">
                <li>Chạm vào biểu tượng <b>•••</b> ở góc phải trên.</li>
                <li>Chọn <b>Open in Safari / Mở trong Safari</b>.</li>
              </ol>
            </details>
          </>
        )}

        {isAndroid && (
          <>
            <a
              href={chromeAndroidIntent}
              className="block w-full text-center rounded-xl bg-blue-600 text-white px-4 py-2 mb-2"
            >
              Mở bằng Chrome (Android)
            </a>
            <button
              onClick={copy}
              className="block w-full text-center rounded-xl border px-4 py-2 mb-2"
            >
              Copy link
            </button>
          </>
        )}

        <div className="mt-3 border-t pt-3">
          <p className="text-xs text-gray-500 mb-2">
            Hoặc quét QR để mở trong trình duyệt hệ thống:
          </p>
          <img
            alt="QR to open in browser"
            className="mx-auto w-40 h-40"
            src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
              pageUrl
            )}`}
          />
        </div>

        <button
          onClick={() => setShow(false)}
          className="mt-4 w-full text-center text-sm text-gray-500 underline"
        >
          Vẫn tiếp tục trong trình duyệt của app
        </button>
      </div>
    </div>
  );
};

export default InAppBrowserBanner;