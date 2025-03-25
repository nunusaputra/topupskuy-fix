import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { FaBars, FaUser } from "react-icons/fa";
import { PiUserListFill } from "react-icons/pi";
import { FaXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { fetchDataMember } from "../services";
import { useQuery } from "@tanstack/react-query";
import { LuLogOut } from "react-icons/lu";

const navigation = [
  { name: "Topup", href: "/", current: false },
  { name: "Cek Transaction", href: "/transaction", current: false },
  { name: "Calculator MLBB", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = (props) => {
  const [scrolling, setScrolling] = useState(false);

  const logo =
    props.metadata?.find((item) => item.id === "LOGO-HEADER")?.value_ || "";

  const uniqueCode = localStorage.getItem("unique-code")
    ? localStorage.getItem("unique-code")
    : "";
  const { data: member } = useQuery({
    queryKey: ["uniqueCode", uniqueCode],
    queryFn: () => fetchDataMember(uniqueCode),
    staleTime: 21600000,
    enabled: !!uniqueCode, // Hanya fetch jika uniqueCode tidak null atau undefined
  });

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
      className={`sticky top-0 z-[100] py-2 w-full transition-all duration-300
            ${
              scrolling
                ? "bg-fourth/30 backdrop-blur-2xl"
                : "bg-fifth/20 backdrop-blur-xl"
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
          <div className="flex flex-1 items-center justify-center sm:ml-[25%] lg:ml-0 lg:justify-start">
            <div className="flex shrink-0 items-center w-20 h-14 overflow-hidden">
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
          <div className="">
            <div className="absolute inset-y-0 right-0 flex items-center gap-4 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Cek apakah user sudah login atau belum */}
              {member != null ? (
                <Menu as="div" className="relative ml-3">
                  <div className="flex gap-4">
                    <div className="hidden px-4 py-2 bg-transparent text-white ring-2 ring-sixth rounded-md md:flex items-center gap-2 hover:bg-sixth cursor-pointer transition-all duration-300">
                      <PiUserListFill className="text-sm text-white" />
                      <h1 className="text-sm text-white font-semibold">
                        {member.role}
                      </h1>
                    </div>
                    <MenuButton className="relative">
                      <div className="px-4 py-2 bg-transparent text-white ring-2 ring-sixth rounded-md flex items-center gap-2 hover:bg-sixth cursor-pointer transition-all duration-300">
                        <FaUser className="text-sm text-white" />
                        <h1 className="text-sm text-white font-semibold">
                          {member.name}
                          Wisnu
                        </h1>
                      </div>
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-[100] mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        Profile
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block lg:hidden px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        Upgrade Membership
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block lg:hidden px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        Riwayat Transaksi
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block lg:hidden px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        Riwayat Mutasi
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="flex items-center gap-3 md:hidden px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        <PiUserListFill className="text-sm" />
                        <h1 className="text-sm font-semibold">{member.role}</h1>
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="flex items-center gap-1 px-4 py-2  text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        <LuLogOut className="text-sm text-red-400" />
                        <h1 className="text-sm text-red-400 font-semibold">
                          Keluar
                        </h1>
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              ) : (
                <div className="hidden md:flex items-center gap-3">
                  <a
                    href="/login"
                    className="px-4 py-2 rounded-lg ring-2 ring-purple-300 text-purple-300 font-semibold hover:bg-third transition-all duration-300 hover:cursor-pointer hover:text-black"
                  >
                    Login
                  </a>
                  <a
                    href="/register"
                    className="px-4 py-2 ring-2 ring-purple-300 rounded-lg bg-third font-semibold hover:cursor-pointer hover:text-black"
                  >
                    Register
                  </a>
                </div>
              )}
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
            href="/login"
            className="block md:hidden rounded-md px-3 py-2 text-base text-gray-300 hover:bg-gray-700 hover:text-white font-medium"
          >
            Login
          </DisclosureButton>
          <DisclosureButton
            as="a"
            href="/register"
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
