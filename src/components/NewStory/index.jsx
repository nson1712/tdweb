import { Table } from "antd";
import { useTableOptions } from "../../hook/useTableOption";
import Title from "./title";
import { useRouter } from "next/router";
import { getSlugfromSlugGenerate, slugGenerate } from "../../utils/utils";

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
              router.push(
                `${getSlugfromSlugGenerate(slugGenerate(record.title))}`
              );
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
    </>
  );
};

export default NewStory;
