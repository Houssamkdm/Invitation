/* =====================================================
   LOCALISATION GOOGLE MAPS
===================================================== */

const LOCATION_URL =
"https://www.google.com/maps/search/?api=1&query=Salle+des+f%C3%AAtes+BELKACEMI+Boudouaou+El+Bahri";


/* =====================================================
   MUSIQUE
===================================================== */

const MUSIC_URL =
"audio/ca_y_est_ca_y_est_jour_j_clip_de_mariage_by_fk_photography_rabia.mp3";


/* =====================================================
   DATE DU MARIAGE
===================================================== */

const WEDDING_DATE =
new Date("2026-10-30T11:00:00+01:00");


/* =====================================================
   OUVERTURE DE L'INVITATION
===================================================== */

const cover =
document.getElementById("cover");

const invitation =
document.getElementById("invitation");

const openEnvelope =
document.getElementById("openEnvelope");


openEnvelope.addEventListener(
  "click",
  () => {

    cover.classList.add("open");

    invitation.classList.add("visible");

    document.body.style.overflowY = "auto";


    setTimeout(
      () => {

        cover.style.display = "none";

        window.scrollTo({
          top:0,
          behavior:"smooth"
        });

      },
      1000
    );

  }
);



/* =====================================================
   LOCALISATION GOOGLE MAPS
===================================================== */

document
  .getElementById("locationButton")
  .href = LOCATION_URL;



/* =====================================================
   MUSIQUE
===================================================== */

const audio =
document.getElementById("weddingMusic");


const musicButton =
document.getElementById("musicButton");


const muteButton =
document.getElementById("muteButton");


const progress =
document.getElementById("musicProgress");


const repeatButton =
document.getElementById("repeatButton");


const shuffleButton =
document.getElementById("shuffleButton");


const prevButton =
document.getElementById("prevButton");


const nextButton =
document.getElementById("nextButton");


audio.src = MUSIC_URL;


let repeatEnabled = false;

let shuffleEnabled = false;



/* =====================================================
   ICONE PLAY / PAUSE
===================================================== */

function setPlayIcon(playing) {


  const icon =
  document.getElementById("playIcon");


  if (playing) {


    icon.innerHTML = `

      <circle
        cx="12"
        cy="12"
        r="11"
        fill="var(--cream)"
      />

      <rect
        x="8"
        y="7"
        width="3"
        height="10"
        rx="1"
        fill="#4a0508"
      />

      <rect
        x="13"
        y="7"
        width="3"
        height="10"
        rx="1"
        fill="#4a0508"
      />

    `;


  } else {


    icon.innerHTML = `

      <circle
        cx="12"
        cy="12"
        r="11"
        fill="var(--cream)"
      />

      <path
        d="M10 7.5v9l7-4.5-7-4.5z"
        fill="#4a0508"
      />

    `;

  }

}



/* =====================================================
   PLAY / PAUSE
===================================================== */

musicButton.addEventListener(
  "click",
  async () => {

    try {


      if (audio.paused) {


        await audio.play();


        setPlayIcon(true);


        musicButton.setAttribute(
          "aria-label",
          "Mettre en pause"
        );


        musicButton.title =
        "Pause";


      } else {


        audio.pause();


        setPlayIcon(false);


        musicButton.setAttribute(
          "aria-label",
          "Jouer la musique"
        );


        musicButton.title =
        "Play";

      }


    } catch(error) {


      console.error(error);


      alert(
        "Impossible de lire la musique. Vérifiez que « "
        + MUSIC_URL
        + " » est bien dans le dossier audio/."
      );

    }

  }
);



/* =====================================================
   MUTE / UNMUTE
===================================================== */

muteButton.addEventListener(
  "click",
  () => {


    audio.muted =
    !audio.muted;


    const icon =
    document.getElementById("muteIcon");


    if (audio.muted) {


      icon.innerHTML = `

        <path
          d="M4 9v6h4l5 4V5L8 9H4z"
          fill="currentColor"
        />

        <path
          d="m16 9 5 6M21 9l-5 6"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />

      `;


      muteButton.setAttribute(
        "aria-label",
        "Rétablir le son"
      );


      muteButton.title =
      "Unmute";


    } else {


      icon.innerHTML = `

        <path
          d="M4 9v6h4l5 4V5L8 9H4z"
          fill="currentColor"
        />

        <path
          d="M16 9c1.8 1.7 1.8 4.3 0 6"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />

      `;


      muteButton.setAttribute(
        "aria-label",
        "Couper le son"
      );


      muteButton.title =
      "Mute";

    }

  }
);



