// import Web3 from 'web3'
import moment from "moment";
import { pancakeSwapAbi, pancakeSwapContract } from "../contracts/pancake";
import { toast } from "react-toastify";
import { Base64 } from "js-base64";
import crypto from "crypto";

export const zeroPad = (num, places) => String(num).padStart(places, "0");
const secret_key = "MlsHlea8IaH3qS8MjoXB1kMnlMImwCE7";
const secret_iv = "HIwhXNiX7d1z7VxZ";
const ecnryption_method = "aes-256-cbc";
const mapPackages = {
  15000: {
    label: "15,500",
    deposit: "18,000VNĐ",
    value: 18000,
    diamondValue: 15000,
    qrUrl: "/images/qr-15k-son.jpg",
  },
  18000: {
    label: "15,500",
    deposit: "18,000VNĐ",
    value: 18000,
    diamondValue: 15000,
    qrUrl: "/images/qr-15k-son.jpg",
  },
  50000: {
    label: "50,000",
    deposit: "50,000VNĐ",
    value: 50000,
    diamondValue: 50000,
    qrUrl: "/images/qr-50k-son.jpg",
  },
  100000: {
    label: "105,000",
    deposit: "100,000VNĐ",
    value: 100000,
    diamondValue: 105000,
    qrUrl: "/images/qr-100k-son.jpg",
  },
  200000: {
    label: "210,000",
    deposit: "200,000VNĐ",
    diamondValue: 210000,
    value: 200000,
    qrUrl: "/images/qr-200k-son.jpg",
  },
  300000: {
    label: "315,000",
    deposit: "300,000VNĐ",
    diamondValue: 315000,
    value: 300000,
    qrUrl: "/images/qr-300k-son.jpg",
  },
  500000: {
    label: "530,000",
    deposit: "500,000VNĐ",
    diamondValue: 530000,
    value: 500000,
    qrUrl: "/images/qr-500k-son.jpg",
  },
  1000000: {
    label: "1,060,000",
    deposit: "1,000,000VNĐ",
    diamondValue: 1060000,
    value: 1000000,
    qrUrl: "/images/qr-1000k-son.jpg",
  },
};

export const packages = [
  {
    label: "15,500",
    deposit: "18,000VNĐ",
    value: 18000,
  },
  {
    label: "50,000",
    deposit: "50,000VNĐ",
    value: 50000,
  },
  {
    label: "105,000",
    deposit: "100,000VNĐ",
    value: 100000,
  },
  {
    label: "315,000",
    deposit: "300,000VNĐ",
    value: 300000,
  },
  {
    label: "530,000",
    deposit: "500,000VNĐ",
    value: 500000,
  },
  {
    label: "1,060,000",
    deposit: "1,000,000VNĐ",
    value: 1000000,
  },
];

export const getMobileOperatingSystem = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return Boolean(
    userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  // // Windows Phone must come first because its UA also contains "Android"
  // if (/windows phone/i.test(userAgent)) {
  //   return 'Windows Phone'
  // }

  // if (/android/i.test(userAgent)) {
  //   return 'Android'
  // }

  // // iOS detection from: http://stackoverflow.com/a/9039885/177710
  // if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
  //   return 'iOS'
  // }

  // return 'unknown'
};

export const getMobileOperatingSystemStr = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  return "unknown";

  // // Windows Phone must come first because its UA also contains "Android"
  // if (/windows phone/i.test(userAgent)) {
  //   return 'Windows Phone'
  // }

  // if (/android/i.test(userAgent)) {
  //   return 'Android'
  // }

  // // iOS detection from: http://stackoverflow.com/a/9039885/177710
  // if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
  //   return 'iOS'
  // }

  // return 'unknown'
};

export const isMobileDevice = () => {
  const userAgent = navigator.userAgent || window.opera;
  const isMobileUserAgent =
    /android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent);

  // Step 6: Combine all checks
  if (isMobileUserAgent) {
    return true;
  } else {
    return false;
  }
};

export function formatStringToNumber(
  value,
  maximumFractionDigits = 2,
  isComma = true
) {
  if (!value && value !== 0) {
    return "-";
  }
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  });

  return formatter.format(value).replace(/,/g, isComma ? "," : ".");
}

