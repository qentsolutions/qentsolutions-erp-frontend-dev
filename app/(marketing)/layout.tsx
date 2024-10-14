import Footer from "./components/footer";
import { Navbar } from "./components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