/* =====================================================
   BARRE DE PROGRESSION
===================================================== */

audio.addEventListener(
  "timeupdate",
  () => {


    if (!audio.duration)
      return;


    const value =
      (
        audio.currentTime /
        audio.duration
      ) * 100;


    progress.value =
    value;


    progress.style.setProperty(
      "--progress",
      value + "%"
    );

  }
);


progress.addEventListener(
  "input",
  () => {


    if (!audio.duration)
      return;


    audio.currentTime =
      (
        progress.value /
        100
      ) * audio.duration;


    progress.style.setProperty(
      "--progress",
      progress.value + "%"
    );

  }
);



/* =====================================================
   REPEAT
===================================================== */

repeatButton.addEventListener(
  "click",
  () => {


    repeatEnabled =
    !repeatEnabled;


    audio.loop =
    repeatEnabled;


    repeatButton.setAttribute(
      "aria-label",

      repeatEnabled
        ? "Répétition activée"
        : "Répétition désactivée"
    );


    repeatButton.style.opacity =
    repeatEnabled ? "1" : ".72";

  }
);



/* =====================================================
   SHUFFLE
===================================================== */

shuffleButton.addEventListener(
  "click",
  () => {


    shuffleEnabled =
    !shuffleEnabled;


    shuffleButton.setAttribute(
      "aria-label",

      shuffleEnabled
        ? "Lecture aléatoire activée"
        : "Lecture aléatoire désactivée"
    );


    shuffleButton.style.opacity =
    shuffleEnabled ? "1" : ".72";

  }
);



/* =====================================================
   PREVIOUS / NEXT
===================================================== */

function restartTrack() {


  audio.currentTime = 0;


  if (audio.paused) {


    audio.play()

      .then(
        () => setPlayIcon(true)
      )

      .catch(
        () => {}
      );

  }

}


prevButton.addEventListener(
  "click",
  restartTrack
);


nextButton.addEventListener(
  "click",
  restartTrack
);



/* =====================================================
   FIN DE LA MUSIQUE
===================================================== */

audio.addEventListener(
  "ended",
  () => {


    setPlayIcon(false);


    progress.value =
    0;


    progress.style.setProperty(
      "--progress",
      "0%"
    );


    if (shuffleEnabled) {

      restartTrack();

    }

  }
);



/* =====================================================
   COMPTE À REBOURS
===================================================== */

const targetDate =
new Date(
  "2026-10-30T00:00:00"
).getTime();



function updateCountdown() {


  const now =
  new Date().getTime();


  const distance =
  targetDate - now;



  if (distance <= 0) {


    document.querySelector(
      ".countdown-container"
    ).innerHTML = `

      <div
        class="countdown-title"
        style="font-size:25px;"
      >

        ❤️ C'EST LE GRAND JOUR ❤️

      </div>

    `;


    return;

  }



  const days =
  Math.floor(
    distance /
    (
      1000 *
      60 *
      60 *
      24
    )
  );



  const hours =
  Math.floor(

    (
      distance %
      (
        1000 *
        60 *
        60 *
        24
      )
    )
    /
    (
      1000 *
      60 *
      60
    )

  );



  const minutes =
  Math.floor(

    (
      distance %
      (
        1000 *
        60 *
        60
      )
    )
    /
    (
      1000 *
      60
    )

  );



  const seconds =
  Math.floor(

    (
      distance %
      (
        1000 *
        60
      )
    )
    /
    1000

  );



  document
    .getElementById("days")
    .innerText =
    String(days)
    .padStart(2,"0");



  document
    .getElementById("hours")
    .innerText =
    String(hours)
    .padStart(2,"0");



  document
    .getElementById("minutes")
    .innerText =
    String(minutes)
    .padStart(2,"0");



  document
    .getElementById("seconds")
    .innerText =
    String(seconds)
    .padStart(2,"0");

}



updateCountdown();


setInterval(
  updateCountdown,
  1000
);
