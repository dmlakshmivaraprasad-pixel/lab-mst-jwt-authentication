import { useDispatch, useSelector } from "react-redux";

import { deletePost } from "../redux/postSlice";

import { selectPosts } from "../redux/selectors";


function PostList() {

    const dispatch = useDispatch();

    const posts = useSelector(selectPosts);


    const handleDelete = (id) => {
        dispatch(deletePost(id));
    };


    return (
        <div className="post-list">

            {posts.map((post) => (

                <div
                    className="post-card"
                    key={post.id}
                >

                    <h2>{post.title}</h2>

                    <p>{post.description}</p>

                    <button
                        className="delete-btn"
                        onClick={() => handleDelete(post.id)}
                    >
                        Delete
                    </button>

                </div>

            ))}

        </div>
    );
}


export default PostList;