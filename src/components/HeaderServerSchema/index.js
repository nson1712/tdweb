import React from "react"
import Head from "next/head"

const HeadSchemaComponent = ({
  title,
  description,
  keywords,
  image,
  canonical,
  author,
  rating,
  slug,
  totalView
}) => {
    function addProductJsonLd() {
      return {
        __html: `{
        "@context": "https://schema.org/",
        "@type": "Book",
        "name": "${title}",
        "image": "${image}",
        "description": "${description}",
        "keywords": "${keywords}",
        "url": "${`https://toidoc.vn/` + slug}",
        "publisher": {
          "@type": "Organization",
          "name": "Toidoc"
        },
        "author": {
          "@type": "Person",
          "name": "${author}"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "${rating}",
          "ratingCount": "${totalView}"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://toidoc.vn"
        }
      }
    `,
      };
    }

  return (
    <>
      <Head>
          <title>{title || "Nền tảng đọc Truyện Full Online Cập Nhật Mới Nhất"} </title>
          {canonical && <link rel="canonical" href={canonical}></link> }
          <meta name="title" content={title || "Nền tảng đọc Truyện Full Online Cập Nhật Mới Nhất"}></meta>
          <meta
            name="description"
            content={
              description ||
              "Toidoc là nền tảng cộng đồng đọc truyện, trao đổi và đăng các thể loại truyện như truyện ngôn tình, truyện đam mỹ, kiếm hiệp, tiên hiệp, trọng sinh, trinh thám."
            }
          />
          <meta
            name="keywords"
            content={
              keywords ||
              "Truyện ngôn tình, ngôn tình, truyện ngược, truyện sủng, truyện tiên hiệp, truyện kiếm hiệp, truyện đam mỹ, truyện huyền huyễn, truyện trọng sinh, truyện trinh thám, truyện full miễn phí, truyện full, truyện hay, đọc truyện chữ, truyện chữ, truyện dịch, truyện online, truyện ngắn"
            }
          />
          <meta property="og:site_name" content="toidoc.vn"></meta>
          <meta property="og:url" content={canonical}></meta>
          <meta property="og:title" content={title || "Nền tảng đọc Truyện Full Online Cập Nhật Mới Nhất"} />
          <meta
            property="og:description"
            content={
              description ||
              "Toidoc là nền tảng cộng đồng đọc truyện, trao đổi và đăng các thể loại truyện như truyện ngôn tình, truyện đam mỹ, kiếm hiệp, tiên hiệp, trọng sinh, trinh thám."
            }
          />
          <meta
            property="og:image"
            content={image || "/images/cover-doc-gia-min.png"}
          />
          <meta
            property="og:image:secure_url"
            content={image || "/images/cover-doc-gia-min.png"}
          />
          <meta property="og:image:width" content="1000" />
          <meta property="og:image:height" content="1546" />
          <link rel="image_src" href={image || "/images/cover-doc-gia-min.png"}></link>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="twitter:card" content="summary" />
          <meta
            name="twitter:description"
            content={
              description ||
              "Toidoc là nền tảng cộng đồng đọc truyện, trao đổi và đăng các thể loại truyện như truyện ngôn tình, truyện đam mỹ, kiếm hiệp, tiên hiệp, trọng sinh, trinh thám."
            }
          />
          <meta name="twitter:title" content={title || "Nền tảng đọc Truyện Full Online Cập Nhật Mới Nhất"} />
          <meta
            name="twitter:image:src"
            content={image || "/images/cover-doc-gia-min.png"}
          ></meta>

          <meta name="author" content="toidoc.vn"></meta>
          <meta name="ROBOTS" content="INDEX,FOLLOW"></meta>
          <meta property="og:locale" content="vi_VN"></meta>
          <meta property="og:type" content="website"></meta>
          {/* Favicon */}
          <link rel="shortcut icon" href="https://toidoc.vn/favicon.ico" />
          <link rel="icon" href="https://toidoc.vn/favicon.ico" />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={addProductJsonLd()}
            key="product-jsonld"
          />
      </Head>
    </>
  )
}

export default HeadSchemaComponent
