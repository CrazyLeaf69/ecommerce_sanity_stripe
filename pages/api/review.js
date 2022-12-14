// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const { id, patch, newReview } = JSON.parse(req.body);
  const result = await patch(
    `${id}?apiKey=skrYGo6ERATsWBeFJHvCPsCb7rbVB9sydxjpsymrk55zj5SRIDRQqjmPrk489oe8vuXltTE782Iyx9aRdLPluBEXaJdu876hxTgdZKDyGh5hpM1VkhZFpvy1nlrhdLzQEYtEvmIHejdSrkABc7YHTKNLN8mUZbXpdlxlszl6f3RPAmJYnm1T`
  )
    .setIfMissing({ reviews: [] })
    .append("reviews", [newReview])
    .commit({ autoGenerateArrayKeys: true });
  res.status(200).json(result);
}
