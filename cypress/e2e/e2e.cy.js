describe("E2E Flow", function(){
    describe("Add New Employee Flow", async function(){
        it("Success Login", function(){
            //visit the website
            cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
            cy.wait(3000);
            //login as admin
            cy.get('input[placeholder="Username"]').type("Admin");
            cy.get('input[placeholder="Password"]').type("admin123");
            cy.get('button[type="submit"]').contains("Login").click();
            //assert it navigate to dashboard 
            cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
            cy.contains("h6", "Dashboard");
        });
        it("Failed Login", function(){
             //visit the website
            cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
            cy.wait(3000);
            //login with wrong password
            cy.get('input[placeholder="Username"]').type("Admin");
            cy.get('input[placeholder="Password"]').type("admin12");
            cy.get('button[type="submit"]').contains("Login").click();
            //assert the error message
            cy.contains("p", "Invalid credentials");
        });
        it("Success Add New Employee", function(){
            //visit the website
            cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
            cy.wait(3000);
            //login as admin
            cy.get('input[placeholder="Username"]').type("Admin");
            cy.get('input[placeholder="Password"]').type("admin123");
            cy.get('button[type="submit"]').contains("Login").click();
            cy.url().should("eq", "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
            cy.contains("h6", "Dashboard");
            //add new employee
            cy.get(".oxd-sidepanel-body").contains("PIM").click();
            cy.contains("h6", "PIM");
            cy.contains("li", "Add Employee").click()
            cy.url().should("eq", "https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee")
            cy.get(".orangehrm-card-container").contains("Add Employee");
            cy.get('input[placeholder="First Name"]').type("ruby")
            cy.get('input[placeholder="Last Name"]').type("chan")
            cy.xpath("//label[text()='Employee Id']/ancestor::div[contains(@class,'oxd-input-group')]/div/input")
            .type("2000")
            cy.get('button[type="submit"]').contains("Save").click()
            //assertion
            cy.url().should("contains", "/viewPersonalDetails/empNumber/"); 
            cy.get(".orangehrm-edit-employee-name").contains("ruby chan");
        });
        it("Missing Last Name when Add New Employee", function(){
            //visit the website
            cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
            cy.wait(3000);
            //login as admin
            cy.get('input[placeholder="Username"]').type("Admin");
            cy.get('input[placeholder="Password"]').type("admin123");
            cy.get('button[type="submit"]').contains("Login").click();
            cy.url().should("eq", "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
            cy.contains("h6", "Dashboard");
            //add new employee
            cy.get(".oxd-sidepanel-body").contains("PIM").click();
            cy.contains("h6", "PIM");
            cy.contains("li", "Add Employee").click()
            cy.url().should("eq", "https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee")
            cy.get(".orangehrm-card-container").contains("Add Employee");
            cy.get('input[placeholder="First Name"]').type("ruby")
            cy.xpath("//label[text()='Employee Id']/ancestor::div[contains(@class,'oxd-input-group')]/div/input")
            .type("2000")
            cy.get('button[type="submit"]').contains("Save").click()
            //assertion error message below last name field 
            cy.get('input[name="lastName"]').parent().siblings("span.oxd-input-field-error-message")
              .should("be.visible").and("have.text", "Required");
        });
        it.only("Create Employee Account", function(){
            //visit the website
            cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
            cy.wait(3000);
            //login as admin
            cy.get('input[placeholder="Username"]').type("Admin");
            cy.get('input[placeholder="Password"]').type("admin123");
            cy.get('button[type="submit"]').contains("Login").click();
            cy.url().should("eq", "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
            cy.contains("h6", "Dashboard");
            //create employee account
            cy.get(".oxd-sidepanel-body").contains("Admin").click();
            cy.url().should("eq", "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers");
            cy.get(".oxd-topbar-header").contains("User Management")
            //go to add employee account page 
            cy.get('button[type="button"]').contains("Add").click()
            cy.url().should("eq", "https://opensource-demo.orangehrmlive.com/web/index.php/admin/saveSystemUser");
            cy.get(".orangehrm-card-container").contains("Add User");

            cy.get(".oxd-select-text-input").click();
        });
    })
})