describe("General Tests", function() {
  it('Visit swmm-online.github.io', function() {
    assert.isNotNull(cy.get("#swmm-online"));
    assert.isNotNull(cy.get("#swmm-app"));
    assert.isNotNull(cy.get("#swmm-header"));
    assert.isNotNull(cy.get("#swmm-body"));
    assert.isNotNull(cy.get("#swmm-body #left-pane"));
    assert.isNotNull(cy.get("#swmm-body #left-pane #left-pane-treeview"));
    assert.isNotNull(cy.get("#swmm-body #left-pane #left-pane-search"));
    assert.isNotNull(cy.get("#swmm-body #left-pane #left-pane-list"));
    assert.isNotNull(cy.get("#swmm-body #main-pane"));
    assert.isNotNull(cy.get("#swmm-body #right-pane"));
  });
});