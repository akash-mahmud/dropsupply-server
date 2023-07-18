import stripe from "../../config/stripe";

interface IPramas {
  name: string;
  email: string;
}
export const createCustomer = async (params: IPramas) => {
  try {
    const responsce = await stripe.customers.create(params);

    return responsce;
  } catch (error: any) {
    console.log(error.message);
  }
};