function setDecimals(number, decimals) {
  number = number.toString();
  let numberAbs = number.split(".")[0];
  let numberDecimals = number.split(".")[1] ? number.split(".")[1] : "";
  while (numberDecimals.length < decimals) {
    numberDecimals += "0";
  }
  return numberAbs + numberDecimals;
}

// export async function calcSell(tokensToSell, tokenAddres) {
//   const web3 = new Web3("https://bsc-dataseed1.binance.org");
//   const BNBTokenAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" //BNB

//   let tokenRouter = await new web3.eth.Contract(tokenAbi, tokenAddres);
//   let tokenDecimals = await tokenRouter.methods.decimals().call();

//   tokensToSell = setDecimals(tokensToSell, tokenDecimals);
//   let amountOut;
//   try {
//     let router = await new web3.eth.Contract(pancakeSwapAbi, pancakeSwapContract);
//     amountOut = await router.methods.getAmountsOut(tokensToSell, [tokenAddres, BNBTokenAddress]).call();
//     amountOut = web3.utils.fromWei(amountOut[1]);
//   } catch (error) { }

//   if (!amountOut) return 0;
//   return amountOut;
// }

export const displayAddress = (address) =>
  address?.length > 12
    ? `${address.slice(0, 6)}...${address.slice(
        address.length - 6,
        address.length
      )}`
    : address;

export const getInDate = (endDate) => {
  const currentDate = moment();
  const endDateVal = moment.unix(endDate);

  const diffMinutes = endDateVal.diff(currentDate, "minutes");

  const days = Math.floor(diffMinutes / 1440);
  const hours = Math.floor((diffMinutes - days * 1440) / 60);
  const minutes = Math.floor(diffMinutes - days * 1440 - hours * 60);

  return `${days} days ${hours}:${minutes}`;
};

export const getEndsIn = (endDate) => {
  const currentDate = moment();
  const endDateVal = moment.unix(endDate);

  const diffMinutes = endDateVal.diff(currentDate, "minutes");

  const days = Math.floor(diffMinutes / 1440);
  const hours = Math.floor((diffMinutes - days * 1440) / 60);
  const minutes = Math.floor(diffMinutes - days * 1440 - hours * 60);

  return { days, hours, minutes };
};

export const convertObjectToSearchParams = (values) => {
  if (values) {
    const search = Object.entries(values)
      .filter((entry) => entry[1])
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    return `?${search}`;
  }
  return "";
};

export const convertSearchParamsToObject = (search) => {
  if (search) {
    const value = search.slice(1);
    const obj = {};
    value.split("&").forEach((item) => {
      const [key, val] = item.split("=");
      obj[key] = val;
    });
    return obj;
  }
  return {};
};

export const formatDateTime = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const slugGenerate = (value) => {
  if (typeof value !== "string") {
    console.warn("Expected a string but received:", value);
    value = String(value || "");
  }
  let str = value.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
};

export const getSlugfromSlugGenerate = (value) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const cleanHtml = (value) => {
  return value
    ? String(value)
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
    : value;
};

export const appendNewLineAfterBlockLevelTags = (content) => {
  const blockTags = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "div",
    "section",
    "article",
    "aside",
    "header",
    "footer",
    "nav",
    "ul",
    "ol",
    "li",
    "table",
    "thead",
    "tbody",
    "tfoot",
    "tr",
    "td",
    "th",
    "pre",
    "blockquote",
    "figure",
  ];

  const regex = new RegExp(`</(${blockTags.join("|")})>`, "g");

  return content.replace(regex, (match) => `${match} \n`);
};

export const isEmpty = (obj) => {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
};

