const { By, Key, Builder } = require('selenium-webdriver');

require('chromedriver');
async function delay(ms) {
    // return await for better async stack trace support in case of errors.
    return await new Promise(resolve => setTimeout(resolve, ms));
  }
async function loginUser() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://localhost:5173/');
    
    // Wait for 5 seconds after loading Google
    await delay(3000);
    
    await driver.findElement(By.id('loginHeader')).click();
    await delay(3000);

    await driver.findElement(By.id('loginFormEmailUser')).click().then(() => {
        return driver.findElement(By.id('loginFormEmailUser')).sendKeys("fwijaya918@gmail.com");
    });
    
    // Optional delay, if needed
    await delay(3000);
    
    await driver.findElement(By.id('loginFormPasswordUser')).click().then(() => {
        return driver.findElement(By.id('loginFormPasswordUser')).sendKeys("felix");
    });
    await driver.findElement(By.id('btnLoginUser')).click();
    await delay(3000);


  } finally {
    // Close the browser window
    await driver.quit();
  }
}

loginUser();
