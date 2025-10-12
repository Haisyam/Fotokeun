import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { to: "/", label: "Beranda" },
  { to: "/templates", label: "Template" },
  { to: "/photobooth", label: "Photobooth" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
      isActive ? "bg-sky-500 text-white" : "text-slate-600 hover:text-sky-600"
    }`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 shadow-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <NavLink to="/" className="flex items-center gap-2 font-bold text-sky-600">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg">
            <FontAwesomeIcon icon={faCameraRetro} className="text-lg" />
          </span>
          <span className="text-lg md:text-xl">Fotokeun</span>
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === "/"}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-md transition md:hidden"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={open ? faXmark : faBars} className="text-lg" />
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white/90 md:hidden">
          <nav className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-3 md:px-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-base font-semibold transition ${
                    isActive
                      ? "bg-sky-500/90 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`
                }
                end={item.to === "/"}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
