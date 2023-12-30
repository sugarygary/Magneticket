const { By, Key, Builder } = require('selenium-webdriver');
const { sleep } = require('selenium-webdriver/lib/webdriver');

require('chromedriver');
async function delay(ms) {
    // return await for better async stack trace support in case of errors.
    return await new Promise(resolve => setTimeout(resolve, ms));
  }
async function example() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://www.google.com');
    
    // Wait for 5 seconds after loading Google
    await delay(5000);
    
    await driver.findElement(By.name('q')).sendKeys('spongebob', Key.RETURN);

    // Keep the browser open for a while (you can adjust this time if needed)
    await delay(5000);
  } finally {
    // Close the browser window
    await driver.quit();
  }
}

example();
