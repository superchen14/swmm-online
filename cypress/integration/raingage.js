describe("RainGage Tests", function() {
  it('Click RainGage in TreeView should highlight and list all RainGages', function() {
    const rainGageTreeNode = cy.get("ul.menu-list>li>ul>a").contains("Rain Gages");
    rainGageTreeNode.click();
    rainGageTreeNode.should("have.class", "is-active");
    cy.get("#left-pane-list>.panel>a").should("not.empty");
  });
});