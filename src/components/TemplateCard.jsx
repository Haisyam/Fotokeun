import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

function TemplateCard({ template, onUse }) {
  const photoCount = template.overlaySlots?.length ?? 3;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-lg shadow-sky-100/60"
    >
      <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="absolute inset-0" aria-hidden>
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.18),_transparent_60%)]" />
        </div>
        <img
          src={template.thumbnail}
          alt={`Frame ${template.name}`}
          className="relative z-[1] h-[90%] w-auto object-contain drop-shadow-xl"
          loading="lazy"
        />
        <span className="absolute left-4 top-4 z-[2] rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700 shadow">
          {template.type}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 px-5 py-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">{template.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{template.description}</p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            <FontAwesomeIcon icon={faCamera} className="text-slate-500" />
            {photoCount} Foto per sesi
          </p>
        </div>
        <div className="mt-auto">
          <button
            type="button"
            onClick={() => onUse(template)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-600"
          >
            <FontAwesomeIcon icon={faCamera} className="text-white/90" />
            Start
          </button>
        </div>
      </div>
    </motion.div>
  );
}

TemplateCard.propTypes = {
  template: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    frame: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    overlaySlots: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
  onUse: PropTypes.func.isRequired,
};

export default TemplateCard;
