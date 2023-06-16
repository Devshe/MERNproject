import { useEffect, useState } from "react";

import PostDetails from "../components/PostDetails";
import PostForm from "../components/PostForm";

const Home = () => {
  const [posts, setPosts] = useState(null);
  //fetch data - useEffect
  useEffect(() => {
    //fetch from backend
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:3000/api/posts/getPosts");
      const json = await response.json();
      if (response.ok) {
        setPosts(json);
      }
    };
    fetchPosts();
  }, []); //[] will fire once

  return (
    <div className="home">
      <div className="posts">
        {/* cycle through when we have some data 
              when we have values for 'posts' then map
              map((post)  - access to individual
              */}
        {posts &&
          posts.map((post) => <PostDetails key={post._id} post={post} />)}
      </div>
      <PostForm />
    </div>
  );
};

export default Home;
