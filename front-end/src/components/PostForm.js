import { useState } from "react";

const PostForm = () => {
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [likes, setLikes] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const post = { userName, description, likes };

    const response = await fetch("http://localhost:3000/api/posts/createPost", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/JSON",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setUserName(" ");
      setDescription(" ");
      setLikes(" ");
      setError(null);
      console.log("new post added", json);
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add Post</h3>

      <label> UserName : </label>
      <input
        type="text"
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
      />

      <label> description : </label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <label> likes : </label>
      <input
        type="number"
        onChange={(e) => setLikes(e.target.value)}
        value={likes}
      />
      <button> Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default PostForm;
