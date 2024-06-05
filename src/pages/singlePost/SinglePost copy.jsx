/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./SinglePost.css";
import Post from "../../components/Post/Post";
import Posts from "../../components/Posts/Posts";
import RightSide from "../../components/RightSide/RightSide";
import back from "../../img/wp4082523.webp";
import left from "../../img/leftz.png";
import right from "../../img/rightz.png";
import scroll from "../../img/scroll.png";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { PostsData } from "../../Data/PostsData";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getPostById } from "../../actions/post.actions";
const SinglePost = (PostsData) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { postId } = location.state;
  console.log(postId, "postId");

  const post = useSelector((state) => state.postReducer.post);

  useEffect(async () => {
    await dispatch(getPostById({ postId }));
  }, [dispatch, postId]);
  console.log(post, "post post post post post");

  return (
    <div
      className="SinglePost"
      style={{
        backgroundImage: `URL(${back})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="single-post-container" style={{ color: "black" }}>
        {/* soldier image left */}
        <div style={{ backgroundColor: "" }}>
          <img
            src={left}
            style={{ width: "20rem", marginTop: "1rem" }}
            alt=""
          />
        </div>
        {/* scroll content */}
        <div className="badan">
          <div
            style={{
              // backgroundColor: "black",
              height: "100vh",
              paddingTop: "10rem",
              paddingLeft: "10rem",
              paddingRight: "10rem",
              backgroundImage: `URL(${scroll})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <img src={PostsData[0]?.img} alt="" />

            <div
              className="postReact"
              style={{ paddingLeft: "5rem", paddingRight: "5rem" }}
            >
              <img src={PostsData[0]?.liked ? Heart : NotLike} alt="" />
              <img src={Comment} alt="" />
              <img src={Share} alt="" />
            </div>

            <span
              style={{
                color: "var(--gray)",
                fontSize: "12px",
              }}
            >
              {PostsData[0]?.likes} likes
            </span>

            <div
              className="detail"
              style={{
                maxHeight: "75vh",
                overflowY: "scroll",
                paddingLeft: "5rem",
                paddingRight: "5rem",
              }}
            >
              <span>
                <b>{PostsData[0]?.name}</b>
              </span>
              <span>
                {" "}
                {PostsData[0]?.desc}Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book. www.lipsum.com/ Lorem Ipsum - All the facts
                - Lipsum generator People also ask Is lorem ipsum text generator
                Seo-proof? What is the lorem ipsum text? What is lorem Ipum
                filling text? How do I use Lorem text? www.lipsum.comLorem Ipsum
                - All the facts - Lipsum generator Lorem Ipsum is a standard
                dummy text used in printing and web design. Learn about its
                origin, variations, translations and how to generate it online.
                www.loremipzum.com › enDummy Text Generator Lorem Ipsum
                Loremipzum.com is a tool that lets you generate dummy text in
                Latin with no meaning, useful for filling spaces in web design,
                graphic design and printing. Learn the origin, meaning and usage
                of Lorem ipsum, the most famous placeholder text in the world,
                and customize your own text with HTML elements.
                loremipsum.ioLorem Ipsum – Generator, Origins and Meaning
                Generate Lorem Ipsum placeholder text for use in your graphic,
                print and web layouts, and discover plugins for your favorite
                writing, design and blogging tools. Explore the origins, history
                and meaning of the famous passage, and learn how Lorem Ipsum
                went from scrambled Latin passage to ubiqitous dummy text.
                loremipsum.io › generatorLorem Ipsum Generator Easily generate
                Lorem Ipsum placeholder text in any number of characters, words
                sentences or paragraphs. Learn about the origins of the passage
                and its history, from the Roman era to today. en.wikipedia.org ›
                wiki › Lorem_ipsumLorem ipsum - Wikipedia Lorem Ipsum is simply
                dummy text of the printing and typesetting industry. Lorem Ipsum
                has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. www.lipsum.com/ Lorem
                Ipsum - All the facts - Lipsum generator People also ask Is
                lorem ipsum text generator Seo-proof? What is the lorem ipsum
                text? What is lorem Ipum filling text? How do I use Lorem text?
                www.lipsum.comLorem Ipsum - All the facts - Lipsum generator
                Lorem Ipsum is a standard dummy text used in printing and web
                design. Learn about its origin, variations, translations and how
                to generate it online. www.loremipzum.com › enDummy Text
                Generator Lorem Ipsum Loremipzum.com is a tool that lets you
                generate dummy text in Latin with no meaning, useful for filling
                spaces in web design, graphic design and printing. Learn the
                origin, meaning and usage of Lorem ipsum, the most famous
                placeholder text in the world, and customize your own text with
                HTML elements. loremipsum.ioLorem Ipsum – Generator, Origins and
                Meaning Generate Lorem Ipsum placeholder text for use in your
                graphic, print and web layouts, and discover plugins for your
                favorite writing, design and blogging tools. Explore the
                origins, history and meaning of the famous passage, and learn
                how Lorem Ipsum went from scrambled Latin passage to ubiqitous
                dummy text. loremipsum.io › generatorLorem Ipsum Generator
                Easily generate Lorem Ipsum placeholder text in any number of
                characters, words sentences or paragraphs. Learn about the
                origins of the passage and its history, from the Roman era to
                today. en.wikipedia.org › wiki › Lorem_ipsumLorem ipsum -
                Wikipedia Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. www.lipsum.com/ Lorem Ipsum - All the facts -
                Lipsum generator People also ask Is lorem ipsum text generator
                Seo-proof? What is the lorem ipsum text? What is lorem Ipum
                filling text? How do I use Lorem text? www.lipsum.comLorem Ipsum
                - All the facts - Lipsum generator Lorem Ipsum is a standard
                dummy text used in printing and web design. Learn about its
                origin, variations, translations and how to generate it online.
                www.loremipzum.com › enDummy Text Generator Lorem Ipsum
                Loremipzum.com is a tool that lets you generate dummy text in
                Latin with no meaning, useful for filling spaces in web design,
                graphic design and printing. Learn the origin, meaning and usage
                of Lorem ipsum, the most famous placeholder text in the world,
                and customize your own text with HTML elements.
                loremipsum.ioLorem Ipsum – Generator, Origins and Meaning
                Generate Lorem Ipsum placeholder text for use in your graphic,
                print and web layouts, and discover plugins for your favorite
                writing, design and blogging tools. Explore the origins, history
                and meaning of the famous passage, and learn how Lorem Ipsum
                went from scrambled Latin passage to ubiqitous dummy text.
                loremipsum.io › generatorLorem Ipsum Generator Easily generate
                Lorem Ipsum placeholder text in any number of characters, words
                sentences or paragraphs. Learn about the origins of the passage
                and its history, from the Roman era to today. en.wikipedia.org ›
                wiki › Lorem_ipsumLorem ipsum - Wikipedia Lorem Ipsum is simply
                dummy text of the printing and typesetting industry. Lorem Ipsum
                has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. www.lipsum.com/ Lorem
                Ipsum - All the facts - Lipsum generator People also ask Is
                lorem ipsum text generator Seo-proof? What is the lorem ipsum
                text? What is lorem Ipum filling text? How do I use Lorem text?
                www.lipsum.comLorem Ipsum - All the facts - Lipsum generator
                Lorem Ipsum is a standard dummy text used in printing and web
                design. Learn about its origin, variations, translations and how
                to generate it online. www.loremipzum.com › enDummy Text
                Generator Lorem Ipsum Loremipzum.com is a tool that lets you
                generate dummy text in Latin with no meaning, useful for filling
                spaces in web design, graphic design and printing. Learn the
                origin, meaning and usage of Lorem ipsum, the most famous
                placeholder text in the world, and customize your own text with
                HTML elements. loremipsum.ioLorem Ipsum – Generator, Origins and
                Meaning Generate Lorem Ipsum placeholder text for use in your
                graphic, print and web layouts, and discover plugins for your
                favorite writing, design and blogging tools. Explore the
                origins, history and meaning of the famous passage, and learn
                how Lorem Ipsum went from scrambled Latin passage to ubiqitous
                dummy text. loremipsum.io › generatorLorem Ipsum Generator
                Easily generate Lorem Ipsum placeholder text in any number of
                characters, words sentences or paragraphs. Learn about the
                origins of the passage and its history, from the Roman era to
                today. en.wikipedia.org › wiki › Lorem_ipsumLorem ipsum -
                Wikipedia
              </span>
            </div>
          </div>
        </div>

        {/* soldier image right */}
        <div style={{ backgroundColor: "" }}>
          <img src={right} style={{ width: "20rem" }} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
