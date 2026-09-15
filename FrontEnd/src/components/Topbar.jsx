import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import SearchBox from "./SearchBox";

import {
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  Sparkles,
  Menu,
  X,
  User,
  LogOut,
} from "lucide-react";

import { FaBloggerB, FaHome } from "react-icons/fa";
import { ImBlogger } from "react-icons/im";
import { MdCategory, MdOutlineRoundaboutRight } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";

import {
  RouteBlogByCategory,
  RouteIndex,
  RouteProfile,
  RouteSignIn,
  RouteAbout,
  RouteService,
  RouteProject,
  RouteBlogAdd,
  RouteBlog,
  RouteCommentsDetails,
  RouteUsers,
  RouteCategoryDetails,
  RouteBlogDetails,
  RouteBlogPage,
} from "@/helpers/RouteName";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useDispatch, useSelector } from "react-redux";

import { removeUser } from "@/redux/user/user.slice";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";

/* NAVIGATION */
const navItems = [
  {
    label: "Home",
    icon: FaHome,
    to: RouteIndex,
  },
  {
    label: "About",
    icon: MdOutlineRoundaboutRight,
    to: RouteAbout,
  },
  {
    label: "Project",
    icon: MdOutlineRoundaboutRight,
    to: RouteProject,
  },
  {
    label: "Services",
    icon: RiCustomerService2Fill,
    to: RouteService,
  },

  {
    label: "Blog",
    icon: ImBlogger,
    to: RouteBlogPage,
  },
];

