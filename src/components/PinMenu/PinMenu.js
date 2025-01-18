import { Collapse, ConfigProvider } from "antd";
import { useEffect, useState } from "react";

const PinMenu = ({ headingList, scrollIntoView }) => {
  const [currentIndex, setCurrentIndex] = useState("");
  const [currentHeading, setCurrentHeading] = useState(
    headingList?.[0]?.label || ""
  );
  const [headingOrder, setHeadingOrder] = useState(1);
  const [isVisible, setIvisible] = useState(false);
  const [activeKey, setActiveKey] = useState([]);

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
          <li key={item.id} className="cursor-pointer">
            <div
              className="hover:text-blue-600 mt-2 max-w-xs sm:max-w-none pl-3.5"
              onClick={() => {
                scrollIntoView(item.id)
                setActiveKey([])
              }}
            >
              {currentIndex}. {item.label}
            </div>

            {item.children.length > 0 &&
              renderNestedList(item.children, currentIndex)}
          </li>
        );
      })}
    </ol>
  );

  const nestedHeadingList = generateNestedList(headingList);

  useEffect(() => {
    const handleScroll = () => {
      const headings = headingList.map((item) =>
        document.getElementById(item.id)
      );
      const scrollTop = window.scrollY;

      if (headings[0]?.offsetTop <= scrollTop - 200) {
        setIvisible(true);
      } else {
        setIvisible(false);
      }

      for (let i = headings.length - 1; i >= 0; i--) {
        if (headings[i]?.offsetTop <= scrollTop + 10) {
          setCurrentHeading(headingList[i].label);
          setHeadingOrder(i + 1);

          const calculateIndex = (nestedList, id, parentIndex = "") => {
            for (let j = 0; j < nestedList.length; j++) {
              const currentIndex = parentIndex
                ? `${parentIndex}.${j + 1}`
                : `${j + 1}`;
              if (nestedList[j].id === id) {
                return currentIndex;
              }
              if (nestedList[j].children.length > 0) {
                const childIndex = calculateIndex(
                  nestedList[j].children,
                  id,
                  currentIndex
                );
                if (childIndex) {
                  return childIndex;
                }
              }
            }
            return null;
          };

          const fullIndex = calculateIndex(
            nestedHeadingList,
            headingList[i].id
          );
          setCurrentIndex(fullIndex);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headingList, nestedHeadingList]);

  const items = [
    {
      key: "1",
      label: (
        <div className="text-blue-600 max-w-xs sm:max-w-none">
          {currentIndex}. {currentHeading}
        </div>
      ),
      children: renderNestedList(nestedHeadingList),
    },
  ];
  return isVisible ? (
    <ConfigProvider
      theme={{
        token: {
          colorTextHeading: "#000",
          colorTextBase: "#3b82f6",
          padding: "20",
        },
      }}
    >
      <div className="fixed top-[0px] sm:top-[92px] z-[999] translate-x-[-10px] sm:translate-x-[-25px] w-[950px] -ml-5 sm:ml-2 shadow-md">
        <Collapse
          className="bg-slate-50 font-[500] max-h-[500px] rounded-none -mt-5 py-1.5 overflow-y-auto"
          items={items}
          bordered={false}
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key)}
        />
      </div>
    </ConfigProvider>
  ) : null;
};

export default PinMenu;
