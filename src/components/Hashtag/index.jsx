const Hashtag = ({ hashtag }) => {
  return (
    <a href="" className="rounded-2xl px-3 py-2 text-[#5C95C6] bg-gradient-to-r from-[#AACAF9] via-[#EAF1FB] to-[#D3E2F8] shadow-md shadow-blue-300 cursor-pointer hover:translate-y-[-5%] transition delay-100">
      #{hashtag}
    </a>
  );
};

export default Hashtag;
