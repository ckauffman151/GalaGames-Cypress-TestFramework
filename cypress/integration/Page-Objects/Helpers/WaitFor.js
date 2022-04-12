"Use Strict";

class WaitFor {
  PageToLoad() {
    cy.intercept({
      method: "POST",
      url: "https://walletsrv.gala.games/graphql",
    }).as("apiCheck");
    cy.wait("@apiCheck").then((interception) => {
      assert.isNotNull(interception.response.body, "1st API call has data");
    });
  }
}

export default WaitFor;
