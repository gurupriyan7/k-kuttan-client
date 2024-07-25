/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import React, { useState, useRef, useEffect } from "react";
import defaultProfile from "../../img/default-profile.jpg";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { getPreSignedUrlUtill } from "../../utils/s3.utils";
import { useNavigate } from "react-router-dom";
import { findUserProfile } from "../../actions/user.actions";
import { path } from "../../paths/paths";
import { appConfig } from "../../config/appConfig";
import { UserRole } from "../../config/enums";
import Select from "react-select";
import { PostCategoriesEnum } from "../../constants/PostEnum";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
  { value: "chocolate2", label: "Chocolate2" },
  { value: "strawberry2", label: "Strawberry2" },
  { value: "vanilla2", label: "Vanilla2" },
  { value: "chocolate3", label: "Chocolate3" },
  { value: "strawberry3", label: "Strawberry3" },
  { value: "vanilla3", label: "Vanilla3" },
  { value: "chocolate4", label: "Chocolate4" },
  { value: "strawberry4", label: "Strawberry4" },
  { value: "vanilla4", label: "Vanilla4" },
  { value: "chocolate5", label: "Chocolate5" },
  { value: "strawberry5", label: "Strawberry5" },
  { value: "vanilla5", label: "Vanilla5" },
];

const PostShare = ({
  data,
  setData,
  searchText,
  setSearchText,
  isHome = false,
  isAuthorProfile = false,
  setCategory,
  isCategory=false
}) => {
  const authData = useSelector((state) => state.authReducer.authData);

  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const imageRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSearchText = async (e) => {
    setTimeout(() => {
      setSearchText(e?.target?.value);
    }, 3000);
  };

  const onImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img));

      const imageData = await getPreSignedUrlUtill(img);
      setData({
        ...data,
        image: imageData ?? "",
      });
      console.log(imageData, "image-image");
    }
  };
  console.log(data, "dataaaa ", authData);
  const isAuthor = authData?.data?.role === UserRole.AUTHOR;

  const FollowerImage = ({ src }) => {
    const handleError = (event) => {
      // alert('hello')
      event.target.src = defaultProfile;
    };

    return (
      <img
        src={src}
        alt="Follower"
        onError={handleError}
        width={48}
        height={48}
        className="profileImg-"
      />
    );
  };

  return (
    <div className="PostShare">
      <div>
        <FollowerImage
          src={`${appConfig?.awsBucketUrl}/${authData?.data?.profileImage}`}
        />
        <input
          className="post-input"
          type="text"
          placeholder="Search Posts..."
          // value={searchText}
          disabled={!isAuthor && !isHome}
          onChange={handleSearchText}
        />
      
      </div>
      <div className="postOptions">
        <div className="tooltip">
          <div
            className="photo-option option"
            style={{ color: "var(--photo)" }}
            // onClick={() => imageRef.current.click()}
            ref={imageRef}
            onChange={onImageChange}
          >
            <UilScenery />
            Photo
            <span class="tooltiptext">Comming Soon...</span>
          </div>
        </div>
        <div className="tooltip">
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
            <span class="tooltiptext">Comming Soon...</span>
          </div>
        </div>
        <div className="tooltip">
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
            <span class="tooltiptext">Comming Soon...</span>
          </div>{" "}
        </div>
        <div className="tooltip">
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
            <span class="tooltiptext">Comming Soon...</span>
          </div>
        </div>

<div className="flex justify-between w-full gap-4">
       {isCategory&& <Select
          className="text-[14px] cursor-pointer w-full bg-transparent opacity-80 "
          name="categoryType"
          defaultValue={selectedCategory}
          value={selectedCategory}
          placeholder="Select a category ?"
          onChange={(selecterOption)=>{
            setSelectedCategory(selecterOption?.value)
            setCategory(selecterOption?.value)
          }}
          options={PostCategoriesEnum}
          theme={(theme) => ({
            ...theme,
            borderRadius: "12px",
            border: "none",
            paddingTop: "10px",
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
              cursor: 'pointer',
              paddingTop: "7px",
              paddingBottom: "7px",
              backgroundColor: "#EEEEEE", // gray-300
              borderColor: "#D1D5DB", // gray-300
              boxShadow: "none",
              "&:hover": {
                borderColor: "#6B7280", // gray-500
              },
            }),
            option: (base, state) => ({
              ...base,
              cursor: 'pointer',
              backgroundColor: state.isFocused ? "#E5E7EB" : "white", // gray-200 on hover
              color: "black",
              "&:active": {
                backgroundColor: "#D1D5DB", // gray-300
              },
              fontWeight:"bold"
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
        />}
        {authData?.data && isAuthor && !isAuthorProfile && (
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(path.addPost);
            }}
            style={{ color: "black" }}
            className="button ps-button"
          >
            Share
          </button>
        )}
        </div>
        <div style={{ display: "none" }}>
          <input
            type="file"
            name="myImage"
            ref={imageRef}
            onChange={onImageChange}
          />
        </div>
      </div>
      {/* {data?.image && (
        <div className="previewImage">
          <UilTimes
            onClick={() => {
              setImage(null), setData({ ...data, image: null })
            }}
          />
          <img src={image} alt="sdfsf" />
        </div>
      )} */}
    </div>
  );
};

export default PostShare;
