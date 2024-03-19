import React, { useState } from "react";
// import "./Note.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import axios from "axios";
import { Fade } from "react-awesome-reveal";

export default function Note({ note, getUserNotes }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    // validate:function (values) {
    //   console.log(values);
    // },
    onSubmit: updateNote,
  });
  function updateNote(values) {
    console.log(values);
    console.log(note._id);
    console.log(`3b8ny__${localStorage.getItem("userToken")}`);
    axios
      .put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,
        values,
        {
          headers: {
            token: `3b8ny__${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        getUserNotes();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        handleClose();
      });
  }
  function deleteNote() {
    axios
      .delete(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`, {
        headers: {
          token: `3b8ny__${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        console.log(res);
        getUserNotes();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input
              onChange={formik.handleChange}
              className="form-control my-3"
              type="text"
              name="title"
              id="title"
              placeholder="Please enter title"
            />
            <textarea
              onChange={formik.handleChange}
              className="form-control my-3"
              name="content"
              id="content"
              placeholder="Please enter content"
            ></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="col-md-6 p-3">
        <Fade>
          <div>
            <Card>
              <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>{note.content}</Card.Text>
                <i
                  className="fa-solid fa-pen-to-square cursor-pointer mx-2"
                  variant="primary"
                  onClick={handleShow}
                ></i>
                <i
                  className="fa-solid fa-trash cursor-pointer mx-2 fa-fade"
                  onClick={deleteNote}
                ></i>
              </Card.Body>
            </Card>
          </div>
        </Fade>
      </div>
    </>
  );
}
