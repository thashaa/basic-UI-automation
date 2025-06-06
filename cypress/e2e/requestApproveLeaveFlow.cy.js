describe("Request and Approve", function(){
    describe("Employee Request Leave", function(){
        it("Success Login as Employee", function(){
            //visit the website
            cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
            cy.wait(3000);
            //login as admin
            cy.get('input[placeholder="Username"]').type("rubychan");
            cy.get('input[placeholder="Password"]').type("ruby123");
            cy.get('button[type="submit"]').contains("Login").click();
            //assert it navigate to dashboard 
            cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
            cy.get(".oxd-userdropdown-name").contains("ruby chan");
        });
        it("Employee is Requesting Day Leave", function(){
            //visit the website
            cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
            cy.wait(3000);
            //login as employee
            cy.get('input[placeholder="Username"]').type("rubychan");
            cy.get('input[placeholder="Password"]').type("ruby123");
            cy.get('button[type="submit"]').contains("Login").click();
            //assert it navigate to dashboard 
            cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
            cy.get(".oxd-userdropdown-name").contains("ruby chan");

            //go to leave page 
            cy.get(".oxd-sidepanel-body").contains("Leave").click();
            cy.contains("h6", "Leave");
            cy.url().should("eq", "https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewMyLeaveList");
            
            //go to apply leave page 
            cy.get(".oxd-topbar-body").contains("Apply").click();
            
            cy.xpath('//label[text()="Leave Type"]/following::div[contains(@class, "oxd-select-text-input")][1]').click();
            cy.xpath('//div[@role="listbox"]//span[text()="CAN - Vacation"]').click();
            //select start date
            cy.xpath(`//div[@data-v-c93bdbf3 and contains(.,'From Date')]//input`).click();
            cy.get(".oxd-date-input-calendar").should("be.visible");
            cy.xpath(`//ul[@class='oxd-calendar-selector']//li[@class='oxd-calendar-selector-month']`).click();
            cy.xpath(`//*[@class='oxd-calendar-dropdown']/*[contains(.,'May')]`).click();
            //select end date
            cy.xpath(`//div[@class='oxd-calendar-date' and contains(.,'30')]`).click();
            cy.wait(2000)
            //select the end date
            cy.xpath(`//div[@data-v-c93bdbf3 and contains(.,'To Date')]//input`).click();
            cy.get(".oxd-date-input-calendar").should("be.visible");
            cy.xpath(`//ul[@class='oxd-calendar-selector']//li[@class='oxd-calendar-selector-month']`).click();
            cy.xpath(`//*[@class='oxd-calendar-dropdown']/*[contains(.,'May')]`).click();
            //select date
            cy.xpath(`//div[@class='oxd-calendar-date' and contains(.,'31')]`).click();

            // add comments 
            cy.xpath(`//div[@data-v-957b4417]//textarea`).type("short vacation");
            //click apply 
            cy.get('button[type = "submit"]').contains("Apply").click();
            cy.wait(3000)
            cy.get("#oxd-toaster_1").contains("Success").should('be.visible');
        });
        it("Admin Check and Approve the Request", function(){
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

            //navigate to leave page 
            cy.get(".oxd-sidepanel-body").contains("Leave").click();
            cy.contains("h6", "Leave");
            cy.url().should("eq", "https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList");

            //search by name 
            cy.xpath(`//div[@data-v-c93bdbf3 and contains(.,'Employee Name')]//input`).type("ruby");
            cy.get('.oxd-autocomplete-dropdown').contains('ruby chan').click()
            cy.get('button[type="submit"]').contains("Search").click();

           //assert record is shown
            cy.xpath('//div[@class="oxd-table-body"]//div[@class="oxd-table-row oxd-table-row--with-border"][1]/div[3]')
            .contains('ruby chan');

            
            cy.xpath('//button[@data-v-c423d1fa and contains(., "Approve")]').click()
            cy.wait(3000)
            cy.get("#oxd-toaster_1").contains("Success").should('be.visible');
        });
        it("Login as Employee and Check the Leave Status ", function(){
             //visit the website
            //visit the website
            cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
            cy.wait(3000);
            //login as employee
            cy.get('input[placeholder="Username"]').type("rubychan");
            cy.get('input[placeholder="Password"]').type("ruby123");
            cy.get('button[type="submit"]').contains("Login").click();
            //assert it navigate to dashboard 
            cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
            cy.get(".oxd-userdropdown-name").contains("ruby chan");

            //go to leave page 
            cy.get(".oxd-sidepanel-body").contains("Leave").click();
            cy.contains("h6", "Leave");
            cy.url().should("eq", "https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewMyLeaveList");

            //search by date 
            //select start date
            cy.xpath(`//div[@data-v-c93bdbf3 and contains(.,'From Date')]//input`).click();
            cy.get(".oxd-date-input-calendar").should("be.visible");
            cy.xpath(`//ul[@class='oxd-calendar-selector']//li[@class='oxd-calendar-selector-month']`).click();
            cy.xpath(`//*[@class='oxd-calendar-dropdown']/*[contains(.,'May')]`).click();
            //select end date
            cy.xpath(`//div[@class='oxd-calendar-date' and contains(.,'30')]`).click();
            cy.wait(2000)
            //select the end date
            cy.xpath(`//div[@data-v-c93bdbf3 and contains(.,'To Date')]//input`).click();
            cy.get(".oxd-date-input-calendar").should("be.visible");
            cy.xpath(`//ul[@class='oxd-calendar-selector']//li[@class='oxd-calendar-selector-month']`).click();
            cy.xpath(`//*[@class='oxd-calendar-dropdown']/*[contains(.,'May')]`).click();
            //select the leave date
            cy.xpath(`//div[@class='oxd-calendar-date' and contains(.,'31')]`).click();
            //search the leave 
            cy.get('button[type="submit"]').contains("Search").click();
            //assert that it is approved and the status changed to scheduled 
            cy.xpath('//div[@class="oxd-table-body"]//div[@class="oxd-table-row oxd-table-row--with-border"][1]/div[7]')
            .contains('Scheduled');
        });
        afterEach(function () {
        cy.screenshot(Cypress.currentTest.title);
        });
    })
})

