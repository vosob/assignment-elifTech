import { useForm } from "react-hook-form";
import { orderSchema, type OrderSchema } from "../utils/orderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { postOrder } from "../api/orders";

export const OrderForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderSchema>({
    resolver: zodResolver(orderSchema),
  });

  const { items, totalPrice, cleanCart } = useCart();

  const onSubmit = (data: OrderSchema) => {
    try {
      const formattedItems = items.map(({ id, name, price, quantity }) => ({
        id,
        name,
        price,
        quantity,
      }));
      const order = { ...data, items: formattedItems, totalPrice };
      postOrder(order);
      toast.success("Order placed successfully");
      cleanCart();
      reset();
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <form className="w-full max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
      {/* Name */}
      <div className="flex flex-col w-full">
        <label htmlFor="name" className="text-lg px-1 mb-1">
          Name
        </label>
        <input
          className="text-xl border border-gray-400 px-2 py-1"
          type="text"
          id="name"
          {...register("name")}
        />
      </div>
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      {/* Email */}
      <div className="flex flex-col w-full">
        <label htmlFor="email" className="text-lg px-1 mb-1">
          Email
        </label>
        <input
          className="text-xl border border-gray-400 px-2 py-1"
          type="email"
          id="email"
          {...register("email")}
        />
      </div>
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      {/* Phone */}
      <div className="flex flex-col w-full">
        <label htmlFor="phone" className="text-lg px-1 mb-1">
          Phone
        </label>
        <input
          className="text-xl border border-gray-400 px-2 py-1"
          type="tel"
          id="phone"
          {...register("phone")}
        />
      </div>
      {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

      {/* Address */}
      <div className="flex flex-col w-full">
        <label htmlFor="address" className="text-lg px-1 mb-1">
          Address
        </label>
        <input
          className="text-xl border border-gray-400 px-2 py-1"
          type="text"
          id="address"
          {...register("address")}
        />
      </div>
      {errors.address && (
        <p className="text-red-500">{errors.address.message}</p>
      )}

      <button
        type="submit"
        className="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl transition-colors cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
};
