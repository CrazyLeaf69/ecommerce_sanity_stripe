import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: "943y0xmx",
  dataset: "production",
  token:
    "skbUFrHah35NxMOSZvCkrpjjQbHdGJdpKVrv6uvO4bkK9vTE6N4XYbbaIgD9qnnuZn46oZeTqVJ1AgZT3haRxz0pI1VT7T5uovT5Gph8MCtgvmyi3NK8O1iyOzL9OK6zI1awIeNtKX2v7H9mn2AUOLCygx9NpnXJsMriruUWiYFJbyEW1d89",
  useCdn: true,
});

export default client;
