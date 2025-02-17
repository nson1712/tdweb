import React from 'react'
import StoriesComponent from '../../../src/pages/Stories'
import HeaderServer from '../../../src/components/HeaderServer'


const Stories = ({detail, canonical}) => {
  return (
    <>
      <HeaderServer title={detail?.title || "Bộ sưu tập truyện hấp dẫn được tổng hợp từ Toidoc"} 
        description = {detail?.metaDescription || "Danh sách các truyện thuộc một thể loại mà bạn đang trọn như ngôn tình, kiếm hiệp, tiên hiệp, đam mỹ, sủng, ngược, huyền huyễn. Bạn có thể tự tạo bộ lọc riêng của bạn."}
        keywords={detail?.metaKeywords}
        canonical={canonical}
      />
      <StoriesComponent />
    </>
  )
}

Stories.getInitialProps = async (ctx) => {
  try {
    let detail = {}
    if (ctx.query.theloai === 'trending') {
      detail = {
        title : 'Danh sách truyện full mới nổi hấp dẫn | Nền tảng cộng đồng đọc truyện online Toidoc',
        description : 'Danh sách những truyện full mới nổi được nhiều độc giả quan tâm và đọc nhiều trên nền tảng Toidoc. Danh sách truyện được được đề xuất bởi độc giả Toidoc bạn không nên bỏ qua.',
        keywords : 'truyện mới nổi, truyện xu hướng, truyện chữ mới nổi, truyện chữ hay, truyện chữ full, truyện chữ mới nổi Toidoc'
      }
    }
    if (ctx.query.theloai === 'moi-nhat') {
      detail = {
        title :  'Truyện full đang ra mới nhất, cập nhật liên tục | Nền tảng cộng đồng đọc truyện online Toidoc',
        description : 'Danh sách những truyện full mới vừa được cập nhật, nóng hổi vừa thổi vừa ăn tại Toidoc. Truyện được đăng bởi các tác giả và dịch giả uy tín trên Toidoc với nhiều thể loại truyện khác nhau.',
        keywords : 'truyện mới, truyện full mới, truyện mới cập nhật, truyện full toidoc, bộ truyện mới, truyện hay mới'
      }
    }
    if (ctx.query.theloai === 'truyen-full') {
      detail = {
        title :  'Danh sách truyện full đã hoàn cuốn hút | Nền tảng cộng đồng đọc truyện online Toidoc',
        description : 'Tuyển tập những bộ truyện đã hoàn thành trên nền tảng Toidoc. Bạn có thể nhảy hố nhiều bộ truyện khác nhau mà không sợ bị dang dỏ',
        keywords : 'truyện hoàn, truyện full, truyện mới hoàn thành, truyện full hoàn thành, truyện hoàn Toidoc, truyện hoàn mới nhất, truyện hay đã hoàn, truyện chữ hoàn, truyện chữ full'
      }
    }
    if (ctx.query.theloai === 'xem-nhieu-nhat') {
      detail = {
        title :  'Tuyển tập bộ truyện full được đọc nhiều | Nền tảng cộng đồng đọc truyện online Toidoc',
        description : 'Tuyển tập những bộ truyện được nhiều độc giả đề cử và đón đọc. Bạn không mất nhiều thời gian để tìm kiếm và bỏ qua bất kỳ bộ truyện nào với danh sách này.',
        keywords : 'truyện được xem nhiều, truyện đọc nhiều, truyện nhiều người đọc, truyện full đọc nhiều, truyện hay, truyện chữ hấp dẫn'
      }
    }
    if (ctx.query.theloai === 'hot') {
      detail = {
        title : 'Danh sách những bộ truyện HOT FULL cập nhật mới nhất | Nền tảng cộng đồng đọc truyện online Toidoc',
        description : 'Danh sách những bộ truyện HOT full không thể bỏ qua. Danh sách này là những bộ truyện mới HOT trong thời gian gần đây do độc giả Toidoc đề cử',
        keywords : 'truyện hot, truyện Toidoc hot, truyện hot full, truyện chữ hot, truyện hot hoàn thành, truyện hot mới, đề cử truyện, đề cử truyện hot'

      }
    }

    let canonical = 'https://toidoc.vn/danh-sach-truyen/' + ctx.query.theloai
    return {
      detail,
      canonical,
    }
  } catch(e) {
    console.log('Danh sách truyện error', e)
    return {
      detail: {},
    }
  }
  
}

export default Stories
