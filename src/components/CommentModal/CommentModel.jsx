import { Modal, useMantineTheme } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./CommentModel.css";
import { appConfig } from "../../config/appConfig";
import { useSnackbar } from "notistack";
import { addComment } from "../../actions/post.actions";

import defaultProfile from "../../img/default-profile.jpg";

function CommentModel({ modalOpened, setModalOpened, comments = [], postId }) {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [visibleItems, setVisibleItems] = useState(3);
  const [commentData, setCommentData] = useState(comments);
  const userData = useSelector((state) => state.authReducer.authData);
  const [replyComment, setReply] = useState(null)
  const commentBox = useRef(null)

  useEffect(() => {
    setCommentData(comments)
  }, [comments])

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

  const handleReadMore = (increment) => {
    if (increment) {
      setVisibleItems((prevVisibleItems) => prevVisibleItems + 5);
    } else {
      setVisibleItems((prevVisibleItems) => prevVisibleItems - 5);
    }
  };

  const [data, setData] = useState({
    comment: "",
  });

  console.log(commentData, "commentData");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData?.data) {

      if (replyComment) {
        try {
          const newComment = {
            comment: data?.comment,
            userId: {
              userName: userData?.data?.userName,
              profileImage: userData?.data?.profileImage,
            },
            commentId: replyComment.id
          };
          dispatch(addComment({ id: postId, comment: data?.comment, commentType: 'reply', commentId: replyComment.id }));
          setData({
            ...data,
            comment: "",
          });
          setReply(null)
          setCommentData(prev => {
            const items = [...prev]
            var foundIndex = items.findIndex(x => x._id == newComment.commentId);
            console.log("foundddd", foundIndex)
            if (foundIndex > -1) {
              const comment = {
                ...items[foundIndex],
                replyIds: [...(items[foundIndex].replyIds), newComment],
              }
              console.log("Commenttt", comment)
              items[foundIndex] = comment
            }
            return items
          });

          enqueueSnackbar("Comment reply added successfully!!", {
            variant: "success",
            autoHideDuration: 2000,
            ContentProps: {
              style: { backgroundColor: "green" },
            },
          });
        } catch (error) {
          enqueueSnackbar("Failed to add comment", {
            variant: "error",
            autoHideDuration: 2000,
            ContentProps: {
              style: { backgroundColor: "red" },
            },
          });
        }
      } else {
        try {
          const newComment = {
            comment: data?.comment,
            userId: {
              userName: userData?.data?.userName,
              profileImage: userData?.data?.profileImage,
            },
          };
          dispatch(addComment({ id: postId, comment: data?.comment }));
          setData({
            ...data,
            comment: "",
          });
          setCommentData([newComment, ...commentData]);
          enqueueSnackbar("Comment added successfully!!", {
            variant: "success",
            autoHideDuration: 2000,
            ContentProps: {
              style: { backgroundColor: "green" },
            },
          });
        } catch (error) {
          enqueueSnackbar("Failed to add comment", {
            variant: "error",
            autoHideDuration: 2000,
            ContentProps: {
              style: { backgroundColor: "red" },
            },
          });
        }
      }
    } else {
      enqueueSnackbar("Please login to Comment !!", {
        variant: "warning",
        autoHideDuration: 2000,
        ContentProps: {
          style: { backgroundColor: "yellow" },
        },
      });
    }
  };

  const modalStyles = {
    modal: {
      width: "95%",

      "@media (min-width: 768px)": {
        width: "60%",
      },
    },
  };

  return (
    <Modal
      styles={modalStyles}
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="90%"
      opened={modalOpened}
      onClose={() => {
        // setCommentData([])
        setModalOpened(false)
      }}
    >
      <div className="a-right">
        <form onSubmit={handleSubmit}>
          <div
            style={{ width: "100%", justifyContent: "center", display: "flex" }}
          >
            <h3 className="pb-2">comments</h3>
          </div>
          <div className="main-content">
            {commentData?.slice(0, visibleItems)?.map((comment, index) => {
              return (
                <div key={comment?.userId?.username} className="comment-section">
                  <div className="comment">
                    <ProfileImage
                      src={`${appConfig?.awsBucketUrl}/${comment?.userId?.profileImage}`}
                    />
                    {/* <img
                      src={`${appConfig.awsBucketUrl}/${comment?.userId?.profileImage}`}
                      alt="story"
                      className="profile-image"
                    /> */}
                    <div className="comment-details">
                      <h4 className="comment-name">
                        {comment?.userId?.userName}
                      </h4>
                      <p className="comment-text">{comment?.comment}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setReply(replyComment && replyComment?.id === comment._id ? null : { id: comment?._id, user: comment.userId, comment: comment?.comment })
                      if (commentBox?.current && !replyComment) commentBox.current.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="font-medium -translate-y-2 px-6 py-1.5 bg-black text-white text-xs sm:text-sm rounded-md"
                  >
                    {replyComment && comment?._id === replyComment?.id ? "Cancel" : "Reply"}
                  </button>

                  {comment?.replyIds && comment?.replyIds.length > 0 ?
                    <div className="mt-6">
                      {comment.replyIds.map((reply, index) => (
                        <div key={`${reply.commentId}-reply-${index}`} className="comment ml-6">
                          <ProfileImage
                            src={`${appConfig?.awsBucketUrl}/${reply?.userId?.profileImage}`}
                          />
                          {/* <img
                      src={`${appConfig.awsBucketUrl}/${comment?.userId?.profileImage}`}
                      alt="story"
                      className="profile-image"
                    /> */}
                          <div className="comment-details">
                            <h4 className="comment-name">
                              {reply?.userId?.userName}
                            </h4>
                            <p className="comment-text">{reply?.comment}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    : null}
                </div>
              );
            })}
            {visibleItems > 3 && (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "end",
                }}
              >
                <span
                  className="button infoButton"
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  onClick={() => handleReadMore(false)}
                >
                  ReadLess...
                </span>
              </div>
            )}
            {visibleItems < comments?.length && (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "end",
                }}
              >
                <span
                  className="button infoButton"
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  onClick={() => handleReadMore(true)}
                >
                  ReadMore...
                </span>
              </div>
            )}

            <div
              style={{
                width: "96%",
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: 'center',
                flexDirection: 'column'
                , gap: '8px'
              }}
            >
              {replyComment && (
                <div className="w-full px-2 flex gap-4">
                  <p>Replying to @{replyComment.user.userName}</p>

                  <button onClick={() => setReply(null)} className="text-blue-700">Cancel</button>
                </div>
              )}
              <input
                ref={commentBox}
                type="textArea"
                className="infoInput"
                name="comment"
                placeholder={replyComment ? "Enter reply" : "Comment"}
                required
                value={data.comment}
                style={{ height: "4rem", width: "100%" }}
                onChange={handleChange}
              />
            </div>
          </div>
          <div
            style={{ display: "flex", width: "100%", justifyContent: "end" }}
          >
            <button
              className="button infoButton"
              type="submit"
              style={{ marginTop: "1rem" }}
            >
              Submit
            </button>
          </div>
        </form >
      </div >
    </Modal >
  );
}

export default CommentModel;
