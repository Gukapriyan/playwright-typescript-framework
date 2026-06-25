import {expect, test} from '../fixtures/hooks-fixture';
import loginModuleData from '../data/login-module-data.json';


test.use({
    storageState: {
        cookies: [],
        origins: []
    }
});


test.describe("Invalid login Tests",{
    tag:'@invalidLogin',
    annotation:{
        type: 'Story link:',
        description: 'Verify that the user cannot log on with an invalid password.'
    }

},()=>{


test('[Login] Verify that the user cannot log on with an invalid password.',{
    tag:['@UI','@UAT'], annotation: {
        type:'Test case Link', description:'Verify that the user cannot log on with an invalid password.'
    }
},async({gotoUrl,loginPage,commonUtils})=>{
    const decryptedUserName = commonUtils.decryptData(
        process.env.USER_NAME!
    );
    await loginPage.loginOrangeHRM(decryptedUserName, loginModuleData.wrong_password);
    await expect(loginPage.invalidCredentialsErrorMessage).toHaveText(loginModuleData.invalid_credentials_error_message);
    await expect(loginPage.userNameInput).toBeVisible();


})

test('[Login] Verify that the user cannot log on with an invalid username.',{
    tag:['@UI','@Dev']
},async({gotoUrl,loginPage,commonUtils})=>{
    const decryptedPassword = commonUtils.decryptData(
        process.env.PASSWORD!
    );
    await loginPage.loginOrangeHRM(loginModuleData.wrong_username, decryptedPassword);
    await expect(loginPage.invalidCredentialsErrorMessage).toHaveText(loginModuleData.invalid_credentials_error_message);
    await expect(loginPage.userNameInput).toBeVisible();


})

test('[Login] Verify that the user cannot log on with an invalid username and password.',{tag:["@UI","@UAT"]},async({gotoUrl,loginPage,commonUtils})=>{
  
    await loginPage.loginOrangeHRM(loginModuleData.wrong_username, loginModuleData.wrong_password);
    await expect(loginPage.invalidCredentialsErrorMessage).toHaveText(loginModuleData.invalid_credentials_error_message);
     //await expect(loginPage.invalidCredentialsErrorMessage).toHaveText("qwerty");
    await expect(loginPage.userNameInput).toBeVisible();


})

test('[Login] verify that the user can log in with valid username and password.',{
    tag:['@VISUAL','@UAT'], annotation: {
        type:'test case Link',
        description:'Verify that the user can log in with valid username and password.'
    }
},async({gotoUrl,loginPage,commonUtils,leftNavigationPage})=>{

    const username = commonUtils.decryptData(process.env.USER_NAME!);
    const password = commonUtils.decryptData(process.env.PASSWORD!);
    await loginPage.loginOrangeHRM(username,password);
    await expect(leftNavigationPage.orangeHrmLogo).toBeVisible();
    await expect(leftNavigationPage.leftNavigationPanel).toBeVisible();


})
})
