import React from 'react'
import classNames from 'classnames'
import Button from '../Button'

const Pagination = ({page = 1, totalPages = 1, changePage}) => {
  return (
    <div className='h-[56px] rounded-[12px] bg-option flex items-center justify-between pl-[24px] pr-[4px]'>
      <p className='text-[12px] leading-[16px] text-white pageText mb-0'>
        PAGE {page} OF {totalPages}
      </p>

      <div className='flex items-center'>
        <Button className='w-[32px] h-[32px] flex items-center justify-center mx-[8px] btn-white rounded-full'
          disabled={page <= 1}
          onClick={() => {
            changePage(page - 1)
          }}
        >
          <i className='fas fa-arrow-left text-white w-[10px] text-[12px]'/>
        </Button>
        { Array.from({length: totalPages}).map((item, i) => (
          <Button className={classNames('w-[32px] h-[32px] flex items-center justify-center mx-[8px] btn-white rounded-full text-white', page === i + 1 && 'primary-text secondary-bg')}
            onClick={() => {
              changePage(i + 1)
            }}
            key={i + 1}
          >
            {i + 1}
          </Button>
        )) }
        <Button className='w-[32px] h-[32px] flex items-center justify-center mx-[8px] btn-white rounded-full'
          disabled={page >= totalPages}
          onClick={() => {
            changePage(page + 1)
          }}
        >
          <i className='fas fa-arrow-right text-white w-[10px] text-[12px]'/>
        </Button>
      </div>
    </div>
  )
}

export default Pagination
