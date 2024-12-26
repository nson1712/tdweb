import React, { useEffect, useState } from "react";
import StoryStore from "../../stores/StoryStore";
import { getMobileOperatingSystem } from "../../utils/utils";

let isMobile = true;

function useScrollDirection() {
  

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    // const updateScrollDirection = () => {
    //   const scrollY = window.pageYOffset;
    //   const direction = scrollY > lastScrollY ? "down" : "up";
    //   if (
    //     direction !== scrollDirection &&
    //     (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
    //   ) {
    //     setScrollDirection(direction);
    //   }
    //   lastScrollY = scrollY > 0 ? scrollY : 0;
    // };
    // window.addEventListener("scroll", updateScrollDirection); // add event listener
    // isMobile = getMobileOperatingSystem();
    // return () => {
    //   window.removeEventListener("scroll", updateScrollDirection); // clean up
    // };
  }, [scrollDirection]);

  return scrollDirection;
}

const MobileShare = ({showBubble, setShowBubble}) => {
  const { saveCustomerClickBanner } = StoryStore;
  useEffect(() => {
    isMobile = getMobileOperatingSystem();
  });

  const handleOnClose = () => {
    // window.open(`https://s.shopee.vn/2fpsjAtxzE`, "_blank", "Toidoc");
    setShowBubble('down');
  };

  const handleOnClick = () => {
    // saveCustomerClickBanner("buble-button");
    window.open(`https://toidoc.onelink.me/59bO/d42503wz`, "_blank", "Toidoc");
    setShowBubble('down');
  };

  return (
    isMobile ? 
      <>
        <div
          className={`share-icon  ${
            showBubble === "up" ? "show-share" : "hide"
          }` }
        >
          <a onClick={handleOnClose}>
            <span className="share-icon-close"><svg viewBox="0 0 16 16" stroke="#EE4D2D" style={{height: "10px", width: "10px", stroke: "rgba(0, 0, 0, 1)", strokeWidth: "2px"}}><path strokeLinecap="round" d="M1.1,1.1L15.2,15.2"></path><path strokeLinecap="round" d="M15,1L0.9,15.1"></path></svg></span>
          </a>
          <a onClick={handleOnClick}>
            <img
              src={
                isMobile
                  ? "/images/download-app/download-app-buble.png"
                  : "/images/download-app/download-app-web.png"
              }
              className="w-[125px]"
            />
          </a>
        </div>
      </>
      :
      <div
        className={`share-icon-web  ${
          showBubble === "up" ? "show-share" : "hide"
        }` }
      >
        <a onClick={handleOnClose}>
            <span className="share-icon-close share-icon-web-close"><svg viewBox="0 0 16 16" stroke="#EE4D2D" style={{height: "10px", width: "10px", stroke: "rgba(0, 0, 0, 1)", strokeWidth: "2px"}}><path strokeLinecap="round" d="M1.1,1.1L15.2,15.2"></path><path strokeLinecap="round" d="M15,1L0.9,15.1"></path></svg></span>
          </a>
          <a onClick={handleOnClick}>
            <img
              src={
                isMobile
                  ? "/images/download-app/download-app-buble.png"
                  : "/images/download-app/download-app-web.png"
              }
              className="w-[125px]"
            />
          </a>
      </div>
  );
};

export default MobileShare;