export const base64URLdecode = (str) => {
  const base64Encoded = str.replace(/-/g, "+").replace(/_/g, "/");
  const padding = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  const base64WithPadding = base64Encoded + padding;

  const binaryString = Base64.atob(base64WithPadding);
  const binaryLength = binaryString.length;
  const bytes = new Uint8Array(binaryLength);

  for (let i = 0; i < binaryLength; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return utf8Decode(bytes);
};

function utf8Decode(bytes) {
  let result = "";
  let i = 0;

  while (i < bytes.length) {
    let byte1 = bytes[i++];

    if (byte1 < 0x80) {
      result += String.fromCharCode(byte1);
    } else if (byte1 < 0xe0) {
      let byte2 = bytes[i++];
      result += String.fromCharCode(((byte1 & 0x1f) << 6) | (byte2 & 0x3f));
    } else if (byte1 < 0xf0) {
      let byte2 = bytes[i++];
      let byte3 = bytes[i++];
      result += String.fromCharCode(
        ((byte1 & 0x0f) << 12) | ((byte2 & 0x3f) << 6) | (byte3 & 0x3f)
      );
    } else {
      let byte2 = bytes[i++];
      let byte3 = bytes[i++];
      let byte4 = bytes[i++];
      let codepoint =
        ((byte1 & 0x07) << 18) |
        ((byte2 & 0x3f) << 12) |
        ((byte3 & 0x3f) << 6) |
        (byte4 & 0x3f);
      codepoint -= 0x10000;
      result += String.fromCharCode(
        0xd800 + (codepoint >> 10),
        0xdc00 + (codepoint & 0x3ff)
      );
    }
  }

  return result;
}

export const decryptData = (encryptedText) => {
  if (!encryptedText || typeof encryptedText !== "string") {
    return "";
  }
  if (!secret_key || secret_key.length !== 32) {
    return "";
  }
  if (!secret_iv || secret_iv.length !== 16) {
    return "";
  }

  try {
    const keyBuffer = Buffer.from(secret_key, "utf8"); // Convert key to Buffer
    const ivBuffer = Buffer.from(secret_iv, "utf8"); // Convert IV to Buffer
    const encryptedBuffer = Buffer.from(encryptedText, "base64"); // Convert base64 to Buffer

    const decipher = crypto.createDecipheriv(
      ecnryption_method,
      keyBuffer,
      ivBuffer
    );
    let decrypted = decipher.update(encryptedBuffer, "base64", "utf8");
    decrypted += decipher.final("utf8"); // Finalize decryption
    return decrypted.toString();
  } catch (error) {
    console.error("Decryption error:", error.message);
    return "";
  }
};

export const decodeAccessToken = async (accessToken) => {
  const tokens = accessToken.split(".");
  const decoded = base64URLdecode(tokens[1]);
  const jsonObj = JSON.parse(decoded);
  return jsonObj;
};

export const isInAppBrowser = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Kiểm tra WebView của Facebook, Instagram, LinkedIn
  const isFacebookApp = /FBAN|FBAV|FB_IAB|FB4A|FBIOS|FBSSO/.test(userAgent);
  const isInstagramApp = /Instagram/.test(userAgent);
  const isLinkedInApp = /LinkedInApp/.test(userAgent);

  return isFacebookApp || isInstagramApp || isLinkedInApp;
};

export const isCocCoc = async () => {
  const styles = document.querySelectorAll("style");
  for (let i = 0; i < styles.length; i++) {
    if (styles[i].classList.contains("coc-coc-fonts")) {
      return true;
    }
  }

  if (navigator.userAgentData) {
    const brands = await navigator.userAgentData.getHighEntropyValues([
      "brands",
    ]);
    return brands.brands.some((brand) =>
      brand.brand.toLowerCase().includes("coc coc")
    );
  }
  return false;
};

