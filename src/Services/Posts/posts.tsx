import axios from "axios";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { GetComments } from "../Comments/comments";

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
  const [isShow, invokeModal] = useState(false);

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
    initModal();
  };

  const initModal = () => {
    console.log(isShow);
    return invokeModal(!isShow);
  };
  return (
    <>
      <Button className="mt-4" variant="success" onClick={initModal}>
        Add Post
      </Button>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title className="text-center">{Id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="post">
            <div className="post-card">
              <label>Title</label>
              <input
                className="post-title"
                onChange={(value) => {
                  setTitle(value.target.value);
                }}
              ></input>
              <label>Body</label>
              <input
                className="post-body"
                onChange={(value) => {
                  setBody(value.target.value);
                }}
              ></input>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={initModal}>
            Close
          </Button>
          <Button
            variant="dark"
            onClick={() => storePost(currentUser, Id, title, body)}
          >
            Store
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
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
