import React from 'react'

const PostSkeleton = () => {
  return (
    <div className='Post max-w-[770px] w-full bg-gray-100 h-[50px] md:h-[100px] rounded-t-[12px] flex  justify-center items-center font-[700] text-[16px] md:text-[20px]'>
        <p>Loading post...</p>
    </div>
  )
}

export default PostSkeleton