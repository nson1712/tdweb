import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';

const PaginatedList = ({items}) => {
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
 
  useEffect(() => {
    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Get items for the current page
    setCurrentItems(items?.slice(startIndex, endIndex));

    // Total number of pages
    setTotalPages(Math.ceil(items?.length / itemsPerPage));
  }, [items, currentPage]);


  // Handle page navigation
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div>
        <div className='grid-container-style'>
            {currentItems?.map((item, index) => (
            <div key={index} className='grid-item-style'>
                {!item?.isFree ?
                    <img src='/images/lock.png' style={{'width': '20px', 'float': 'left', 'marginRight': '5px'}}/>
                    :
                    <img src='/images/Done.png' style={{'width': '20px', 'float': 'left', 'marginRight': '5px'}}/>
                }
                <a href={`/${item?.storySlug}/${item?.slug}`} className='title-truncate-style'>{item?.title}</a>
            </div>
            ))}
        </div>
      
      <div style={{ display: 'flex', gap: '5px', marginTop: '10px', justifyContent: 'center' }}>
        {/* Previous Button */}
        <Button
          className='button-page'
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {'<<'}
        </Button>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) =>
          page === '...' ? (
            <span key={index} className='box-page'>
              ...
            </span>
          ) : (
            <Button
              key={index}
              onClick={() => goToPage(page)}
              disabled={currentPage === page}
              className='button-page'
            >
              {page}
            </Button>
          )
        )}

        {/* Next Button */}
        <Button
          className='button-page'
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
         {'>>'}
        </Button>
      </div>
    </div>
  );
};

export default PaginatedList;
