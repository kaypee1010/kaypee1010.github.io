/* DH Bootcamp 2026: page configuration (the only file to edit after deployment).
   ONE-LINE SWITCH: DH_USE picks the backend.
     "aisetu"   = the AI-SETU Sheet under aisetu@sgtuniversity.org (full join: name, roll, programme, semester, nickname)
     "personal" = the fallback on KP's personal Google account (nickname + roll number only; deploy.md section 1b)
   session: DH2026-S1 (morning) or DH2026-S2 (afternoon). Same join identity across both.
   decks:   KP Deck links shown on START_HERE. colab: optional Colab copy of the notebook.
   On localhost the pages use the local mock at /exec instead. */
var DH_USE = "aisetu";
var DH_BACKENDS = {
  aisetu: "https://script.google.com/macros/s/AKfycbwXAmhIVvcsP43T5sQefDdjqiQM7sU3EEr4DBeElUghPamwZLCtckfLigQeLLJfhJw/exec",
  personal: ""
};
window.DH_CONFIG = { api: DH_BACKENDS[DH_USE] || "", lite: DH_USE === "personal", session: "DH2026-S1", colab: "",
  decks: { s1: "https://slides.kpsingh.in/dh-bootcamp-s1", s2: "https://slides.kpsingh.in/dh-bootcamp-s2" },
  /* step 2 switches (each new behaviour can be turned off here):
     REVEAL_LOCK: Session 2 Human-or-AI cards stay shut on the projector until 🔓 Reveal (false = tap any time, as before) */
  REVEAL_LOCK: true };
