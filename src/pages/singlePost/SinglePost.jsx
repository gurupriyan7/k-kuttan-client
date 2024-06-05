/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import './SinglePost.css'
import Post from '../../components/Post/Post'
import Posts from '../../components/Posts/Posts'
import RightSide from '../../components/RightSide/RightSide'
import back from '../../img/wp4082523.webp'
import left from '../../img/leftz.png'
import right from '../../img/rightz.png'
import scroll from '../../img/scroll.png'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { PostsData } from '../../Data/PostsData'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getPostById } from '../../actions/post.actions'
import { appConfig } from '../../config/appConfig'
import { useState } from 'react'
import { likeAndCommentPost } from '../../api/postRequest'
import CommentModel from '../../components/CommentModal/CommentModel';
const SinglePost = (PostsData) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { postId } = location.state
  console.log(postId, 'postId')

  const post = useSelector((state) => state.postReducer.post)
  const { user } = useSelector((state) => state.authReducer.authData)
  const [liked, setLiked] = useState(post?.isLiked)
  const [likes, setLikes] = useState(post?.likes)
  const [modalOpened, setModalOpened] = useState(false)

  useEffect(async () => {
    await dispatch(getPostById({ postId }))
  }, [dispatch, postId])
  console.log(post, 'post post post post post')

  const handleLike = () => {
    setLiked((prev) => !prev)
    likeAndCommentPost(post?._id, user?._id)
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }

  return (
    <div
      className="SinglePost"
      style={{
        backgroundImage: `URL(${back})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="single-post-container" style={{ color: 'black' }}>
        {/* soldier image left */}
        <div style={{ backgroundColor: '' }}>
          <img
            src={left}
            style={{ width: '20rem', marginTop: '1rem' }}
            alt=""
            className="soldier-1"
          />
        </div>
        {/* scroll content */}
        <div className="badan">
          <div
            style={{
              // backgroundColor: "black",
              height: '100vh',
              paddingTop: '5rem',
              // paddingLeft: "10rem",
              // paddingRight: "10rem",
              backgroundImage: `URL(${scroll})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* <img src={`${appConfig.awsBucketUrl}/${post?.image}`} alt="sdfs" /> */}

            <div class="post-reactions">
              <div className="postReact-single">
                <img
                  src={liked ? Heart : NotLike}
                  alt=""
                  onClick={handleLike}
                  style={{cursor:"pointer"}}
                />
                <img onClick={() => setModalOpened(true)}  src={Comment} alt=""  style={{cursor:"pointer"}} />
                <img src={Share} alt="" />
              </div>

              <p
                style={{
                  color: 'var(--gray)',
                  fontSize: '12px',
                  display: 'flex',
                  // display:"none"
                }}
              >
                {likes} likes
              </p>
            </div>

            <div className="singlepost-detail">
              <span>
                <b>{post?.title}</b>
              </span>
              <span> {post?.story}</span>
            </div>
          </div>
        </div>

        {/* soldier image right */}
        <div style={{ backgroundColor: '' }} className="soldier-2">
          <img src={right} style={{ width: '20rem' }} alt="" />
        </div>
      </div>
      <CommentModel
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          comments={post?.comments}
          postId={post?._id}
        />
    </div>
  )
}

export default SinglePost
