import parse from "html-react-parser";

const ArticleTitle = ({ title, className }) => {
  return <h1 className={className}>{parse(title || "")}</h1>;
};

export default ArticleTitle;
