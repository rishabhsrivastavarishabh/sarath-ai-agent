import { defineAgent } from "eve";

export default defineAgent({
  model: "inclusionAI/ling-3.0-flash-vl",
  // Context-window override so eve can compile locally without fetching the
  // AI Gateway model catalog (works offline / behind restricted networks).
  modelContextWindowTokens: 262144,
});
