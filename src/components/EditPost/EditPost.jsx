/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef, useState } from "react";
import "./EditPost.css";
import { UilTimes } from "@iconscout/react-unicons";
import { UilScenery } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPreSignedUrlUtill } from "../../utils/s3.utils";
import back from "../../img/wp4082523.webp";
import { createPost, getPostById } from "../../actions/post.actions";
import { path } from "../../paths/paths";
import { appConfig } from "../../config/appConfig";
import { updatePost } from "../../api/postRequest";
import Select from "react-select";
import { PostCategoriesEnum } from "../../constants/PostEnum";

const EditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { postId } = useParams();

  const post = useSelector((state) => state.postReducer.post);

  useEffect(() => {
    dispatch(getPostById({ postId }));
  }, [dispatch, postId]);

  useEffect(() => {
    if (post?.story) {
      setStories(post.story);
      setStoryCount(post.story.length);
    }
    setFormData({
      title: post?.title || "",
      summary: post?.summary || "",
      image: post?.image || "",
      partNumber: "",
      partName: "",
      category: post?.category || "",
    });

    const selectedCategoryOption = PostCategoriesEnum.find(
      (category) => category?.value === post?.category
    );
    setSelectedCategory(selectedCategoryOption);
  }, [post]);
// console.log(post?.category,"CAT")
  const [storyCount, setStoryCount] = useState(1);
  const [stories, setStories] = useState([{ story: "" }]);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const [selectedCategory, setSelectedCategory] = useState(post?.category);
  console.log(selectedCategory,"SELECT")
  const [selectedContent, setSelectedContent] = useState(null);
  const { postSeq } = useSelector((state) => state.postReducer);
  const [partSeqs, setPartSeqs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    image: "",
    partNumber: "",
    partName: "",
    category: "",
  });

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

  const removeStory = () => {
    if (stories.length > 1) {
      setStories(stories.slice(0, -1));
      setStoryCount(storyCount - 1);
    }
  };

  const handleInputChange = (index, value) => {
    const newStories = [...stories];
    newStories[index].story = value;
    setStories(newStories);
  };

  const handleSubmit = (e, isDraft) => {
    e.preventDefault();
    // Handle form submission logic here

    updatePost(post?._id, {
      ...formData,
      story: stories,
      isDraft: isDraft,
    }),
      navigate(path.profile);
    console.log(stories, "Form submitted:", formData);
  };

  const handleKeyPress = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };

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

                <div>
                  <Select
                    className="text-[14px] cursor-pointer mt-[18px]"
                    name="category"
                    value={selectedCategory}
                    placeholder="Select category"
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
                        neutral0: "#D1D5DB",
                        primary25: "#E5E7EB",
                        primary: "#6B7280",
                      },
                    })}
                    styles={{
                      control: (base) => ({
                        ...base,
                        cursor: "pointer",
                        backgroundColor: "#EEEEEE",
                        borderColor: "#D1D5DB",
                        boxShadow: "none",
                        "&:hover": {
                          borderColor: "#6B7280",
                        },
                      }),
                      option: (base, state) => ({
                        ...base,
                        cursor: "pointer",
                        backgroundColor: state.isFocused ? "#E5E7EB" : "white",
                        color: "black",
                        "&:active": {
                          backgroundColor: "#D1D5DB",
                        },
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: "#D1D5DB",
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: "black",
                      }),
                    }}
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
                        backgroundColor: state.isFocused ? "#E5E7EB" : "white", // gray-200 on hover
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

                {selectedContent?.value === "other" && (
                  <input
                    type="text"
                    placeholder="Part Name"
                    name="partName"
                    value={formData?.partName}
                    onChange={handleChange}
                    required
                    className="input"
                  />
                )}

                <div style={{ position: "relative", display: "inline-block" }}>
                  <input
                    type="file"
                    ref={imageRef}
                    onChange={onImageChange}
                    className="input"
                    style={{
                      cursor: "pointer",
                      color: "var(--photo)",
                      width: "100%",
                      opacity: 0,
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: "100%",
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
                {(image || post?.image) && (
                  <div className="previewImage">
                    <UilTimes
                      onClick={() => {
                        setImage(null);
                        setFormData({ ...formData, image: null });
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
                    onClick={(e) => handleSubmit(e, true)}
                    className={`btn ${post?.isDraft ? " " : "diActivate"}`}
                  >
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
  );
};

export default EditPost;
