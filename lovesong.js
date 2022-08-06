let a = {
    color: 'rgba(28, 121, 228, 1)',
    next: 0,
    notes: [
      { duration: 3, delay: 4.2 },
      { duration: 3, delay: 12.2 },
      { duration: 3, delay: 20.4 },
      { duration: 3, delay: 28.1 },
      { duration: 3, delay: 35.5 },
      { duration: 3, delay: 39.5 },
      { duration: 3, delay: 43.5 },
      { duration: 3, delay: 47.4 },
      { duration: 3, delay: 49.5 },
      { duration: 3, delay: 52 }
    ]
  };

  let s = {
    color: 'rgba(254, 45, 87, 1)',
    next: 0,
    notes: [
      { duration: 3, delay: 4.2 },
      { duration: 3, delay: 12.2 },
      { duration: 3, delay: 20.4 },
      { duration: 3, delay: 28.1 },
      { duration: 3, delay: 35.5 },
      { duration: 3, delay: 39.5 },
      { duration: 3, delay: 43.5 },
      { duration: 3, delay: 47.4 },
      { duration: 3, delay: 49.5 },
      { duration: 3, delay: 52 }
    ]
  };

  let c = {
    color: 'rgba(48, 241, 9, 0.652)',
    next: 0,
    notes: [
      { duration: 3, delay: 4.2 },
      { duration: 3, delay: 12.2 },
      { duration: 3, delay: 20.4 },
      { duration: 3, delay: 28.1 },
      { duration: 3, delay: 35.5 },
      { duration: 3, delay: 39.5 },
      { duration: 3, delay: 43.5 },
      { duration: 3, delay: 47.4 },
      { duration: 3, delay: 49.5 },
      { duration: 3, delay: 52 }
    ]
  };

  let n = {
    color: 'rgba(198, 13, 227, 0.8)',
    next: 0,
    notes: [
      { duration: 3, delay: 4.2 },
      { duration: 3, delay: 12.2 },
      { duration: 3, delay: 20.4 },
      { duration: 3, delay: 28.1 },
      { duration: 3, delay: 35.5 },
      { duration: 3, delay: 39.5 },
      { duration: 3, delay: 43.5 },
      { duration: 3, delay: 47.4 },
      { duration: 3, delay: 49.5 },
      { duration: 3, delay: 52 }
    ]
  };

  let k = {
    color: 'rgba(250, 205, 4, 0.968)',
    next: 0,
    notes: [
      { duration: 3, delay: 4.2 },
      { duration: 3, delay: 12.2 },
      { duration: 3, delay: 20.4 },
      { duration: 3, delay: 28.1 },
      { duration: 3, delay: 35.5 },
      { duration: 3, delay: 39.5 },
      { duration: 3, delay: 43.5 },
      { duration: 3, delay: 47.4 },
      { duration: 3, delay: 49.5 },
      { duration: 3, delay: 52 }
    ]
  };

  let l = {
    color: 'rgba(240, 128, 60, 1)',
    next: 0,
    notes: [
      { duration: 3, delay: 4.2 },
      { duration: 3, delay: 12.2 },
      { duration: 3, delay: 20.4 },
      { duration: 3, delay: 28.1 },
      { duration: 3, delay: 35.5 },
      { duration: 3, delay: 39.5 },
      { duration: 3, delay: 43.5 },
      { duration: 3, delay: 47.4 },
      { duration: 3, delay: 49.5 },
      { duration: 3, delay: 52 }
    ]
  };
  
  let audio = new Audio("Love_Song-1.mp3")

  let song = {
    duration: 93,
    audio,
    sheet: [a, s, c, n, k, l]
  };