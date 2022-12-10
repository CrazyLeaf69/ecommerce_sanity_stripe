// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const { id, client, newReview } = JSON.parse(req.body);
  const res = await client
    .patch(id)
    .setIfMissing({ reviews: [] })
    .append("reviews", [newReview])
    .commit({ autoGenerateArrayKeys: true });
  res.status(200).json(res);
}
