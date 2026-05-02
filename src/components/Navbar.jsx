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
    `rounded-full border-[3px] border-ink px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] transition ${
      isActive
        ? "bg-yellow shadow-[4px_4px_0_0_#111111]"
        : "bg-white hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#111111]"
    }`;

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 md:px-8">
      <div className="neo-panel mx-auto flex w-full max-w-6xl items-center justify-between gap-4 bg-paper px-4 py-4 md:px-6">
        <NavLink
          to="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border-[3px] border-ink bg-pink text-ink">
            <FontAwesomeIcon icon={faCameraRetro} className="text-lg" />
          </span>
          <div className="leading-none">
            <span className="neo-display block text-lg md:text-xl">Fotokeun</span>
            <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.22em] text-ink/70">
              Browser Photobooth
            </span>
          </div>
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
          className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-ink bg-blue text-ink shadow-[4px_4px_0_0_#111111] transition md:hidden"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={open ? faXmark : faBars} className="text-lg" />
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-3 w-full max-w-6xl md:hidden">
          <nav className="neo-panel flex flex-col gap-2 bg-paper px-4 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-2xl border-[3px] border-ink px-4 py-3 text-base font-bold uppercase tracking-[0.1em] transition ${
                    isActive
                      ? "bg-yellow shadow-[4px_4px_0_0_#111111]"
                      : "bg-white hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#111111]"
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
