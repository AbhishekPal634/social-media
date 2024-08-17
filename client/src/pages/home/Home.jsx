import React from "react";
import Stories from "../../components/stories/Stories";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";

function Home() {
  return (
    <div className="sm:p-6 p-4">
      <Stories />
      <Share />
      <Posts />
    </div>
  );
}

export default Home;
