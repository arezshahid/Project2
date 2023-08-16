import axios from "axios";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { GetComments } from "../Comments/comments";
import { AddPostModal } from "../../Components/AddPostModal";

export async function GetPosts() {
  let Posts = JSON.parse(localStorage.getItem("Posts")!);
  if (Posts == null) {
    try {
      const url = "https://jsonplaceholder.typicode.com/posts";
      const response = await axios.get(url);
      const postsWithComments = await Promise.all(
        response.data.map(async (p: any) => {
          p.comments = await GetComments(p.id);
          return p;
        })
      );
      localStorage.setItem("Posts", JSON.stringify(postsWithComments));
      return response.data;
    } catch (error) {
      console.log(`Error fetching posts: ${error}`);
      return [];
    }
  } else {
    localStorage.setItem("Posts", JSON.stringify(Posts));
    return Posts;
  }
}

export const AddPost: React.FC<{
  Id: any;
  currentUser: any;
  setPostState: any;
}> = ({ Id, currentUser, setPostState }) => {
  let Posts = JSON.parse(localStorage.getItem("Posts")!);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isShow, setIsShow] = useState(false);

  const storePost = (currentUser: any, Id: any, title: any, body: any) => {
    Posts.unshift({
      userId: currentUser,
      id: Id,
      title: title,
      body: body,
      comments: [],
    });
    setPostState(Posts);
    localStorage.setItem("Posts", JSON.stringify(Posts));
    initAddPostModal();
  };

  const initAddPostModal = () => {
    setIsShow(!isShow);
  };
  return AddPostModal({
    initAddPostModal: initAddPostModal,
    isShow: isShow,
    Id: Id,
    setTitle: setTitle,
    setBody: setBody,
    storePost: storePost,
    currentUser: currentUser,
    title: title,
    body: body,
  });
};

export function editPost(id: any, editedBody: any, setPostState: any) {
  let Posts = JSON.parse(localStorage.getItem("Posts")!);

  const postToEdit = Posts.find((p: any) => p.id === id);
  if (postToEdit) {
    postToEdit.body = editedBody;
    setPostState(Posts);
    localStorage.setItem("Posts", JSON.stringify(Posts));
  }
}

export function deletePost(id: any, setPostState: any) {
  let Posts = JSON.parse(localStorage.getItem("Posts")!);

  const postToDelete = Posts.findIndex((p: any) => p.id === id);
  if (postToDelete !== -1) {
    Posts.splice(postToDelete, 1);
    setPostState(Posts);
  }
  localStorage.setItem("Posts", JSON.stringify(Posts));
}
