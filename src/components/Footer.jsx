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
    <footer className="px-4 pb-8 pt-16 md:px-8">
      <div className="neo-panel mx-auto w-full max-w-6xl overflow-hidden bg-green">
        <div className="grid gap-10 px-6 py-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr] md:px-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border-[3px] border-ink bg-yellow text-ink">
                <FontAwesomeIcon icon={faCameraRetro} className="text-lg" />
              </span>
              <div>
                <p className="neo-display text-lg">Fotokeun</p>
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-ink/70">
                  Loud Frames Club
                </p>
              </div>
            </div>
            <p className="max-w-sm text-sm font-medium text-ink/80">
              Photobooth digital dengan gaya berani, frame nyentrik, dan hasil instan untuk acara yang memang tidak mau terlihat generik.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-ink bg-paper text-ink transition hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111]"
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
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-ink/70">
              Navigasi
            </h4>
            <ul className="mt-4 space-y-3 text-sm font-bold text-ink">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("/") ? (
                    <NavLink
                      to={link.href}
                      className="inline-flex rounded-full border-2 border-transparent px-2 py-1 transition hover:border-ink hover:bg-paper"
                    >
                      {link.label}
                    </NavLink>
                  ) : (
                    <a
                      href={link.href}
                      className="inline-flex rounded-full border-2 border-transparent px-2 py-1 transition hover:border-ink hover:bg-paper"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-ink/70">
              Paket Populer
            </h4>
            <ul className="mt-4 space-y-3 text-sm font-medium text-ink/80">
              {services.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-ink/70">
              Hubungi Kami
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-ink">
              {contact.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 rounded-2xl border-[3px] border-ink bg-paper px-3 py-3 font-bold transition hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111]"
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http") ? "noreferrer" : undefined
                    }
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink bg-pink text-ink">
                      <FontAwesomeIcon icon={item.icon} />
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t-[3px] border-ink bg-blue px-6 py-5 text-xs font-bold uppercase tracking-[0.12em] text-ink md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} Fotokeun Photobooth.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="#" className="transition hover:underline">
              Ketentuan Layanan
            </a>
            <a href="#" className="transition hover:underline">
              Kebijakan Privasi
            </a>
            <a
              href="mailto:support@fotokeun.id"
              className="transition hover:underline"
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
