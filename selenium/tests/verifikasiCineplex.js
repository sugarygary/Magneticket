const { By, Key, Builder } = require("selenium-webdriver");

require("chromedriver");
async function delay(ms) {
  // return await for better async stack trace support in case of errors.
  return await new Promise((resolve) => setTimeout(resolve, ms));
}
async function verifikasiCineplex() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://localhost:5173/admin");

    // Wait for 5 seconds after loading Google
    await delay(1500);
    driver
      .findElement(By.xpath('//input[@placeholder="Enter your username"]'))
      .click();
    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Enter your username"]'))
      .sendKeys("admin");

    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Enter your password"]'))
      .click();
    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Enter your password"]'))
      .sendKeys("admin");

    await delay(1500);

    driver.findElement(By.xpath("//button")).click();
    await delay(1500);

    driver.findElement(By.xpath('//a[text()="Verifikasi"]')).click();

    await delay(1500);

    driver.findElement(By.xpath('//a[text()="Verifikasi Cineplex"]')).click();

    await delay(1500);

    driver.findElement(By.id("felixwijayaPerusahaan")).click();
    await delay(1500);

    driver.findElement(By.xpath('//button[text()="Terima"]')).click();

    await delay(1500);
  } finally {
    // Close the browser window
    // await driver.quit();
  }
}

verifikasiCineplex();
