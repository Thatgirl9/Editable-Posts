import React, { useEffect, useState } from "react";
import "./post.css";
import EditPost from "../editPost/EditPost";
import DeletePost from "../deletePost/DeletePost.jsx";

import axios from "axios";

function Post() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editModes, setEditModes] = useState({}); // State for edit modes
  const [deleteModes, setDeleteModes] = useState({}); // State for delete modes

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(function (response) {
        setPosts(response.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // EDIT button
  const editButtonClick = (eachPost) => {
    setSelectedPost(eachPost);
    // Toggle the edit mode for the selected post.
    setEditModes((prevModes) => ({
      ...prevModes,
      [eachPost.id]: !prevModes[eachPost.id],
    }));

    // Close delete mode if it was open for this post.
    setDeleteModes((prevModes) => ({
      ...prevModes,
      [eachPost.id]: false,
    }));
  };

  // DELETE button
  const deleteButtonClick = (eachPost) => {
    setSelectedPost(eachPost);
    // Toggle the delete mode for the selected post.
    setDeleteModes((prevModes) => ({
      ...prevModes,
      [eachPost.id]: !prevModes[eachPost.id],
    }));

    // Close edit mode if it was open for this post.
    setEditModes((prevModes) => ({
      ...prevModes,
      [eachPost.id]: false,
    }));
  };

  const confirmDelete = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${selectedPost.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.id !== selectedPost.id)
        );
        // To Clear the selected post after deletion
        setSelectedPost(null);
        setDeleteModes((prevModes) => ({
          ...prevModes,
          [selectedPost.id]: false,
        }));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="post_div">
      <h1>Editable Posts</h1>
      <div className="posts_div">
        {posts.map((eachPost) => (
          <div key={eachPost.id} className="each_post">
            <h3>{eachPost.title}</h3>
            <hr></hr>
            <p>{eachPost.body}</p>
            <div className="button_div">
              <div>
                <button
                  className="btn-1"
                  onClick={() => editButtonClick(eachPost)}
                >
                  Edit
                </button>
                {selectedPost && editModes[eachPost.id] && (
                  <EditPost
                    selectedPost={selectedPost}
                    editClick={() => {
                      // Updating the post and handling the edits
                      setSelectedPost(null);
                      setEditModes((prevModes) => ({
                        ...prevModes,
                        [selectedPost.id]: false,
                      }));
                    }}
                  />
                )}
              </div>

              <div>
                <button
                  className="btn-2"
                  onClick={() => deleteButtonClick(eachPost)}
                >
                  Delete
                </button>
                {selectedPost && deleteModes[eachPost.id] && (
                  <DeletePost
                    selectedPost={selectedPost}
                    deleteClick={confirmDelete}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;
