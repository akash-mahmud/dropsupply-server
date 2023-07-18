import stripe from "../../config/stripe";

export const paymentMethod = async (data: {
  customerId: string;
  tokenId: string;
}) => {
  try {
    const res = await stripe.customers.createSource(data.customerId, {
      source: data.tokenId,
    });
    return res;
  } catch (error: any) {
    return new Error(error.message);
  }
};
