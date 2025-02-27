import { Collapse, ConfigProvider } from "antd";

const Menu = ({ headingList, scrollIntoView }) => {
  const generateNestedList = (list) => {
    const result = [];
    const stack = [];

    list.forEach((item) => {
      const { level } = item;

      const newItem = { ...item, children: [] };

      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      if (stack.length === 0) {
        result.push(newItem);
      } else {
        stack[stack.length - 1].children.push(newItem);
      }

      stack.push(newItem);
    });

    return result;
  };

  const renderNestedList = (items, parentIndex = "") => (
    <ol className="list-none space-y-3 pl-4">
      {items.map((item, index) => {
        const currentIndex = parentIndex
          ? `${parentIndex}.${index + 1}`
          : `${index + 1}`;

        return (
          <li key={item.id} className="cursor-pointer mt-2">
            <a
              title={item.id}
              className="hover:!text-blue-600 mt-2"
              onClick={() => scrollIntoView(item.id)}
            >
              {currentIndex}. {item.label}
            </a>

            {item.children.length > 0 &&
              renderNestedList(item.children, currentIndex)}
          </li>
        );
      })}
    </ol>
  );

  const nestedHeadingList = generateNestedList(headingList);

  const items = [
    {
      key: "1",
      label: "Mục lục",
      children: renderNestedList(nestedHeadingList),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextHeading: "#000",
          colorTextBase: "#3b82f6",
          padding: "10",
        },
      }}
    >
      <Collapse
        className="bg-slate-50 sm:shadow-md font-[500]"
        items={items}
        defaultActiveKey={["1"]}
        bordered={false}
      />
    </ConfigProvider>
  );
};

export default Menu;
