import React from "react";
import HeaderServer from "../src/components/HeaderServer";
import Link from "next/link";

const FourOhFour = () => {
  return (
    <>
      <HeaderServer
        description="Danh sách toàn bộ các thể loại truyện full online mà toidoc cung cấp. Bạn có thể xem danh sách các truyện có trong từng thể loại."
        canonical="https://toidoc.vn/404-error"
      />
      <section class="page_404">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 ">
              <div class="col-sm-10 col-sm-offset-1  text-center">
                <div class="four_zero_four_bg">
                  <h1 class="text-center ">404</h1>
                </div>

                <div class="contant_box_404">
                  <h3 class="h2">Trang bạn đang tìm kiếm không tồn tài</h3>

                  <p>Xin vui lòng quay lại trang chủ để tìm truyện!</p>

                  <a href="https://toidoc.vn" class="link_404">
                    Trang chủ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default FourOhFour;
