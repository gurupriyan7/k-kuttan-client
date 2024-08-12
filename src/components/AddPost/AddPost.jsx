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
import { createPost, getPostSeqwnces } from "../../actions/post.actions";
import { path } from "../../paths/paths";
import { useSnackbar } from "notistack";
import Select from "react-select";
import Home from "../../img/home.png";
import { Link } from "react-router-dom";
import { PostCategoriesEnum } from "../../constants/PostEnum";
import Preloader from "../Preloader/Preloader";
import { rules } from "../../constants/rules";

const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const { postSeq } = useSelector((state) => state.postReducer);
  const [partSeqs, setPartSeqs] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);
  const [resonseD, setResponseD] = useState({
    type: "",
    message: "",
  });
  const [showMore, setShowMore] = useState(false)
  const [errorShow, setErrorShow] = useState(false);

  const [storyCount, setStoryCount] = useState(1);

  const [stories, setStories] = useState([
    {
      page: 1,
      story: "",
    },
  ]);

  useEffect(() => {
    setPartSeqs(postSeq);
  }, [postSeq]);

  console.log(partSeqs, "TEST2");

  useEffect(() => {
    dispatch(getPostSeqwnces());
  }, []);
  useEffect(() => { }, [storyCount, stories]);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    image: null,
    partNumber: "",
    partName: "",
    category: "",
  });
  const [otherPartName, setOtherPartName] = useState("");

  const { error, isError, loading } = useSelector((state) => state.postReducer);

  const countWords = async (sentence) => {
    if (!sentence) return 0; // handle empty string or undefined
    const words = sentence.trim().split(/\s+/);
    return words.length;
  };

  const findStoryByPage = (page) => {
    return stories.find((story) => story?.page === page);
  };

  const removeAndReindex = (array, index) => {
    // Remove the element at the specified index
    array.splice(index, 1);

    // Reindex the remaining elements
    for (let i = index; i < array.length; i++) {
      array[i].page = i + 1;
    }

    return array;
  };

  const handleClearStory = async (index) => {
    if (stories?.length > 1) {
      const tempStories = stories;
      const data = await removeAndReindex(tempStories, index);
      setStories(data);
      setStoryCount(storyCount - 1);
    }
  };

  const splitTextIntoChunks = (text, chunkSize, currentPage) => {
    const paragraphs = text.split("\n");
    const chunks = [];
    let currentWords = [];
    let page = currentPage;
    let wordCount = 0;

    paragraphs.forEach((paragraph) => {
      const words = paragraph.trim().split(/\s+/);

      if (words.length === 1 && words[0] === "") {
        if (currentWords.length > 0) {
          currentWords.push("\n"); // Adding a newline to preserve empty lines in the chunks
        } else {
          chunks.push({ page, story: "\n" });
          page++;
        }
        return;
      }

      words.forEach((word) => {
        currentWords.push(word);
        wordCount++;

        if (wordCount === chunkSize) {
          chunks.push({ page, story: currentWords.join(" ") });
          currentWords = [];
          wordCount = 0;
          page++;
        }
      });

      if (currentWords.length > 0 && wordCount < chunkSize) {
        currentWords.push("\n"); // Adding a newline to separate paragraphs in the chunks
      }
    });

    // Handle any remaining words
    if (
      currentWords.length > 1 ||
      (currentWords.length === 1 && currentWords[0] !== "\n")
    ) {
      // Avoid pushing a single newline
      // Remove the last newline added
      if (currentWords[currentWords.length - 1] === "\n") {
        currentWords.pop();
      }
      chunks.push({ page, story: currentWords.join(" ").trim() });
    }

    return chunks;
  };

  const onImageChange = async (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img));

      const imageData = await getPreSignedUrlUtill(
        img
      );
      setFormData({
        ...formData,
        image: imageData ?? "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setFormData({
    //   ...formData,
    //   [name]: value,
    // });
    if (name === "partNumber") {
      const numberValue = Number(value);
      if (!isNaN(numberValue)) {
        setFormData({
          ...formData,
          [name]: numberValue,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
        // ["categoryType"]: selectedCategory?.value,
        // ["contentType"]: selectedContent?.value,
      });
    }
  };
  const addStory = () => {
    setStories([...stories, { page: stories.length + 1, story: "" }]);
    setStoryCount(storyCount + 1);
  };

  const handleInputChange = async (index, value = "") => {
    const wordCount = await countWords(value);
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

    if (
      !formData?.title ||
      !formData?.summary ||
      !formData?.category ||
      !formData?.partName ||
      !formData?.partNumber ||
      formData?.partName === "new-part"
    ) {
      enqueueSnackbar(
        "Title, Summary, part Name ,Part Number and  category should not be empty!",
        {
          variant: "warning",
          autoHideDuration: 2000,
          ContentProps: {
            style: { backgroundColor: "yellow" },
          },
        }
      );
    } else {
      //  Handle form submission logic here
      dispatch(
        createPost({
          ...formData,
          part: Number(formData.part),
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
    }
  };

  const handleKeyPress = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };

  const handlePartNamecChange = (e) => {
    setOtherPartName(e?.target?.value);
    setFormData({
      ...formData,
      partName: e?.target?.value,
    });
  };

  return (
    <>
      {/* {imageUploading && <Preloader />} */}
      <div className="main" style={{ backgroundImage: `URL(${back})` }}>
        <div style={{ backgroundColor: "" }} className="absolute left-4 top-4">
          <Link to="../">
            {" "}
            <img src={Home} style={{ width: "1.5rem" }} alt="" />
          </Link>
        </div>
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


                  <div classname="py-2 my-2 text-left">
                    <h5 className="text-base sm:text-lg font-medium text-left">Rules</h5>
                    <p className="text-xs sm:text-sm overflow-hidden" style={{ maxHeight: !showMore ? '60px' : '100%' }}>
                      <pre className="rules">
                        {rules}
                      </pre>
                    </p>
                    <button className="text-blue-700 font-medium" onClick={() => setShowMore(prev => !prev)}>{showMore ? "Show less" : "Show more"}</button>
                  </div>
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

                  <div>
                    <Select
                      className="text-[14px] cursor-pointer mt-[18px]"
                      name="category"
                      defaultValue={selectedCategory}
                      value={selectedCategory}
                      placeholder="select category"
                      // onChange={setSelectedCategory}
                      onChange={(selectedOption) => {
                        setSelectedCategory(selectedOption);
                        setFormData((prevData) => ({
                          ...prevData,
                          category: selectedOption?.value,
                        }));
                      }}
                      options={PostCategoriesEnum}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        border: "none",
                        padding: "4px",
                        colors: {
                          ...theme.colors,
                          neutral0: "#D1D5DB", // Set the background color
                          primary25: "#E5E7EB", // Option hover background color to gray-200
                          primary: "#6B7280", // Option selected color to gray-500
                        },
                      })}
                      styles={{
                        control: (base) => ({
                          ...base,
                          cursor: "pointer",
                          backgroundColor: "#EEEEEE", // gray-300
                          borderColor: "#D1D5DB", // gray-300
                          boxShadow: "none",
                          "&:hover": {
                            borderColor: "#6B7280", // gray-500
                          },
                        }),
                        option: (base, state) => ({
                          ...base,
                          cursor: "pointer",
                          backgroundColor: state.isFocused
                            ? "#E5E7EB"
                            : "white", // gray-200 on hover
                          color: "black",
                          "&:active": {
                            backgroundColor: "#D1D5DB", // gray-300
                          },
                        }),
                        menu: (base) => ({
                          ...base,
                          backgroundColor: "#D1D5DB", // gray-300 for the dropdown
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: "black",
                        }),
                      }}
                    // unstyled
                    />
                  </div>

                  <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 mt-[24px]">
                    <Select
                      className="text-[14px] cursor-pointer w-full lg:mt-[16px] pt-1"
                      name="partName"
                      defaultValue={selectedContent}
                      value={selectedContent}
                      placeholder="select Part Name"
                      // onChange={setSelectedContent}
                      onChange={(selectedOption) => {
                        setSelectedContent(selectedOption);
                        setFormData((prevData) => ({
                          ...prevData,
                          partName: selectedOption.value,
                        }));
                      }}
                      options={partSeqs}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        border: "none",
                        padding: "9px",
                        colors: {
                          ...theme.colors,
                          neutral0: "#D1D5DB", // Set the background color
                          primary25: "#E5E7EB", // Option hover background color to gray-200
                          primary: "#6B7280", // Option selected color to gray-500
                        },
                      })}
                      styles={{
                        control: (base) => ({
                          ...base,
                          cursor: "pointer",
                          backgroundColor: "#EEEEEE", // gray-300
                          // borderColor: "#D1D5DB", // gray-300
                          boxShadow: "none",
                          padding: "2px",
                          "&:hover": {
                            borderColor: "#6B7280", // gray-500
                          },
                        }),
                        option: (base, state) => ({
                          ...base,
                          cursor: "pointer",
                          backgroundColor: state.isFocused
                            ? "#E5E7EB"
                            : "white", // gray-200 on hover
                          color: "black",
                          "&:active": {
                            backgroundColor: "#D1D5DB", // gray-300
                          },
                        }),
                        menu: (base) => ({
                          ...base,
                          backgroundColor: "#D1D5DB", // gray-300 for the dropdown
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: "black",
                        }),
                      }}
                    // unstyled
                    />

                    <input
                      type="number"
                      min={1}
                      placeholder="Part No"
                      name="partNumber"
                      value={formData.partNumber}
                      onChange={handleChange}
                      required
                      className="input"
                      onKeyPress={handleKeyPress}
                    />
                  </div>

                  {selectedContent?.value === "new-story" && (
                    <input
                      type="text"
                      placeholder="New Story Name"
                      name="partName"
                      value={otherPartName}
                      onChange={handlePartNamecChange}
                      required
                      className="input"
                    />
                  )}

                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
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
                  {stories?.map((story, index) => (
                    <div style={{ position: "relative" }}>
                      <textarea
                        rows="8"
                        placeholder={`Page ${index + 1}`}
                        name="story"
                        value={story?.story}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                        className="input"
                      ></textarea>
                      <span
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          cursor: "pointer",
                          color: "red", // Adjust color as needed
                          zIndex: 1, // Ensure it's above the textarea content
                        }}
                        onClick={() => handleClearStory(index)}
                      >
                        &#x2715; {/* Unicode for cross icon */}
                      </span>
                    </div>
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
                    <span
                      onClick={(e) => {
                        if (!imageUploading) {
                          handleSubmit(e, true);
                        }
                      }}
                      className={`btn ${imageUploading ? "disabled" : ""}`}
                    >
                      "Save Draft"
                    </span>
                    <span
                      onClick={(e) => {
                        if (!imageUploading) {
                          handleSubmit(e, false);
                        }
                      }}
                      className={`btn ${imageUploading ? "disabled" : ""}`}
                    >
                      Add Post
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPost;
