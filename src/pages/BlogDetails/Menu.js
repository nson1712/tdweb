import { Collapse } from "antd";

const Menu = () => {
  const menuArr = [
    "Bên nhau trọn đời",
    "Mãi mãi là bao xa",
    "All in love",
    "Yêu em từ cái nhìn đầu tiên",
  ];

  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;



  const items = [
    {
      key: '1',
      label: () => <div className="text-blue-500 font-semibold"></div>,
      children: <p>{text}</p>,
    },
  ];
  return (
      <Collapse items={items} defaultActiveKey={['1']} bordered={false}/>
  );
};

export default Menu;
