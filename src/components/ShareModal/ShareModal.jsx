import { Modal, useMantineTheme } from '@mantine/core'
import PostShare from '../PostShare/PostShare'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../actions/post.actions'
import './ShareModal.css'

function ShareModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme()
  const dispatch = useDispatch()
  // const [image, setImage] = useState(null)
  const [storyPage, setStoryPage] = useState(1)

  // const [story, setStory] = useState('')

  const [data, setData] = useState({
    title: '',
    summary: '',
    // story: [],
    story: '',
    image: null,
  })
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    // e.preventDefault()
    dispatch(
      createPost({
        ...data,
      }),
    )
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
      // size="65%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      className="modal-main"
    >
      <PostShare data={data} setData={setData} />
      <div className="a-right">
        <form className="infoForm authForm">
          <h3>Post story</h3>

          <div className="title">
            <input
              type="text"
              placeholder="Title"
              className="infoInput"
              name="title"
              required
              onChange={handleChange}
            />
          </div>
          <div className="summary">
            <input
              type="text"
              placeholder="Summary"
              className="infoInput"
              name="summary"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="textArea"
              className="infoInput"
              name="story"
              placeholder="Story"
              required
              value={data?.story}
              style={{ height: '10rem', marginTop: '11rem' }}
              // onChange={(e) => setStory(e.target.value)}
              onChange={handleChange}
            />
          </div>

          <button
            className="button infoButton"
            type="submit"
            style={{ marginTop: '10rem' }}
            onClick={handleSubmit}
          >
            Share
          </button>
        </form>
      </div>
    </Modal>
  )
}

export default ShareModal
