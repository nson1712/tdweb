import withCustomLink from "../CustomLink";

const BlogTitleLink = ({ item, className }) => (
  <div className={className}>{item.title}</div>
);

export default withCustomLink(BlogTitleLink);
