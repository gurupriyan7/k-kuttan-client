/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import './SinglePost.css'
import { Link } from 'react-router-dom'
import Post from '../../components/Post/Post'
import Home from '../../img/home.png'
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
import Preloader from '../../components/Preloader/Preloader'
import { PostsData } from '../../Data/PostsData'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getPostById } from '../../actions/post.actions'
import { appConfig } from '../../config/appConfig'
import { useState } from 'react'
import { likeAndCommentPost, updatePayment } from '../../api/postRequest'
import CommentModel from '../../components/CommentModal/CommentModel'
import PostShareModal from '../../components/PostShareModal/PostshareModal'
import { PaymentStatusEnum } from '../../constants/paymentEnum'
import { path } from '../../paths/paths'
import PaymentFailModal from '../../components/PaymentFailedModal/PaymentFailedModal'
const SinglePost = (PostsData) => {
  const dispatch = useDispatch()
  const location = useLocation()
 
  // const searchParams = new URLSearchParams(location.search);
  // const postId = searchParams.get('id');
  // const { postId } = location.state
  const { postId } = useParams()
  const navigate = useNavigate()
  console.log(postId, 'postIdsss')
   const [load,setLoad]=useState(false)
  const post = useSelector((state) => state.postReducer.post)
  const postLoading= useSelector((state) => state.postReducer.loading)
  console.log("postLoading",postLoading);
  const { user } = useSelector((state) => state.authReducer.authData)

  const [liked, setLiked] = useState(post?.isLiked)
  const [likes, setLikes] = useState(post?.likes)
  const [modalOpened, setModalOpened] = useState(false)
  const [shareModalOpened, setShareModalOpened] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(
    post?.isFree || post?.isPaid,
  )

  useEffect(()=>{
    if(postLoading){
      setLoad(true)
    }else{
      setLoad(false)
    }
  },[postLoading])

  const [page, setPage] = useState(1)

  const [failed, setFailed] = useState(false)

  useEffect(async () => {
    await dispatch(getPostById({ postId }))
  }, [dispatch, postId])
  console.log(
    post,
    'post post post post post',
    process.env.REACT_APP_FRONTEND_URL,
  )

  const handleLike = () => {
    setLiked((prev) => !prev)
    likeAndCommentPost(post?._id, user?._id)
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }
  const handleEdit=(e)=>{
    e.preventDefault();
    navigate(`${path?.editPost}/${post?._id}`)

  }

  const handlePagination = (event, isNext) => {
    event.preventDefault()
    if (isNext) {
      setPage(page + 1)
    } else {
      setPage(page - 1)
    }
  }

  const handleSelect = async (e) => {
    // console.log(postDetails,"postDetails");
    // alert(post?.isPaid)
    if (!post?.isFree && !post?.isPaid&&!post?.isDraft) {
      // e.preventDefault()
      // const res = await createPayment({
      //   postId: post?._id,
      // })

      console.log(paymentStatus, 'responseddd', failed)

      const options = {
        key: appConfig.razorpayKeyId,
        key_secret: appConfig.razorpayKeySecret,
        amount: post?.amount * 100,
        currency: 'INR',
        name: post?.title,
        description: 'Test Transaction',
        handler: async function async(response) {
          console.log(response, 'response')
          await updatePayment({
            transactionId: response?.razorpay_payment_id,
            amount: post?.amount,
            status: PaymentStatusEnum.SUCCESS,
            postId: post?._id,
          })
          setPaymentStatus(true)

          // alert(
          //   `Payment Successful! Payment ID: ${response}`,
          // )
        },
        prefill: {
          name: 'Your Name',
          email: 'your.email@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Your Address',
        },
        theme: {
          color: '#3399cc',
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()

      // alert('need to pay')
      rzp.on('payment.failed', async function (response) {
        console.log(response, 'payment failed response')
        setPaymentStatus(false)
        await updatePayment({
          transactionId: response?.error?.metadata?.payment_id,
          amount: post?.amount,
          status: PaymentStatusEnum.FAILED,
          postId: post?._id,
        })
        setFailed(true)

        // alert(`Payment Failed! Error: ${response.error.description}`)
      })
    }
  }

  useEffect(async () => {
    await handleSelect()
  }, [])

  return (
    <> 
     {load && <Preloader/>}
      {paymentStatus ? (
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
            <Link to="../">
                {' '}
                <img src={Home} style={{width:"1.5rem"}} alt="" />
              </Link>
              <img
                src={left}
                style={{ width: '20rem', marginTop: '1rem' }}
                alt=""
                className="soldier-1"
              />
            </div>
            {/* scroll content */}
            <div className=" mx-auto w-full md:w-[100vw]">
              
              <div className='h-full'
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
                  {!post?.isDraft&&<div className="postReact-single">
                    <img
                      src={liked ? Heart : NotLike}
                      alt=""
                      onClick={handleLike}
                      style={{ cursor: 'pointer' }}
                    />
                    <img
                      onClick={() => setModalOpened(true)}
                      src={Comment}
                      alt=""
                      style={{ cursor: 'pointer' }}
                    />
                    <img
                      src={Share}
                      alt=""
                      onClick={() => setShareModalOpened(true)}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>}

                  {!post?.isDraft&&<p
                    style={{
                      color: 'var(--gray)',
                      fontSize: '12px',
                      display: 'flex',
                      // display:"none"
                    }}
                  >
                    {likes} likes  
                  </p>}
                </div>

                {/* <div className="singlepost-detail w-full md:w-[60vw] mx-auto">
                  <span>
                    <b>{post?.title}</b>
                  </span>
                  <div className='w-[70vw] sm:w-[69vw] md:max-w-[700px] mx-auto'> {post?.story[page - 1]?.story}</div>
                </div> */}
                
                 <div className="max-h-[75vh] overflow-y-scroll  w-full mx-auto">
                  <div className='mx-auto w-full flex items-center justify-center'>
                    <b className='mx-auto '>{post?.title}</b>
                  </div>
                  <div className="  h-[250px] md:h-[350px] lg-h-[60vh] lg:px-[6vw] xl:px-0 xl:h-[80vh] w-[250px] my-auto   md:px-[7vw] md:max-w-[450px] md:w-full mx-auto">
                    {post?.story[page - 1]?.story}
                  </div>
                </div>
                
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem',
                }}
              >
                {page > 1 && (
                  <button
                    onClick={(event) => handlePagination(event, false)}
                    className="pagination-byn"
                  >
                    previous
                  </button>
                )}
                <span
                  style={{
                    color: 'black',
                    backgroundColor: 'white',
                    width: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {page}
                </span>
                {page < post?.story?.length && (
                  <button
                    onClick={(event) => handlePagination(event, true)}
                    className="pagination-byn"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>

            {/* soldier image right */}
            <div style={{ backgroundColor: '' }} className="soldier-2">
            <div onClick={handleEdit} className='editBtn' style={{zIndex:"2rem"}}>Edit</div>
              <img src={right} style={{ width: '20rem' }} alt="" />
            </div>
          </div>
          <CommentModel
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
            comments={post?.comments}
            postId={post?._id}
          />
          <PostShareModal
            modalOpened={shareModalOpened}
            setModalOpened={setShareModalOpened}
            postId={post?._id}
          />
        </div>
      ) : (
        <PaymentFailModal modalOpened={failed} setModalOpened={setFailed} />
      )}
    </>
  )
}

export default SinglePost