export default function Topbar({ onOpenAIConsultant }) {
  const { data: categoryData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/backend/category/getall`,
    {
      method: "GET",
    },
  );

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [time, setTime] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const menuRef = useRef(null);

  /* CLOCK */
  useEffect(() => {
    const updateClock = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      );
    };

    updateClock();

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  /* SCROLL EFFECT */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* OUTSIDE CLICK */
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // ignore clicks inside Radix portaled content (dropdowns, popovers, etc.)
      if (event.target.closest("[data-radix-popper-content-wrapper]")) {
        return;
      }

      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /* LOGOUT */
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/backend/auth/logout`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        showToast(data.message || "Logout failed", "error");
        return;
      }

      dispatch(removeUser());

      showToast("Logged out successfully", "success");

      navigate(RouteIndex);
    } catch (error) {
      showToast("Something went wrong", "error");
    }
  };

  return (
    <>
      {/* TOP INFO BAR */}
      <div className="flex h-10 w-full items-center border-b border-white/[0.06] bg-transparent text-xs text-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <span className="flex items-center justify-center rounded bg-emerald-400/15 p-1">
                <Mail className="h-3 w-3 text-emerald-400" />
              </span>
              developeranarul@gmail.com
            </span>

            <span className="hidden items-center gap-1 sm:flex">
              <span className="flex items-center justify-center rounded bg-emerald-400/15 p-1">
                <MapPin className="h-3 w-3 text-emerald-400" />
              </span>
              Dhaka
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1 font-mono lg:flex">
              <span className="flex items-center justify-center rounded bg-emerald-400/15 p-1">
                <Clock className="h-3 w-3 text-emerald-400" />
              </span>

              {time}
            </span>

            <button
              onClick={onOpenAIConsultant}
              className="flex items-center gap-1 rounded border border-white/15 px-3 py-1 text-slate-300 transition hover:border-emerald-400/50 hover:text-emerald-400"
            >
              AI Advisor
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          isScrolled
            ? // ? "border-white/[0.06] bg-[#07111E]/95 py-1 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md"
              // : "border-white/[0.00] bg-[#091628]/96 py-2 backdrop-blur-sm"
              "border-white/[0.06] bg-[#07111E]/40 py-1 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md"
            : "border-white/[0.00] bg-transparent py-2"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* LOGO */}
          <Link to={RouteIndex} className="group flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-gradient-to-br from-emerald-400 to-teal-500 transition-transform duration-300 group-hover:rotate-6">
              <span className="font-display text-lg font-semibold text-[#04342C]">
                Æ
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-display text-lg font-bold tracking-tight text-white transition-colors group-hover:text-emerald-400">
                AEGIS
                <span className="font-light text-emerald-400">.ST</span>
              </span>

              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">
                Web Strategy Studio
              </span>
            </div>
          </Link>

          {/* SEARCH */}
          <div className="hidden w-[400px] md:block">
            <SearchBox />
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">
            {/* DESKTOP NAV */}
            <nav className="hidden items-center gap-6 md:flex lg:gap-8">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;

                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    className={`group relative py-1.5 text-xs font-bold uppercase tracking-wider transition-colors duration-300 ease-in-out hover:text-emerald-400 ${
                      isActive ? "text-emerald-400" : "text-slate-400"
                    }`}
                  >
                    {item.label}

                    {/* ANIMATED UNDERLINE — grows from center */}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 w-full origin-center rounded-full bg-emerald-400 transition-transform duration-300 ease-in-out ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}

              {/* CATEGORY */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-400 transition-colors duration-300 ease-in-out hover:text-emerald-400">
                  <MdCategory className="h-4 w-4" />
                  Categories
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-60 rounded-xl border border-white/[0.06] bg-[#091424] p-2 shadow-xl"
                >
                  <div className="mb-2 rounded-lg bg-white/[0.04] px-3 py-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Browse Categories
                    </p>
                  </div>

                  <div className="max-h-64 overflow-y-auto">
                    {categoryData?.categories?.map((category) => (
                      <DropdownMenuItem
                        key={category.id}
                        onSelect={() =>
                          navigate(RouteBlogByCategory(category.slug))
                        }
                        className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-emerald-400/10 hover:text-emerald-400"
                      >
                        <span className="truncate">{category.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
            {/* MOBILE SEARCH BUTTON */}
            <div className="relative md:hidden">
              <button
                onClick={() => setShowSearch((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 font-mono text-[10px] font-bold uppercase text-emerald-400"
              >
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                Search
              </button>
            </div>
            {showSearch && (
              <div className="absolute right-0 top-full z-50 w-full border border-white/[0.06] bg-[#091424] p-3 shadow-xl">
                <SearchBox />
              </div>
            )}
            {/* AUTH */}
            {!user?.isLoggedIn ? (
              <Link
                to={RouteSignIn}
                className="inline-flex items-center gap-1 rounded bg-gradient-to-r from-emerald-400 to-teal-500 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#04342C] shadow-sm transition-colors hover:from-emerald-300 hover:to-teal-400"
              >
                <User className="h-3.5 w-3.5" />
                Sign In
              </Link>
            ) : (
              <DropdownMenu>
                {/* TRIGGER */}
                <DropdownMenuTrigger className="outline-none">
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#091424] shadow-sm transition">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.user?.avatar} />
                      <AvatarFallback className="bg-emerald-400/20 text-xs text-emerald-400">
                        {user?.user?.name?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>

                    {/* <span className="hidden text-xs font-semibold text-slate-300 sm:block">
                      {user?.user?.name || "User"}
                    </span> */}
                  </div>
                </DropdownMenuTrigger>

                {/* CONTENT */}
                <DropdownMenuContent
                  align="end"
                  className="w-64 rounded-xl border border-white/[0.06] bg-[#091424] p-2 shadow-xl"
                >
                  {/* USER HEADER */}
                  <div className="mb-2 rounded-lg bg-white/[0.04] p-3">
                    <p className="text-sm font-semibold text-white">
                      {user?.user?.name}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {user?.user?.role || "Member"}
                    </p>
                  </div>

                  {/* PROFILE */}
                  <DropdownMenuItem asChild>
                    <Link
                      to={RouteProfile}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-emerald-400/10 hover:text-emerald-400"
                    >
                      <FaUser className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  {/* CREATE BLOG */}
                  <DropdownMenuItem asChild>
                    <Link
                      to={RouteBlogAdd}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-emerald-400/10 hover:text-emerald-400"
                    >
                      <FaBloggerB className="h-4 w-4" />
                      Create Blog
                    </Link>
                  </DropdownMenuItem>

                  {/* ADMIN SECTION */}
                  {user?.user?.role === "admin" && (
                    <>
                      <div className="my-2 border-t border-white/[0.06]" />

                      <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        Admin Panel
                      </p>

                      <DropdownMenuItem asChild>
                        <Link
                          to={RouteBlog}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-emerald-400/10 hover:text-emerald-400"
                        >
                          Blogs
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link
                          to={RouteCommentsDetails}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-emerald-400/10 hover:text-emerald-400"
                        >
                          Comments
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link
                          to={RouteCategoryDetails}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-emerald-400/10 hover:text-emerald-400"
                        >
                          Categories
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link
                          to={RouteUsers}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-emerald-400/10 hover:text-emerald-400"
                        >
                          Users
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  {/* DIVIDER */}
                  <div className="my-2 border-t border-white/[0.06]" />

                  {/* LOGOUT */}
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* MOBILE MENU */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="rounded-md text-slate-300 transition-all hover:bg-white/5 hover:text-emerald-400"
                aria-label="Toggle Menu"
              >
                {showMenu ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {showMenu && (
          <div
            ref={menuRef}
            className="absolute right-4 top-full w-64 rounded-lg border border-white/[0.06] bg-[#091424] p-4 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;

                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setShowMenu(false)}
                    className={`group relative flex items-center gap-2 rounded-md px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors duration-300 ease-in-out hover:bg-emerald-400/10 hover:text-emerald-400 ${
                      isActive
                        ? "bg-emerald-400/10 text-emerald-400"
                        : "text-slate-400"
                    }`}
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    {item.label}
                  </Link>
                );
              })}
              {/* CATEGORY */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 rounded-md px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-400 transition-colors duration-300 ease-in-out hover:bg-emerald-400/10 hover:text-emerald-400">
                  <MdCategory className="h-4 w-4" />
                  Categories
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-60 rounded-xl border border-white/[0.06] bg-[#091424] p-2 shadow-xl"
                >
                  <div className="mb-2 rounded-lg bg-white/[0.04] px-3 py-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Browse Categories
                    </p>
                  </div>

                  <div className="max-h-64 overflow-y-auto">
                    {categoryData?.categories?.map((category) => (
                      <DropdownMenuItem
                        key={category.id}
                        onSelect={() =>
                          navigate(RouteBlogByCategory(category.slug))
                        }
                        className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-emerald-400/10 hover:text-emerald-400"
                      >
                        <span className="truncate">{category.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
