describe("E2E Flow", function(){
    describe("Add New Employee Flow", function(){
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
            cy.get('input[name="firstName"]').type("ruby")
            cy.get('input[placeholder="Last Name"]').type("chan")
            cy.xpath("//label[text()='Employee Id']/ancestor::div[contains(@class,'oxd-input-group')]/div/input")
            .type("2000")
            cy.get('button[type="submit"]').contains("Save").click()
            //assertion
            cy.wait(5000);
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
            cy.get('input[name="firstName"]').type("ruby")
            cy.xpath("//label[text()='Employee Id']/ancestor::div[contains(@class,'oxd-input-group')]/div/input")
            .type("2000")
            cy.get('button[type="submit"]').contains("Save").click()
            //assertion error message below last name field 
            cy.get('input[name="lastName"]').parent().siblings("span.oxd-input-field-error-message")
              .should("be.visible").and("have.text", "Required");
        });
        it("Success Create Employee Account", function(){
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

            //choose user role
            cy.xpath('//label[text()="User Role"]/following::div[contains(@class, "oxd-select-text-input")][1]').click();
            cy.xpath('//div[@role="listbox"]//span[text()="ESS"]').click();
            cy.xpath('//label[text()="User Role"]/following::div[contains(@class, "oxd-select-text-input")][1]')
              .should('contain.text', 'ESS');

            //choose status
            cy.xpath('//label[text()="Status"]/following::div[contains(@class, "oxd-select-text-input")][1]').click();
            cy.xpath('//div[@role="listbox"]//span[text()="Enabled"]').click();
            cy.xpath('//label[text()="Status"]/following::div[contains(@class, "oxd-select-text-input")][1]')
              .should('contain.text', 'Enabled');

            //choose employee
            cy.xpath('//label[text()="Employee Name"]/following::input[1]').type("ruby chan");
            cy.get('.oxd-autocomplete-dropdown').contains('ruby chan').click();
            //create username
            cy.xpath('//label[text()="Username"]/following::input[1]').type("rubychan");
            
            //password and confirm password
            cy.xpath('//label[text()="Password"]/following::input[1]').type("ruby123");
            cy.xpath('//label[text()="Confirm Password"]/following::input[1]').type("ruby123");
            cy.get('button[type="submit"]').contains("Save").click()
            cy.wait(3000)
            cy.get("#oxd-toaster_1").contains("Success").should('be.visible');
        });
        it("Create Un-existed Employee Account", function(){
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

            //choose user role
            cy.xpath('//label[text()="User Role"]/following::div[contains(@class, "oxd-select-text-input")][1]').click();
            cy.xpath('//div[@role="listbox"]//span[text()="ESS"]').click();
            cy.xpath('//label[text()="User Role"]/following::div[contains(@class, "oxd-select-text-input")][1]')
              .should('contain.text', 'ESS');

            //choose status
            cy.xpath('//label[text()="Status"]/following::div[contains(@class, "oxd-select-text-input")][1]').click();
            cy.xpath('//div[@role="listbox"]//span[text()="Enabled"]').click();
            cy.xpath('//label[text()="Status"]/following::div[contains(@class, "oxd-select-text-input")][1]')
              .should('contain.text', 'Enabled');

            //choose employee
            cy.xpath('//label[text()="Employee Name"]/following::input[1]').type("ruby choo");
            cy.xpath('//label[text()="Username"]/following::input[1]').type("rubychoo");
            
            //password and confirm password
            cy.xpath('//label[text()="Password"]/following::input[1]').type("choo123");
            cy.xpath('//label[text()="Confirm Password"]/following::input[1]').type("choo123");
            cy.get('.oxd-input-field-error-message').should('contain.text', 'Invalid');
            cy.get('button[type="submit"]').contains("Save").click()
            cy.wait(3000)
            cy.get("#oxd-toaster_1").should('not.be.visible');

        });

        afterEach(function () {
        cy.screenshot(Cypress.currentTest.title);
        });
    });

    describe.only("Add Leave Balance for New Employee Flow", function(){
        it("Success Login as Admin", function(){
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
        it("Success Add Leave Balance for New Employee", function(){
            //visit the website
            cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
            cy.wait(3000);
            //login as admin
            cy.get('input[placeholder="Username"]').type("Admin");
            cy.get('input[placeholder="Password"]').type("admin123");
            cy.get('button[type="submit"]').contains("Login").click();
            cy.url().should("eq", "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
            cy.contains("h6", "Dashboard");
            //go to add leave balance page
            cy.get(".oxd-sidepanel-body").contains("Leave").click();
            cy.contains("h6", "Leave");
            cy.contains("li", "Entitlements").click();
            cy.get(".oxd-dropdown-menu").contains("Add Entitlements").click();
            cy.url().should("eq", "https://opensource-demo.orangehrmlive.com/web/index.php/leave/addLeaveEntitlement");
            cy.get(".orangehrm-card-container").contains("Add Leave Entitlement");
            //add leave balance for individual record
            cy.get('input[type="radio"][value="0"]').should('be.checked');
            //fill the employee name
            cy.get('input[placeholder="Type for hints..."]').type("ruby");
            cy.get('.oxd-autocomplete-dropdown').contains('ruby chan').click();
            //choose the leave type
            cy.xpath('//label[text()="Leave Type"]/following::div[contains(@class, "oxd-select-text-input")][1]').click();
            cy.xpath('//div[@role="listbox"]//span[text()="CAN - Vacation"]').click();
            //choose the leave period
            cy.xpath('//label[text()="Leave Period"]/following::div[contains(@class, "oxd-select-text-input")][1]').click();
            cy.xpath('//div[@role="listbox"]//span[text()="2025-01-01 - 2026-27-01"]').click();
            //input the amount of entitlement days
            cy.xpath('//label[text()="Entitlement"]/following::input[1]').type("12");
            //click save
            cy.get('button[type="submit"]').contains("Save").click()
            //assert the pop up dialog is appear
            cy.get(".oxd-dialog-container-default--inner").should("be.visible")
            //confirm the pop up dialog
            cy.get('button[type= "button"]').contains("Confirm").click();
            //assert the success toaster is visible
            cy.get("#oxd-toaster_1").should('be.visible');
        });
        it("Add Leave Balance for Un-existed Employee", function(){
            //visit the website
            cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
            cy.wait(3000);
            //login as admin
            cy.get('input[placeholder="Username"]').type("Admin");
            cy.get('input[placeholder="Password"]').type("admin123");
            cy.get('button[type="submit"]').contains("Login").click();
            cy.url().should("eq", "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
            cy.contains("h6", "Dashboard");
            //go to add leave balance page
            cy.get(".oxd-sidepanel-body").contains("Leave").click();
            cy.contains("h6", "Leave");
            cy.contains("li", "Entitlements").click();
            cy.get(".oxd-dropdown-menu").contains("Add Entitlements").click();
            cy.url().should("eq", "https://opensource-demo.orangehrmlive.com/web/index.php/leave/addLeaveEntitlement");
            cy.get(".orangehrm-card-container").contains("Add Leave Entitlement");
            //add leave balance for individual record
            cy.get('input[type="radio"][value="0"]').should('be.checked');
            //fill the employee name
            cy.get('input[placeholder="Type for hints..."]').type("subyy");
            //choose the leave type
            cy.xpath('//label[text()="Leave Type"]/following::div[contains(@class, "oxd-select-text-input")][1]').click();
            cy.xpath('//div[@role="listbox"]//span[text()="CAN - Vacation"]').click();
            //choose the leave period
            cy.xpath('//label[text()="Leave Period"]/following::div[contains(@class, "oxd-select-text-input")][1]').click();
            cy.xpath('//div[@role="listbox"]//span[text()="2025-01-01 - 2026-27-01"]').click();
            //input the amount of entitlement days
            cy.xpath('//label[text()="Entitlement"]/following::input[1]').type("12");
            //click save
            cy.get('button[type="submit"]').contains("Save").click()
             //assert the error message below employee name field
            cy.contains('span.oxd-input-field-error-message', 'Invalid');
            
        });
        afterEach(function () {
        cy.screenshot(Cypress.currentTest.title);
        });

    });
})