import { Toaster } from "react-hot-toast";
import { Header } from "../components/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};
