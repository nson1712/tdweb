import parse from "html-react-parser";

const ArticleShortDescription = ({ shortDescription }) => {
  return <div>{parse(shortDescription || "")}</div>;
};

export default ArticleShortDescription;
