/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { observer } from "mobx-react";
import Router, { useRouter } from "next/router";
import GlobalStore from "../../stores/GlobalStore";
import ShortLogin from "../../pages/Login/ShortLogin";
import ModalComponent from "../Modal/Modal";
import Link from "next/link";

let timeout;

const Header = ({ selectedTab }) => {
  const [text, setText] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setText(router.query.tukhoa || "");
  }, [router.query.tukhoa]);

  const handleButtonAccount = () => {
    if (GlobalStore.isLoggedIn) {
      Router.push("/tai-khoan");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className="py-[16px] shadow-header fixed bottom-[0px] md:bottom-auto md:top-0 left-0 right-0 z-[999] border-t-[1px] md:border-t-0 border-color ">
      <div className="flex justify-center max-w-[768px] mx-auto">
        <Link href="/tim-kiem" passHref>
          <a>
            <img
              src="/images/logo-toidoc.svg"
              className="mr-[24px] hidden md:block cursor-pointer"
              alt="Trang chủ truyện full Toidoc"
            />
          </a>
        </Link>

        <div className="flex items-center justify-between w-full md:w-auto">
          {/*<Link href="/de-cu-truyen-full" passHref>
            <a
              className={classNames(
                "menu-header justify-between mx-[2px] px-[20px] h-[40px] rounded-[30px] cursor-pointer",
                selectedTab === "HOME" && "bg-tab-active text-active"
              )}
            >
              <img
                src={
                  selectedTab === "HOME"
                    ? "/images/star-home-active.svg"
                    : "/images/star-home.svg"
                }
                className="w-[24px] mr-[4px]"
                alt="home"
              />
              <p
                className={classNames(
                  "mb-0 text-[12px] font-bold label-text leading-[16px] whitespace-nowrap",
                  selectedTab === "HOME" && "text-active block"
                )}
              >
                Toidoc
              </p>
            </a>
          </Link>*/}

          <Link href="/tim-kiem" passHref>
            <a
              className={classNames(
                `menu-header px-[12px] h-[45px] rounded-[30px] ${
                  !GlobalStore.isLoggedIn
                    ? "pointer-events-none cursor-none"
                    : "cursor-pointer"
                }`,
                selectedTab === "RESEARCH" && "bg-tab-active text-active"
              )}
            >
              <img
                src={
                  selectedTab === "RESEARCH"
                    ? "/images/search-loupe-active.svg"
                    : "/images/search-loupe.svg"
                }
                className="w-[24px] m-auto"
                alt="Khám phá danh sách truyện full"
              />
              <p
                className={classNames(
                  "mb-0 text-[12px] font-bold label-text leading-[16px] whitespace-nowrap",
                  selectedTab === "RESEARCH" && "text-active block"
                  //   : "hidden md:block"
                )}
              >
                Khám phá
              </p>
            </a>
          </Link>
          <Link href="/the-loai" passHref>
            <a
              className={classNames(
                `menu-header px-[12px] h-[45px] rounded-[30px] ${
                  !GlobalStore.isLoggedIn
                    ? "pointer-events-none cursor-none"
                    : "cursor-pointer"
                }`,
                selectedTab === "STORY_TYPE" && "bg-tab-active text-active"
              )}
            >
              <img
                src={
                  selectedTab === "STORY_TYPE"
                    ? "/images/story-type-active.svg"
                    : "/images/story-type.svg"
                }
                className="w-[24px] m-auto"
                alt="Thể loại truyện full"
              />
              <p
                className={classNames(
                  "mb-0 text-[12px] font-bold label-text leading-[16px] whitespace-nowrap",
                  selectedTab === "STORY_TYPE" && "text-active block"
                  //   : "hidden md:block"
                )}
              >
                Thể loại
              </p>
            </a>
          </Link>
          <Link href="/blog-truyen-full" passHref>
            <a
              className={classNames(
                `menu-header px-[12px] h-[45px] rounded-[30px] ${
                  !GlobalStore.isLoggedIn
                    ? "pointer-events-none cursor-none"
                    : "cursor-pointer"
                }`,
                selectedTab === "BLOG" && "bg-tab-active text-active"
              )}
            >
              <img
                src={
                  selectedTab === "BLOG"
                    ? "/images/blog-active.svg"
                    : "/images/blog.svg"
                }
                className="w-[24px] m-auto"
                alt="Blog truyện"
              />
              <p
                className={classNames(
                  "mb-0 text-[12px] font-bold label-text leading-[16px] whitespace-nowrap",
                  selectedTab === "BLOG" && "text-active block"
                  //   : "hidden md:block"
                )}
              >
                Blog truyện
              </p>
            </a>
          </Link>
          {/*<div
            className={classNames(
              "flex items-center mx-[2px] px-[16px] h-[40px] rounded-[20px] cursor-pointer",
              selectedTab === "LIBRARY" && "bg-tab-active text-active"
            )}
            onClick={() => {
              Router.push("/blog");
            }}
          >
            <img
              src={
                selectedTab === "LIBRARY"
                  ? "/images/book-active.svg"
                  : "/images/book.svg"
              }
              className="w-[24px] mr-[4px]"
              alt="library"
            />
            <p
              className={classNames(
                "mb-0 text-[12px] font-bold label-text leading-[16px] whitespace-nowrap",
                selectedTab === "LIBRARY"
                  ? "text-active block"
                  : "hidden md:block"
              )}
            >
              Blog
            </p>
          </div>*/}
          <div
            className={classNames(
              `hidden md:block menu-header px-[12px] h-455px] rounded-[20px] ${
                !GlobalStore.isLoggedIn
                  ? "pointer-events-none cursor-none"
                  : "cursor-pointer"
              }`,
              selectedTab === "AUTHOR" && "bg-tab-active text-active"
            )}
            onClick={() => {
              window.open(
                "https://toidoc.vn/register-author-summary.html",
                "_blank"
              );
            }}
          >
            <img
              src={
                selectedTab === "AUTHOR"
                  ? "/images/author-active.svg"
                  : "/images/author.svg"
              }
              className="w-[28px] m-auto items-center"
              alt="Đăng truyện tại Toidoc"
            />
            <p
              className={classNames(
                "mb-0 text-[12px] font-bold label-text leading-[16px] whitespace-nowrap",
                selectedTab === "AUTHOR" && "text-active block"
              )}
            >
              Đăng truyện
            </p>
          </div>
          <Link href="/lien-he" passHref>
            <a
              className={classNames(
                "block md:hidden menu-header px-[12px] h-[45px] rounded-[20px] cursor-pointer",
                selectedTab === "CONTACT" && "bg-tab-active text-active"
              )}
            >
              <img
                src={
                  selectedTab === "CONTACT"
                    ? "/images/contact-active.svg"
                    : "/images/contact.svg"
                }
                className="w-[28px] mr-[4px] items-center"
                alt="Đăng truyện tại Toidoc"
              />
              <p
                className={classNames(
                  "mb-0 text-[12px] font-bold label-text leading-[16px] whitespace-nowrap",
                  selectedTab === "CONTACT" && "text-active block"
                )}
              >
                Hỗ trợ
              </p>
            </a>
          </Link>

          {/*<div
            className={classNames(
              "flex items-center mx-[2px] px-[16px] h-[40px] rounded-[20px] cursor-pointer",
              selectedTab === "CONTACT" && "bg-tab-active text-active"
            )}
            onClick={() => {
              Router.push("/lien-he");
            }}
          >
            <img
              src={
                selectedTab === "CONTACT"
                  ? "/images/contact-active.svg"
                  : "/images/contact.svg"
              }
              className="w-[24px] mr-[4px]"
              alt="Liên hệ"
            />
            <p
              className={classNames(
                "mb-0 text-[12px] font-bold label-text leading-[16px] whitespace-nowrap",
                selectedTab === "CONTACT"
                  ? "text-active block"
                  : "hidden md:block"
              )}
            >
              Liên hệ
            </p>
          </div>*/}
          {/* <div className={classNames('menu-header mx-[2px] px-[16px] h-[40px] rounded-[20px] cursor-pointer',
            selectedTab === 'PROFILE' && 'bg-tab-active text-active'
          )}
          onClick={() => handleButtonAccount()}
          >
            <img src={GlobalStore?.profile?.avatar ? GlobalStore?.profile?.avatar : selectedTab === 'PROFILE' ? '/images/user-active.svg' : '/images/user.svg'} className='w-[24px] mr-[4px] bd-radius-24'
              alt='user'
            />
            <p className={classNames('mb-0 text-[12px] font-bold label-text leading-[16px] whitespace-nowrap',
              selectedTab === 'PROFILE'&& 'text-active block'
            )}>
              {GlobalStore?.isLoggedIn ? 'Tài khoản' : 'Đăng nhập'}
            </p>
          </div> */}

          <Link
            className={!GlobalStore.isLoggedIn ? "pointer-events-none" : ""}
            href={GlobalStore.isLoggedIn ? "/tai-khoan" : "/dang-nhap"}
            passHref
          >
            <a
              id="profile-btn"
              className={classNames(
                `menu-header px-[12px] h-[45px] rounded-[20px] ${
                  !GlobalStore.isLoggedIn
                    ? "pointer-events-none cursor-none"
                    : "cursor-pointer"
                }`,
                selectedTab === "PROFILE" && "bg-tab-active text-active"
              )}
              // onClick={(e) => {
              //   if (!GlobalStore.isLoggedIn) {
              //     e.preventDefault();
              //     setShowLogin(true);
              //   }
              // }}
            >
              <img
                src={
                  GlobalStore?.profile?.avatar
                    ? GlobalStore?.profile?.avatar
                    : selectedTab === "PROFILE"
                    ? "/images/user-active.svg"
                    : "/images/user.svg"
                }
                className="w-[24px] m-auto bd-radius-24"
                alt="Tài khoản cá nhân"
              />
              <p
                className={classNames(
                  "mb-0 text-[12px] font-bold label-text leading-[16px] whitespace-nowrap",
                  selectedTab === "PROFILE" && "text-active block"
                )}
              >
                {GlobalStore?.isLoggedIn ? "Tài khoản" : "Đăng nhập"}
              </p>
            </a>
          </Link>
        </div>

        <div className="relative mt-2 w-[157px] hidden md:block">
          <input
            className="search h40 border-primary border-width-1"
            placeholder="Tìm kiếm truyện..."
            value={text}
            onChange={(e) => {
              const value = e.target.value;
              setText(value);
              clearTimeout(timeout);
              timeout = setTimeout(() => {
                Router.push(`/tim-kiem-truyen?tukhoa=${value}`);
              }, 600);
            }}
            disabled={!GlobalStore.isLoggedIn}
          />
          <img src="/images/search.svg" className="search-icon" alt="search" />
        </div>
      </div>

      {showLogin && (
        <ModalComponent
          show={showLogin}
          handleClose={(e) => setShowLogin(false)}
        >
          <ShortLogin
            description="Đăng nhập 1 chạm bằng các phương thức dưới đây để sử dụng tính năng này."
            closeModal={() => setShowLogin(false)}
          />
        </ModalComponent>
      )}
    </div>
  );
};

export default observer(Header);
