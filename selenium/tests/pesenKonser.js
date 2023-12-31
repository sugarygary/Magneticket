const { Builder, By, Key, until } = require("selenium-webdriver");

// Set the path to your webdriver executable (e.g., chromedriver.exe)

async function delay(ms) {
  // return await for better async stack trace support in case of errors.
  return await new Promise((resolve) => setTimeout(resolve, ms));
}
async function pesenKonser() {
  const driver = new Builder().forBrowser("chrome").build();

  // Navigate to the webpage
  driver.get("http://localhost:5173/");
  await delay(3000);
  await driver.findElement(By.id("loginHeader")).click();
  await delay(3000);

  await driver
    .findElement(By.id("loginFormEmailUser"))
    .click()
    .then(() => {
      return driver
        .findElement(By.id("loginFormEmailUser"))
        .sendKeys("fwijaya918@gmail.com");
    });

  // Optional delay, if needed
  await delay(3000);

  await driver
    .findElement(By.id("loginFormPasswordUser"))
    .click()
    .then(() => {
      return driver
        .findElement(By.id("loginFormPasswordUser"))
        .sendKeys("felix");
    });
  await driver.findElement(By.id("btnLoginUser")).click();
  await delay(3000);

  // Find the element with the specified href attribute
  driver
    .findElement(By.xpath('//a[@href="/user/event/6590fd9bf026a570ee0cd9ab"]'))
    .click();

  await delay(3000);
  driver.findElement(By.xpath('//*[text()="beli tiket"]')).click();

  await delay(3000);

  driver
    .findElement(
      By.className(
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      )
    )
    .click();

  await delay(3000);
}
pesenKonser();
