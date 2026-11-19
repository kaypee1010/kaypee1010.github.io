/* DH Bootcamp 2026: page configuration (the only file to edit after deployment).
   api:     the Apps Script web app URL (…/exec) of backend/Code.gs deployed under aisetu@sgtuniversity.org.
            Empty = device-only mode (nothing leaves the phone). On localhost the pages use the mock at /exec.
   session: DH2026-S1 (morning) or DH2026-S2 (afternoon). Same join identity across both.
   decks:   KP Deck links shown on START_HERE.
   colab:   optional link to the Colab copy of notebook/DH_Bootcamp_Session1.ipynb (shown as the alternative). */
window.DH_CONFIG = { api: "https://script.google.com/macros/s/AKfycbwXAmhIVvcsP43T5sQefDdjqiQM7sU3EEr4DBeElUghPamwZLCtckfLigQeLLJfhJw/exec", session: "DH2026-S1", colab: "",
  decks: { s1: "https://slides.kpsingh.in/dh-bootcamp-s1", s2: "https://slides.kpsingh.in/dh-bootcamp-s2" } };
