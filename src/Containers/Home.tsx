import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GetPosts, AddPost } from "../Services/Posts/posts";
import { PostComponent } from "../Components/Posts";
import { NavBar } from "../Components/navbar";

interface Post {
  userId: string;
  id: number;
  title: string;
  body: string;
}

export const HomePage: React.FC = () => {
  const location = useLocation();
  const data = location.state;

  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPostId, setCurrentPostId] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts: any = await GetPosts();
        setPosts(fetchedPosts);
        setCurrentPostId(fetchedPosts.length + 1);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="postsContainer">
      <NavBar />
      <AddPost
        currentUser={data.id}
        Id={currentPostId}
        setPostState={setPosts}
      />
      {posts?.map((post: any) => (
        <PostComponent
          key={post.id}
          id={post.id}
          userId={post.userId}
          title={post.title}
          body={post.body}
          currentUser={data.id}
          Comment={post?.comments}
          currentUserName={data.name}
          currentUserEmail={data.email}
          setPostState={setPosts}
        />
      ))}
    </div>
  );
};
