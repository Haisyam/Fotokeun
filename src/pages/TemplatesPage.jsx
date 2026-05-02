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
    <div className="px-4 pb-24 pt-10 md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        {location.state?.message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="neo-panel-tight bg-orange px-5 py-4 text-sm font-bold uppercase tracking-[0.12em] text-ink"
          >
            {location.state.message}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="neo-panel bg-paper px-6 py-8 md:px-8 md:py-10"
        >
          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <div>
              <span className="neo-tag inline-flex bg-blue">Pilih dulu</span>
              <h2 className="neo-display mt-5 text-4xl md:text-6xl">
                Template yang memang ingin dilihat orang.
              </h2>
              <p className="mt-4 max-w-3xl text-base font-medium text-ink/80 md:text-lg">
                Bukan frame lembut dan aman. Pilih komposisi yang tebal,
                kontras, dan siap bikin hasil photostrip terasa seperti objek
                cetak yang punya karakter.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
              <div className="neo-panel-tight -rotate-1 bg-yellow px-4 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/70">
                  Total koleksi
                </p>
                <p className="neo-display mt-2 text-3xl">{templates.length}</p>
              </div>
              <div className="neo-panel-tight rotate-1 bg-pink px-4 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/70">
                  Output
                </p>
                <p className="neo-display mt-2 text-3xl">PNG</p>
              </div>
            </div>
          </div>
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
            <TemplateCard
              key={template.id}
              template={template}
              onUse={handleUseTemplate}
            />
          ))}
        </motion.div>
      </div>
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
