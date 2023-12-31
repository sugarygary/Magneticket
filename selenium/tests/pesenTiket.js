const { Builder, By, Key, until } = require("selenium-webdriver");

// Set the path to your webdriver executable (e.g., chromedriver.exe)

async function delay(ms) {
  // return await for better async stack trace support in case of errors.
  return await new Promise((resolve) => setTimeout(resolve, ms));
}
// Create a new WebDriver instance (in this example, we use Chrome)
async function pesenTiket() {
  const driver = new Builder().forBrowser("chrome").build();

  // Navigate to the webpage
  driver.get("http://localhost:5173/");
  await delay(1500);
  await driver.findElement(By.id("loginHeader")).click();
  await delay(1500);

  await driver
    .findElement(By.id("loginFormEmailUser"))
    .click()
    .then(() => {
      return driver
        .findElement(By.id("loginFormEmailUser"))
        .sendKeys("fwijaya918@gmail.com");
    });

  // Optional delay, if needed
  await delay(1500);

  await driver
    .findElement(By.id("loginFormPasswordUser"))
    .click()
    .then(() => {
      return driver
        .findElement(By.id("loginFormPasswordUser"))
        .sendKeys("felix");
    });
  await driver.findElement(By.id("btnLoginUser")).click();
  await delay(1500);

  // Find the element with the specified href attribute
  driver
    .findElement(By.xpath('//a[@href="/user/film/tt1099212/screening"]'))
    .click();

  await delay(1500);

  driver.findElement(By.id("cinema_felix galaxy - 23:00")).click();

  await delay(1500);
  driver.findElement(By.xpath('//div[@title="B06"]')).click();

  await delay(1500);
  driver.findElement(By.xpath('//div[@title="B07"]')).click();

  await delay(1500);

  driver
    .findElement(
      By.className("biruCariTiket w-full mt-2 px-4 py-4 text-white rounded")
    )
    .click();

  await delay(1500);

  driver.findElement(By.xpath('//button[@namafood="pak sundar"]')).click();

  await delay(1500);

  driver.findElement(By.xpath('//*[text()="Kode Promo +"]')).click();

  await delay(1500);
  driver.findElement(By.xpath('//div[@judulpromo="haloooo"]')).click();
  await delay(1500);

  driver.findElement(By.xpath('//*[text()="Bayar"]')).click();

  await delay(1500);

  //   driver.findElement(By.xpath('//iframe[@id="snap-midtrans"]'));

  //   await delay(1500);
  // Switch to the iframe
  const iframe = await driver.switchTo().frame(0);
  console.log(iframe);

  await delay(5000);
  // Do something inside the iframe
  await driver.findElement(By.xpath('//a[href="#/credit-card"]')).click();
  await driver.switchTo().defaultContent();
  // Close the webdriver
  driver.quit();
}
pesenTiket();
