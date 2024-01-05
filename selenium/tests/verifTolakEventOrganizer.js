const { By, Key, Builder } = require("selenium-webdriver");

require("chromedriver");
async function delay(ms) {
  // return await for better async stack trace support in case of errors.
  return await new Promise((resolve) => setTimeout(resolve, ms));
}
async function verifTolakEventOrganizer() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://localhost:5173/admin");
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

    driver.findElement(By.xpath('//a[text()="Verifikasi Event Organizer"]')).click();
    await delay(1500);

    driver.findElement(By.id("5")).click();
    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Masukan Alasan Penolakan"]'))
      .click();
    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Masukan Alasan Penolakan"]'))
      .sendKeys("anda kurang meyakinkan");
    await delay(1500);

    driver.findElement(By.xpath('//button[text()="Tolak"]')).click();
    await delay(1500);

  } finally {
    // await driver.quit();
  }
}

verifTolakEventOrganizer();