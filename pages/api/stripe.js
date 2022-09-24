import Stripe from 'stripe' 

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const cartItems = JSON.parse(req.body)
  // console.log(cartItems[0].image);

  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "required",
        shipping_options: [
          { shipping_rate: "shr_1LlGpDLFRullMfAM11oa6oz6" },
        //   { shipping_rate: "shr_1LlEISLFRullMfAMIX25YVEx" },
        //   { shipping_rate: "shr_1LlEJjLFRullMfAMDo8G4Omr" },
        ], 
        line_items: cartItems.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img.replace(
            "image-",
            "https://cdn.sanity.io/images/943y0xmx/production/"
          );
          let parsedImage;
          if (newImage.includes("-webp")) {
            parsedImage = newImage.replace("-webp", ".webp");
          } else if (newImage.includes("-jpg")) {
            parsedImage = newImage.replace("-jpg", ".jpg");
          }
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [parsedImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/?success`,
        cancel_url: `${req.headers.origin}/?canceled`,
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
