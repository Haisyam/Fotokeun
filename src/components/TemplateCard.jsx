import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

function TemplateCard({ template, onUse }) {
  const photoCount = template.overlaySlots?.length ?? 3;

  return (
    <motion.div
      whileHover={{ y: -8, rotate: -1 }}
      whileTap={{ scale: 0.98, rotate: 0 }}
      initial={{ opacity: 0, y: 20, rotate: -2 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="neo-panel flex h-full flex-col overflow-hidden bg-paper"
    >
      <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden border-b-[3px] border-ink bg-pink">
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute -left-10 top-5 h-28 w-28 rounded-full border-[3px] border-ink bg-yellow" />
          <div className="absolute bottom-5 right-5 h-16 w-32 rotate-12 border-[3px] border-ink bg-blue" />
        </div>
        <img
          src={template.thumbnail}
          alt={`Frame ${template.name}`}
          className="relative z-[1] h-[90%] w-auto object-contain drop-shadow-[6px_6px_0_rgba(17,17,17,0.35)]"
          loading="lazy"
        />
        <span className="absolute left-4 top-4 z-[2] rounded-full border-2 border-ink bg-paper px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-ink">
          {template.type}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 px-5 py-6">
        <div>
          <h3 className="neo-display text-xl leading-tight">{template.name}</h3>
          <p className="mt-2 text-sm font-medium text-ink/75">{template.description}</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-yellow px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-ink">
            <FontAwesomeIcon icon={faCamera} className="text-ink" />
            {photoCount} Foto per sesi
          </p>
        </div>
        <div className="mt-auto">
          <button
            type="button"
            onClick={() => onUse(template)}
            className="neo-button flex w-full items-center justify-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-[0.12em]"
          >
            <FontAwesomeIcon icon={faCamera} className="text-ink" />
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
