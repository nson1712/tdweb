import Link from "next/link";

const withCustomLink = (WrapComponent) => {
  return ({ item, pathname, query, ...props }) => (
    <Link
      href={{
        pathname: pathname,
        query: query,
      }}
      passHref
    >
      <a className="cursor-pointer" title={item.title}>
        <WrapComponent item={item} {...props} />
      </a>
    </Link>
  );
};

export default withCustomLink;
