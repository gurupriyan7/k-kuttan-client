/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef, useState } from "react";
import "./AddPost.css";
import { Center } from "@mantine/core";
import { UilTimes } from "@iconscout/react-unicons";
import { UilScenery } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPreSignedUrlUtill } from "../../utils/s3.utils";
import back from "../../img/wp4082523.webp";
import { createPost } from "../../actions/post.actions";
import { path } from "../../paths/paths";
import { useSnackbar } from "notistack";

const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [errorShow, setErrorShow] = useState(false);

  const [storyCount, setStoryCount] = useState(1);

  const [stories, setStories] = useState([
    {
      page: 1,
      story: "",
    },
  ]);
  // useEffect(() => {
  //   console.log(storyCount, "storycountttttt", stories);
  // }, [storyCount, stories]);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    image: null,
  });

  const { error, isError, loading } = useSelector((state) => state.postReducer);

  const countWords = async (sentence) => {
    if (!sentence) return 0; // handle empty string or undefined
    const words = sentence.trim().split(/\s+/);
    return words.length;
  };

  const findStoryByPage = (page) => {
    // console.log(stories, "apple-orange-grapes");
    return stories.find((story) => story?.page === page);
  };

  const splitTextIntoChunks = (text, chunkSize, currentPage) => {
    const paragraphs = text.split('\n');
    const chunks = [];
    let currentWords = [];
    let page = currentPage;
    let wordCount = 0;
  
    paragraphs.forEach(paragraph => {
      const words = paragraph.trim().split(/\s+/);
  
      if (words.length === 1 && words[0] === "") {
        if (currentWords.length > 0) {
          currentWords.push('\n'); // Adding a newline to preserve empty lines in the chunks
        } else {
          chunks.push({ page, story: '\n' });
          page++;
        }
        return;
      }
  
      words.forEach(word => {
        currentWords.push(word);
        wordCount++;
  
        if (wordCount === chunkSize) {
          chunks.push({ page, story: currentWords.join(' ') });
          currentWords = [];
          wordCount = 0;
          page++;
        }
      });
  
      if (currentWords.length > 0 && wordCount < chunkSize) {
        currentWords.push('\n'); // Adding a newline to separate paragraphs in the chunks
      }
    });
  
    // Handle any remaining words
    if (currentWords.length > 1 || (currentWords.length === 1 && currentWords[0] !== '\n')) { // Avoid pushing a single newline
      // Remove the last newline added
      if (currentWords[currentWords.length - 1] === '\n') {
        currentWords.pop();
      }
      chunks.push({ page, story: currentWords.join(' ').trim() });
    }
  
    console.log(chunks); // Output the chunks to console for verification
  
    return chunks;
  };
  
  

  const onImageChange = async (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img));

      const imageData = await getPreSignedUrlUtill(img);
      setFormData({
        ...formData,
        image: imageData ?? "",
      });
      console.log(imageData, "image-image");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const addStory = () => {
    setStories([...stories, { page: stories.length + 1, story: "" }]);
    setStoryCount(storyCount + 1);
  };

  const handleInputChange = async (index, value = "") => {
    const wordCount = await countWords(value);
    console.log(wordCount, "owrd");
    const pagefound = await findStoryByPage(index + 2);
    if (wordCount > 200 && !pagefound) {
      const tempChunks = splitTextIntoChunks(value, 200, index + 1);

      const spreadStories = [...stories, ...tempChunks];
      const checkpages = [];

      const updatedStories = spreadStories.reduce((result, spreadStory) => {
        const page = tempChunks.find(
          (temp) => temp?.page === spreadStory?.page
        );

        if (spreadStory?.page === page?.page) {
          if (!checkpages.includes(spreadStory?.page)) {
            result.push({ page: spreadStory?.page, story: page?.story });
            checkpages.push(spreadStory?.page);
          }
        } else {
          result.push(spreadStory);
        }

        return result;
      }, []);

      setStories(updatedStories);
      setStoryCount(updatedStories?.length ?? 1);
    } else {
      if (wordCount > 200) {
        enqueueSnackbar("Stories must be less than 200 words per page!", {
          variant: "warning",
          autoHideDuration: 2000,
          ContentProps: {
            style: { backgroundColor: "yellow" },
          },
        });
      } else {
        const newStories = [...stories];
        newStories[index].story = value;
        setStories(newStories);
      }
    }
  };

  useEffect(() => {
    if (isError && error != null && errorShow) {
      enqueueSnackbar(
        (error?.message || error?.response?.data?.message) ?? "Login failed!",
        {
          variant: "error",
          autoHideDuration: 2000,
          ContentProps: {
            style: { backgroundColor: "red" },
          },
        }
      );
    }
  }, [isError, error]);

  const removeStory = () => {
    if (stories.length > 1) {
      setStories(stories.slice(0, -1));
      setStoryCount(storyCount - 1);
    }
  };

  const handleSubmit = (e, isDraft) => {
    e.preventDefault();
    setErrorShow(true);
    // Handle form submission logic here
    dispatch(
      createPost({
        ...formData,
        story: stories,
        ...(isDraft && {
          isDraft: isDraft,
        }),
      })
    );
    enqueueSnackbar("Post Added successfully !!", {
      variant: "success",
      autoHideDuration: 2000,
      ContentProps: {
        style: { backgroundColor: "green" },
      },
    });
    navigate(path.home);
    console.log(stories, "Form submitted:", formData);
  };

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
                <div style={{ position: "relative", display: "inline-block" }}>
                  <input
                    type="file"
                    ref={imageRef}
                    onChange={onImageChange}
                    className="input"
                    style={{
                      cursor: "pointer",
                      color: "var(--photo)",
                      width: "100%", // Ensure the input takes the full width
                      opacity: 0, // Hide the input
                      position: "absolute", // Overlay the input on top of the button
                      left: 0,
                      top: 0,
                      height: "100%", // Ensure the input takes the full height of the container
                    }}
                  />
                  <span
                    onClick={() => imageRef.current.click()}
                    style={{
                      cursor: "pointer",
                      color: "var(--photo)",
                      display: "flex",
                      alignItems: "center",
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
                          setFormData({ ...formData, image: null });
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
                    value={findStoryByPage(index + 1)?.story}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="input"
                  ></textarea>
                ))}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <span
                    onClick={removeStory}
                    className="next-btn"
                    style={{ display: storyCount <= 1 && "none" }}
                  >
                    Remove page
                  </span>
                  <span onClick={addStory} className="next-btn">
                    Next page
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <span onClick={(e) => handleSubmit(e, true)} className="btn">
                    Save Draft
                  </span>
                  <span onClick={(e) => handleSubmit(e, false)} className="btn">
                    Add Post
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
