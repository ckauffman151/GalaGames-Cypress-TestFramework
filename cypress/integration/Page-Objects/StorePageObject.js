"use strict";

class StorePageObject {
  get SearchBox() {
    let searchBox = cy.get('[placeholder="Search"]');
    return searchBox;
  }

  get RarityCheckBoxSection() {
    return 'p[class="mb-0 fs-18"]';
  }
  get CheckBoxElement() {
    return '[class="mr-2 v-simple-checkbox"]';
  }

  get TownStarOption() {
    let townStarOption = cy.get('[alt="Town Star"]');
    return townStarOption;
  }

  get SpiderTanksGameOption() {
    let spiderTanksOption = cy.get('[alt="Spider Tanks"]');
    return spiderTanksOption;
  }

  get ResultItemCards() {
    let storeItemCards = cy.get(".store-item-card");
    return storeItemCards;
  }

  get ResultItemCardsRarityIcon() {
    let rarityIcon = cy.get('.store-item-card img[class="rarity-icon"]');
    return rarityIcon;
  }

  SelectRarityCheckbox(rarityType) {
    let rarityCheckbox = cy
      .get(this.RarityCheckBoxSection)
      .contains(rarityType)
      .parent()
      .find(this.CheckBoxElement);
    return rarityCheckbox;
  }
}

export default StorePageObject;
