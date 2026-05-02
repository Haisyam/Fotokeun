import frameTriptych from "../assets/frames/frame.webp";

const templates = [
  {
    id: "triptych",
    name: "Triptych Riot",
    description: "Tiga jepretan vertikal dengan ritme padat untuk hasil strip yang tajam.",
    thumbnail: frameTriptych,
    frame: frameTriptych,
    type: "Bold Cut",
    overlaySlots: [
      { x: 29, y: 108, width: 479, height: 307 },
      { x: 29, y: 541, width: 479, height: 307 },
      { x: 26, y: 974, width: 479, height: 307 },
    ],
  },
  {
    id: "acid-pop",
    name: "Acid Pop Strip",
    description: "Strip kontras tinggi yang cocok untuk acara ramai dan playful.",
    thumbnail: frameTriptych,
    frame: frameTriptych,
    type: "Party Drop",
    overlaySlots: [
      { x: 29, y: 108, width: 479, height: 307 },
      { x: 29, y: 541, width: 479, height: 307 },
      { x: 26, y: 974, width: 479, height: 307 },
    ],
  },
  {
    id: "loud-kiss",
    name: "Loud Kiss",
    description: "Komposisi manis tapi tidak jinak, cocok untuk pasangan dan bestie shots.",
    thumbnail: frameTriptych,
    frame: frameTriptych,
    type: "Sweet Noise",
    overlaySlots: [
      { x: 29, y: 108, width: 479, height: 307 },
      { x: 29, y: 541, width: 479, height: 307 },
      { x: 26, y: 974, width: 479, height: 307 },
    ],
  },
  {
    id: "night-flash",
    name: "Night Flash",
    description: "Vibe malam dengan hasil photostrip yang terasa seperti poster mini.",
    thumbnail: frameTriptych,
    frame: frameTriptych,
    type: "After Dark",
    overlaySlots: [
      { x: 29, y: 108, width: 479, height: 307 },
      { x: 29, y: 541, width: 479, height: 307 },
      { x: 26, y: 974, width: 479, height: 307 },
    ],
  },
];

export default templates;
