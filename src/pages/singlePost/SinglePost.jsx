/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import "./SinglePost.css";
import { Link } from "react-router-dom";
import Post from "../../components/Post/Post";
import Home from "../../img/home.png";
import Posts from "../../components/Posts/Posts";
import RightSide from "../../components/RightSide/RightSide";
import back from "../../img/wp4082523.webp";
import left from "../../img/leftz.png";
import right from "../../img/rightz.png";
import scroll from "../../img/scroll.png";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import Preloader from "../../components/Preloader/Preloader";
import { PostsData } from "../../Data/PostsData";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../../actions/post.actions";
import { appConfig } from "../../config/appConfig";
import { useState } from "react";
import { likeAndCommentPost, updatePayment } from "../../api/postRequest";
import CommentModel from "../../components/CommentModal/CommentModel";
import PostShareModal from "../../components/PostShareModal/PostshareModal";
import { PaymentStatusEnum } from "../../constants/paymentEnum";
import { path } from "../../paths/paths";
import PaymentFailModal from "../../components/PaymentFailedModal/PaymentFailedModal";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
const SinglePost = (PostsData) => {
  const dispatch = useDispatch();
  const location = useLocation();

  // const searchParams = new URLSearchParams(location.search);
  // const postId = searchParams.get('id');
  // const { postId } = location.state
  const { postId } = useParams();
  const textContainerRef = useRef(null);

  const navigate = useNavigate();
  console.log(postId, "postIdsss");
  const [load, setLoad] = useState(false);
  const post = useSelector((state) => state.postReducer.post);
  const postLoading = useSelector((state) => state.postReducer.loading);
  console.log("postLoading", postLoading);
  const userData = useSelector((state) => state.authReducer.authData);

  const [liked, setLiked] = useState(post?.isLiked);
  const [likes, setLikes] = useState(post?.likes);
  const [modalOpened, setModalOpened] = useState(false);
  const [shareModalOpened, setShareModalOpened] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(
    post?.isFree || post?.isPaid
  );

  useEffect(() => {
    if (postLoading) {
      setLoad(true);
    } else {
      setLoad(false);
    }
  }, [postLoading]);

  const [page, setPage] = useState(1);

  const [failed, setFailed] = useState(false);
  console.log(post, "POST");

  useEffect(async () => {
    await dispatch(getPostById({ postId }));
  }, [paymentStatus, postId]);
  console.log(
    post,
    "post post post post post",
    process.env.REACT_APP_FRONTEND_URL
  );

  useEffect(() => {
    if (textContainerRef.current) {
      textContainerRef.current.scrollTop = 0;
    }
  }, [page]);

  const handleLike = () => {
    if (userData?.data) {
      setLiked((prev) => !prev);
      likeAndCommentPost(post?._id, userData?.data?._id);
      liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
    } else {
      alert("please login to like");
    }
  };
  const handleEdit = (e) => {
  
    e.preventDefault();
    navigate(`${path?.editPost}/${post?._id}`);
  };

  const handlePagination = (event, isNext) => {
    event.preventDefault();
    if (isNext) {
      setPage(page + 1);
    } else {
      setPage(page - 1);
    }
  };

  const handleSelect = async (e) => {
    // console.log(postDetails,"postDetails");
    // alert(post?.isPaid)
    if (!post?.isFree && !post?.isPaid && !post?.isDraft && post?.amount > 0) {
      // e.preventDefault()
      // const res = await createPayment({
      //   postId: post?._id,
      // })

      console.log(post, "responseddd");

      const options = {
        key: appConfig.razorpayKeyId,
        key_secret: appConfig.razorpayKeySecret,
        amount: post?.amount * 100,
        currency: "INR",
        name: post?.title,
        description: "Test Transaction",
        handler: async function async(response) {
          console.log(response, "response");
          await updatePayment({
            transactionId: response?.razorpay_payment_id,
            amount: post?.amount,
            status: PaymentStatusEnum.SUCCESS,
            postId: post?._id,
          });
          setPaymentStatus(true);
          window.location.reload();

          // alert(
          //   `Payment Successful! Payment ID: ${response}`,
          // )
        },
        prefill: {
          name: "Your Name",
          email: "your.email@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Your Address",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      // alert('need to pay')
      rzp.on("payment.failed", async function (response) {
        console.log(response, "payment failed response");
        setPaymentStatus(false);
        await updatePayment({
          transactionId: response?.error?.metadata?.payment_id,
          amount: post?.amount,
          status: PaymentStatusEnum.FAILED,
          postId: post?._id,
        });
        setFailed(true);

        // alert(`Payment Failed! Error: ${response.error.description}`)
      });
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  useEffect(async () => {
    if (post?.createdBy?._id !== userData?.data?._id) {
      await handleSelect();
    } else {
      setPaymentStatus(true);
    }
  }, []);

  useEffect(() => {
    const disableRightClick = (e) => {
      e.preventDefault();
    };

    const disableCopy = (e) => {
      console.log(e, "copy-text");
      if (
        (e.ctrlKey || e.metaKey) && // metaKey is for Cmd on macOS
        (e.key === "c" || e.key === "p")
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("keydown", disableCopy);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableCopy);
    };
  }, []);

  function formatText(text) {
    return text.split("\n").map((item, key) => {
      return (
        <span key={key}>
          {item}
          <br />
        </span>
      );
    });
  }

  const handleOnPrevious=()=>{
navigate(`/post-seq`,{
    state: { authorId:post?.createdBy?._id, postId:post?._id } 
})
  }

  return (
    <>
      {load && <Preloader />}
      {paymentStatus ? (
        <div
          className="min-h-screen relative"
          style={{
            backgroundImage: `URL(${back})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          {/* right side  */}
          <div className="absolute right-4 top-4 z-100 cursor-pointer">
          {post?.createdBy?._id === userData?.data?._id && (
              <div
                onClick={handleEdit}
                className="editBtn"
                style={{ zIndex: "2rem" }}
              >
                Edit
              </div>
           )} 
          </div>
          
          <div
            style={{ backgroundColor: "" }}
            className="soldier-2 absolute right-4 top-12"
          >
            {/* {post?.createdBy?._id === userData?.data?._id && (
              <div
                onClick={handleEdit}
                className="editBtn"
                style={{ zIndex: "2rem" }}
              >
                Edit
              </div>
            )} */}
            <img src={right} style={{ width: "20rem" }} alt="" />
          </div>

          {/* left side */}
          <div
            style={{ backgroundColor: "" }}
            className="absolute left-4 top-4"
          >
            <Link to="../">
              {" "}
              <img src={Home} style={{ width: "1.5rem" }} alt="" />
            </Link>
            <img
              src={left}
              style={{ width: "20rem", marginTop: "1rem" }}
              alt=""
              className="soldier-1"
            />
          </div>

          <div
            className="w-full h-[100vh] bg-no-repeat bg-center  md:bg-[length:100%_140%] ml-[1vw] mr-[16vw] sm:mx-0 bg-[length:140%_120%] "
            style={{
              backgroundImage: `URL(${scroll})`,
              // backgroundPosition: 'center',
              // backgroundSize: 'contain',
              // backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="items-center flex flex-col gap-2 md:gap-4 justify-center w-full h-full">
              <div class=" flex flex-col items-center justify-center    w-[75vw] sm:w-[60vh]   md:w-[390px] lg:w-[480px]  xl:w-[50vw] ">
                {!post?.isDraft && (
                  <div className="flex  justify-between w-full md:gap-7 mt-1 lg:mt-4">
                    <div onClick={handleOnPrevious} className="cursor-pointer flex gap-1 p-1 border-2 border-gray-600  rounded-[8px] items-center">
                      <KeyboardDoubleArrowLeftIcon fontSize="medium" />
                      <span 
                      className="hidden md:flex hover:text-gray-900 hover:font-[500]"
                      style={{
                        color: "var(--gray)",
                        fontSize: "12px",
                      }}>Previous story</span>
                    </div>

                    <div className="flex gap-2 sm:gap-4 lg:gap-8">

                    <div className="w-[34px] h-[34px] ">
                      <img
                        src={liked ? Heart : NotLike}
                        alt=""
                        onClick={handleLike}
                        style={{ cursor: "pointer" }}
                        className="items-center  mx-auto w-[30px] h-[26px]"
                      />
                      {!post?.isDraft && (
                        <p
                          className="w-full item-center flex justify-center font-[500] mt-1"
                          style={{
                            color: "var(--gray)",
                            fontSize: "12px",
                            display: "flex",
                            // display:"none"
                          }}
                        >
                          {likes} <span>likes</span>
                        </p>
                      )}
                    </div>
                    <div>
                      <img
                        className=" w-[30px] h-[26px]"
                        onClick={() => setModalOpened(true)}
                        src={Comment}
                        alt=""
                        style={{ cursor: "pointer" }}
                      />
                      <span className="items-center flex justify-center text-gray-600 mt-1 text-[12px]">
                        {post?.comments?.length}
                      </span>
                    </div>
                    <img
                      className=" w-[30px] h-[26px] "
                      src={Share}
                      alt=""
                      onClick={() => setShareModalOpened(true)}
                      style={{ cursor: "pointer" }}
                    />
                    </div>

                    <div className="flex mt-1 justify-center px-[9px] py-[4px] w-[80px] lg:w-fit rounded-[12px] bg-orange-500 text-white font-[500] text-[12px] h-fit ">
                      <p>{post?.category}</p>
                     
                    </div>
                  </div>
                )}
              </div>

              <Link
                to={`/${path.authorPosts}/${post?.createdBy?._id}`}
                className="absolute top-2 left-12 flex gap-2 items-center cursor-pointer rounded-[12px] px-[20px] py-1 bg-gray-300 "
              >
                <div className="rounded-full  items-center w-[44px] h-[44px]">
                  <img
                    src={`${appConfig?.awsBucketUrl}/${post?.createdBy?.profileImage}`}
                    width={44}
                    height={44}
                    className=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top 0 0",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <h6 className="text-start "> {post?.createdBy?.userName}</h6>
              </Link>
              <div className="max-h-[100vh] overflow-y-scroll  w-full mx-auto lg:mb-[2rem]">
                <div className="mx-auto w-full flex items-center justify-center">
                  <b className="mx-auto w-[250px] sm:w-[290px] md:w-[390px] lg:max-w-[450px] xl:w-[50vw] mb-2">
                    {post?.title}
                  </b>
                </div>
                <div
                  ref={textContainerRef}
                  className=" h-[50vh] md:h-[350px] lg:h-[60vh]  w-[35vh] sm:w-[290px] my-auto   md:w-[390px] lg:w-[480px]  xl:w-[50vw] mx-auto"
                >
                  {formatText(post?.story[page - 1]?.story)}
                </div>
              </div>
            </div>
          </div>

          <div className="py-[20px]">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
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
                  color: "black",
                  backgroundColor: "white",
                  width: "1rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {page}
              </span>

              {
                <div
                  className={`flex gap-2 ${
                    page === post?.story?.length || post?.story?.length < 2
                      ? "hidden"
                      : "flex"
                  } `}
                >
                  {post?.story?.length > 2 && (
                    <span
                      className="font-[700] px-2"
                      style={{
                        color: "black",
                        backgroundColor: "white",
                        width: "1rem",
                        display: "flex",
                        gap: "4px",
                        justifyContent: "center",
                      }}
                    >
                      ...
                    </span>
                  )}

                  <button
                    // onClick={(event) => handlePagination(event, post?.story?.length)}
                    className=" bg-white px-2 py-1"
                  >
                    {post?.story?.length}
                  </button>
                </div>
              }

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
  );
};

export default SinglePost;
