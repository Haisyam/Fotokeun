import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faLayerGroup,
  faHandPointer,
} from "@fortawesome/free-solid-svg-icons";

const features = [
  {
    icon: faBolt,
    title: "Auto Shoot",
    description: "Hitung mundur otomatis dengan hasil yang konsisten dan cepat.",
  },
  {
    icon: faLayerGroup,
    title: "Template Loud",
    description: "Frame tegas dengan placement yang langsung terlihat di hasil cetak.",
  },
  {
    icon: faHandPointer,
    title: "Super Simple",
    description: "Tinggal pilih frame, izinkan kamera, lalu mulai sesi tanpa setup ribet.",
  },
];

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden px-4 pb-24 pt-10 md:px-8 md:pb-32">
      <div
        className="absolute left-4 top-24 h-24 w-24 rotate-12 border-[3px] border-ink bg-yellow md:h-32 md:w-32"
        aria-hidden
      />
      <div
        className="absolute bottom-16 right-6 h-16 w-32 -rotate-12 rounded-full border-[3px] border-ink bg-pink md:h-24 md:w-44"
        aria-hidden
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-14">
        <motion.section
          initial={{ opacity: 0, y: 40, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center"
        >
          <div className="neo-panel bg-paper px-6 py-8 md:px-8 md:py-10">
            <span className="neo-tag inline-flex items-center gap-2 bg-yellow text-ink">
              Photobooth Neobrutal
            </span>
            <h1 className="neo-display mt-6 text-5xl md:text-7xl">
              Bikin Foto Acara Yang Tidak Kalem.
            </h1>
            <p className="mt-5 max-w-2xl text-base font-medium text-ink/80 md:text-lg">
              Fotokeun mengubah browser jadi photobooth digital yang keras,
              playful, dan siap tampil menonjol di pesta, wisuda, pernikahan,
              atau booth brand activation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigate("/templates")}
                className="neo-button bg-paper px-8 py-3 text-sm font-bold uppercase tracking-[0.14em]"
              >
                Pilih Frame
              </button>
              <div className="relative">
                <span className="absolute -right-3 -top-4 rotate-6 rounded-full border-[3px] border-ink bg-red px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-ink shadow-[4px_4px_0_0_#111111]">
                  Start Here
                </span>
                <button
                  type="button"
                  onClick={() => navigate("/photobooth")}
                  className="neo-button neo-display relative min-h-[84px] min-w-[280px] rotate-[-2deg] bg-blue px-10 py-5 text-2xl tracking-[0.04em] shadow-[10px_10px_0_0_#111111] hover:-translate-y-1 hover:shadow-[14px_14px_0_0_#111111] md:min-h-[96px] md:min-w-[340px] md:text-3xl"
                >
                  Mulai Photobooth
                </button>
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="neo-panel-tight -rotate-1 bg-pink px-4 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink/70">
                  Sesi Cepat
                </p>
                <p className="mt-2 text-3xl font-bold">3 Shot</p>
              </div>
              <div className="neo-panel-tight rotate-1 bg-blue px-4 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink/70">
                  Frame Vibe
                </p>
                <p className="mt-2 text-3xl font-bold">Loud</p>
              </div>
              <div className="neo-panel-tight -rotate-1 bg-green px-4 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink/70">
                  Output
                </p>
                <p className="mt-2 text-3xl font-bold">Instant</p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative mx-auto flex w-full max-w-xl items-center justify-center"
          >
            <div className="neo-panel relative aspect-[4/5] w-full overflow-hidden bg-yellow p-5">
              <div className="absolute right-4 top-4 rounded-full border-[3px] border-ink bg-paper px-3 py-1 text-xs font-bold uppercase tracking-[0.16em]">
                Live Preview
              </div>
              <div className="grid h-full gap-4 md:grid-cols-[0.9fr_1.1fr]">
                <div className="neo-panel-tight flex flex-col justify-between bg-paper p-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/70">
                      Mode
                    </p>
                    <p className="neo-display mt-2 text-3xl">Auto Shoot</p>
                  </div>
                  <div className="space-y-2 text-sm font-bold uppercase tracking-[0.12em]">
                    <div className="rounded-full border-2 border-ink bg-pink px-3 py-2">
                      Timer brutal
                    </div>
                    <div className="rounded-full border-2 border-ink bg-blue px-3 py-2">
                      Frame punchy
                    </div>
                    <div className="rounded-full border-2 border-ink bg-green px-3 py-2">
                      Download cepat
                    </div>
                  </div>
                </div>
                <div className="neo-dash relative flex min-h-[320px] flex-col items-center justify-center bg-orange p-6">
                  <div className="flex h-40 w-full max-w-[220px] items-center justify-center rounded-[2rem] border-[3px] border-ink bg-paper">
                    <span className="neo-display text-6xl">SNAP</span>
                  </div>
                  <p className="mt-5 max-w-[240px] text-center text-sm font-bold uppercase tracking-[0.12em] text-ink/75">
                    Kontrol photobooth langsung dari browser tanpa aplikasi
                    tambahan.
                  </p>
                </div>
              </div>
            </div>
            <div className="neo-panel-tight absolute -left-4 top-8 hidden -rotate-6 bg-paper px-5 py-4 md:block">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
                Rata-rata sesi
              </p>
              <p className="neo-display mt-2 text-3xl">120+</p>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink/70">
                foto per acara
              </p>
            </div>
            <div className="neo-panel-tight absolute -bottom-4 right-0 hidden rotate-6 bg-pink px-5 py-4 md:block">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
                Kamera
              </p>
              <p className="text-sm font-bold uppercase tracking-[0.1em]">
                Webcam & DSLR
              </p>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="neo-panel bg-paper p-6 md:p-10"
        >
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="neo-tag inline-flex bg-green">Kenapa beda</span>
              <h2 className="neo-display mt-4 text-3xl md:text-5xl">
                Tidak dibuat untuk terlihat aman.
              </h2>
            </div>
            <p className="max-w-xl text-sm font-medium text-ink/75 md:text-base">
              Referensi visualnya bukan dashboard generik. Arah desainnya tebal,
              playful, dan langsung kebaca dari jauh.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.4 }}
                className="neo-panel-tight flex flex-col gap-4 bg-paper p-6"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border-[3px] border-ink bg-yellow text-ink">
                  <FontAwesomeIcon icon={feature.icon} className="text-lg" />
                </span>
                <h3 className="neo-display text-2xl">{feature.title}</h3>
                <p className="text-sm font-medium text-ink/75">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default LandingPage;
