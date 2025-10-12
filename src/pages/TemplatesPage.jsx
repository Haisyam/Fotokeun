import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TemplateCard from "../components/TemplateCard.jsx";

function TemplatesPage({ templates }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleUseTemplate = (template) => {
    const params = new URLSearchParams({ template: template.id });
    navigate(`/photobooth?${params.toString()}`);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-14 md:px-8">
      {location.state?.message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-8 rounded-2xl border border-sky-200 bg-sky-50 px-5 py-4 text-sm font-semibold text-sky-700 shadow-sm shadow-sky-100"
        >
          {location.state.message}
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto mb-16 max-w-3xl text-center"
      >
        <span className="inline-flex items-center justify-center rounded-full bg-sky-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
          Pilih Frame favoritmu
        </span>
        <h2 className="mt-6 text-3xl font-bold text-slate-900 md:text-5xl">Template Photobooth Premium</h2>
        <p className="mt-4 text-base text-slate-500 md:text-lg">
          Kami menyiapkan koleksi frame terbaik untuk memastikan setiap foto tampil maksimal. Pilih tema sesuai acara, dan langsung gunakan di photobooth.
        </p>
      </motion.div>

      <motion.div
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} onUse={handleUseTemplate} />
        ))}
      </motion.div>
    </div>
  );
}

TemplatesPage.propTypes = {
  templates: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
};

export default TemplatesPage;
