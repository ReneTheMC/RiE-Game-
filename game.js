let isHolding = {
    a: false,
    s: false,
    c: false,
    ' ': false,
    n: false,
    k: false,
    l: false
   };
   
   let hits = { perfect: 0, good: 0, bad: 0, miss: 0 };
   let multiplier = {
    perfect: 1,
    good: 0.8,
    bad: 0.5,
    miss: 0,
    combo40: 1.05,
    combo80: 1.10
   };
   let isPlaying = false;
   let speed = 0;
   let combo = 0;
   let maxCombo = 0;
   let score = 0;
   let animation = 'moveDown';
   let startTime;
   let trackContainer;
   let tracks;
   let keypress;
   let comboText;
   
   let initializeNotes = function () {
    let noteElement;
    let trackElement;
   
    while (trackContainer.hasChildNodes()) {
    trackContainer.removeChild(trackContainer.lastChild);
    }
   
    song.sheet.forEach(function (key, index) {
    trackElement = document.createElement('div');
    trackElement.classList.add('track');
   
    key.notes.forEach(function (note) {
    noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.classList.add('note--' + index);
    noteElement.style.backgroundColor = key.color;
    noteElement.style.animationName = animation;
    noteElement.style.animationTimingFunction = 'linear';
    noteElement.style.animationDuration = note.duration - speed + 's';
    noteElement.style.animationDelay = note.delay + speed + 's';
    noteElement.style.animationPlayState = 'paused';
    trackElement.appendChild(noteElement);
    });
   
    trackContainer.appendChild(trackElement);
    tracks = document.querySelectorAll('.track');
    });
   };
   
   let setupSpeed = function () {
    let buttons = document.querySelectorAll('.btn--small');
   
    buttons.forEach(function (button) {
    button.addEventListener('click', function () {
    if (this.innerHTML === '1x') {
    buttons[0].className = 'btn btn--small btn--selected';
    buttons[1].className = 'btn btn--small';
    buttons[2].className = 'btn btn--small';
    speed = parseInt(this.innerHTML) - 1;
    } else if (this.innerHTML === '2x') {
    buttons[0].className = 'btn btn--small';
    buttons[1].className = 'btn btn--small btn--selected';
    buttons[2].className = 'btn btn--small';
    speed = parseInt(this.innerHTML) - 1;
    } else if (this.innerHTML === '3x') {
    buttons[0].className = 'btn btn--small';
    buttons[1].className = 'btn btn--small';
    buttons[2].className = 'btn btn--small btn--selected';
    speed = parseInt(this.innerHTML) - 1;
    }
   
    initializeNotes();
    });
    });
   };
   
   let setupChallenge = function () {
    let enabled = false;
    let challenge = document.querySelector('.config__challenge');
    challenge.addEventListener('click', function (event) {
    if (enabled) {
    event.target.className = 'btn btn--small';
    enabled = false;
    } else {
    event.target.className = 'btn btn--small btn--selected';
    enabled = true;
    updateAnimation();
    }
    });
   };
   
   let updateAnimation = function () {
    animation = 'moveDownFade';
    initializeNotes();
   };
   
   let setupStartButton = function () {
    let startButton = document.querySelector('.btn--start');
    startButton.addEventListener('click', function () {
    isPlaying = true;
    startTime = Date.now();
   
    startTimer(song.duration);
    document.querySelector('.menu').style.opacity = 0;
    document.querySelector('.song').play();
    document.querySelectorAll('.note').forEach(function (note) {
    note.style.animationPlayState = 'running';
    });
    });
   };
   
   let startTimer = function (duration) {
    let display = document.querySelector('.summary__timer');
    let timer = duration;
    let minutes;
    let seconds;
   
    display.style.display = 'block';
    display.style.opacity = 1;
   
    let songDurationInterval = setInterval(function () {
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    display.innerHTML = minutes + ':' + seconds;
   
    if (--timer < 0) {
    clearInterval(songDurationInterval);
    showResult();
    comboText.style.transition = 'all 1s';
    comboText.style.opacity = 0;
    }
    }, 1000);
   };
   
   let showResult = function () {
    document.querySelector('.perfect-count').innerHTML = hits.perfect;
    document.querySelector('.good-count').innerHTML = hits.good;
    document.querySelector('.bad-count').innerHTML = hits.bad;
    document.querySelector('.miss-count').innerHTML = hits.miss;
    document.querySelector('.combo-count').innerHTML = maxCombo;
    document.querySelector('.score-count').innerHTML = score;
    document.querySelector('.summary-timer').style.opacity = 0;
    document.querySelector('.summary-result').style.opacity = 1;
   };
   
   let setupNoteMiss = function () {
    trackContainer.addEventListener('animationend', function (event) {
    let index = event.target.classList.item(1)[6];
   
    displayAccuracy('miss');
    updateHits('miss');
    updateCombo('miss');
    updateMaxCombo();
    removeNoteFromTrack(event.target.parentNode, event.target);
    updateNext(index);
    });
   };
   
   /**
    * Allows keys to be only pressed one time. Prevents keydown event
    * from being handled multiple times while held down.
    */
   let setupKeys = function () {
    document.addEventListener('keydown', function (event) {
    let keyIndex = getKeyIndex(event.key);
   
    if (Object.keys(isHolding).indexOf(event.key) !== -1
    && !isHolding[event.key]) {
    isHolding[event.key] = true;
    keypress[keyIndex].style.display = 'block';
   
    if (isPlaying && tracks[keyIndex].firstChild) {
    judge(keyIndex);
    }
    }
    });
   
    document.addEventListener('keyup', function (event) {
    if (Object.keys(isHolding).indexOf(event.key) !== -1) {
    let keyIndex = getKeyIndex(event.key);
    isHolding[event.key] = false;
    keypress[keyIndex].style.display = 'none';
    }
    });
   };
   
   let getKeyIndex = function (key) {
    if (key === 's') {
    return 0;
    } else if (key === 'd') {
    return 1;
    } else if (key === 'f') {
    return 2;
    } else if (key === ' ') {
    return 3;
    } else if (key === 'j') {
    return 4;
    } else if (key === 'k') {
    return 5;
    } else if (key === 'l') {
    return 6;
    }
   };
   
   let judge = function (index) {
    let timeInSecond = (Date.now() - startTime) / 1000;
    let nextNoteIndex = song.sheet[index].next;
    let nextNote = song.sheet[index].notes[nextNoteIndex];
    let perfectTime = nextNote.duration + nextNote.delay;
    let accuracy = Math.abs(timeInSecond - perfectTime);
    let hitJudgement;
   
    /**
    * As long as the note has travelled less than 3/4 of the height of
    * the track, any key press on this track will be ignored.
    */
    if (accuracy > (nextNote.duration - speed) / 4) {
    return;
    }
   
    hitJudgement = getHitJudgement(accuracy);
    displayAccuracy(hitJudgement);
    showHitEffect(index);
    updateHits(hitJudgement);
    updateCombo(hitJudgement);
    updateMaxCombo();
    calculateScore(hitJudgement);
    removeNoteFromTrack(tracks[index], tracks[index].firstChild);
    updateNext(index);
   };
   
   let getHitJudgement = function (accuracy) {
    if (accuracy < 0.1) {
    return 'perfect';
    } else if (accuracy < 0.2) {
    return 'good';
    } else if (accuracy < 0.3) {
    return 'bad';
    } else {
    return 'miss';
    }
   };
   
   let displayAccuracy = function (accuracy) {
    let accuracyText = document.createElement('div');
    document.querySelector('.hit__accuracy').remove();
    accuracyText.classList.add('hit__accuracy');
    accuracyText.classList.add('hit__accuracy--' + accuracy);
    accuracyText.innerHTML = accuracy;
    document.querySelector('.hit').appendChild(accuracyText);
   };
   
   let showHitEffect = function (index) {
    let key = document.querySelectorAll('.key')[index];
    let hitEffect = document.createElement('div');
    hitEffect.classList.add('key__hit');
    key.appendChild(hitEffect);
   };
   
   let updateHits = function (judgement) {
    hits[judgement]++;
   };
   
   let updateCombo = function (judgement) {
    if (judgement === 'bad' || judgement === 'miss') {
    combo = 0;
    comboText.innerHTML = '';
    } else {
    comboText.innerHTML = ++combo;
    }
   };
   
   let updateMaxCombo = function () {
    maxCombo = maxCombo > combo ? maxCombo : combo;
   };
   
   let calculateScore = function (judgement) {
    if (combo >= 80) {
    score += 1000 * multiplier[judgement] * multiplier.combo80;
    } else if (combo >= 40) {
    score += 1000 * multiplier[judgement] * multiplier.combo40;
    } else {
    score += 1000 * multiplier[judgement];
    }
   };
   
   let removeNoteFromTrack = function (parent, child) {
    parent.removeChild(child);
   };
   
   let updateNext = function (index) {
    song.sheet[index].next++;
   };
   
   window.onload = function () {
    trackContainer = document.querySelector('.track-container');
    keypress = document.querySelectorAll('.keypress');
    comboText = document.querySelector('.hit-combo');

    initializeNotes();
    setupSpeed();
    setupChallenge();
    setupStartButton();
    setupKeys();
    setupNoteMiss();
   }