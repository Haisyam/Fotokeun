import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTiktok,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faCameraRetro,
} from "@fortawesome/free-solid-svg-icons";

const socials = [
  { icon: faInstagram, label: "Instagram", href: "https://instagram.com" },
  { icon: faFacebook, label: "Facebook", href: "https://facebook.com" },
  { icon: faTiktok, label: "TikTok", href: "https://tiktok.com" },
  { icon: faWhatsapp, label: "WhatsApp", href: "https://wa.me/6281234567890" },
];

const quickLinks = [
  { label: "Beranda", href: "/" },
  { label: "Template", href: "/templates" },
  { label: "Photobooth", href: "/photobooth" },
  { label: "Kontak", href: "mailto:hello@fotokeun.id" },
];

const services = [
  "Pernikahan & Lamaran",
  "Wisuda & Kelulusan",
  "Corporate Gathering",
  "Ulang Tahun & Sweet Seventeen",
];

const contact = [
  {
    icon: faEnvelope,
    label: "hello@fotokeun.id",
    href: "mailto:hello@fotokeun.id",
  },
  {
    icon: faPhone,
    label: "+62 812-3456-7890",
    href: "tel:+6281234567890",
  },
  {
    icon: faLocationDot,
    label: "Majalengka, Jawa Barat",
    href: "https://maps.app.goo.gl/",
  },
];

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/90">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg">
                <FontAwesomeIcon icon={faCameraRetro} className="text-lg" />
              </span>
              <div>
                <p className="text-lg font-bold text-slate-800">Fotokeun</p>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
                  Photobooth Studio
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-500">
              Hadirkan pengalaman photobooth profesional dengan frame premium,
              timer otomatis, dan proses pencetakan digital instan untuk setiap
              momen spesial Anda.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:-translate-y-0.5 hover:bg-sky-500 hover:text-white"
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Navigasi
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("/") ? (
                    <NavLink
                      to={link.href}
                      className="transition hover:text-sky-500"
                    >
                      {link.label}
                    </NavLink>
                  ) : (
                    <a
                      href={link.href}
                      className="transition hover:text-sky-500"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Paket Populer
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {services.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Hubungi Kami
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {contact.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 transition hover:text-sky-500"
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http") ? "noreferrer" : undefined
                    }
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sky-500">
                      <FontAwesomeIcon icon={item.icon} />
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Fotokeun Photobooth. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="#" className="transition hover:text-sky-500">
              Ketentuan Layanan
            </a>
            <a href="#" className="transition hover:text-sky-500">
              Kebijakan Privasi
            </a>
            <a
              href="mailto:support@fotokeun.id"
              className="transition hover:text-sky-500"
            >
              Dukungan Pelanggan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
