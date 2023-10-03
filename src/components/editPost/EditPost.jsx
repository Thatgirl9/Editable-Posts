import { useState } from "react";
import "./editPost.css";

function EditPost({ selectedPost, editClick }) {
  const [editPost, setEditPost] = useState(selectedPost);
  const handleInputChange = (e) => {
    // destructure
    const { name, value } = e.target;
    setEditPost({
      ...editPost,
      [name]: value,
    });
  };

  const clickSaveButton = () => {
    // To save edited post data and call the editClick function
    // clears the selected post after editing successfully
    editClick();
  };

  return (
    <div className="edit_div">
      <h3>Edit Post</h3>
      <div className="input-textarea">
        <input
          type="text"
          name="title"
          value={editPost.title}
          onChange={handleInputChange}
        />
        <textarea
          name="body"
          type="text"
          value={editPost.body}
          onChange={handleInputChange}
        ></textarea>

        <button onClick={clickSaveButton} className="save-button">
          Save
        </button>
      </div>
    </div>
  );
}

export default EditPost;
