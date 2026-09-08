import { useDispatch, useSelector } from "react-redux";

import {
  togglePlatform,
  setPostText,
  clearPost,
} from "./redux/postSlice";

import {
  selectPostText,
  selectSelectedPlatforms,
} from "./redux/selectors";

import PostList from "./components/PostList";

import "./App.css";


const platforms = [
  "Instagram",
  "Twitter / X",
  "LinkedIn",
  "Facebook",
];


const platformRules = {
  Instagram: 2200,
  "Twitter / X": 280,
  LinkedIn: 3000,
  Facebook: 63206,
};


function App() {

  const dispatch = useDispatch();

  const text = useSelector(selectPostText);

  const selectedPlatforms =
    useSelector(selectSelectedPlatforms);


  const characterCount = text.length;


  // Check whether all selected platforms are valid
  const isValid =
    selectedPlatforms.length > 0 &&
    selectedPlatforms.every(
      (platform) =>
        characterCount <= platformRules[platform]
    );


  // Platform button click
  const handlePlatformClick = (platform) => {

    dispatch(togglePlatform(platform));

  };


  // Textarea change
  const handleTextChange = (event) => {

    dispatch(setPostText(event.target.value));

  };


  // Create Post
  const handleCreatePost = () => {

    if (selectedPlatforms.length === 0) {

      alert("Please select at least one platform.");

      return;
    }


    if (text.trim().length === 0) {

      alert("Please write something before creating the post.");

      return;
    }


    if (!isValid) {

      alert(
        "Your post exceeds the character limit for one or more platforms."
      );

      return;
    }


    alert(
      `Post created successfully!\n\n` +
      `Platforms: ${selectedPlatforms.join(", ")}\n` +
      `Characters: ${characterCount}`
    );

  };


  return (

    <div className="page">

      <div className="container">

        {/* Header */}

        <header className="header">

          <h1>
            Social Media Post Composer
          </h1>

          <p>
            Create and validate your post for multiple platforms
          </p>

        </header>


        {/* Main Card */}

        <main className="composer-card">


          {/* Platform Selection */}

          <section className="section">

            <h2>
              Select Platforms
            </h2>


            <div className="platform-buttons">

              {platforms.map((platform) => (

                <button
                  key={platform}
                  className={
                    selectedPlatforms.includes(platform)
                      ? "platform-btn active"
                      : "platform-btn"
                  }
                  onClick={() =>
                    handlePlatformClick(platform)
                  }
                >
                  {platform}
                </button>

              ))}

            </div>

          </section>



          {/* Write Post */}

          <section className="section">

            <h2>
              Write Your Post
            </h2>


            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="Write your post here..."
            />


            <div className="character-count">

              {characterCount} characters

            </div>

          </section>



          {/* Platform Validation */}

          <section className="validation-section">

            <h2>
              Platform Validation
            </h2>


            <PostList />

          </section>



          {/* Overall Status */}

          {selectedPlatforms.length > 0 && (

            <div
              className={
                isValid
                  ? "overall-status valid"
                  : "overall-status invalid"
              }
            >

              {isValid
                ? "✓ Your post is valid for all selected platforms."
                : "✗ Your post exceeds the limit for one or more platforms."
              }

            </div>

          )}



          {/* Buttons */}

          <div className="button-container">

            <button
              className="create-btn"
              onClick={handleCreatePost}
              disabled={
                !isValid ||
                text.trim().length === 0
              }
            >
              Create Post
            </button>


            <button
              className="clear-btn"
              onClick={() =>
                dispatch(clearPost())
              }
            >
              Clear
            </button>

          </div>


        </main>

      </div>

    </div>

  );
}


export default App;