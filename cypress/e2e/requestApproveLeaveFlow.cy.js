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
        it.only("Employee is Requesting Day Leave", function(){
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

            //go to leave page 
            cy.get(".oxd-sidepanel-body").contains("Leave").click();
            cy.contains("h6", "Leave");
            cy.url().should("eq", "https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewMyLeaveList");
            
            //go to apply leave page 
            cy.get(".oxd-topbar-body").contains("Apply").click();
            
            cy.xpath('//label[text()="Leave Type"]/following::div[contains(@class, "oxd-select-text-input")][1]').click();
            cy.xpath('//div[@role="listbox"]//span[text()="CAN - Vacation"]').click();
            //select date
            cy.xpath(`//div[@data-v-c93bdbf3 and contains(.,'From Date')]//input`).click();
            cy.get(".oxd-date-input-calendar").should("be.visible");
            cy.xpath(`//ul[@class='oxd-calendar-selector']//li[@class='oxd-calendar-selector-month']`).click();
            cy.xpath(`//*[@class='oxd-calendar-dropdown']/*[contains(.,'May')]`).click();
            //select date
            cy.xpath(`//div[@class='oxd-calendar-date' and contains(.,'26')]`).click();
            cy.wait(2000)
            //select the end date
            cy.xpath(`//div[@data-v-c93bdbf3 and contains(.,'To Date')]//input`).click();
            cy.get(".oxd-date-input-calendar").should("be.visible");
            cy.xpath(`//ul[@class='oxd-calendar-selector']//li[@class='oxd-calendar-selector-month']`).click();
            cy.xpath(`//*[@class='oxd-calendar-dropdown']/*[contains(.,'May')]`).click();
            //select date
            cy.xpath(`//div[@class='oxd-calendar-date' and contains(.,'27')]`).click();

            // add comments 
            cy.xpath(`//div[@data-v-c93bdbf3 and contains(.,'Comments')]//input`).type("short vacation");
            //click apply 
            cy.get('button[type = "submit"]').contains("Apply").click();
            
        });
    })
})

/*
cy.get('.oxd-date-input-icon').first().click();
            cy.get(".oxd-date-input-calendar").should("be.visible");
            cy.xpath(`//ul[@class='oxd-calendar-selector']//li[@class='oxd-calendar-selector-month']`).click();
            cy.xpath(`//*[@class='oxd-calendar-dropdown']/*[contains(.,'May')]`).click();
            //select date
            cy.xpath(`//div[@class='oxd-calendar-date' and contains(.,'26')]`).click();
            cy.wait(2000)
            //select the end date
            cy.xpath('//label[text()="To Date"]/ancestor::div[contains(@class, "oxd-input-group")]//input').click();
            cy.get(".oxd-date-input-calendar").should("be.visible");
            cy.xpath(`//ul[@class='oxd-calendar-selector']//li[@class='oxd-calendar-selector-month']`).click();
            cy.xpath(`//*[@class='oxd-calendar-dropdown']/*[contains(.,'May')]`).click();
            //select date
            cy.xpath(`//div[@class='oxd-calendar-date' and contains(.,'27')]`).click();
            */