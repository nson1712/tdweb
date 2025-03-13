import React, { useEffect, useState } from "react";
import { getMobileOperatingSystem } from "../../utils/utils";
import GlobalStore from "../../stores/GlobalStore";

let isMobile = true;

const ChatSupport = ({showChat, setShowChat}) => {
  const [scrollDirection, setScrollDirection] = useState(null);
  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    };
  }, []);

  useEffect(() => {
    isMobile = getMobileOperatingSystem();
  }, []);

  const handleOnClose = () => {
    setShowChat(false);
  };

  const handleOnClick = () => {
    window.open(`https://m.me/185169981351799?text=Mình đang đọc truyện trên web. Hỗ trợ giúp mình với.${GlobalStore.profile?.referralCode ? 'Mã KH: ' + GlobalStore.profile?.referralCode : ''}`, "_blank", "Toidoc");
    setShowChat(false);
  };

  return (
    isMobile ? 
      <div
        className={`chat-icon  ${
          (showChat || scrollDirection === 'up') ? "show-share" : "hide"
        }`
         }
      >
        <a onClick={handleOnClose}>
          <span className="chat-icon-close"><svg viewBox="0 0 16 16" stroke="#EE4D2D" style={{height: "10px", width: "10px", stroke: "rgba(0, 0, 0, 1)", strokeWidth: "2px"}}><path strokeLinecap="round" d="M1.1,1.1L15.2,15.2"></path><path strokeLinecap="round" d="M15,1L0.9,15.1"></path></svg></span>
        </a>
        <a onClick={handleOnClick}>
          <img
            src={"/images/bird-dark@3x.png"}
            className="w-[85px]"
          />
        </a>
      </div>
    :
      <div
        className={`chat-icon-web  ${
          showChat ? "show-share" : "hide"
        }` }
      >
        <a onClick={handleOnClose}>
          <span className="chat-icon-web-close"><svg viewBox="0 0 16 16" stroke="#EE4D2D" style={{height: "10px", width: "10px", stroke: "rgba(0, 0, 0, 1)", strokeWidth: "2px"}}><path strokeLinecap="round" d="M1.1,1.1L15.2,15.2"></path><path strokeLinecap="round" d="M15,1L0.9,15.1"></path></svg></span>
        </a>
        <a onClick={handleOnClick}>
          <img
            src={"/images/bird-dark@3x.png"}
            className="w-[85px]"
          />
        </a>
      </div>
  );
};

export default ChatSupport;
