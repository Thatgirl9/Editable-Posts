import "./deletePost.css";

function DeletePost({ selectedPost, deleteClick }) {
  return (
    <div className="delete_div">
      <div className="">
        <h2>Delete Post</h2>
        <p>{selectedPost.title}</p>
        <button onClick={deleteClick}>Yes, Delete</button>
      </div>
    </div>
  );
}

export default DeletePost;
