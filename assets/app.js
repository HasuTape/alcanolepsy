import { firebaseConfig } from "./firebase-config.js";

const elVersion = document.getElementById("version-info");
const elLink = document.getElementById("download-link");
const elHint = document.getElementById("download-hint");

function hasConfig(cfg) {
  return (
    cfg &&
    typeof cfg === "object" &&
    Object.values(cfg).filter(Boolean).length >= 3 &&
    cfg.projectId
  );
}

async function loadLatest() {
  if (!hasConfig(firebaseConfig)) {
    elVersion.textContent = "Brak konfiguracji Firebase na stronie (uzupełnij assets/firebase-config.js).";
    elHint.textContent =
      "Alternatywnie: ustaw w Firestore appConfig/update pole downloadUrl i podaj je na stronie ręcznie.";
    return;
  }

  try {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js");
    const { getFirestore, doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js");

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const snap = await getDoc(doc(db, "appConfig", "update"));
    const data = snap.exists() ? snap.data() : null;

    const code = (data?.requiredVersionCode ?? 0) | 0;
    const name = data?.requiredVersionName ?? null;
    const url = data?.downloadUrl ?? null;

    if (!url) {
      elVersion.textContent = `Brak ustawionego downloadUrl w appConfig/update (requiredVersionCode: ${code}).`;
      return;
    }

    elVersion.textContent = `Najnowsza wersja: ${name ?? "-"} (${code})`;
    elLink.href = url;
    elLink.style.display = "inline-block";
  } catch (e) {
    elVersion.textContent = `Nie udało się pobrać info o aktualizacji: ${e?.message ?? e}`;
  }
}

loadLatest();

