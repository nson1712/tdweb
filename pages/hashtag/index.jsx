import React from "react";
import HashtagsPage from "../../src/pages/Hashtags";
import HeaderServer from "../../src/components/HeaderServer";

const Hashtags = () => {
  return (
    <>
      <HeaderServer
        title="Danh sách thể loại truyện full theo hashtag | Webtruyen"
        description="Danh sách toàn bộ các thể loại truyện full online mà toidoc cung cấp. Bạn có thể xem danh sách các truyện có trong từng thể loại."
        canonical="https://toidoc.vn/the-loai"
      />
      <HashtagsPage />
    </>
  );
};

export default Hashtags;
