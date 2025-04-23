import React, { useEffect, useMemo, useState } from 'react'
import Header from '../../components/Header/Header'
import CommonLayout from '../../layouts/CommonLayout/CommonLayout'
import { observer } from 'mobx-react'

const Author = () => {

  return (
    <>
      <div>
        <Header selectedTab={'AUTHOR'}/>
        <div className='home-content pt-[16px]'>
          <div className='items-center justify-between px-[20px] mb-[16px]'>
            <div >
              <img src='/images/logo-toidoc.svg' className='mr-[24px]'
                onClick={() => {
                  Router.push('/tim-kiem')
                }}
                alt='logo'
              />
              <p className={'mt-[18px] items-center flex-wrap'} ><strong>THÔNG ĐIỆP TỪ TOIDOC</strong></p>
            </div>
            <p><strong><i>Cảm ơn</i></strong> bạn khi đã quan tâm đến việc sản xuất nội dung trên cộng đồng Toidoc (Tôi đọc). </p>
            <p>Chứng kiến quá trình trưởng thành của nhiều cây bút trên cộng đồng này, chúng tôi thấm thía rằng dù việc chắp bút cần có đam mê; tuy nhiên, nỗi lo cơm áo gạo tiền luôn là nỗi niềm, là áp lực không thể chối cãi của những cây bút mới. Nếu có một cộng đồng chung sức, nếu có những nguồn lực tốt hơn thì có lẽ nhiều tác giả, dịch giả đã có thể sống với đam mê và nhiều tác phẩm tuyệt vời hơn đã xuất hiện. </p>
            <p>Bởi vậy, với Toidoc:</p>
            <p><strong><i className='bg-text'>Sứ mệnh phát triển cộng đồng yêu thích truyện mạng là không thể tách rời với nhiệm vụ hỗ trợ, phát triển, nâng tầm người viết.</i></strong></p>
            <p>Khi và chỉ khi người viết có thể phát triển được với thu nhập từ nghề viết, cộng đồng truyện mạng mới đạt được tiền đề đầu tiên để lớn mạnh. Những gì các cây bút mới đang làm và sắp làm đóng vai trò không thể thay thế cho cộng đồng Toidoc nói riêng, sự phát triển của văn học mạng nói chung. Bằng tất cả nỗ lực, Toidoc cam kết đem tới cho tác giả một môi trường phát triển thuận lợi trong đó các yêu cầu sau được đảm bảo:</p>
            <ul>
              <li><strong><i>Nhuận bút minh bạch:</i></strong> Toidoc cập nhật mọi thông tin liên quan đến thu nhập của bạn trên website:”tacgia.toidoc.vn” theo thời gian thực, cách tính thu nhập được công khai, dễ hiểu.</li>
              <li><strong><i>Bảo vệ bản quyền:</i></strong> Mọi tác phẩm được chia sẻ trên cộng đồng đều đã được người viết xác nhận việc được sử dụng bản quyền. Ngược lại, nền tảng cũng ghi nhận và thực hiện bảo vệ tối đa với bản quyền của người viết. Trong trường hợp bạn xác định có tác phẩm vi phạm bản quyền của bạn trên Toidoc, vui lòng liên hệ hoặc báo cáo trong nền tảng, chúng tôi đảm bảo thực hiện đầy đủ các giải pháp để bảo vệ người sản xuất nội dung.</li>
              <li><strong><i>Nâng tầng tác phẩm:</i></strong> Việc giới thiệu những tác phẩm hay ra thế giới không thể chỉ là nỗ lực của một mình tác giả. Cộng đồng và các ekip nhiệt huyết tại Toidoc sẽ đồng hành với người viết trong quá trình này, khẳng định được tài năng người viết Việt.</li>
              <li><strong><i>Học hỏi kinh nghiệm:</i></strong> Hãy để cộng đồng người viết tại Toidoc có được sự ủng hộ, động viên, tư vấn… và có cơ hội nâng cao năng lực cạnh tranh. Thật tuyệt khi bạn có công việc hấp dẫn để làm, có đam mê để theo đuổi, và có người đồng hành để tụ tập sẻ chia.</li>
            </ul>
            <p><strong><i>Lời nhắn:</i></strong> Mặt khác, là một cộng đồng đọc đề cao góc nhỏ yên bình của mỗi thành viên, chúng tôi cũng có một số quy tắc ứng xử và yêu cầu về nội dung mà người viết nên tuân thủ để đảo bảo chất lượng tác phẩm, tôn trọng cá nhân các thành viên, xã hội cũng như các chủ thể khác, đề cao sự tích cực trong cộng đồng. Mong các bạn dành thời gian xem chi tiết tại đây để quá trình sản xuất nội dung được thuận lợi.</p>
            <p>{'=> XEM CHI TIẾT ĐIỀU KHOẢN VÀ CHÍNH SÁCH CỦA TÁC GIẢ'}<a href='/author-policy.html'>TẠI ĐÂY</a></p>
          </div>
          <div className='ml-[20px] mr-[20px] max-w-[300px] mg-auto mb-[50px]'>
            <a className='w-[32px] h-[32px] flex items-center justify-center btnMain' href='https://tacgia.toidoc.vn'>Truy Cập Website Tác Giả/ Dịch Giả</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default observer(Author)
