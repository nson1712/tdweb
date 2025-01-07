import {
  cleanHtml,
  getSlugfromSlugGenerate,
  slugGenerate,
} from "../../utils/utils";

const Content = ({ content }) => {
    console.log("CONTENT: ", content)
  return (
    <div>
      {content.map((item, index) => {
        if (
          item.includes(
            "<h1>" || "<h2>" || "<h3>" || "<h4>" || "<h5>" || "<h6>"
          )
        ) {
          return (
            // <div
            //   id={getSlugfromSlugGenerate(slugGenerate(cleanHtml(item)))}
            //   key={index}
            //   dangerouslySetInnerHTML={{ __html: item }}
            // />
            <h3 id={getSlugfromSlugGenerate(slugGenerate(cleanHtml(item)))} key={index}>
                {cleanHtml(item)}
            </h3>
          );
        } else {
          return <div>{cleanHtml(item)}</div>
        }
      })}
    </div>
  );
};

export default Content;
