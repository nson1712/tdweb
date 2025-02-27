import React from "react";
import parse from "html-react-parser";
import {
  cleanHtml,
  getSlugfromSlugGenerate,
  slugGenerate,
} from "../../utils/utils";

const wrapFigcaption = (html) => {
  return html.replace(
    /(<figcaption[^>]*>)([\s\S]*?)(<\/figcaption>)/gi,
    (_, openTag, content, closeTag) =>
      `<div class="flex justify-center bg-slate-100">${openTag}${content}${closeTag}</div>`
  );
};

const Content = ({ content }) =>
  content?.map((item, index) => {
    const processedContent = wrapFigcaption(item);

    return (
      <div
        key={index}
        {...(/<\/h[1-6]>/i.test(item) && {
          id: getSlugfromSlugGenerate(slugGenerate(cleanHtml(item))),
        })}
        className={/<\/figure>/i.test(item) ? "mb-1 flex justify-center" : undefined}
      >
        {parse(processedContent)}
      </div>
    );
  }) ?? null;

export default Content;
