
import MainHeader from "./MainHeader";
import Navigation from "./Navigation";
import TopHeader from "./TopHeader";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm font-montserrat">
      <TopHeader />

      <MainHeader />

      <Navigation />
    </header>
  );
};

export default Header;
