import { useDispatch, useSelector } from "react-redux";

import { addPost } from "./redux/postSlice";

import {
  selectTotalPosts,
  selectReactPosts,
} from "./redux/selectors";

import PostList from "./components/PostList";

import "./App.css";


function App() {

  const dispatch = useDispatch();

  const totalPosts = useSelector(selectTotalPosts);

  const reactPosts = useSelector(selectReactPosts);


  const handleAddPost = () => {

    const newPost = {
      id: Date.now(),
      title: "React",
      description: "Learn React Basics",
      category: "React",
    };

    dispatch(addPost(newPost));
  };


  return (

    <div className="app">

      <div className="container">

        <h1>
          Redux Toolkit Performance Demo
        </h1>


        <button
          className="add-btn"
          onClick={handleAddPost}
        >
          Add React Post
        </button>


        <div className="stats">

          <h2>
            Total Posts : {totalPosts}
          </h2>

          <h3>
            React Related Posts : {reactPosts.length}
          </h3>

        </div>


        <PostList />

      </div>

    </div>
  );
}


export default App;