import {
  cleanHtml,
  getSlugfromSlugGenerate,
  slugGenerate,
} from "../../utils/utils";
import React from "react";
import parse from "html-react-parser";

const Content = ({ content }) => {
  const headingRegex = /<\/h[1-6]>/i;
  return (
    <div>
      {content?.map((item, index) => {
        if (headingRegex.test(item)) {
          return (
            <div
              key={index}
              id={getSlugfromSlugGenerate(slugGenerate(cleanHtml(item)))}
            >
              {parse(item)}
            </div>
          );
        } else {
          return (
            <div key={index} className="mb-3">
              {parse(item)}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Content;
