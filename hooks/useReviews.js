import React, { useEffect, useState } from "react";
import { client } from "../lib/client";

export default function useReviews(slug) {
  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    const query = `*[_type == "product" && slug.current == '${slug.current}'][0]`;
    const reviews = await client.fetch(query).then((res) => res.reviews || []);
    console.log(reviews);
    setReviews(reviews);
  };
  useEffect(() => {
    getReviews();
  }, []);

  return { reviews, setReviews };
}
