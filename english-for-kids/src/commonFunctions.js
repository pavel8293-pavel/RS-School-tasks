import { cards } from './cards.js';

// eslint-disable-next-line import/no-mutable-exports
let translatedWord;
function deleteCurrentCards() {
  document.querySelectorAll('.card').forEach((node) => { node.remove(); });
}

function findTranslatedWord(russianTranslation) {
  cards.forEach((topics) => {
    // eslint-disable-next-line consistent-return
    topics.forEach((elements) => {
      if (elements.word === russianTranslation) {
        translatedWord = elements.translation;
        return translatedWord;
      }
    });
  });
}

export { deleteCurrentCards, findTranslatedWord, translatedWord };
