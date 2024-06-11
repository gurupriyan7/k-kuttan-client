/* eslint-disable no-unused-expressions */
import React, { useRef, useState } from 'react'
import './AddPost.css'
import { Center } from '@mantine/core'
import { UilTimes } from '@iconscout/react-unicons'
import { UilScenery } from '@iconscout/react-unicons'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getPreSignedUrlUtill } from '../../utils/s3.utils'
import back from '../../img/wp4082523.webp'
import { createPost } from '../../actions/post.actions'
import { path } from '../../paths/paths';

const AddPost = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [storyCount, setStoryCount] = useState(1)
  const [stories, setStories] = useState([
    {
      page: 1,
      story: '',
    },
  ])
  const [image, setImage] = useState(null)
  const imageRef = useRef()
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    image: null,
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

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    dispatch(
      createPost({
        ...formData,
        story: stories,
      }),
    )
    navigate(path.home)
    console.log(stories, 'Form submitted:', formData)
  }

  return (
    <div className="main" style={{ backgroundImage: `URL(${back})` }}>
      <div className="container">
        <div className="form-container">
          {/* <div className="left-container">
          <div className="left-inner-container">
            <h2>Let's Chat</h2>
            <p>Whether you have a question, want to start a project or simply want to connect.</p>
            <br />
            <p>Feel free to send me a message in the contact form</p>
          </div>
        </div> */}
          <div className="right-container">
            <div className="right-inner-container">
              <form action="#">
                <h2 className="lg-view">Add Post</h2>
                <h2 className="sm-view">Add Post</h2>
                {/* <p>* Required</p> */}
                {/* <div className="social-container">
                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
              </div> */}
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
                      width: '100%', // Ensure the input takes the full width
                      opacity: 0, // Hide the input
                      position: 'absolute', // Overlay the input on top of the button
                      left: 0,
                      top: 0,
                      height: '100%', // Ensure the input takes the full height of the container
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
                {image && (
                  <div className="previewImage">
                    <UilTimes
                      onClick={() => {
                        setImage(null),
                          setFormData({ ...formData, image: null })
                      }}
                    />
                    <img src={image} alt="sdfsf" />
                  </div>
                )}
                {Array.from({ length: storyCount }).map((_, index) => (
                  <textarea
                    rows="8"
                    placeholder={`Page ${index + 1}`}
                    name="story"
                    value={formData.story}
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
                  <span className="btn">Save Draft</span>
                  <span onClick={handleSubmit} className="btn">
                    Add Post
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

export default AddPost
