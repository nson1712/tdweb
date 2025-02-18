import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'

const Chapters = ({
  setShowChapter,
  story,
  currentChapter
}) => {
  return (
    <div className='md:hidden fixed top-0 right-0 left-0 bottom-0 z-[99] bg-story'>
        <div className='flex items-center justify-between border-b-[1px] border-color fixed md:static top-0 left-0 right-0 bg-story'>
          <a className='p-[20px]'
            onClick={() => {
              setShowChapter(false)
            }}
          >
            <img src='/images/x-black.svg' className='w-[24px]'/>
          </a>

          <h1 className='text-[16px] leading-[20px] font-bold main-text mb-0 line-clamp-1'>
            Danh sách chương
          </h1>

          <div className='w-[68px]'/>
        </div>

        <div className='px-[20px] chapter-content'>
          { story.chapters
                && story.chapters.map((chapter, i) => (
                  <div className='grid-item-chapter'>
                    {!chapter?.isFree ?
                      <img src='/images/lock.png' className='w-5 float-left mr-[5px]'/>
                      :
                      <img src='/images/Done.png' className='w-5 float-left mr-[5px]'/>
                    }
                    <Link href={`/${story.slug}/${chapter.slug}`} passHref>
                    <a className={classNames('block py-1 text-base font-medium secondary-text title-truncate-style', currentChapter?.id === chapter?.id && 'primary-text')}
                    onClick={() => {
                      setShowChapter(false)
                    }}
                    key={chapter.id}
                    title={`${story?.title} - ${chapter.title}`}
                    >
                      {i + 1}. {chapter.title}
                    </a>
                    </Link>
                  </div>
                  
                ))
              }
        </div>


        <div className='p-[20px] border-t-[1px] border-color fixed md:static left-0 right-0 bottom-0 bg-story'>
          <a className='text-[16px] font-bold main-text mb-0 flex-1 line-clamp-2' href={`/${story.slug}`} title={`Truyện ${story.title}`}>
            {story?.title}
          </a>
          <p className='text-[14px] leading-[20px] label-text mb-0'>
            {story?.chapters?.length } Chương
          </p>
        </div>
      </div>
  )
}

export default Chapters
