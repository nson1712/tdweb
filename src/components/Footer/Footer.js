import React from "react";
import Logo from "../ToidocLogo";
import GooglePlayStoreIcon from "../../../public/icons/GooglePlayStoreIcon";
import AppStoreIcon from "../../../public/icons/AppStoreIcon";
import { getOS, handleStoreOpen } from "../../utils/utils";
import dynamic from "next/dynamic";
import Link from "next/link";

const FacebookPagePlugin = dynamic(() => import("../FacebookPlugin"), {
  ssr: false,
});

const Footer = () => {
  return (
    <div className="mb-20 md:mb-0">
      <div className="bg-[#F2F5F7] px-1 py-6 justify-between mx-auto hidden md:block">
        <div className="max-w-[1116px] justify-between mx-auto flex">
          <div className="">
            <div className="flex gap-x-2">
              <Logo />
              <div className="space-y-2 self-center">
                <div className="text-md">
                  Toidoc là nền tảng đọc truyện Full #1 dành cho phái nữ với nhiều đánh giá chất
                  lượng từ độc giả. Độc giả có thể lựa chọn đa dạng các thể loại
                  truyện full, truyện hot, truyện đề cử khác nhau như <a href='/the-loai/dien-van'>#điền văn</a>,
                  <a href='/the-loai/ngon-tinh'>#ngôn tình hiện đại</a> <a href='/the-loai/dam-my'>#đam mỹ</a> <a href='/the-loai/sung'>#sủng</a> <a href='/the-loai/nguoc'>#ngược</a>, <a href='/the-loai/doan-van'>#zhihu</a>, .... Web
                  truyện luôn cập nhật những bộ truyện mới nhất một cách nhanh
                  nhất.
                </div>
                <div className="text-xs text-slate-500">
                  Tất cả người dùng được yêu cầu tuân thủ nghiêm ngặt luật pháp
                  và quy định quốc gia có liên quan khi xuất bản nội dung. Chúng
                  tôi từ chối mọi nội dung không phù hợp thuần phong mỹ tục, bạo
                  lực, bất hợp pháp khác và sẽ hủy chúng ngay khi phát hiện. Bản
                  quyền của các tác phẩm trên trang này (tiểu thuyết, bình luận,
                  hình ảnh v.v.) thuộc về tác giả gốc. Trang này chỉ cung cấp
                  chức năng tải lên, lưu trữ và hiển thị. Các tác phẩm, bình
                  luận, nội dung hoặc hình ảnh đều do thành viên đăng tải. Nếu
                  làm ảnh hưởng đến cá nhân hay tổ chức nào, khi được yêu cầu,
                  chúng tôi sẽ xác minh và gỡ bỏ ngay lập tức.
                </div>
              </div>

              <div className="self-center">
                <div className="flex -mt-5 hover:translate-x-[5%] transition delay-75">
                  <GooglePlayStoreIcon
                    onClick={() => handleStoreOpen("android")}
                  />
                </div>
                <div className="flex -mt-12 hover:translate-x-[5%] transition delay-75">
                  <AppStoreIcon onClick={() => handleStoreOpen("ios")} />
                </div>
              </div>
            </div>
          </div>

          {/*<FacebookPagePlugin />*/}
        </div>
      </div>

      <div className="bg-black w-full py-2">
        <div className="max-w-[1116px] md:flex justify-between mx-auto px-1 space-y-2">
          <div className="order-2 flex justify-center text-sm md:text-base font-medium text-gray-500 dark:text-gray-400 sm:mt-0 gap-x-2 sm:py-2">
            <div className="self-center">
              <Link href="/tim-kiem" passHref>
                <a
                  title="Trang chủ website Toidoc"
                  className="text-white text-underline text-md"
                >
                  Trang chủ
                </a>
              </Link>
            </div>
            <div className="self-center">|</div>
            <div className="self-center">
              <Link href="https://tacgia.toidoc.vn" passHref>
                <a
                  title="Website hỗ trợ tác giả chính thức của Toidoc"
                  className="text-white text-underline text-md"
                  target="_blank"
                >
                  Đăng truyện
                </a>
              </Link>
            </div>
            <div className="self-center">|</div>
            <div className="self-center">
              <Link href="/lien-he">
                <a
                  title="Liên hệ Toidoc"
                  target="_blank"
                  className="text-white text-underline text-md"
                >
                  Liên hệ
                </a>
              </Link>
            </div>
            <div className="self-center">|</div>
            <div className="self-center">
              <Link href="https://docgia-guide.toidoc.vn/">
                <a
                  title="Câu hỏi thường gặp khi sử dụng Toidoc"
                  target="_blank"
                  className="text-white text-underline text-md"
                >
                  Câu hỏi thường gặp
                </a>
              </Link>
            </div>
          </div>

          <div className="order-1 text-xs text-blue-400 self-center text-center space-y-2">
            <div>Copyright @ by Toidoc.vn All rights reserved</div>
            <div className="self-center flex justify-center">
              <a href="//www.dmca.com/Protection/Status.aspx?ID=6f2ee0d7-917c-47f5-b84e-973bdcdf5f07" title="DMCA.com Protection Status" className="dmca-badge"> <img src ="https://images.dmca.com/Badges/dmca-badge-w150-2x1-02.png?ID=6f2ee0d7-917c-47f5-b84e-973bdcdf5f07"  alt="DMCA.com Protection Status" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
