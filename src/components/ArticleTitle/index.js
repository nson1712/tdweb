import parse from "html-react-parser";

const ArticleTitle = ({ title, className }) => {
  return <div className={className}>{parse(title || "")}</div>;
};

export default ArticleTitle;
