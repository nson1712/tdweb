import parse from "html-react-parser";

const ArticleTitle = ({ title, className, isH1 }) => {
  return isH1 ? <h1 className={className}>{parse(title || "")}</h1> : <p className={className}>{parse(title || "")}</p>;
};

export default ArticleTitle;
