// import React, { useEffect } from "react";
// import UnfinishedStoryDetailItem from "./UnfinishedStoryDetailItem";
// import GooglePlayStoreIcon from "../../../public/icons/GooglePlayStoreIcon";
// import AppStoreIcon from "../../../public/icons/AppStoreIcon";
// import { Flex } from "antd";
// import { getOS, handleStoreOpen } from "../../utils/utils";
// import { ArrowRightOutlined } from "@ant-design/icons";
// import GlobalStore from "../../stores/GlobalStore";
// import { observer } from "mobx-react";
// import Link from "next/link";

// const UnfinishedStoryItem = ({ unfinishedStory }) => {
//   const { isLoggedIn, checkIsLogin } = GlobalStore;
//   useEffect(() => {
//     checkIsLogin();
//   }, [isLoggedIn]);
//   return (
//     isLoggedIn && (
//       <Flex vertical className="space-y-4">
//         <div className="text-lg text-black font-bold pt-4">
//           Danh sách đang đọc
//         </div>
//         <div className="rounded-[8px] bg-[#FAFAFA] px-2 flex flex-col gap-y-4 pt-3">
//           <>
//             <UnfinishedStoryDetailItem
//               readingPercent={unfinishedStory.readingPercent}
//               title={unfinishedStory.title}
//               coverImage={unfinishedStory?.coverImage}
//               currentChapterOrder={unfinishedStory.currentChapterOrder}
//               storySlug={unfinishedStory.storySlug}
//               chapterSlug={unfinishedStory.chapterSlug}
//             />

//             <Link
//               href={`${unfinishedStory.storySlug}/${unfinishedStory.chapterSlug}`}
//               title={unfinishedStory.title}
//               passHref
//             >
//               <a>
//                 <div className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-bold rounded-lg text-base p-2.5 text-center shadow-md hover:text-black cursor-pointer">
//                   Đọc tiếp <ArrowRightOutlined />
//                 </div>
//               </a>
//             </Link>
//           </>

//           <div className="sm:flex sm:flex-col md:flex-row gap-x-2 cursor-pointer hidden ml-3">
//             <div className="space-y-1">
//               <p className="text-[#707070] text-sm leading-normal font-medium">
//                 Tải app và khám phá đầy đủ tính năng
//               </p>
//               <button
//                 type="button"
//                 className="w-full text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-bold rounded-lg text-base p-2.5 text-center shadow-md"
//                 onClick={() => handleStoreOpen(getOS())}
//               >
//                 Tải App Ngay
//               </button>
//             </div>
//             <div>
//               <div className="flex -mt-5 hover:translate-x-[5%] transition delay-75">
//                 <GooglePlayStoreIcon
//                   onClick={() => handleStoreOpen("android")}
//                 />
//               </div>
//               <div className="flex -mt-12 hover:translate-x-[5%] transition delay-75">
//                 <AppStoreIcon onClick={() => handleStoreOpen("ios")} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </Flex>
//     )
//   );
// };

// export default observer(UnfinishedStoryItem);


import React, { useEffect } from "react";
import UnfinishedStoryDetailItem from "./UnfinishedStoryDetailItem";
import GooglePlayStoreIcon from "../../../public/icons/GooglePlayStoreIcon";
import AppStoreIcon from "../../../public/icons/AppStoreIcon";
import { getOS, handleStoreOpen } from "../../utils/utils";
import { ArrowRightOutlined } from "@ant-design/icons";
import GlobalStore from "../../stores/GlobalStore";
import { observer } from "mobx-react";
import Link from "next/link";

const UnfinishedStoryItem = ({ unfinishedStory }) => {
  const { isLoggedIn, checkIsLogin } = GlobalStore;
  
  useEffect(() => {
    checkIsLogin();
  }, [isLoggedIn]);

  return (
    <div className="flex flex-col space-y-4">
      {isLoggedIn && (
        <div className="text-lg text-black font-bold pt-4">Danh sách đang đọc</div>
      )}

      {isLoggedIn ? 
      <div className="rounded-lg bg-gray-100 px-2 space-y-4 py-3">

      <div className="flex flex-col gap-y-4">
          <UnfinishedStoryDetailItem
            readingPercent={unfinishedStory.readingPercent}
            title={unfinishedStory.title}
            coverImage={unfinishedStory?.coverImage}
            currentChapterOrder={unfinishedStory.currentChapterOrder}
            storySlug={unfinishedStory.storySlug}
            chapterSlug={unfinishedStory.chapterSlug}
          />

          <Link
            href={`${unfinishedStory.storySlug}/${unfinishedStory.chapterSlug}`}
            title={unfinishedStory.title}
            passHref
          >
            <a className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-bold rounded-lg text-base p-2.5 text-center shadow-md hover:!text-black cursor-pointer">
              Đọc tiếp <ArrowRightOutlined />
            </a>
          </Link>
        </div>

      <div className="hidden md:flex flex-col md:flex-row gap-x-2 cursor-pointer ml-3">
        <div className="space-y-1">
          <p className="text-gray-500 text-sm leading-normal font-medium">
            Tải app và khám phá đầy đủ tính năng
          </p>
          <button
            type="button"
            className="w-full text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-bold rounded-lg text-base p-2.5 text-center shadow-md"
            onClick={() => handleStoreOpen(getOS())}
          >
            Tải App Ngay
          </button>
        </div>
        <div>
          <div className="flex -mt-5 hover:translate-x-[5%] transition delay-75">
            <GooglePlayStoreIcon onClick={() => handleStoreOpen("android")} />
          </div>
          <div className="flex -mt-12 hover:translate-x-[5%] transition delay-75">
            <AppStoreIcon onClick={() => handleStoreOpen("ios")} />
          </div>
        </div>
      </div>

      </div>
      : 
      <div className="rounded-lg bg-gray-100 px-2 space-y-4 py-3 mt-8 hidden md:block">
      <div className="hidden md:flex flex-col md:flex-row gap-x-2 cursor-pointer ml-3">
        <div className="space-y-1">
          <p className="text-gray-500 text-sm leading-normal font-medium">
            Tải app và khám phá đầy đủ tính năng
          </p>
          <button
            type="button"
            className="w-full text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-bold rounded-lg text-base p-2.5 text-center shadow-md"
            onClick={() => handleStoreOpen(getOS())}
          >
            Tải App Ngay
          </button>
        </div>
        <div>
          <div className="flex -mt-5 hover:translate-x-[5%] transition delay-75">
            <GooglePlayStoreIcon onClick={() => handleStoreOpen("android")} />
          </div>
          <div className="flex -mt-12 hover:translate-x-[5%] transition delay-75">
            <AppStoreIcon onClick={() => handleStoreOpen("ios")} />
          </div>
        </div>
      </div>

      </div>}

    </div>
  );
};

export default observer(UnfinishedStoryItem);
