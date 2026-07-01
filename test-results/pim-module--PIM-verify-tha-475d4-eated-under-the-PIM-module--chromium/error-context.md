# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pim-module.spec.ts >> [PIM] verify that a new employee is sucessfully created under the PIM module.
- Location: tests\pim-module.spec.ts:5:5

# Error details

```
Test timeout of 110000ms exceeded.
```

```
Error: locator.fill: Test timeout of 110000ms exceeded.
Call log:
  - waiting for getByPlaceholder('First Name')

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e6]:
    - img "company-branding" [ref=e8]
    - generic [ref=e9]:
      - heading "Login" [level=5] [ref=e10]
      - generic [ref=e11]:
        - generic [ref=e13]:
          - paragraph [ref=e14]: "Username : Admin"
          - paragraph [ref=e15]: "Password : admin123"
        - generic [ref=e16]:
          - generic [ref=e18]:
            - generic [ref=e19]:
              - generic [ref=e20]: 
              - generic [ref=e21]: Username
            - textbox "Username" [active] [ref=e23]
          - generic [ref=e25]:
            - generic [ref=e26]:
              - generic [ref=e27]: 
              - generic [ref=e28]: Password
            - textbox "Password" [ref=e30]
          - button "Login" [ref=e32] [cursor=pointer]
          - paragraph [ref=e34] [cursor=pointer]: Forgot your password?
      - generic [ref=e35]:
        - generic [ref=e36]:
          - link [ref=e37] [cursor=pointer]:
            - /url: https://www.linkedin.com/company/orangehrm/mycompany/
          - link [ref=e40] [cursor=pointer]:
            - /url: https://www.facebook.com/OrangeHRM/
          - link [ref=e43] [cursor=pointer]:
            - /url: https://twitter.com/orangehrm?lang=en
          - link [ref=e46] [cursor=pointer]:
            - /url: https://www.youtube.com/c/OrangeHRMInc
        - generic [ref=e49]:
          - paragraph [ref=e50]: OrangeHRM OS 5.8
          - paragraph [ref=e51]:
            - text: © 2005 - 2026
            - link "OrangeHRM, Inc" [ref=e52] [cursor=pointer]:
              - /url: http://www.orangehrm.com
            - text: . All rights reserved.
  - img "orangehrm-logo" [ref=e54]
```

# Test source

```ts
  1  | import {Page, Locator} from "@playwright/test";
  2  | 
  3  | export class PimPage{
  4  |     readonly page: Page;
  5  |     readonly addPimButton: Locator;
  6  |     readonly firstNameTextBoxInput: Locator;
  7  |     readonly lastNameTextBoxInput: Locator;
  8  |     readonly middleNameTextBoxInput: Locator;
  9  |     readonly employeeIdInput: Locator;
  10 |     readonly newEmployeeNameHeading : Locator;
  11 |     readonly saveButton: Locator;
  12 | 
  13 |     constructor(page: Page) {
  14 |         this.page = page;
  15 |         this.addPimButton = page.getByRole('button', { name: 'Add' });
  16 |         this.firstNameTextBoxInput = page.getByPlaceholder('First Name');
  17 |         this.lastNameTextBoxInput = page.getByPlaceholder('Last Name');
  18 |         this.middleNameTextBoxInput = page.getByPlaceholder('Middle Name');
  19 |         this.employeeIdInput = page.locator('xpath=//label[normalize-space()="Employee Id"]/ancestor::div[contains(@class,"oxd-input-group")]//input');
  20 |         this.newEmployeeNameHeading = page.locator('.orangehrm-edit-employee-name h6');
  21 |         this.saveButton = page.getByRole('button', { name: 'Save' });
  22 | 
  23 |     }
  24 | 
  25 | 
  26 |     /**
  27 |      * to add two employee in the PIM module of OrangeHRM application
  28 |      * @param firstName 
  29 |      * @param middleName 
  30 |      * @param lastName 
  31 |      */
  32 | 
  33 |     async addEmployee(firstName: string, middleName: string, lastName: string) {
  34 |         await this.addPimButton.click();
> 35 |         await this.firstNameTextBoxInput.fill(firstName);
     |                                          ^ Error: locator.fill: Test timeout of 110000ms exceeded.
  36 |         await this.middleNameTextBoxInput.fill(middleName);
  37 |         await this.lastNameTextBoxInput.fill(lastName);
  38 |         await this.employeeIdInput.fill(Date.now().toString().slice(-8));
  39 |         await this.saveButton.click();
  40 |         await this.newEmployeeNameHeading.waitFor({ state: 'visible' });
  41 |     }
  42 | 
  43 |     
  44 |     
  45 | }
  46 | 
```