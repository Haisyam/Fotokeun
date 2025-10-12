import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faLayerGroup, faHandPointer } from "@fortawesome/free-solid-svg-icons";

const features = [
  {
    icon: faBolt,
    title: "Auto Shoot",
    description: "Hitung mundur otomatis dengan hasil foto tajam dan konsisten.",
  },
  {
    icon: faLayerGroup,
    title: "Berbagai Template",
    description: "Puluhan desain frame profesional untuk setiap acara spesial.",
  },
  {
    icon: faHandPointer,
    title: "Mudah Digunakan",
    description: "Antarmuka intuitif, tinggal klik dan senyummu langsung terabadikan.",
  },
];

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden">
      <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-sky-100 blur-3xl" aria-hidden />
      <div className="absolute -bottom-24 left-0 hidden h-96 w-96 rounded-full bg-indigo-100 blur-3xl md:block" aria-hidden />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-24 px-4 pb-24 pt-16 md:px-8 md:pb-32">
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center"
        >
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-sm">
              Photobooth Profesional
            </span>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
              Abadikan Momenmu dengan <span className="text-sky-600">Fotokeun</span> Photobooth!
            </h1>
            <p className="text-base text-slate-500 md:text-lg">
              Solusi photobooth digital modern untuk membuat acara Anda lebih berkesan. Pilih frame, atur timer, dan biarkan Fotokeun mengambil foto terbaik tanpa ribet.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigate("/templates")}
                className="rounded-3xl bg-sky-500 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-xl shadow-sky-200 transition hover:-translate-y-0.5 hover:bg-sky-600"
              >
                Mulai Sekarang
              </button>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <div className="flex -space-x-2">
                  {[0, 1, 2].map((idx) => (
                    <span
                      key={idx}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-sky-400 to-blue-500 text-xs font-semibold text-white shadow"
                    >
                      {idx === 0 ? "A" : idx === 1 ? "B" : "C"}
                    </span>
                  ))}
                </div>
                <span>
                  Dipercaya untuk pesta, wisuda, pernikahan, dan lebih banyak lagi.
                </span>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative mx-auto flex w-full max-w-md items-center justify-center"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-sky-100">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 opacity-90" aria-hidden />
              <div className="relative flex h-full flex-col items-center justify-center gap-6 px-8">
                <span className="rounded-full bg-sky-500/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                  Live Preview
                </span>
                <div className="h-32 w-32 rounded-[2rem] bg-white/10 backdrop-blur">
                  <div className="flex h-full w-full items-center justify-center rounded-[2rem] border border-white/20 text-4xl text-white">
                    📸
                  </div>
                </div>
                <p className="text-center text-base font-semibold text-white/80">
                  Kontrol photobooth langsung dari browser. Tidak ada software tambahan.
                </p>
              </div>
            </div>
            <div className="absolute -left-6 top-6 hidden rounded-3xl border bg-white/90 px-6 py-4 shadow-xl shadow-sky-100 md:block">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Rata-rata sesi</p>
              <p className="text-3xl font-bold text-slate-900">120+</p>
              <p className="text-xs text-slate-400">foto per acara</p>
            </div>
            <div className="absolute -right-4 bottom-12 hidden rounded-2xl bg-white px-5 py-4 shadow-xl shadow-sky-100 md:block">
              <p className="text-xs font-semibold text-slate-400">Integrasi kamera profesional</p>
              <p className="text-sm font-semibold text-slate-700">Supports DSLR & Webcam</p>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-[2.5rem] border border-slate-200/70 bg-white/80 p-10 shadow-xl shadow-slate-200/40"
        >
          <div className="grid gap-10 md:grid-cols-3">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.4 }}
                className="flex flex-col gap-4 rounded-3xl bg-gradient-to-br from-sky-50/60 to-white/70 p-6 shadow-inner shadow-white"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-500">
                  <FontAwesomeIcon icon={feature.icon} className="text-lg" />
                </span>
                <h3 className="text-lg font-semibold text-slate-800">{feature.title}</h3>
                <p className="text-sm text-slate-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default LandingPage;
