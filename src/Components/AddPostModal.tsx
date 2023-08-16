import { Button, Modal } from "react-bootstrap";

interface AddPostModalProps {
  initAddPostModal: any;
  isShow: boolean;
  Id: any;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setBody: React.Dispatch<React.SetStateAction<string>>;
  storePost: any;
  currentUser: any;
  title: any;
  body: any;
}

export const AddPostModal: React.FC<AddPostModalProps> = ({
  initAddPostModal,
  isShow,
  Id,
  setTitle,
  setBody,
  storePost,
  currentUser,
  title,
  body,
}) => {
  return (
    <>
      <Button className="mt-4" variant="success" onClick={initAddPostModal}>
        Add Post
      </Button>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={initAddPostModal}>
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
          <Button variant="danger" onClick={initAddPostModal}>
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
