import NewIcon from "../../../../public/icons/NewIcon";

const HeadMenu = ({ items }) => {
  return (
    <div className="flex px-[10px] justify-between py-[10px] items-center justify-center" style={{backgroundColor: "#f1f1f1"}}>
      <a href='/danh-sach-truyen/truyen-full'>
        <img src='/images/icon-story-full.png' className='w-[30px] mx-auto mb-[3px]' />
        <p className="text-center text-[12px] font-roboto m-0 text-[#000]"><strong>Truyện Full</strong></p>
      </a>
      <a href='/danh-sach-truyen/moi-nhat'>
        <NewIcon className='mb-[3px] m-auto'/>
        <p className="text-center text-[12px] font-roboto m-0 text-[#000]"><strong>Truyện Mới</strong></p>
      </a>
      <a href='/the-loai'>
        <img src='/images/icon-category.png' className='w-[30px] mx-auto mb-[3px]' />
        <p className="text-center text-[12px] font-roboto m-0 text-[#000]"><strong>Thể loại</strong></p>
      </a>
      <a href='/register-author-summary.html'>
        <img src='/images/icon-author.png' className='w-[30px] mx-auto mb-[3px]' />
        <p className="text-center text-[12px] font-roboto m-0 text-[#000]"><strong>Đăng truyện</strong></p>
      </a>
      <a href='/bo-suu-tap'>
        <img src='/images/icon-collection-story.png' className='w-[30px] mx-auto mb-[3px]' />
        <p className="text-center text-[12px] font-roboto m-0 text-[#000]"><strong>Bộ sưu tập</strong></p>
      </a>
    </div>
  );
};

export default HeadMenu;
