import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Post(props) {
  const { id } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/" + id)
      .then((result) => setPost(result.data));
  }, [id]);
  return (
    <div className="container">
      <h3>Post {id}</h3>
      <div>
        Utilisateur(trice) numéro <b>{post.userId}</b>
        <br />
        <br />
      </div>
      <div>
        <b>
          Titre : <em>{post.title}</em>
        </b>
      </div>
      <div>Corps du texte : {post.body}</div>
    </div>
  );
}

export default Post;
