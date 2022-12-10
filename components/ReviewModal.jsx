import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsStarFill, BsStar } from "react-icons/bs";
import Modal from "react-modal";
import { client } from "../lib/client";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    paddingRight: "30px",
    paddingLeft: "30px",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("body");

const ReviewModal = ({ modalState, closeModal, id, updateReviews }) => {
  const [rating, setRating] = useState(3);
  const [hover, setHover] = useState(3);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const t = e.target;
    const newReview = {
      _type: "reviewObj",
      user: t.fullName.value,
      comment: t.comment.value,
      stars: rating,
    };
    const res = await fetch(`/api/review`, {
      method: "POST",
      body: JSON.stringify({
        patch: client.patch,
        id,
        newReview,
      }),
    });
    updateReviews(res);
    closeModal();
  };

  return (
    <div>
      <Modal isOpen={modalState} style={customStyles} contentLabel="Example Modal">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="button" className="x-close" onClick={closeModal}>
            <AiOutlineClose />
          </button>
        </div>
        <form className="review-form" onSubmit={handleSubmit}>
          <input required type="text" placeholder="Full Name" name="fullName" />
          <div className="star-rating">
            {[...Array(5)].map((_, index) => {
              const i = index + 1;
              return (
                <button
                  type="button"
                  key={i}
                  onClick={() => setRating(i)}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(rating)}
                >
                  {i <= (hover || rating) ? <BsStarFill /> : <BsStar />}
                </button>
              );
            })}
          </div>
          <textarea rows="4" cols="40" maxLength="150" placeholder="Comment" name="comment" />
          <button type="submit" className="write-review">
            Send Review
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ReviewModal;
