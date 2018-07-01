describe("RainGage Tests", function() {
  it('Click RainGage in TreeView should highlight and list all RainGages', function() {
    const rainGageTreeNode = cy.get("ul.menu-list>li>ul>a").contains("Rain Gages");
    rainGageTreeNode.click();
    rainGageTreeNode.should("have.class", "is-active");
    cy.get("#left-pane-list>.panel>a").should("not.empty");
  });

  it("Click RainGage item in list view should hight and show properties in properties pane", function() {
    cy.get("ul.menu-list>li>ul>a").contains("Rain Gages").click();
    const rainGageItem = cy.get("#RAINGAGE-RG1");
    rainGageItem.click();
    rainGageItem.should("have.class", "is-active");

    let hash = {};
    cy.get("#swmm-property-list>tbody>tr").each($tr => {
      hash[$tr.children(".property-col").html()] = $tr.children(".value-col").html();
    }).then(() => {
      assert.equal("RG1", hash.Name);
      assert.equal("10084.21", hash.X);
      assert.equal("8210.53", hash.Y);
      assert.equal("INTENSITY", hash["Rain Format"]);
      assert.equal("1:00", hash["Time Interval"]);
      assert.equal("1", hash["Snow Catch Factor"]);
    });
  });
});