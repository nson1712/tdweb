// const CustomLink = ({ router, href, query, children, ...props }) => {
//   const handleClick = (e) => {
//     if (query.id) {
//       localStorage.setItem("hiddenQuery", JSON.stringify(query));
//     }
//     router.push(
//       {
//         pathname: href,
//         query: query,
//       },
//       href
//     );
//   };

//   return (
//     <div
//       onClick={handleClick}
//       {...props}
//       className={` text-black hover:text-blue-600 cursor-pointer ${props.className || ""}`}
//     >
//       {children}
//     </div>
//   );
// };

// export default CustomLink;
