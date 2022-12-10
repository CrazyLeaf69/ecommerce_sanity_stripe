import sanityClient from "@sanity/client";
// import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "943y0xmx",
  dataset: "production",
  apiVersion: "2022-09-21",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  withCredentials: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
