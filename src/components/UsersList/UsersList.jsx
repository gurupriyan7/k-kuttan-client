import { Close } from "@mui/icons-material";
import defaultProfile from "../../img/default-profile.jpg";
import { appConfig } from "../../config/appConfig";
import { useNavigate } from "react-router-dom";
import { path } from "../../paths/paths";
import { useEffect, useState } from "react";
import { getFollowersFollowings } from "../../api/userRequest";
import { followUnFollowUser } from "../../actions/user.actions";
import { useDispatch } from "react-redux";

export default function UsersList({ label, isFollower, close }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [followData,setFollowData]=useState([])
  useEffect(async() => {
   const data = await getFollowersFollowings(isFollower);
   setFollowData(data?.data)
  }, [isFollower]);
  console.log(followData,"followData");
  

  const handleFollowToggle = async (userId) => {
    const updatedUsers = followData?.map((user) => {
      if (user._id === userId) {
        return { ...user, isFollowing: !user.isFollowing }
      }
      return user
    })
    setFollowData(updatedUsers)
  }

  const handleFollowUnFollow = async (e, userId) => {
    e.preventDefault()
    await handleFollowToggle(userId)
    dispatch(followUnFollowUser(userId))
  }

  const ProfileImage = ({ src }) => {
    const handleError = (event) => {
      event.target.src = defaultProfile;
    };

    return (
      <img
        src={src}
        alt="Follower"
        className="rounded-full h-9 w-9"
        onError={handleError}
      />
    );
  };

  return (
    <div className="absolute top-0 left-0 z-[999] h-full w-screen p-5 mx-auto flex justify-center md:pt-40">
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 max-w-[500px] max-h-[80vh] overflow-y-auto -translate-y-1/2 bg-white rounded-lg h-max md:max-h-[90vh] w-full p-5 shadow-2xl">
        <div className="justify-between flex items-start">
          <h3 className="text-sm sm:text-base font-bold md:text-lg">{label}</h3>

          <button onClick={close}>
            <Close />
          </button>
        </div>

        {followData?.map((user) => (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              // backgroundColor: "rgba(255, 165, 0, 0.23)",
              borderRadius: "15px",
              paddingRight: "13px",
              paddingLeft: "13px",
            }}
            // onClick={() =>
            //   (window.location.href = `/${path.authorPosts}/${user?._id}`)
            // }
            key={user._id}
            className="py-3 hover:bg-gray-100 border-b flex gap-2 cursor-pointer"
          >
            <div style={{ display: "flex" }}  onClick={() =>
              (window.location.href = `/${path.authorPosts}/${user?._id}`)
            }>
              <ProfileImage
                src={`${appConfig?.awsBucketUrl}/${user?.profileImage}`}
              />

              <div className="text-black font-medium space-y-1">
                <p className="text-sm sm:text-base">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs sm:text-sm">{user?.userName}</p>
              </div>
            </div>
            <button
              onClick={(e) => handleFollowUnFollow(e, user?._id)}
              className="button fc-button"
              style={{ color: "black" }}
            >
              {user?.isFollowing ? "UnFollow" : "Follow"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

