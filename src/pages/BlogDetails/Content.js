import React from "react";
import parse from "html-react-parser";
import {
  cleanHtml,
  getSlugfromSlugGenerate,
  slugGenerate,
} from "../../utils/utils";

const Content = ({ content }) =>
  content?.map((item, index) => (
    <div
      key={index}
      {...(item.match(/<\/h[1-6]>/i) && {
        id: getSlugfromSlugGenerate(slugGenerate(cleanHtml(item))),
      })}
      className={
        item.includes("</figure>") ? "mb-1 flex justify-center" : undefined
      }
    >
      {parse(item)}
    </div>
  )) ?? null;

export default Content;
