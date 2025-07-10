const NotFound = ({title, content}) => {
  return (
    <section className="page_404 sm:mt-[100px]">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1 text-center self-center ">
              <div className="four_zero_four_bg m-auto">
                <h1 className="text-center ">404</h1>
              </div>

              <div className="contant_box_404">
                <p className="h2">{title}</p>

                <p>Bạn hãy bấm vào nút Trang Chủ để xem nhiều truyện HOT khác nhé!</p>

                <a href="https://toidoc.vn" className="link_404">
                  Trang chủ
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
