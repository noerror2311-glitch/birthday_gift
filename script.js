/* =====================================================
   SCREEN SYSTEM
===================================================== */

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {
            screen.classList.remove("active");
        });

    const target = document.getElementById(id);

    if (target) {
        target.classList.add("active");

        /* Reset scroll position whenever a scrollable page opens */
        if (
            id === "photoScreen" ||
            id === "editScreen" ||
            id === "finalVideoScreen"
        ) {
            target.scrollTop = 0;
        }
    }

    /* FLOWER TRANSITION */

    if (id === "flowerTransition") {
        startFlowerTransition();
    } else {
        stopFlowerTransition();
    }

    /* BACKGROUND MUSIC */

    if (id === "voiceScreen") {
        backgroundMusic.pause();

        console.log("Background music PAUSED");
    }

    if (
        id === "poemLoading" ||
        id === "poemScreen"
    ) {
        backgroundMusic
            .play()
            .catch(() => {
                console.log(
                    "Music requires user interaction."
                );
            });
    }
}


/* =====================================================
   BACKGROUND MUSIC
===================================================== */

const backgroundMusic =
    document.getElementById("backgroundMusic");


function startBackgroundMusic() {

    backgroundMusic.volume = 0.18;

    backgroundMusic
        .play()
        .then(() => {
            console.log(
                "Background music STARTED"
            );
        })
        .catch(() => {
            console.log(
                "Music requires user interaction."
            );
        });
}


/* =====================================================
   FIRST LETTER
===================================================== */

const firstLetter =
    document.getElementById("firstLetter");


firstLetter.addEventListener(
    "click",
    () => {

        firstLetter.classList.add("open");

        setTimeout(() => {
            showScreen("loadingScreen");
        }, 900);

        setTimeout(() => {
            showScreen("passwordScreen");
        }, 3200);

    }
);


/* =====================================================
   PASSWORD
===================================================== */

let enteredPassword = "";

const correctPassword = "1234";

const dots =
    document.querySelectorAll(
        "#passwordDots span"
    );

const passwordScreen =
    document.getElementById(
        "passwordScreen"
    );

const passwordMessage =
    document.getElementById(
        "passwordMessage"
    );


function updatePasswordDots() {

    dots.forEach(
        (dot, index) => {

            if (
                index <
                enteredPassword.length
            ) {

                dot.classList.add("filled");

            } else {

                dot.classList.remove("filled");

            }

        }
    );

}


function checkPassword() {

    if (
        enteredPassword ===
        correctPassword
    ) {

        passwordMessage.textContent =
            "unlocked ♡";

        startBackgroundMusic();

        setTimeout(() => {
            showScreen("flowerTransition");
        }, 500);

        setTimeout(() => {
            showScreen("birthdayScreen");
        }, 4100);

    } else {

        passwordMessage.textContent =
            "not quite... try again ♡";

        const wrapper =
            passwordScreen.querySelector(
                ".password-wrapper"
            );

        wrapper.classList.add("shake");

        setTimeout(() => {
            wrapper.classList.remove("shake");
        }, 500);

        enteredPassword = "";

        updatePasswordDots();
    }

}


/* =====================================================
   DIALPAD
===================================================== */

document
    .querySelectorAll(
        ".dialpad button[data-number]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                if (
                    enteredPassword.length >= 4
                ) {
                    return;
                }

                enteredPassword +=
                    button.dataset.number;

                updatePasswordDots();

                if (
                    enteredPassword.length === 4
                ) {

                    setTimeout(
                        checkPassword,
                        250
                    );

                }

            }
        );

    });


/* =====================================================
   DELETE
===================================================== */

document
    .getElementById("deleteButton")
    .addEventListener(
        "click",
        () => {

            enteredPassword =
                enteredPassword.slice(0, -1);

            updatePasswordDots();

            passwordMessage.textContent =
                "";

        }
    );


/* =====================================================
   FLOWER TRANSITION
===================================================== */

const flowerCanvas =
    document.getElementById(
        "flowerCanvas"
    );

const flowerCtx =
    flowerCanvas.getContext(
        "2d",
        {
            alpha: true
        }
    );


const flowerTypes = [
    "🌸",
    "🌷",
    "🌼",
    "🌺",
    "🌻"
];


let transitionFlowers = [];

let flowerAnimationFrame = null;

let flowerTransitionRunning = false;

let flowerTransitionStart = 0;

const TOTAL_FLOWERS = 150;


/* =====================================================
   CANVAS RESIZE
===================================================== */

