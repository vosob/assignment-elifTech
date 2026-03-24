import { Route, Routes } from "react-router-dom";
import { Layout } from "./page/Layout";
import { HomePage } from "./page/HomePage";
import { OrderPage } from "./page/OrderPage";

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </Layout>
  );
};
