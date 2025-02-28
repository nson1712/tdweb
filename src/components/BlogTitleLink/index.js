import withCustomLink from "../CustomLink";

const BlogTitleLink = ({ item, className }) => (
  <p className={className}>{item.title}</p>
);

export default withCustomLink(BlogTitleLink);
