import axios from "axios";
import { GetPosts } from "../Posts/posts";

export async function GetComments(postId: any) {
  let url =
    "https://jsonplaceholder.typicode.com/posts/" + postId + "/comments";
  const response = await axios.get(url);
  return response.data;
}

export async function addComment(
  id: any,
  postId: any,
  body: any,
  currentUserName: any,
  currentUserEmail: any
) {
  const Posts: any = await GetPosts();
  const postToEdit = Posts.find((p: any) => p.id === postId);
  if (postToEdit) {
    postToEdit.comments?.unshift({
      postId: postId,
      id: id,
      name: currentUserName,
      email: currentUserEmail,
      body: body,
    });
    localStorage.setItem("Posts", JSON.stringify(Posts));
  }
}

export async function editComment(postId: any, index: any, comments: any) {
  const Posts: any = await GetPosts();
  const postToEdit = Posts.find((p: any) => p.id === postId);
  if (postToEdit) {
    postToEdit.comments[index].body = comments[index].body;
    localStorage.setItem("Posts", JSON.stringify(Posts));
  }
}

export async function deleteComment(postId: any, index: any) {
  const Posts: any = await GetPosts();
  const postToEdit = Posts.find((p: any) => p.id === postId);
  if (postToEdit) {
    postToEdit.comments.splice(index, 1);
    localStorage.setItem("Posts", JSON.stringify(Posts));
  }
}
