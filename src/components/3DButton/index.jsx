const Button3D = ({id, name, href, ...props}) => {
  return (
    <a
      id={id}
      href={href}
      className="w-fit relative border-0 bg-transparent p-0 mt-4 cursor-pointer outline-none focus:outline-none select-none touch-manipulation transition-filter duration-250 group"
      {...props}
    >
      <span className="absolute top-0 left-0 w-full h-full rounded-xl bg-black/25 will-change-transform translate-y-[2px] transition-transform duration-600 ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-[4px] group-active:translate-y-[1px]"></span>
      <span className="absolute top-0 left-0 w-full h-full rounded-xl bg-gradient-to-l from-[hsl(340deg_100%_16%)] via-[hsl(340deg_100%_32%)] to-[hsl(340deg_100%_16%)]"></span>
      <span className="block relative px-[27px] py-[12px] rounded-xl text-white bg-[hsl(345deg_100%_47%)] will-change-transform translate-y-[-4px] transition-transform duration-600 ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-[-6px] group-active:translate-y-[-2px] text-[1.1rem]">
        {name}
      </span>
    </a>
  );
};

export default Button3D;