function resizeFlowerCanvas() {

    const rect =
        flowerCanvas.getBoundingClientRect();

    const dpr =
        Math.min(
            window.devicePixelRatio || 1,
            1.25
        );

    flowerCanvas.width =
        Math.floor(
            rect.width * dpr
        );

    flowerCanvas.height =
        Math.floor(
            rect.height * dpr
        );

    flowerCtx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

}


window.addEventListener(
    "resize",
    () => {

        if (
            flowerTransitionRunning
        ) {
            resizeFlowerCanvas();
        }

    }
);


/* =====================================================
   RANDOM HELPERS
===================================================== */

function random(min, max) {

    return (
        Math.random() *
        (max - min) +
        min
    );

}


function randomInteger(min, max) {

    return Math.floor(
        random(min, max + 1)
    );

}


function easeInOutCubic(t) {

    return t < 0.5
        ? 4 * t * t * t
        : 1 -
          Math.pow(
              -2 * t + 2,
              3
          ) / 2;

}


/* =====================================================
   FLOWER START POSITION
===================================================== */

function getFlowerStartPosition(
    width,
    height
) {

    const side =
        randomInteger(0, 7);

    const padding =
        Math.max(
            70,
            Math.min(width, height) * 0.12
        );

    switch (side) {

        case 0:

            return {
                x: random(
                    -padding,
                    width + padding
                ),

                y: random(
                    -padding * 2,
                    -20
                )
            };

        case 1:

            return {
                x: random(
                    width + 20,
                    width + padding * 2
                ),

                y: random(
                    -padding,
                    height + padding
                )
            };

        case 2:

            return {
                x: random(
                    -padding,
                    width + padding
                ),

                y: random(
                    height + 20,
                    height + padding * 2
                )
            };

        case 3:

            return {
                x: random(
                    -padding * 2,
                    -20
                ),

                y: random(
                    -padding,
                    height + padding
                )
            };

        case 4:

            return {
                x: random(
                    -padding * 2,
                    width * 0.25
                ),

                y: random(
                    -padding * 2,
                    height * 0.25
                )
            };

        case 5:

            return {
                x: random(
                    width * 0.75,
                    width + padding * 2
                ),

                y: random(
                    -padding * 2,
                    height * 0.25
                )
            };

        case 6:

            return {
                x: random(
                    -padding * 2,
                    width * 0.25
                ),

                y: random(
                    height * 0.75,
                    height + padding * 2
                )
            };

        default:

            return {
                x: random(
                    width * 0.75,
                    width + padding * 2
                ),

                y: random(
                    height * 0.75,
                    height + padding * 2
                )
            };

    }

}


/* =====================================================
   FLOWER TARGET
===================================================== */

function getFlowerTargetPosition(
    width,
    height
) {

    const centerX =
        width / 2;

    const centerY =
        height / 2;

    const maxRadius =
        Math.sqrt(
            width * width +
            height * height
        ) * 0.48;

    const angle =
        random(
            0,
            Math.PI * 2
        );

    const radius =
        Math.pow(
            Math.random(),
            0.58
        ) *
        maxRadius;

    return {

        x:
            centerX +
            Math.cos(angle) *
            radius,

        y:
            centerY +
            Math.sin(angle) *
            radius

    };

}


/* =====================================================
   CREATE FLOWERS
===================================================== */

function createTransitionFlowers() {

    transitionFlowers = [];

    const width =
        flowerCanvas.clientWidth;

    const height =
        flowerCanvas.clientHeight;

    for (
        let i = 0;
        i < TOTAL_FLOWERS;
        i++
    ) {

        const start =
            getFlowerStartPosition(
                width,
                height
            );

        const target =
            getFlowerTargetPosition(
                width,
                height
            );

        transitionFlowers.push({

            emoji:
                flowerTypes[
                    randomInteger(
                        0,
                        flowerTypes.length - 1
                    )
                ],

            startX:
                start.x,

            startY:
                start.y,

            targetX:
                target.x,

            targetY:
                target.y,

            x:
                start.x,

            y:
                start.y,

            size:
                random(25, 47),

            rotation:
                random(
                    -Math.PI,
                    Math.PI
                ),

            rotationSpeed:
                random(
                    -0.012,
                    0.012
                ),

            delay:
                random(0, 500),

            duration:
                random(
                    2200,
                    3000
                ),

            opacity:
                random(
                    0.88,
                    1
                ),

            scale:
                0.25

        });

    }

}


/* =====================================================
   DRAW FLOWER
===================================================== */

