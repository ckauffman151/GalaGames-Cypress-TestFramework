/// <reference types="cypress" />
import GamePage from "../Page-Objects/GamesPageObject";
import StorePage from "../Page-Objects/StorePageObject";
import WaitFor from "../Page-Objects/Helpers/WaitFor";
const gamePage = new GamePage();
const storePage = new StorePage();
const waitFor = new WaitFor();

describe("Our first suite", function () {
  let testData;
  beforeEach(function () {
    cy.visit("/");
    cy.fixture("gameData").then(function (dataJson) {
      testData = dataJson;
      return testData;
    });
  });

  it("From the Store page I should be able to filter Town Star items by Epic Rarity", function () {
    cy.get('[data-cy="nav-store"]').click({ force: true });

    storePage.SelectRarityCheckbox(testData.epic_rarity).click({ force: true });

    storePage.TownStarOption.click();

    waitFor.PageToLoad();

    storePage.ResultItemCards.each(($el) => {
      expect($el).contain(testData.townStar_Game);
    });

    storePage.ResultItemCardsRarityIcon.each(($el) => {
      expect($el).to.have.attr("alt", "Epic");
    });
  });

  it("From the Store page I should be able to filter Spider Tank items by Rare Rarity", () => {
    cy.get('[data-cy="nav-store"]').click({ force: true });

    cy.get(".store-item-card", { timeout: 10000 }).should("be.visible");

    storePage.SpiderTanksGameOption.click({ force: true });

    storePage.SelectRarityCheckbox(testData.rare_rarity).click({ force: true });

    waitFor.PageToLoad();

    storePage.ResultItemCards.each(($el) => {
      expect($el).contain(testData.spiderTanks_Game);
    });

    storePage.ResultItemCardsRarityIcon.each(($el) => {
      expect($el).to.have.attr("alt", "Rare");
    });
  });

  it("From the Store page Search for an item of your choice", () => {
    cy.get('[data-cy="nav-store"]').click({ force: true });

    storePage.SearchBox.type(testData.searchItem_Georgia).click({
      force: true,
    });

    waitFor.PageToLoad();

    storePage.ResultItemCards.each(($el) => {
      expect($el).contain(testData.walkingDead_Game);
    });
  });

  it("From the Games page I should not be able to launch Town Star without being logged in", () => {
    gamePage.PlayGame(testData.townStar_Game).click({ force: true });

    cy.get(".v-form").should("contain", testData.registrationForm_Title);
  });
});

//     Automate the following scenarios in a language of your choice, please make sure to include everything we need to get your solution to run locally. Once completed please provide a link to the repository in the cloud based versioning system of your choice.
// Navigate to: https://app.gala.games/games
// From the Games page I should not be able to launch Town Star without being logged in
// From the Store page Search for an item of your choice
// From the Store page I should be able to filter Town Star items by Epic Rarity
// From the Store page I should be able to filter Spider Tank items by Rare Rarity

// cy.get(".store-item-card", { timeout: 10000 })
//   .should("be.visible")
//   .and("contain", "Home");

// cy.location("href").should(
//   "equal",
//   "https://app.gala.games/store?games=town-star"
// );