export const redirectToBrowser = () => {
  if (isInAppBrowser()) {
    const url = window.location.href;
    const encodedUrl = encodeURIComponent(url);

    // Trường hợp 1: Mở bằng Google Chrome trên iOS/Android
    const chromeUrl = `googlechrome://${url.replace(/^https?:\/\//, "")}`;

    // Trường hợp 2: Dành cho Android (Intent)
    const androidIntent = `intent://${url.replace(
      /^https?:\/\//,
      ""
    )}#Intent;scheme=https;package=com.android.chrome;end;`;

    // Trường hợp 3: Dành cho Safari trên iOS
    const safariUrl = `https://www.google.com/search?q=${encodedUrl}`;
    const safari1 = `safari-${url}`;
    const safari2 = `x-safari-${url}`;

    const webOS = getMobileOperatingSystemStr();
    if ("Android" === webOS) {
      try {
        window.location.href = chromeUrl;
        setTimeout(() => {
          window.location.href = androidIntent;
        }, 500);
        setTimeout(() => {
          window.open(url, "_blank");
        }, 500);
      } catch (e) {
        try {
          setTimeout(() => {
            window.location.href = androidIntent;
          }, 500);
        } catch (e) {
          try {
            setTimeout(() => {
              window.open(url, "_blank");
            }, 500);
          } catch (e) {
            toast(
              "Vui lòng copy link và mở trên trình duyệt chrome\nhoặc safari trên máy bạn",
              {
                type: "error",
                theme: "colored",
              }
            );
          }
        }
      }
    } else if ("iOS" === webOS) {
      // try {
      //   setTimeout(() => {
      //     window.location.href = safari1;
      //   }, 500);
      //   setTimeout(() => {
      //     window.location.href = safari2;
      //   }, 500);
      //   setTimeout(() => {
      //     window.location.href = safariUrl;
      //   }, 500);
      // } catch (e) {
      //   try {
      //     setTimeout(() => {
      //       window.location.href = safari2;
      //     }, 500);
      //   } catch (e) {
      //     try {
      //       setTimeout(() => {
      //         window.location.href = safariUrl;
      //       }, 500);
      //     } catch (e) {
      //       toast('Vui lòng copy link và mở trên trình duyệt chrome\nhoặc safari trên máy bạn', {
      //         type: "error",
      //         theme: "colored",
      //       })
      //     }
      //   }
      // }
      // setTimeout(() => {
      //   window.location.href = `x-web-search://${url}`;
      // }, 500);
      try {
        setTimeout(() => {
          window.location.href = chromeUrl;
        }, 100);
      } catch (e) {}

      try {
        setTimeout(() => {
          window.location.href = safari2;
        }, 100);
      } catch (e) {}

      setTimeout(() => {
        toast(
          "Vui lòng ấn vào nút 3 chấm hoặc mũi tên góc dưới màn hình rồi chọn mở bằng safari\nđể có trải nghiệm tốt hơn",
          {
            type: "error",
            theme: "colored",
            autoClose: 60000,
            closeOnClick: false,
          }
        );
      }, 1000);

      // setTimeout(() => {
      //   const fullPath = window.location.pathname + window.location.search; // Lấy toàn bộ đường dẫn
      //   const encodedPath = encodeURIComponent(fullPath); // Mã hóa URL tránh lỗi ký tự đặc biệt
      //   const redirectURL = `truyenso1.xyz/redirect.html?path=${encodedPath}`;
      //   window.location.href = `x-web-search://?"${fullPath}"`;
      //   // const newWindow = window.open(redirectURL, "_blank");
      // }, 100);

      // setTimeout(() => {
      //   toast('window.location.replace', {
      //     type: "error",
      //     theme: "colored",
      //   })
      //   window.location.replace(url);
      // }, 500);

      // toast('Vui lòng ấn vào nút 3 chấm bên trên rồi chọn mở bằng trình duyệt\nđể có trải nghiệm mượt mà', {
      //   type: "error",
      //   theme: "colored",
      // })
    } else {
      try {
        setTimeout(() => {
          window.location.href = androidIntent;
        }, 500);
      } catch (e) {
        toast(
          "Vui lòng copy link và mở trên trình duyệt chrome\nhoặc safari trên máy bạn",
          {
            type: "error",
            theme: "colored",
          }
        );
      }
    }
  }
};

export const calculateTotalCategories = (totalCategories) => {
  return totalCategories > 2 ? `+${totalCategories - 2}` : totalCategories;
  // return totalCategories > visibleCategories ? `+${totalCategories - visibleCategories}` : totalCategories
};

