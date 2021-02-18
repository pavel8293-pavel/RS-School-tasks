function audioPlay(word) {
  const audio = new Audio(`../assets/audio/${word}.mp3`);
  if (Array.from(word)) {
    audio.play();
  }
}

export default audioPlay;
