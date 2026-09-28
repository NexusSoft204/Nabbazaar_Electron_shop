
import Link from "next/link";
import {
  Headphones,
  MapPin,
  PackageSearch,
  Phone,
} from "lucide-react";

const TopHeader = () => {
  return (
    <div className="hidden bg-slate-950 text-white lg:block">
      <div className="container mx-auto flex h-10 items-center justify-between px-4">
        {/* Right Side */}
        <div className="flex items-center gap-5 text-sm">
          <span className="text-slate-300">
            Welcome to our online store!
          </span>

          <Link
            href="/contact-us"
            className="flex items-center gap-1.5 transition hover:text-blue-400"
          >
            <MapPin size={16} />
            Contact & Address
          </Link>

          <Link
            href="/order-track"
            className="flex items-center gap-1.5 transition hover:text-blue-400"
          >
            <PackageSearch size={16} />
            Track Order
          </Link>
        </div>

        {/* Left Side */}
        <div className="flex items-center gap-5 text-sm">
          <a
            href="tel:+93700000000"
            className="flex items-center gap-1.5 transition hover:text-blue-400"
          >
            <Phone size={16} />
            0788001919
          </a>

          <Link
            href="/support"
            className="flex items-center gap-1.5 transition hover:text-blue-400"
          >
            <Headphones size={16} />
            support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;

