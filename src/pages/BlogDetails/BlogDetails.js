import { observer } from "mobx-react";
import React from "react";
import CommonLayout from "../../layouts/CommonLayout/CommonLayout";
import { DateTime } from "luxon";
import { CalendarTwoTone } from "@ant-design/icons";
import Content from "./Content";
import Menu from "./Menu";

const BlogDetails = () => {
  const data = {
    coverImage:
      "https://media.truyenso1.xyz/story-coverd4bc6da8-4125-4e9f-a47f-b9102a21db94-1736240269947.jpg",
    title: "Phá sóng karaoke: Có nên hay không nhỉ các bạn ơi hah ah ah ahh a?",
    createdAt: 1734159619140,
    updatedAt: 1736159662308,
    shortDescription:
      "Âm nhạc những ngày cận Tết từ các dàn loa công suất lớn khiến bạn khó chịu và nghĩ đến việc phá sóng karaoke để lấy lại sự yên bình? \n Tuy vậy, việc phá sóng karaoke có thực sự là giải pháp hợp lý, hay nó chỉ khiến mọi thứ trở nên phức tạp hơn? Hãy cùng tìm hiểu kỹ hơn với Sforum nhé!",
    content:
      "<h3>Thiết kế và ngoại hình Nothing Phone 2a Plus</h3> \n Về thiết kế, Nothing Phone 2a Plus không có quá nhiều khác biệt so với người anh em Nothing Phone 2a. Máy vẫn giữ được phong cách thiết kế đặc trưng với các đường nét vát phẳng, hòa quyện cùng các cạnh bo cong nhẹ nhàng, mang đến sự hài hòa giữa cổ điển và hiện đại. \n Điểm nhấn nổi bật của Nothing Phone 2a Plus chính là ngoại hình ấn tượng, thể hiện cá tính độc đáo ngay từ cái nhìn đầu tiên. Mặt lưng trong suốt kết hợp cùng hệ thống đèn LED độc quyền không chỉ tạo sự hiện đại, cuốn hút mà còn giúp thiết bị dễ dàng nổi bật trong đám đông. \n Nothing Phone 2a Plus mang đến hai tùy chọn màu sắc là đen và xám, trong đó màu xám là điểm khác biệt độc đáo không xuất hiện trên Nothing Phone 2a. Đây là chi tiết giúp người dùng dễ dàng phân biệt giữa hai phiên bản, đồng thời mang lại sự mới mẻ cho dòng sản phẩm. \n Sự khác biệt lớn nhất giữa Nothing Phone 2a và 2a Plus nằm ở họa tiết mặt lưng. Với Nothing Phone 2a Plus, các họa tiết được thiết kế theo phong cách mạ nhôm sáng bóng, tạo cảm giác nổi bật và cao cấp hơn. Ngoài ra, mặt lưng của phiên bản này còn được nhấn nhá thêm một ô vuông nhỏ ở góc trái, tăng thêm phần độc đáo. Trong khi đó, Nothing Phone 2a sử dụng họa tiết đồng màu với mặt lưng, mang đến cảm giác tối giản nhưng đôi khi lại hơi kém nổi bật. \n <figure class='image'><img src='https://media.truyenso1.xyz/story-cover4bc133a5-4670-4f68-8a6a-8725dc5a1b83-1736240488273.jpg'></figure> \n Về độ hoàn thiện thì Nothing Phone 2a Plus được hoàn thiện từ chất liệu nhựa. Tuy là vậy nhưng máy vẫn mang đến cảm giác chắc chắn và cao cấp, không bị rẻ tiền. Với kích thước 161.7 x 76.3 x 8.5 mm. Trọng lượng 190g, vừa đủ để mang lại cảm giác đầm tay, tạo sự chắc chắn mà không quá nặng nề khi sử dụng trong thời gian dài. \n <ul><li>line 1</li><li>line 2</li></ul>",
  };

  const contentArr = data.content.split("\n");

  return (
    <CommonLayout>
      <div className="md:-mt-12 relative pb-[100px] max-w-[950px] mx-auto p-6 bg-white min-h-[100vh] shadow-md border border-slate-100 rounded-2xl md:space-y-4">
        <div className="hidden md:block md:text-3xl font-semibold">
          {data?.title}
        </div>

        <div className="text-[12px] md:text-sm text-slate-500">
          <CalendarTwoTone /> Ngày đăng:{" "}
          {DateTime.fromMillis(data?.createdAt ?? 0, { zone: "utc" }).toFormat(
            "dd/MM/yyyy"
          )}{" "}
          - Cập nhật:{" "}
          {DateTime.fromMillis(data?.updatedAt ?? 0, { zone: "utc" }).toFormat(
            "dd/MM/yyyy"
          )}
        </div>

        <Content content={contentArr} />

        <Menu />
      </div>
    </CommonLayout>
  );
};

export default observer(BlogDetails);