function drawFlower(flower) {

    flowerCtx.save();

    flowerCtx.translate(
        flower.x,
        flower.y
    );

    flowerCtx.rotate(
        flower.rotation
    );

    flowerCtx.globalAlpha =
        flower.opacity;

    flowerCtx.font =
        `${flower.size * flower.scale}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;

    flowerCtx.textAlign =
        "center";

    flowerCtx.textBaseline =
        "middle";

    flowerCtx.fillText(
        flower.emoji,
        0,
        0
    );

    flowerCtx.restore();

}


/* =====================================================
   CENTER GLOW
===================================================== */

function drawCenterGlow(
    width,
    height,
    progress
) {

    const centerX =
        width / 2;

    const centerY =
        height / 2;

    const radius =
        Math.min(
            width,
            height
        ) *
        (
            0.08 +
            progress * 0.55
        );

    const gradient =
        flowerCtx.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            radius
        );

    gradient.addColorStop(
        0,
        "rgba(255,255,255,0.5)"
    );

    gradient.addColorStop(
        0.5,
        "rgba(255,240,247,0.18)"
    );

    gradient.addColorStop(
        1,
        "rgba(255,220,235,0)"
    );

    flowerCtx.fillStyle =
        gradient;

    flowerCtx.fillRect(
        0,
        0,
        width,
        height
    );

}


/* =====================================================
   ANIMATION
===================================================== */

function animateFlowerTransition(
    timestamp
) {

    if (
        !flowerTransitionRunning
    ) {
        return;
    }

    const width =
        flowerCanvas.clientWidth;

    const height =
        flowerCanvas.clientHeight;

    const elapsed =
        timestamp -
        flowerTransitionStart;

    const transitionDuration =
        3600;

    const overallProgress =
        Math.min(
            elapsed /
            transitionDuration,
            1
        );

    flowerCtx.clearRect(
        0,
        0,
        width,
        height
    );

    for (
        let i = 0;
        i < transitionFlowers.length;
        i++
    ) {

        const flower =
            transitionFlowers[i];

        const localTime =
            elapsed -
            flower.delay;

        if (
            localTime <= 0
        ) {

            flower.x =
                flower.startX;

            flower.y =
                flower.startY;

            flower.scale =
                0.25;

            drawFlower(flower);

            continue;
        }

        const progress =
            Math.min(
                localTime /
                flower.duration,
                1
            );

        const eased =
            easeInOutCubic(
                progress
            );

        flower.x =
            flower.startX +
            (
                flower.targetX -
                flower.startX
            ) *
            eased;

        flower.y =
            flower.startY +
            (
                flower.targetY -
                flower.startY
            ) *
            eased;

        flower.scale =
            0.35 +
            0.65 *
            eased;

        if (
            progress >= 1
        ) {

            const bloom =
                Math.min(
                    (
                        localTime -
                        flower.duration
                    ) / 600,
                    1
                );

            flower.scale =
                1 +
                bloom * 0.35;

        }

        flower.rotation +=
            flower.rotationSpeed;

        drawFlower(flower);

    }

    drawCenterGlow(
        width,
        height,
        overallProgress
    );

    if (
        elapsed <
        transitionDuration
    ) {

        flowerAnimationFrame =
            requestAnimationFrame(
                animateFlowerTransition
            );

    } else {

        flowerTransitionRunning =
            false;

        flowerAnimationFrame =
            null;

    }

}


/* =====================================================
   START TRANSITION
===================================================== */

function startFlowerTransition() {

    stopFlowerTransition();

    resizeFlowerCanvas();

    createTransitionFlowers();

    flowerTransitionRunning =
        true;

    flowerTransitionStart =
        performance.now();

    flowerAnimationFrame =
        requestAnimationFrame(
            animateFlowerTransition
        );

}


/* =====================================================
   STOP TRANSITION
===================================================== */

function stopFlowerTransition() {

    flowerTransitionRunning =
        false;

    if (
        flowerAnimationFrame !== null
    ) {

        cancelAnimationFrame(
            flowerAnimationFrame
        );

        flowerAnimationFrame =
            null;

    }

    if (
        flowerCanvas &&
        flowerCtx
    ) {

        flowerCtx.clearRect(
            0,
            0,
            flowerCanvas.clientWidth,
            flowerCanvas.clientHeight
        );

    }

}


/* =====================================================
   BIRTHDAY PAGE
===================================================== */

document
    .getElementById("birthdayContinue")
    .addEventListener(
        "click",
        () => {

            showScreen(
                "heartfeltScreen"
            );

        }
    );


/* =====================================================
   HEARTFELT PAGE
===================================================== */

document
    .getElementById("heartfeltContinue")
    .addEventListener(
        "click",
        () => {

            showScreen(
                "photoScreen"
            );

        }
    );


/* =====================================================
   PHOTO PAGE
===================================================== */

document
    .getElementById("photoContinue")
    .addEventListener(
        "click",
        () => {

            showScreen(
                "editScreen"
            );

        }
    );


/* =====================================================
   COLLAGE + EDIT PAGE
===================================================== */

document
    .getElementById("editContinue")
    .addEventListener(
        "click",
        () => {

            showScreen(
                "voiceLoading"
            );

            setTimeout(
                () => {

                    showScreen(
                        "voiceScreen"
                    );

                },
                2800
            );

        }
    );


/* =====================================================
   VOICE NOTE
===================================================== */

const voiceAudio =
    document.getElementById(
        "voiceAudio"
    );

const playButton =
    document.getElementById(
        "playButton"
    );

const audioProgress =
    document.getElementById(
        "audioProgress"
    );

const currentTime =
    document.getElementById(
        "currentTime"
    );

const totalTime =
    document.getElementById(
        "totalTime"
    );

const voiceStatus =
    document.getElementById(
        "voiceStatus"
    );

const voicePlayer =
    document.querySelector(
        ".voice-player"
    );

const voiceContinue =
    document.getElementById(
        "voiceContinue"
    );


function formatTime(seconds) {

    if (
        !isFinite(seconds)
    ) {

        return "0:00";

    }

    const minutes =
        Math.floor(
            seconds / 60
        );

    const remainingSeconds =
        Math.floor(
            seconds % 60
        );

    return (
        minutes +
        ":" +
        String(
            remainingSeconds
        ).padStart(
            2,
            "0"
        )
    );

}


voiceAudio.addEventListener(
    "loadedmetadata",
    () => {

        totalTime.textContent =
            formatTime(
                voiceAudio.duration
            );

    }
);


/* =====================================================
   PLAY / PAUSE
===================================================== */

playButton.addEventListener(
    "click",
    () => {

        if (
            voiceAudio.paused
        ) {

            voiceAudio
                .play()
                .then(() => {

                    playButton.textContent =
                        "Ⅱ";

                    voicePlayer.classList.add(
                        "playing"
                    );

                    voiceStatus.textContent =
                        "playing... ♡";

                })
                .catch(() => {

                    voiceStatus.textContent =
                        "unable to play audio";

                });

        } else {

            voiceAudio.pause();

            playButton.textContent =
                "▶";

            voicePlayer.classList.remove(
                "playing"
            );

            voiceStatus.textContent =
                "paused ♡";

        }

    }
);


/* =====================================================
   AUDIO PROGRESS
===================================================== */

voiceAudio.addEventListener(
    "timeupdate",
    () => {

        if (
            !voiceAudio.duration
        ) {
            return;
        }

        const progress =
            (
                voiceAudio.currentTime /
                voiceAudio.duration
            ) *
            100;

        audioProgress.value =
            progress;

        currentTime.textContent =
            formatTime(
                voiceAudio.currentTime
            );

    }
);


/* =====================================================
   DRAG PROGRESS
===================================================== */

audioProgress.addEventListener(
    "input",
    () => {

        if (
            !voiceAudio.duration
        ) {
            return;
        }

        voiceAudio.currentTime =
            (
                audioProgress.value /
                100
            ) *
            voiceAudio.duration;

    }
);


/* =====================================================
   VOICE FINISHED
===================================================== */

voiceAudio.addEventListener(
    "ended",
    () => {

        playButton.textContent =
            "▶";

        voicePlayer.classList.remove(
            "playing"
        );

        voiceStatus.textContent =
            "that was it... ♡";

        setTimeout(
            () => {

                voiceContinue.classList.remove(
                    "hidden"
                );

            },
            1000
        );

    }
);


/* =====================================================
   VOICE CONTINUE
===================================================== */

voiceContinue.addEventListener(
    "click",
    () => {

        showScreen(
            "poemLoading"
        );

        setTimeout(
            () => {

                showScreen(
                    "poemScreen"
                );

            },
            2800
        );

    }
);


/* =====================================================
   POEM CONTINUE
===================================================== */

document
    .getElementById("poemContinue")
    .addEventListener(
        "click",
        () => {

            showScreen(
                "finalLetterScreen"
            );

        }
    );


/* =====================================================
   LETTER CONTINUE
===================================================== */

document
    .getElementById("letterContinue")
    .addEventListener(
        "click",
        () => {

            showScreen(
                "finalVideoScreen"
            );

        }
    );