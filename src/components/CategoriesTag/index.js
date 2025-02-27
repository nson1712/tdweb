import Link from "next/link";

const CategoriesTag = ({ title, className }) => {
  return (
    <Link href="/blog-truyen-full" passHref>
      <a
        title="Blog truyenfull"
        className={`bg-[#DF062D] text-white font-semibold w-fit py-1 px-3 rounded-md ${className}`}
      >
        {title}
      </a>
    </Link>
  );
};

export default CategoriesTag;
