import React, { useState } from "react";
// import Razorpay from 'razorpay'
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import defaultProfile from "../../img/default-profile.jpg";
import { useSelector } from "react-redux";
import { likeAndCommentPost, updatePayment } from "../../api/postRequest";
import { appConfig } from "../../config/appConfig";
import { useNavigate } from "react-router-dom";
import { path } from "../../paths/paths";
import CommentModel from "../CommentModal/CommentModel";
import { PaymentStatusEnum } from "../../constants/paymentEnum";
import PostShareModal from "../PostShareModal/PostshareModal";
import postImage from "../../img/authback.png";
import { PostApprovalStatus } from "../../constants/PostEnum";
import { useSnackbar } from "notistack";


const Post = ({ data }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  // const dispatch = useDispatch()
  const userData = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data?.isLiked);
  const [likes, setLikes] = useState(data?.liked?.length);
  const [modalOpened, setModalOpened] = useState(false);
  const [shareModalOpened, setShareModalOpened] = useState(false);

  const ProfileImage = ({ src }) => {
    const handleError = (event) => {
      event.target.src = defaultProfile;
    };

    return (
      <img
        src={src}
        className="profile-image"
        alt="comment"
        onError={handleError}
      />
    );
  };

  const handleSelect = async (e) => {
    if (data?.createdBy?._id === userData?.data?._id) {
      navigate(`${path?.singlePost}/${data?._id}`);
    } else if (data?.isDraft && data?.createdBy?._id === userData?.data?._id) {
      navigate(`${path?.editPost}/${data?._id}`);
    } else {
      if (!data?.isFree && !data?.isPaid && data?.amount > 0) {
        e.preventDefault();
        if (!userData?.data) {
          navigate(path.auth);
        } else {
          const options = {
            key: appConfig.razorpayKeyId,
            key_secret: appConfig.razorpayKeySecret,
            amount: data?.amount * 100,
            currency: "INR",
            name: data?.title,
            description: "Test Transaction",
            handler: async function async(response) {
              console.log(response, "response");
              await updatePayment({
                transactionId: response?.razorpay_payment_id,
                amount: data?.amount,
                status: PaymentStatusEnum.SUCCESS,
                postId: data?._id,
              });
              navigate(`${path?.singlePost}/${data?._id}`);
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

          rzp.on("payment.failed", async function (response) {
            console.log(response, "payment failed response");
            await updatePayment({
              transactionId: response?.razorpay_payment_id,
              amount: data?.amount,
              status: PaymentStatusEnum.FAILED,
              postId: data?._id,
            });
          });
        }
      } else {
        navigate(`${path.singlePost}/${data?._id}`);
      }
    }
  };

  const handleLike = () => {
    if (userData?.data) {
      setLiked((prev) => !prev);
      likeAndCommentPost(data?._id, userData?.data?._id);
      liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
    } else {
      enqueueSnackbar("Please login to Like !!", {
        variant: "warning",
        autoHideDuration: 2000,
        ContentProps: {
          style: { backgroundColor: "yellow" },
        },
      });
    }
  };

  const handleError = (event) => {
    event.target.src = postImage;
  };

  const handleCommentClick = () => {
    setModalOpened(true);
  };

  const formatPartNumber =(partNumber)=>{
    const partNumberStr = partNumber.toString();

    // If the length is 1, prepend '0'
    if (partNumberStr.length === 1) {
        return '0' + partNumberStr;
    } else {
        // Otherwise, return the exact value
        return partNumberStr;
    }
  }
  return (
    <div className="Post max-w-[770px] w-full">
      <img
        onClick={handleSelect}
        src={
          data?.image ? `${appConfig.awsBucketUrl}/${data?.image}` : postImage
        }
        alt="story"
        onError={handleError}
      />

      {!data?.isDraft &&
        data?.approvalStatus === PostApprovalStatus.APPROVED && (
          <div className="postReact">
            <div>
              <img
                src={liked ? Heart : NotLike}
                className="likeImg"
                alt=""
                onClick={handleLike}
              />
              <span>
                {!data?.isDraft &&
                  data?.approvalStatus === PostApprovalStatus.APPROVED && (
                    <span
                      style={{ color: "var(--gray)", fontSize: "12px" }}
                      className="pt-1"
                    >
                      {likes ?? 0} likes
                    </span>
                  )}
              </span>
            </div>
            <div>
              <img onClick={() => setModalOpened(true)} src={Comment} alt="" />
              <span className="items-center flex justify-center pt-1 text-gray-500 text-[12px]">
                {data?.comments?.length}
              </span>
            </div>
            <img src={Share} alt="" onClick={() => setShareModalOpened(true)} />
            <div className="px-[10px] py-[4px] rounded-[12px] bg-orange-500 text-white font-[500] text-[14px]">
              <p>{data?.category}</p>
            </div>
          </div>
        )}
      {data?.approvalStatus !== PostApprovalStatus.APPROVED &&
        !data?.isDraft && (
          <div className="postReact">
            <span style={{ fontWeight: "600" }}>Approval Status:</span>
            <span
              style={{
                color:
                  data?.PostApprovalStatus === PostApprovalStatus.REJECTED
                    ? "red"
                    : "#ffc300",
              }}
            >
              {data?.approvalStatus}
            </span>
          </div>
        )}

      {/* {!data?.isDraft &&
        data?.approvalStatus === PostApprovalStatus.APPROVED && (
          <span style={{ color: 'var(--gray)', fontSize: '12px' }}>
            {likes ?? 0} likes
          </span>
        )} */}

      <div className="detail flex flex-col">
        <p className=" flex flex-col gap-1">
        <b className="line-clamp-1">{data?.partNumber ? `Part - (${formatPartNumber(data?.partNumber)})`:""}</b>
          <b className="line-clamp-2">{`${data?.title}`}</b>
          <p className="line-clamp-4">{data?.summary}</p>
        </p>

        <div className="">
          <h6 className="font-[700] text-[16px] my-2">Comments</h6>
          {data?.comments?.slice(0, 3).map((comment, index) => (
            <div className="" key={index}>
              {/* <p className='line-clamp-1 text-[14px]'>{comment?.comment}</p> */}
              <div className="comment">
                <ProfileImage
                  src={`${appConfig?.awsBucketUrl}/${comment?.userId?.profileImage}`}
                />
                <div className="comment-details">
                  <h4 className="comment-name">{comment?.userId?.userName}</h4>
                  <p className="comment-text line-clamp-1">
                    {comment?.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <span
            onClick={handleCommentClick}
            className="flex justify-end text-[14px] font-[800]"
          >
            Read more
          </span>
        </div>

        <CommentModel
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          comments={data?.comments}
          postId={data?._id}
        />
        <PostShareModal
          modalOpened={shareModalOpened}
          setModalOpened={setShareModalOpened}
          postId={data?._id}
        />
      </div>
    </div>
  );
};

export default Post;
