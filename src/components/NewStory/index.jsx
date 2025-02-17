import { Table } from "antd";
import { useTableOptions } from "../../hook/useTableOption";
import Title from "./title";
import { useRouter } from "next/router";
import { getSlugfromSlugGenerate, slugGenerate } from "../../utils/utils";
import ButtonViewAll from "../ButtonViewAll";

const NewStory = ({ data }) => {
  const { newStoryColumns } = useTableOptions();
  const router = useRouter();
  return (
    <>
      <Title />
      <Table
        onRow={(record) => {
          return {
            onClick: () => {
              router.push(`${record.slug}`);
            },
          };
        }}
        pagination={false}
        size="small"
        showHeader={false}
        bordered
        dataSource={data}
        columns={newStoryColumns}
      />

      <div className="flex">
        <ButtonViewAll
          className="w-full border-1 text-[#5C95C6] bg-[#F5F8FF] font-medium rounded-lg text-base px-5 py-2.5 text-center shadow-sm hover:bg-[#5C95C6] hover:transition hover:delay-50 hover:!text-white cursor-pointer"
          url="/danh-sach-truyen/moi-nhat"
        />
      </div>
    </>
  );
};

export default NewStory;
