beforeEach(() => {
    cy.visit("localhost:3000");
});

// The description of the test
it("login a user with email and password", () => {
    cy.get(".nav-link").contains("Login"); // The nav link text contains "Login"
    cy.get(".nav-link").contains("Login").click(); // Click on the Login nav link
    cy.get('input[name="email"]').type("sealgp1@student.op.ac.nz"); // Find the input with the name "email", then type a value
    cy.get('input[name="password"]').type("P@ssword123"); // Find the input with the name "password", then type a value
    cy.get(".btn.btn-secondary").click(); // Find the element with the class .btn.btn-secondary, then click it
    cy.wait(1500)
    cy.get("li").eq(1).get(".nav-link").contains("Logout"); // The nav link text contains "Logout"
    cy.get("li").eq(1).get(".nav-link").contains("Logout").click(); // Log the user out
});