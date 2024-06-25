import "./App.css";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import SinglePost from "./pages/singlePost/SinglePost";

import { Routes, Route } from "react-router-dom";
import { path } from "./paths/paths";
import AuthorAuth from "./pages/AuthorAuth/AuthorAuth";
import Chat from "./pages/Chat/Chat";
import Explore from "./pages/Explore/Explore";
import Room from "./pages/Room/Room";
import AddPost from "./components/AddPost/AddPost";
import EditPost from "./components/EditPost/EditPost";
import { useSelector } from "react-redux";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import { SnackbarProvider, useSnackbar } from "notistack";
import ForgotPassword from "./pages/ForgottPassword/ForgottPassword";

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const authData = useSelector((state) => state.authReducer.authData);

  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}>
      <div className="App">
        {/* <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div> */}
        <Routes>
          <Route path={path.home} element={<Home />} />
          <Route path={path.auth} element={<Auth />} />
          <Route path={path.authorAuth} element={<AuthorAuth />} />
          <Route path={path.profile} element={<Profile />} />
          <Route path={path.chat} element={<Chat />} />
          <Route path={path.explore} element={<Explore />} />
          <Route path={path.room} element={<Room />} />
          <Route path={path.forgotPassword} element={<ForgotPassword />} />
          <Route path={`${path.singlePost}/:postId`} element={<SinglePost />} />
          {authData?.data && (
            <Route path={`${path.addPost}`} element={<AddPost />} />
          )}
          {authData?.data && (
            <Route path={`${path.editPost}/:postId`} element={<EditPost />} />
          )}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </SnackbarProvider>
  );
}

export default App;
