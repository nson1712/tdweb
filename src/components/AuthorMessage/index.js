import { UserOutlined } from "@ant-design/icons";
import { Avatar, Typography } from "antd";

const { Paragraph } = Typography;
const AuthorMessage = () => {
  return (
    <div className="p-2 rounded-[8px] bg-gradient-to-br from-[#f6d9d9] to-[#fffcfc] sm:flex sm:space-x-6">
      <div>
        <Avatar size={100} src="https://toidoc.vn/images/logo-toidoc.svg" />
      </div>
      <Paragraph className="font-semibold">
        <svg
          stroke="currentColor"
          fill="rgb(223 6 45)"
          stroke-width="0"
          viewBox="0 0 512 512"
          class="text-cps"
          height="12"
          width="12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path>
        </svg>
        Bạn là tín đồ đam mê công nghệ và game? Hãy cùng mình - Gia Khanh, khám
        phá những bí mật thú vị về thế giới số. Với những bài viết chuyên sâu và
        cập nhật thường xuyên, mình sẽ giúp bạn luôn đi đầu trong xu hướng.
        <div className="flex w-full justify-end">
          <svg
            stroke="currentColor"
            fill="rgb(223 6 45)"
            stroke-width="0"
            viewBox="0 0 512 512"
            class="text-cps"
            height="12"
            width="12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z"></path>
          </svg>
        </div>
      </Paragraph>
    </div>
  );
};

export default AuthorMessage;
