import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCamera,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

const timerOptions = [3, 5, 10];
const MAX_SHOTS = 3;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function PhotoboothPage({ templates }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [timer, setTimer] = useState(timerOptions[0]);
  const [photos, setPhotos] = useState([]);
  const [finalImage, setFinalImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [error, setError] = useState(null);

  const templateId = searchParams.get("template");

  const selectedTemplate = useMemo(
    () => templates.find((item) => item.id === templateId),
    [templates, templateId]
  );

  useEffect(() => {
    if (!selectedTemplate) {
      navigate("/templates", {
        replace: true,
        state: {
          message: "Pilih template terlebih dahulu untuk membuka photobooth.",
        },
      });
    }
  }, [navigate, selectedTemplate]);

  const startCamera = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Perangkat tidak mendukung akses kamera via browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        streamRef.current = stream;
        setCameraReady(true);
        setError(null);
      }
    } catch (err) {
      setError("Gagal mengakses kamera. Pastikan izin kamera diaktifkan.");
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (!selectedTemplate) return undefined;

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [selectedTemplate, startCamera]);

  const captureFrame = useCallback(() => {
    const video = videoRef.current;
    if (!video) return null;

    const width = video.videoWidth;
    const height = video.videoHeight;
    if (!width || !height) return null;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    return canvas.toDataURL("image/png");
  }, []);

  const composeWithFrame = useCallback(
    async (capturedPhotos) => {
      if (!selectedTemplate || capturedPhotos.length === 0) {
        setFinalImage(null);
        return;
      }

      const loadImage = (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });

      try {
        const overlay = await loadImage(selectedTemplate.frame);
        const width = overlay.naturalWidth || overlay.width;
        const height = overlay.naturalHeight || overlay.height;

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);

        const slots =
          selectedTemplate.overlaySlots &&
          selectedTemplate.overlaySlots.length > 0
            ? selectedTemplate.overlaySlots
            : Array.from({ length: capturedPhotos.length }, (_, index) => ({
                x: width * 0.1,
                y:
                  width * 0.1 +
                  index * ((height * 0.8) / capturedPhotos.length),
                width: width * 0.8,
                height:
                  (height * 0.8) / capturedPhotos.length - width * 0.04,
              }));

        const usableCount = Math.min(slots.length, capturedPhotos.length);

        for (let index = 0; index < usableCount; index += 1) {
          const captured = await loadImage(capturedPhotos[index]);
          const slot = slots[index];
          const scale = Math.max(
            slot.width / captured.width,
            slot.height / captured.height
          );
          const drawWidth = captured.width * scale;
          const drawHeight = captured.height * scale;
          const offsetX = slot.x + (slot.width - drawWidth) / 2;
          const offsetY = slot.y + (slot.height - drawHeight) / 2;
          ctx.drawImage(captured, offsetX, offsetY, drawWidth, drawHeight);
        }

        ctx.drawImage(overlay, 0, 0, width, height);
        setFinalImage(canvas.toDataURL("image/png"));
      } catch (err) {
        console.error(err);
        setError("Gagal menggabungkan foto dengan frame.");
      }
    },
    [selectedTemplate]
  );

  const handleStartCapture = useCallback(async () => {
    if (!cameraReady || isCapturing) return;

    const video = videoRef.current;
    if (!video || !video.videoWidth) {
      setError("Kamera belum siap. Coba lagi dalam beberapa detik.");
      return;
    }

    if (!selectedTemplate) return;

    setIsCapturing(true);
    setPhotos([]);
    setFinalImage(null);
    setError(null);

    const captures = [];
    const countdownValue = Number(timer);

    for (let index = 0; index < MAX_SHOTS; index += 1) {
      for (let remaining = countdownValue; remaining > 0; remaining -= 1) {
        setCountdown(remaining);
        await wait(1000);
      }

      setCountdown(`Foto ${index + 1}/${MAX_SHOTS}`);
      await wait(200);

      const frame = captureFrame();
      if (frame) {
        captures.push(frame);
        setPhotos((prev) => {
          const next = [...prev];
          next[index] = frame;
          return next;
        });
      }

      if (index < MAX_SHOTS - 1) {
        await wait(400);
      }
    }

    setCountdown(null);
    setPhotos(captures);
    setIsCapturing(false);
    await composeWithFrame(captures);
  }, [
    cameraReady,
    captureFrame,
    composeWithFrame,
    isCapturing,
    selectedTemplate,
    timer,
  ]);

  const handleDownload = () => {
    if (!finalImage) return;
    const link = document.createElement("a");
    link.href = finalImage;
    link.download = `fotokeun-${selectedTemplate?.id ?? "frame"}.png`;
    link.click();
  };

  if (!selectedTemplate) {
    return null;
  }

  return (
    <div className="px-4 pb-24 pt-10 md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="neo-button flex w-fit items-center gap-2 bg-paper px-5 py-2.5 text-sm font-bold uppercase tracking-[0.12em]"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Kembali
        </button>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <div className="neo-panel bg-paper px-6 py-7 md:px-8">
              <span className="neo-tag inline-flex bg-pink">Studio live</span>
              <h2 className="neo-display mt-5 text-4xl md:text-6xl">
                Siap hitung mundur dan jepret.
              </h2>
              <p className="mt-4 text-sm font-bold uppercase tracking-[0.18em] text-ink/70">
                Template: {selectedTemplate.name}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="neo-panel relative overflow-hidden bg-yellow p-4"
            >
              <div className="aspect-video w-full overflow-hidden rounded-[1.25rem] border-[3px] border-ink bg-black">
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className="h-full w-full object-cover"
                />
              </div>
              <AnimatePresence mode="wait">
                {countdown && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    key={countdown}
                    className="absolute inset-4 flex items-center justify-center rounded-[1.25rem] border-[3px] border-ink bg-paper/85 text-center text-5xl font-black uppercase md:text-7xl"
                  >
                    {countdown}
                  </motion.div>
                )}
              </AnimatePresence>
              {!cameraReady && !error && (
                <div className="absolute inset-4 flex flex-col items-center justify-center gap-3 rounded-[1.25rem] border-[3px] border-ink bg-paper/90 px-6 text-center text-sm font-bold uppercase tracking-[0.12em] text-ink/80">
                  <span className="neo-display text-2xl md:text-4xl">
                    Menyiapkan kamera
                  </span>
                  <span>Berikan izin akses kamera pada browser Anda.</span>
                </div>
              )}
              {error && (
                <div className="absolute inset-4 flex items-center justify-center rounded-[1.25rem] border-[3px] border-ink bg-red px-6 text-center text-sm font-bold uppercase tracking-[0.1em] text-ink">
                  {error}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
              className="neo-panel bg-paper p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="neo-display text-2xl">Foto Sesi</h3>
                <span className="neo-tag bg-green">3 frame</span>
              </div>
              {photos.length === 0 ? (
                <div className="neo-dash mt-4 bg-paper px-4 py-8 text-center text-sm font-bold uppercase tracking-[0.12em] text-ink/70">
                  Jepretanmu akan muncul di sini.
                </div>
              ) : (
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {Array.from({ length: MAX_SHOTS }).map((_, index) => (
                    <div
                      key={`capture-${index}`}
                      className="neo-panel-tight flex aspect-[16/9] items-center justify-center overflow-hidden bg-paper"
                    >
                      {photos[index] ? (
                        <img
                          src={photos[index]}
                          alt={`Foto sesi ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="neo-display text-3xl text-ink/40">
                          {index + 1}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="neo-panel bg-blue p-6">
              <h3 className="neo-display text-3xl">Pengaturan</h3>
              <div className="mt-6 grid gap-5">
                <label className="flex flex-col gap-2 text-sm font-bold uppercase tracking-[0.12em] text-ink/75">
                  Timer
                  <select
                    value={timer}
                    onChange={(event) => setTimer(Number(event.target.value))}
                    className="neo-input px-4 py-3 text-base font-bold text-ink outline-none"
                  >
                    {timerOptions.map((option) => (
                      <option key={option} value={option}>
                        {option} detik
                      </option>
                    ))}
                  </select>
                </label>
                <div className="neo-panel-tight bg-paper px-4 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/70">
                    Jumlah Foto
                  </p>
                  <p className="neo-display mt-2 text-3xl">{MAX_SHOTS}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleStartCapture}
                disabled={!cameraReady || isCapturing}
                className="neo-button mt-6 flex w-full items-center justify-center gap-2 bg-yellow px-6 py-3 text-sm font-bold uppercase tracking-[0.12em]"
              >
                <FontAwesomeIcon icon={faCamera} />
                {isCapturing ? "Sedang mengambil foto" : "Mulai Foto"}
              </button>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-ink/70">
                Ruangan terang dan posisi stabil akan memberi hasil terbaik.
              </p>
            </div>

            <div className="neo-panel bg-paper p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="neo-display text-3xl">Preview</h3>
                <span className="neo-tag bg-orange">
                  {finalImage ? "Ready" : "Pending"}
                </span>
              </div>
              {!finalImage ? (
                <div className="neo-dash mt-4 bg-paper px-4 py-10 text-center text-sm font-bold uppercase tracking-[0.12em] text-ink/70">
                  Ambil tiga foto untuk menghasilkan komposit akhir dengan frame{" "}
                  {selectedTemplate.name}.
                </div>
              ) : (
                <div className="neo-panel-tight mt-4 overflow-hidden bg-paper">
                  <img
                    src={finalImage}
                    alt="Hasil photobooth"
                    className="w-full object-contain"
                  />
                </div>
              )}

              <button
                type="button"
                onClick={handleDownload}
                disabled={!finalImage}
                className="neo-button mt-6 flex w-full items-center justify-center gap-2 bg-green px-6 py-3 text-sm font-bold uppercase tracking-[0.12em]"
              >
                <FontAwesomeIcon icon={faDownload} />
                Download Foto
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

PhotoboothPage.propTypes = {
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

export default PhotoboothPage;
