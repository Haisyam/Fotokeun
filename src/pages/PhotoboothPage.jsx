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

  if (!selectedTemplate) {
    return null;
  }

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
    startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [startCamera]);

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
                height: (height * 0.8) / capturedPhotos.length - width * 0.04,
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

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-24 pt-14 md:px-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-500 shadow hover:text-slate-700"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Kembali
      </button>

      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Studio Photobooth
            </h2>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
              Template: {selectedTemplate?.name ?? "-"}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative overflow-hidden rounded-md border border-slate-200 bg-slate-900 text-white shadow-2xl"
          >
            <div className="aspect-video w-full rounded-md overflow-hidden bg-black">
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
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  key={countdown}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 text-center text-6xl font-bold text-white"
                >
                  {countdown}
                </motion.div>
              )}
            </AnimatePresence>
            {!cameraReady && !error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/70 text-center text-sm text-white/80">
                <span className="animate-pulse text-lg font-semibold">
                  Menyiapkan kamera…
                </span>
                <span>Berikan izin akses kamera pada browser Anda.</span>
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 px-6 text-center text-sm text-red-100">
                {error}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/60"
          >
            <h3 className="text-lg font-semibold text-slate-800">Foto Sesi</h3>
            {photos.length === 0 ? (
              <p className="mt-4 text-sm text-slate-500">
                Setiap jepretan akan muncul di sini sebelum digabung dengan frame.
              </p>
            ) : (
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {Array.from({ length: MAX_SHOTS }).map((_, index) => (
                  <div
                    key={`capture-${index}`}
                    className="flex aspect-[16/9] items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-slate-50"
                  >
                    {photos[index] ? (
                      <img
                        src={photos[index]}
                        alt={`Foto sesi ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
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
          className="flex flex-col gap-8"
        >
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
            <h3 className="text-lg font-semibold text-slate-800">
              Pengaturan Sesi
            </h3>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-slate-500">
                Timer
                <select
                  value={timer}
                  onChange={(event) => setTimer(Number(event.target.value))}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                >
                  {timerOptions.map((option) => (
                    <option key={option} value={option}>
                      {option} detik
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex flex-col gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
                <span>Jumlah Foto</span>
                <span className="text-base font-semibold text-slate-700">
                  {MAX_SHOTS} Foto
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleStartCapture}
              disabled={!cameraReady || isCapturing}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <FontAwesomeIcon icon={faCamera} /> Mulai Foto
            </button>
            <p className="mt-3 text-xs text-slate-400">
              Pastikan perangkat berada di ruangan terang dan stabil untuk hasil
              terbaik.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
            <h3 className="text-lg font-semibold text-slate-800">
              Preview Hasil
            </h3>
            {!finalImage ? (
              <p className="mt-4 text-sm text-slate-500">
                Ambil tiga foto untuk menghasilkan komposit akhir dengan frame
                {" "}
                {selectedTemplate?.name}.
              </p>
            ) : (
              <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
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
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <FontAwesomeIcon icon={faDownload} /> Download Foto
            </button>
            {!finalImage && (
              <p className="mt-3 text-xs text-slate-400">
                Tombol download aktif setelah tiga foto selesai dan komposit siap.
              </p>
            )}
          </div>
        </motion.div>
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