export const calculateCreatedTime = (pastTime) => {
  const now = Date.now();
  const pastTimestamp = new Date(pastTime).getTime(); // Chuyển đổi ISO string sang timestamp
  const elapsedMilliseconds = now - pastTimestamp;

  if (elapsedMilliseconds < 0) return "Vừa xong"; // Trường hợp thời gian trong tương lai

  const seconds = Math.floor(elapsedMilliseconds / 1000);
  if (seconds < 60) return `${seconds} giây trước`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} phút trước`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} ngày trước`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} tháng trước`;

  const years = Math.floor(months / 12);
  return `${years} năm trước`;
};

export const convertToShortScale = (value) => {
  const absValue = Math.abs(value);

  if (absValue >= 1000000) {
    return (
      parseFloat((Math.sign(value) * (absValue / 1000000)).toFixed(1)) + "M"
    );
  } else if (absValue >= 1000) {
    return parseFloat((Math.sign(value) * (absValue / 1000)).toFixed(1)) + "k";
  } else {
    return Math.sign(value) * absValue;
  }
};

export const roundTo1Digits = (number) => {
  return Math.round(number * 10) / 10;
};

export const getRadomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getOS = () => {
  if (typeof navigator !== "undefined") {
    const userAgent = navigator.userAgent.toLowerCase();
    console.log("USER AGENT: ", userAgent);
    if (/iphone|ipad|ipod/.test(userAgent)) {
      return "ios";
    }
    if (userAgent.includes("android")) {
      return "android";
    }
  }
  return "android";
};

export const handleStoreOpen = (osType) => {
  let url = "https://play.google.com/store/search?q=toidoc&c=apps&hl=vi"; // Default to Android link

  if (osType === "ios") {
    url = "https://toidoc.onelink.me/59bO/d42503wz";
  }

  // Mở link trong tab mới
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "Toidoc");
  }
};

export const getUrlImage = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export const getLastChild = (node) => {
  if (node && node.props && node.props.children) {
    if (Array.isArray(node.props.children)) {
      return getLastChild(node.props.children[node.props.children.length - 1]);
    } else {
      return getLastChild(node.props.children);
    }
  }
  return node;
};

export const countWords = (text) => {
  if (!text || typeof text !== "string") return 0;
  return (text.match(/\b\w+\b/g) || []).length;
};

export const getDepositPackage = async (value) => {
  if (value <= 15000) {
    return mapPackages["15000"];
  }
  if (value > 15000) {
    return mapPackages["50000"];
  }
  if (value < 105000) {
    return mapPackages["100000"];
  }
  if (value < 210000) {
    return mapPackages["200000"];
  }
  if (value < 315000) {
    return mapPackages["300000"];
  }
  if (value < 530000) {
    return mapPackages["500000"];
  }
  if (value < 1060000) {
    return mapPackages["1000000"];
  }
};

export const urlCheck = (string) => {
  return string?.split("/")?.includes("media.truyenso1.xyz");
};

export const getQrUrl = (amount) => {
  const value = mapPackages[`${amount}`];
  return value.qrUrl;
};

export const findMatchingSubstring = (fullString, targetSubstring) => {
  const startIndex = fullString
    ? fullString.indexOf(targetSubstring ? targetSubstring : "")
    : 0;
  if (startIndex !== -1) {
    const matchingSubstring = fullString
      ? fullString.substring(
          startIndex,
          startIndex + (targetSubstring ? targetSubstring.length : 0)
        )
      : "";
    return matchingSubstring;
  } else {
    return null;
  }
};

export const findRemainingSubstring = (fullString, matchingSubstring) => {
  const startIndex = fullString.indexOf(matchingSubstring);
  if (startIndex !== -1) {
    const endIndex = startIndex + matchingSubstring.length;
    return fullString.substring(endIndex).trim();
  } else {
    return null;
  }
};

export const getContentInsideBrackets = (input) => {
  const match = input.match(/\[([^\]]+)\]/);
  return match ? match[1] : null;
};

export const getContentAfterParenthesis = (input) => {
  // Tìm vị trí của dấu ")"
  const index = input.indexOf(")");
  // Nếu không tìm thấy dấu ")" thì trả về chuỗi rỗng
  if (index === -1) {
    return "";
  }
  // Lấy nội dung đằng sau dấu ")" và loại bỏ khoảng trắng thừa nếu có
  return input.slice(index + 1).trim();
};
