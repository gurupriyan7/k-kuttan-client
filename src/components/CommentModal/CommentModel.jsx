import { Modal, useMantineTheme } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './CommentModel.css'
import { appConfig } from '../../config/appConfig'
import { useSnackbar } from 'notistack'
import { addComment } from '../../actions/post.actions'

function CommentModel({ modalOpened, setModalOpened, comments, postId }) {
  const theme = useMantineTheme()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [visibleItems, setVisibleItems] = useState(3)
  const [commentData, setCommentData] = useState(comments)
  const userData = useSelector((state) => state.authReducer.authData)

  const handleReadMore = (increment) => {
    if (increment) {
      setVisibleItems((prevVisibleItems) => prevVisibleItems + 5)
    } else {
      setVisibleItems((prevVisibleItems) => prevVisibleItems - 5)
    }
  }

  const [data, setData] = useState({
    comment: '',
  })

  console.log(commentData, 'commentData')

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (userData?.data) {
      try {
        const newComment = {
          comment: data?.comment,
          userId: {
            userName: userData?.data?.userName,
            profileImage: userData?.data?.profileImage,
          },
        }
        await dispatch(addComment({ id: postId, comment: data?.comment }))
        setData({
          ...data,
          comment: '',
        })
        setCommentData([newComment, ...commentData])
        enqueueSnackbar('Comment added successfully!!', {
          variant: 'success',
          autoHideDuration: 2000,
          ContentProps: {
            style: { backgroundColor: 'green' },
          },
        })
      } catch (error) {
        enqueueSnackbar('Failed to add comment', {
          variant: 'error',
          autoHideDuration: 2000,
          ContentProps: {
            style: { backgroundColor: 'red' },
          },
        })
      }

    } else {
      enqueueSnackbar('Please login to Comment !!', {
        variant: 'warning',
        autoHideDuration: 2000,
        ContentProps: {
          style: { backgroundColor: 'yellow' },
        },
      })
    }
  }

  return (
    <Modal
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="60%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <div className="a-right">
        <form onSubmit={handleSubmit}>
          <div
            style={{ width: '100%', justifyContent: 'center', display: 'flex' }}
          >
            <h3>comments</h3>
          </div>
          <div className="main-content">
            {commentData?.slice(0, visibleItems)?.map((comment, index) => {
              return (
                <div className="comment-section">
                  <div className="comment">
                    <img
                      src={`${appConfig.awsBucketUrl}/${comment?.userId?.profileImage}`}
                      alt="story"
                      className="profile-image"
                    />
                    <div className="comment-details">
                      <h4 className="comment-name">
                        {comment?.userId?.userName}
                      </h4>
                      <p className="comment-text">{comment?.comment}</p>
                    </div>
                  </div>
                </div>
               )
            })}
            {visibleItems > 3 && (
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'end',
                }}
              >
                <span
                  className="button infoButton"
                  style={{
                    marginTop: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
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
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'end',
                }}
              >
                <span
                  className="button infoButton"
                  style={{
                    marginTop: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                  onClick={() => handleReadMore(true)}
                >
                  ReadMore...
                </span>
              </div>
            )}

            <div
              style={{
                width: '96%',
                padding: '10px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <input
                type="textArea"
                className="infoInput"
                name="comment"
                placeholder="Comment"
                required
                value={data.comment}
                style={{ height: '4rem', width: '96%%' }}
                onChange={handleChange}
              />
            </div>
          </div>
          <div
            style={{ display: 'flex', width: '100%', justifyContent: 'end' }}
          >
            <button
              className="button infoButton"
              type="submit"
              style={{ marginTop: '1rem' }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default CommentModel
