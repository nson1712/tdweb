import Link from "next/link";

const Hashtag = ({ hashtag }) => {
  return (
    <Link
      href={`/hashtag/${hashtag}`}
      passHref
    >
      <a title={hashtag} className="font-medium text-xs sm:text-sm md:text-base rounded-2xl px-3 py-2 text-[#5C95C6] bg-gradient-to-r from-[#AACAF9] via-[#EAF1FB] to-[#D3E2F8] shadow-md shadow-blue-300 cursor-pointer hover:translate-y-[-5%] transition delay-100 hover:!text-[#5C95C6]">#{hashtag}</a>
    </Link>
  );
};

export default Hashtag;
