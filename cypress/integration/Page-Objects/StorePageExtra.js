/// <reference types="cypress" />
import GamePage from "../Page-Objects/GamePage";
const gamePage = new GamePage();

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

    // cy.get(".store-item-card", { timeout: 10000 })
    //   .should("be.visible")
    //   .and("contain", "Home");

    gamePage.EpicCheckbox();

    cy.get('p[class="mb-0 fs-18"]')
      .contains("Epic")
      .parent()
      .then((checkbox) => {
        cy.wrap(checkbox)
          .find('[class="mr-2 v-simple-checkbox"]')
          .click({ force: true });
      });

    cy.get('[alt="Town Star"]').click({ force: true });

    // cy.location("href").should(
    //   "equal",
    //   "https://app.gala.games/store?games=town-star"
    // );

    cy.intercept({
      method: "POST",
      url: "https://walletsrv.gala.games/graphql",
    }).as("apiCheck");
    cy.wait("@apiCheck").then((interception) => {
      assert.isNotNull(interception.response.body, "1st API call has data");
    });

    cy.get(".store-item-card").each(($el) => {
      //expect($el).contain("Town Star");

      expect($el).contain(testData.townStar_Game);
    });

    cy.get('.store-item-card img[class="rarity-icon"]').each(($el) => {
      expect($el).to.have.attr("alt", "Epic");
    });
  });

  it("From the Store page I should be able to filter Spider Tank items by Rare Rarity", () => {
    cy.get('[data-cy="nav-store"]').click({ force: true });

    cy.get(".store-item-card", { timeout: 10000 }).should("be.visible");

    cy.get('[alt="Spider Tanks"]').click({ force: true });
    cy.get('p[class="mb-0 fs-18"]')
      .contains("Rare")
      .parent()
      .then((checkbox) => {
        cy.wrap(checkbox)
          .find('[class="mr-2 v-simple-checkbox"]')
          .click({ force: true });
      });

    cy.intercept({
      method: "POST",
      url: "https://walletsrv.gala.games/graphql",
    }).as("apiCheck");
    cy.wait("@apiCheck").then((interception) => {
      assert.isNotNull(interception.response.body, "1st API call has data");
    });

    cy.get(".store-item-card").each(($el) => {
      expect($el).contain(testData.spiderTanks_Game);
      cy.log(testData.spiderTanks_Game);
    });

    //cy.get('.store-item-card').children().children().children().siblings('[alt]').each(($el)
    cy.get('.store-item-card img[class="rarity-icon"]').each(($el) => {
      //expect($el).to.have.class('rarity-info');
      expect($el).to.have.attr("alt", "Rare");
    });
  });

  it("From the Store page Search for an item of your choice", () => {
    cy.get('[data-cy="nav-store"]').click({ force: true });
    //cy.wait(10000);

    cy.get('[placeholder="Search"]')
      .type(testData.searchItem)
      .click({ force: true });

    cy.intercept({
      method: "POST",
      url: "https://walletsrv.gala.games/graphql",
    }).as("apiCheck");
    cy.wait("@apiCheck").then((interception) => {
      assert.isNotNull(interception.response.body, "1st API call has data");
    });

    cy.get(".store-item-card").each(($el) => {
      expect($el).contain(testData.walkingDead_Game);
    });
  });

  it("From the Games page I should not be able to launch Town Star without being logged in", () => {
    //cy.visit("/");
    //cy.wait(15000);

    cy.get('div[class="secondary mb-6 v-card v-sheet theme--dark"]')
      .contains("Town Star")
      .parent()
      .parent()
      .then((TownStarCard) => {
        cy.wrap(TownStarCard).contains("Play").click({ force: true });
      });
    cy.get(".v-form").should("contain", testData.registrationForm_Title);
  });
});

//     Automate the following scenarios in a language of your choice, please make sure to include everything we need to get your solution to run locally. Once completed please provide a link to the repository in the cloud based versioning system of your choice.
// Navigate to: https://app.gala.games/games
// From the Games page I should not be able to launch Town Star without being logged in
// From the Store page Search for an item of your choice
// From the Store page I should be able to filter Town Star items by Epic Rarity
// From the Store page I should be able to filter Spider Tank items by Rare Rarity
