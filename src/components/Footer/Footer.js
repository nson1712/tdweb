import React from "react";
import ToidocLogoIcon from "../../../public/icons/ToidocLogoIcon";
import Logo from "../ToidocLogo";
import FacebookIcon from "../../../public/icons/FacebookIcon";
import TiktokIcon from "../../../public/icons/TiktokIcon";
import InstagramIcon from "../../../public/icons/InstagramIcon";
import GooglePlayStoreIcon from "../../../public/icons/GooglePlayStoreIcon";
import AppStoreIcon from "../../../public/icons/AppStoreIcon";

const Footer = () => {
  return (
    <div className="mb-20 md:mb-0">
      <div className="bg-[#F2F5F7] px-1 py-16 justify-between mx-auto hidden md:block">
        <div className="w-[1116px] justify-between mx-auto">
          <div className="">
            <div className="flex gap-x-2 border-1">
              <Logo />
              <div className="space-y-2 self-center">
                <div className="text-xs text-slate-500">
                  Tải app và khám phá đầy đủ tính năng
                </div>
                <div className="text-xs">Tải xuống ngay</div>
              </div>
              
              <div>
              <div className="flex -mt-5 hover:translate-x-[5%] transition delay-75">
              <GooglePlayStoreIcon onClick={() => handleClick("android")} />
            </div>
            <div className="flex -mt-12 hover:translate-x-[5%] transition delay-75">
              <AppStoreIcon onClick={() => handleClick("ios")} />
            </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-x-4 justify-center">
            <div className="w-[56px] h-[56px] rounded-[16px] border-[1px] border-slate-300 flex justify-center self-center cursor-pointer hover:bg-[#fff] hover:translate-y-[-5%] transition delay-75">
              <FacebookIcon />
            </div>
            <div className="w-[56px] h-[56px] rounded-[16px] border-[1px] border-slate-300 flex justify-center self-center cursor-pointer hover:bg-[#fff] hover:translate-y-[-5%] transition delay-75">
              <TiktokIcon />
            </div>
            <div className="w-[56px] h-[56px] rounded-[16px] border-[1px] border-slate-300 flex justify-center self-center cursor-pointer hover:bg-[#fff] hover:translate-y-[-5%] transition delay-75">
              <InstagramIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black w-full py-2">
        <div className="max-w-[1116px] md:flex justify-between mx-auto px-1">
          
          <ul className="order-2 flex items-center mt-3 text-xs md:text-base font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li className="list-none">
            <a href="/" className="text-white hover:underline me-4 md:me-6">
              Trang chủ
            </a>
          </li>
          <li className="list-none">
            <a href="/the-loai" className="text-white hover:underline me-4 md:me-6">
              Thể loại
            </a>
          </li>
          <li className="list-none">
            <a href="/" className="text-white hover:underline me-4 md:me-6">
              Bảng xếp hạng
            </a>
          </li>
          <li className="list-none">
            <a href="/" className="text-white hover:underline">
              Câu hỏi thường gặp
            </a>
          </li>
        </ul>

        <div className="order-1 text-xs text-blue-400 self-center text-center">
            Copyright @ by Toidoc.vn All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
