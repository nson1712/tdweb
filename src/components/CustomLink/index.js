const { default: Link } = require("next/link");

const withCustomLink = (WrapComponent) => {
  return ({ item, pathname, query, ...props }) => (
    <Link
      href={{
        pathname: pathname,
        query: query,
      }}
    >
      <div className="cursor-pointer">
        <WrapComponent item={item} {...props} />
      </div>
    </Link>
  );
};

export default withCustomLink;
