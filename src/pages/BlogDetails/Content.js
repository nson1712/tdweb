import { Image } from "antd";
import {
  cleanHtml,
  getSlugfromSlugGenerate,
  slugGenerate,
} from "../../utils/utils";
import React from "react";

const Content = ({ content }) => {
  const headingRegex = /<h[1-6]>/i;

  return (
    <div>
      {content.map((item, index) => {
        if (headingRegex.test(item)) {
          const headingText = cleanHtml(item);
          const headingTagMatch = item.match(/<h([1-6])>/i);
          const HeadingTag = headingTagMatch ? `h${headingTagMatch[1]}` : "h3";

          return React.createElement(
            HeadingTag,
            {
              id: getSlugfromSlugGenerate(slugGenerate(cleanHtml(item))),
              key: index,
            },
            headingText
          );
        } else if (item.includes("<figure class='image'>")) {
          const regex = /src=['"]([^'"]+)['"]/;
          const match = item.match(regex);

          if (match && match[1]) {
            return (
              <div className="flex justify-center mb-1" key={index}>
                <Image
                  src={match[1]}
                  preview={false}
                  alt="alt"
                />
              </div>
            );
          }
          return <div key={index}></div>;
        } else {
          return <div className="mb-1" dangerouslySetInnerHTML={{ __html: item }} />;
        }
      })}
    </div>
  );
};

export default Content;
