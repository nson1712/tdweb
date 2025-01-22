// import Web3 from 'web3'
import moment from "moment";
import { pancakeSwapAbi, pancakeSwapContract } from "../contracts/pancake";
import { tokenAbi } from "../contracts/tokenABI";

export const zeroPad = (num, places) => String(num).padStart(places, "0");

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
  return value.replace(/<[^>]+>/g, "");
};

export const appendNewLineAfterCloseHTag = (string) => {
  return string
    .replaceAll("</h1>", "</h1> \n")
    .replaceAll("</h2>", "</h2> \n")
    .replaceAll("</h3>", "</h3> \n")
    .replaceAll("</h4>", "</h4> \n")
    .replaceAll("</h5>", "</h5> \n")
    .replaceAll("</h6>", "</h6> \n")
    .replaceAll("</p>", "</p> \n")
    .replaceAll("</figure>", "</figure> \n")
};

export const isEmpty = (obj) => {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}
