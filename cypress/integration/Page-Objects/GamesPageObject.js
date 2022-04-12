"Use Strict";

class GamesPageObject {
  PlayGame(game) {
    let gameChoice = cy
      .get('div[class="secondary mb-6 v-card v-sheet theme--dark"]')
      .contains(game)
      .parents()
      .contains("Play");
    return gameChoice;
  }
}

export default GamesPageObject;
