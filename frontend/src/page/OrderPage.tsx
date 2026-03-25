import { CartList } from "../components/CartList";
import { OrderForm } from "../components/OrderForm";

export const OrderPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-12 py-8 md:py-12">
      <OrderForm />
      <CartList />
    </div>
  );
};
