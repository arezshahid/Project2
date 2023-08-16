import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { deletePost, editPost } from "../Services/Posts/posts";
import {
  addComment,
  deleteComment,
  editComment,
} from "../Services/Comments/comments";
import { v4 as uuidv4 } from "uuid";

interface PostProps {
  key: any;
  userId: any;
  id: any;
  title: string;
  body: string;
  currentUser: any;
  Comment: any;
  currentUserName: any;
  currentUserEmail: any;
  setPostState: any;
}

export const PostComponent: React.FC<PostProps> = ({
  id,
  userId,
  title,
  body,
  currentUser,
  Comment,
  currentUserName,
  currentUserEmail,
  setPostState,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(body);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>(Comment);
  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const [isCommentButtonEditing, setIsCommentButtonEditing] = useState(false);
  const [editingCommentIndex, setEditingCommentIndex] = useState(-1);

  let change: boolean;
  if (userId == currentUser) {
    change = false;
  } else {
    change = true;
  }

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (id: any) => {
    setIsEditing(false);
    setEditedBody(editedBody);
    editPost(id, editedBody, setPostState);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedBody(event.target.value);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleAddComment = (
    postId: any,
    comment: any,
    currentUserName: any,
    currentUserEmail: any
  ) => {
    let uid = uuidv4();
    const newComment = {
      id: uid, // You can adjust the id logic as needed
      postId: postId,
      body: comment,
      name: currentUserName,
      email: currentUserEmail,
    };
    const updatedComments = [...comments];
    updatedComments.unshift(newComment);
    setComments(updatedComments);

    addComment(uid, postId, comment, currentUserName, currentUserEmail);
    setComment("");
  };

  const handleEditCommentButton = (index: any) => {
    setIsCommentEditing(!isCommentEditing);
    setIsCommentButtonEditing(!isCommentButtonEditing);
    setEditingCommentIndex(index);
  };

  const handleUpdateComment = (postId: any, index: any) => {
    setIsCommentEditing(!isCommentEditing);
    setIsCommentButtonEditing(!isCommentButtonEditing);
    setEditingCommentIndex(-1);
    editComment(postId, index, comments);
  };

  const handleEditComment = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    index: any
  ) => {
    const updatedComments = [...comments];
    updatedComments[index].body = event.target.value;
    setComments(updatedComments);
  };

  const handleDeleteComment = (postId: any, index: any) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
    deleteComment(postId, index);
  };

  return (
    <div className="post">
      <div className="post-card">
        <div className="post-header">
          <h1>{id}</h1>
          {!change && (
            <Button
              className="btn-danger"
              onClick={() => deletePost(id, setPostState)}
            >
              Delete Post
            </Button>
          )}
        </div>
        <h2 className="post-title">{title}</h2>
        <div className="post-body-container post-header">
          <textarea
            className={`post-body ${isEditing ? "editing" : ""}`}
            readOnly={!isEditing}
            value={editedBody}
            onChange={handleBodyChange}
          ></textarea>
          {!change && (
            <div className="post-body-button-container">
              {isEditing ? (
                <Button
                  className="save-button p-3"
                  variant="success"
                  onClick={() => handleSave(id)}
                >
                  Save
                </Button>
              ) : (
                <Button
                  className="edit-button p-3"
                  variant="dark"
                  onClick={handleEdit}
                >
                  Edit
                </Button>
              )}
            </div>
          )}
        </div>
        <div className="comment-section">
          <h3>Comments</h3>
          <div className="post-header">
            <input
              className="comment-field"
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={handleCommentChange}
            />
            <Button
              variant="dark"
              onClick={() =>
                handleAddComment(id, comment, currentUserName, currentUserEmail)
              }
            >
              Add Comment
            </Button>
          </div>
          <div className="comments-list">
            {comments?.map((c: any, index: number) => (
              <div key={c.id} className="comment">
                <div className="comment-body-container mt-2 post-header">
                  <textarea
                    key={c.id}
                    className="comment-body"
                    value={c.body}
                    readOnly={
                      !isCommentEditing || index !== editingCommentIndex
                    }
                    onChange={(event) => handleEditComment(event, index)}
                  ></textarea>
                  {currentUserEmail == c.email &&
                    (isCommentEditing && index === editingCommentIndex ? (
                      <Button
                        className="save-comment-button"
                        variant="success"
                        onClick={() => handleUpdateComment(c.postId, index)}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        className="edit-comment-button"
                        variant="dark"
                        onClick={() => handleEditCommentButton(index)}
                      >
                        Edit
                      </Button>
                    ))}
                  {currentUserEmail == c.email && (
                    <Button
                      className="delete-comment-button"
                      variant="danger"
                      onClick={() => handleDeleteComment(c.postId, index)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
