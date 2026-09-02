const invitation = document.querySelector("#invitation");
const cover = document.querySelector("#cover");
const details = document.querySelector("#details");
const openButton = document.querySelector("#open-invitation");
const music = document.querySelector("#music");
const audioButton = document.querySelector("#audio-button");
const audioIcon = document.querySelector("#audio-icon");
const audioMessage = document.querySelector("#audio-message");

let opened = false;

function setAudioFallback(needed) {
  audioButton.classList.toggle("audio-needs-tap", needed);
  audioMessage.hidden = !needed;
  audioIcon.textContent = needed ? "🔈" : music.muted ? "🔈" : "🔊";
  audioButton.setAttribute("aria-label", needed ? "Tocar a música" : music.muted ? "Ativar a música" : "Silenciar a música");
}

function startMusic() {
  music.muted = false;
  const playback = music.play();
  if (playback) {
    playback.then(() => setAudioFallback(false)).catch(() => setAudioFallback(true));
  }
}

openButton.addEventListener("click", () => {
  if (opened) return;
  opened = true;
  invitation.classList.add("is-opening");
  music.currentTime = 0;
  startMusic();
  invitation.classList.add("is-open");
  cover.setAttribute("aria-hidden", "true");
  details.setAttribute("aria-hidden", "false");
});

audioButton.addEventListener("click", () => {
  if (music.paused) {
    startMusic();
    return;
  }

  music.muted = !music.muted;
  setAudioFallback(false);
});
