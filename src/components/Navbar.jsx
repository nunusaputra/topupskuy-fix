import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import logo from "../assets/images/logo-fix.png";
import { useEffect, useState } from "react";
import { MdOutlineLogin } from "react-icons/md";

const navigation = [
  { name: "Topup", href: "/", current: false },
  { name: "Cek Transaction", href: "/#", current: false },
  { name: "History", href: "#", current: false },
  { name: "Calculator MLBB", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <Disclosure
      as="nav"
      className={`sticky top-0 z-[100] py-2 w-full transition-all duration-300 overflow-hidden
            ${
              scrolling
                ? "bg-slate-600/30 backdrop-blur-2xl"
                : "bg-slate-500/20 backdrop-blur-xl"
            }
        }`}
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <FaBars
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <FaXmark
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center md:ml-[25%] lg:ml-0 lg:justify-start">
            <div className="flex shrink-0 items-center w-20 h-14">
              <img
                alt="Your Company"
                src={logo}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden lg:ml-6 lg:block">
              <div className="flex space-x-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current ? "text-purple-300" : "text-white ",
                      "relative rounded-md py-2 text-sm font-medium group hover:text-purple-300 hover:cursor-pointer"
                    )}
                  >
                    {item.name}
                    {/* Underline */}
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full group-hover:bg-purple-600"></span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="absolute inset-y-0 right-0 flex items-center gap-4 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Login Section */}
              <button className="px-4 py-2 rounded-lg ring-2 ring-purple-300 text-purple-300 font-semibold hover:bg-purple-300 hover:ring-offset-4 hover:ring-offset-[#060911] transition-all duration-300 hover:cursor-pointer hover:text-black">
                Login
              </button>

              {/* Register Section */}
              <button className="px-4 py-2 rounded-lg ring-2 ring-offset-0 ring-purple-300 bg-purple-300 font-semibold hover:ring-2 hover:ring-offset-4 hover:ring-offset-[#060911] transition-all duration-300 hover:cursor-pointer hover:text-black">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="lg:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
          <DisclosureButton
            as="a"
            className="block md:hidden rounded-md px-3 py-2 text-base text-gray-300 hover:bg-gray-700 hover:text-white font-medium"
          >
            Login
          </DisclosureButton>
          <DisclosureButton
            as="a"
            className="block md:hidden rounded-md px-3 py-2 text-base text-gray-300 hover:bg-gray-700 hover:text-white font-medium"
          >
            Register
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
