import React from "react";
import { BsStar, BsStarFill } from "react-icons/bs";

const ReviewComponent = ({review, i}) => {
  return (
    <div className="review-container">
      <div
        className="review-user-stars"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div className="review-user">{review.user}</div>
        <div className="review-stars">
          {[...Array(5)].map((_, i) => (
            <div key={i}>
              {review.stars >= i + 1 ? <BsStarFill /> : <BsStar />}
            </div>
          ))}
        </div>
      </div>
      <div className="review-comment">{review.comment}</div>
    </div>
  );
};

export default ReviewComponent;
