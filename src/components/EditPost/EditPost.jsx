/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef, useState } from 'react'
import './EditPost.css'
import { UilTimes } from '@iconscout/react-unicons'
import { UilScenery } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getPreSignedUrlUtill } from '../../utils/s3.utils'
import back from '../../img/wp4082523.webp'
import { createPost, getPostById } from '../../actions/post.actions'
import { path } from '../../paths/paths'
import { appConfig } from '../../config/appConfig'
import { updatePost } from '../../api/postRequest'

const EditPost = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { postId } = useParams()

  const post = useSelector((state) => state.postReducer.post)

  useEffect(() => {
    dispatch(getPostById({ postId }))
  }, [dispatch, postId])

  useEffect(() => {
    if (post?.story) {
      setStories(post.story)
      setStoryCount(post.story.length)
    }
    setFormData({
      title: post?.title || '',
      summary: post?.summary || '',
      image: post?.image || '',
    })
  }, [post])

  const [storyCount, setStoryCount] = useState(1)
  const [stories, setStories] = useState([{ story: '' }])
  const [image, setImage] = useState(null)
  const imageRef = useRef()
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    image: '',
  })

  const onImageChange = async (event) => {
    event.preventDefault()
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0]
      setImage(URL.createObjectURL(img))

      const imageData = await getPreSignedUrlUtill(img)
      setFormData({
        ...formData,
        image: imageData ?? '',
      })
      console.log(imageData, 'image-image')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const addStory = () => {
    setStories([...stories, { page: stories.length + 1, story: '' }])
    setStoryCount(storyCount + 1)
  }

  const removeStory = () => {
    if (stories.length > 1) {
      setStories(stories.slice(0, -1))
      setStoryCount(storyCount - 1)
    }
  }

  const handleInputChange = (index, value) => {
    const newStories = [...stories]
    newStories[index].story = value
    setStories(newStories)
  }

  const handleSubmit = (e, isDraft) => {
    e.preventDefault()
    // Handle form submission logic here

    updatePost(post?._id, {
      ...formData,
      story: stories,
      isDraft: isDraft,
    }),
      navigate(path.profile)
    console.log(stories, 'Form submitted:', formData)
  }

  return (
    <div className="main" style={{ backgroundImage: `URL(${back})` }}>
      <div className="container">
        <div className="form-container">
          <div className="right-container">
            <div className="right-inner-container">
              <form action="#">
                <h2 className="lg-view">Edit Post</h2>
                <h2 className="sm-view">Edit Post</h2>
                <input
                  type="text"
                  placeholder="Title *"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="input"
                />
                <input
                  type="text"
                  placeholder="Summary *"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  required
                  className="input"
                />
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <input
                    type="file"
                    ref={imageRef}
                    onChange={onImageChange}
                    className="input"
                    style={{
                      cursor: 'pointer',
                      color: 'var(--photo)',
                      width: '100%',
                      opacity: 0,
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      height: '100%',
                    }}
                  />
                  <span
                    onClick={() => imageRef.current.click()}
                    style={{
                      cursor: 'pointer',
                      color: 'var(--photo)',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <UilScenery /> Photo
                  </span>
                </div>
                {(image || post?.image) && (
                  <div className="previewImage">
                    <UilTimes
                      onClick={() => {
                        setImage(null)
                        setFormData({ ...formData, image: null })
                      }}
                    />
                    <img
                      src={image ?? `${appConfig.awsBucketUrl}/${post?.image}`}
                      alt="preview"
                    />
                  </div>
                )}
                {stories.map((story, index) => (
                  <textarea
                    key={index}
                    rows="8"
                    placeholder={`Page ${index + 1}`}
                    name="story"
                    value={story?.story}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="input"
                  ></textarea>
                ))}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                  }}
                >
                  <span
                    onClick={removeStory}
                    className="next-btn"
                    style={{ display: storyCount <= 1 && 'none' }}
                  >
                    Remove page
                  </span>
                  <span onClick={addStory} className="next-btn">
                    Next page
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1rem',
                  }}
                >
                  <span onClick={(e) => handleSubmit(e, true)} className={`btn ${post?.isDraft ? " ":"diActivate"}`} >
                    Save Draft
                  </span>
                  <span onClick={(e) => handleSubmit(e, false)} className="btn">
                    Publish
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPost
