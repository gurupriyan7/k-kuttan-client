import { Close } from "@mui/icons-material"
import defaultProfile from '../../img/default-profile.jpg'
import { appConfig } from "../../config/appConfig"
import { useNavigate } from "react-router-dom"
import { path } from "../../paths/paths"

export default function UsersList({ label, list, close }) {
  const navigate = useNavigate()

  const ProfileImage = ({ src }) => {
    const handleError = (event) => {
      event.target.src = defaultProfile
    }

    return <img src={src} alt="Follower" className="rounded-full h-9 w-9" onError={handleError} />
  }


  return (
    <div className="absolute top-0 left-0 z-[999] h-full w-screen p-5 mx-auto flex justify-center md:pt-40">
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 max-w-[500px] max-h-[80vh] overflow-y-auto -translate-y-1/2 bg-white rounded-lg h-max md:max-h-[90vh] w-full p-5 shadow-2xl">
        <div className="justify-between flex items-start">
          <h3 className="text-sm sm:text-base font-bold md:text-lg">{label}</h3>

          <button onClick={close}><Close /></button>
        </div>


        {list.map(user => (
          <div onClick={() => window.location.href = `/${path.authorPosts}/${user?._id}`} key={user._id} className="py-3 hover:bg-gray-100 border-b flex gap-2 cursor-pointer">
            <ProfileImage
              src={`${appConfig?.awsBucketUrl}/${user?.profileImage}`}
            />

            <div className="text-black font-medium space-y-1">
              <p className="text-sm sm:text-base">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs sm:text-sm">{user?.userName}</p>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}
