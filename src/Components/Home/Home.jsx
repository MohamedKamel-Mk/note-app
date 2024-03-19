import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import axios from "axios";
import { useRecoilState } from "recoil";
import { noteState } from "../Atoms/noteAtom.js";
import Note from "../Note/Note.jsx";

export default function Home() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let [noteLength, setNoteLength] = useRecoilState(noteState);
  let [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    getUserNotes();
  }, []);

  let formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    // validate:function (values) {
    //   console.log(values);
    // },
    onSubmit: addNote,
  });
  function addNote(values) {
    // console.log(values);
    // console.log(`3b8ny__${localStorage.getItem("userToken")}`);
    axios
      .post("https://note-sigma-black.vercel.app/api/v1/notes", values, {
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
      })
      .finally(() => {
        handleClose();
      });
  }
  function getUserNotes() {
    axios
      .get("https://note-sigma-black.vercel.app/api/v1/notes", {
        headers: {
          token: `3b8ny__${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setNoteLength(res.data.notes.length);
        setAllNotes(res.data.notes);
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
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="overflow-hidden">
        <div className="row">
          <div className="col-2">
            <div className="position-fixed col-lg-2">
              <Sidebar />
            </div>
          </div>

          <div className="col-10 px-lg-5 px-2 py-5">
            <div className="text-end me-2">
              <button
                variant="primary"
                onClick={handleShow}
                className="btn btn-info text-white"
              >
                <i className="fa-solid fa-plus"></i> Add Note
              </button>
            </div>
            <div className="row">
              {allNotes.map((note) => {
                return <Note key={note._id} note={note} getUserNotes={getUserNotes} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
