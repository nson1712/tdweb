import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Pagination } from "antd";

const PaginatedList = ({ items }) => {
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Get items for the current page
    setCurrentItems(items?.slice(startIndex, endIndex));
  }, [items, currentPage, itemsPerPage]);

  return (
    <div>
      <div className="grid-container-style">
        {currentItems?.map((item, index) => (
          <div key={index} className="grid-item-style">
            {!item?.isFree ? (
              <img src="/images/lock.png" className="w-5 float-left mr-[5px]" />
            ) : (
              <img src="/images/Done.png" className="w-5 float-left mr-[5px]" />
            )}
            <Link href={`/${item?.storySlug}/${item?.slug}`}>
              <a title={item?.title} className="title-truncate-style">
                {item?.title}
              </a>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex gap-[5px] mt-2.5 justify-center">
        <Pagination
          showSizeChanger={true}
          total={items?.length}
          defaultCurrent={1}
          defaultPageSize={itemsPerPage}
          onChange={(page) => setCurrentPage(page)}
          onShowSizeChange={(_, pageSize) => setItemsPerPage(pageSize)}
        />
      </div>
    </div>
  );
};

export default PaginatedList;
