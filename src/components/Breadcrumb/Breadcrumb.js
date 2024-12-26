import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Breadcrumb({ className, routes }) {
  const router = useRouter()
  
  console.log(router)

  const pathName = ''

  return (
    <div className={classNames('pb-[32px] flex items-center', className)}>
      {routes?.map((route, index) => (
        <React.Fragment key={index}>
        { route.path
          ? <Link href={route.path} key={index}>
              <a
                className={`text-[14px] link-white ${
                  index === routes.length - 1 && 'link-gray'
                }`}
              >
                <span className='mx-[8px]'>{`${index ? ' / ' : ''}`}</span>
                {route.name}
              </a>
            </Link>
            : <a
              className={`text-[14px] link-white ${
                index === routes.length - 1 && 'link-gray'
              }`}
              key={index}
            >
              <span className='mx-[8px]'>{`${index ? ' / ' : ''}`}</span>
              {route.name}
            </a>
        }
        
        </React.Fragment>
      ))}
    </div>
  )
}
