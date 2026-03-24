import { CartList } from "../components/CartList";
import { OrderForm } from "../components/OrderForm";

export const OrderPage = () => {
  return (
    <div className="grid grid-cols-2 gap-4 px-12 py-12">
      <OrderForm />
      <CartList />
    </div>
  );
};
