import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { useEffect, useState } from "react"; // Import the useEffect hook from the react dependency


const Post = () => {
  const [post, setPost] = useState([]); // State variables

  const getPosts = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      setPost(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []); /*
           The empty array means render once. If we pass in post, i.e., [post],
           it will re-render the component if post's data changes
         */

  return (
    <div>
      {/* Rendering the post's title and body */}
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default Post;