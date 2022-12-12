import React, { useEffect, useState } from "react";
import { client, urlFor } from "../../lib/client";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";
import ReviewModal from "../../components/ReviewModal";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import ReviewComponent from "../../components/ReviewComponent";
import useReviews from "../../hooks/useReviews";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price, slug } = product;

  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const [index, setIndex] = useState(0);
  const [showReviews, setShowReviews] = useState(false);
  const { reviews, setReviews } = useReviews(slug);
  // const [reviewState, setReviewState] = useState(null);

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  const average = (arr) => arr?.reduce((a, b) => a + b, 0) / arr?.length;

  const updateReviews = (res) => {
    const review = res.reviews[res.reviews.length - 1];
    setReviews((old) => {
      if (old != undefined) {
        return [...old, review];
      }
      return [(review = { review })];
    });
  };

  const closeModal = () => setShowReviews(false);

  return (
    <div>
      <ReviewModal
        modalState={showReviews}
        reviews={reviews}
        id={product._id}
        closeModal={closeModal}
        updateReviews={updateReviews}
      />
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" alt="product-detail-image" />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={i === index ? "small-image selected-image" : "small-image"}
                onMouseEnter={() => setIndex(i)}
                alt="small-image"
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              {[...Array(5)].map((_, index) => {
                const i = index + 1;
                const averageStars = reviews.length > 0 ? average(reviews?.map((rev) => rev.stars)) : 0;
                const averagePointFive =
                  reviews.length > 0 ?? Math.round(average(reviews?.map((rev) => rev.stars)) * 2) / 2;
                const IsPointFive = averagePointFive.toString().split(".5")[1] != undefined;
                return Math.floor(averageStars) < i ? (
                  IsPointFive && averagePointFive == i - 0.5 ? (
                    <BsStarHalf key={i} />
                  ) : (
                    <BsStar key={i} />
                  )
                ) : (
                  <BsStarFill key={i} />
                );
              })}
            </div>
            <p>({reviews?.length ?? 0})</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price unSelectable">${price}</p>
          <div className="quantity unSelectable">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons unSelectable">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ color: "#324d67" }}>Reviews</h3>
        <button type="button" className="write-review" onClick={() => setShowReviews(true)}>
          Write Review
        </button>
      </div>
      {reviews.length > 0 ? reviews?.map((review, i) => <ReviewComponent key={i} review={review} />) : "No reviews yet"}
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products
              .filter((item) => item._id !== product._id)
              .map((item) => (
                <Product key={item._id} product={item} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product" && !(_id in path("drafts.**"))] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
