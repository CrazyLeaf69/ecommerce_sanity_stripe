import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: "943y0xmx",
  dataset: "production",
  token: process.env.NEXT_PUBLIC_PATCH_TOKEN,
  useCdn: true,
});

export default client;
