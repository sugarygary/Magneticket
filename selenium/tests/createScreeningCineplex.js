const { By, Key, Builder } = require("selenium-webdriver");

require("chromedriver");
async function delay(ms) {
  // return await for better async stack trace support in case of errors.
  return await new Promise((resolve) => setTimeout(resolve, ms));
}
async function tambahMenuCineplex() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://localhost:5173/cineplex/login");

    // Wait for 5 seconds after loading Google
    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Enter your email"]'))
      .click();
    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Enter your email"]'))
      .sendKeys("fwijaya918@gmail.com");

    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Enter your password"]'))
      .click();
    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Enter your password"]'))
      .sendKeys("123");

    await delay(1500);

    driver.findElement(By.xpath("//button")).click();
    await delay(1500);

    driver.findElement(By.xpath('//span[text()="Master"]')).click();
    await delay(1500);

    driver.findElement(By.xpath('//a[text()="Cabang"]')).click();
    await delay(1500);

    // 65939172c9e1f7b81cdd7a62 - Lenmarc felix
    driver
      .findElement(By.id("65939172c9e1f7b81cdd7a62 - Lenmarc felix"))
      .click();
    await delay(1500);

    // 6593949bc9e1f7b81cdd7a8c - Studio Lenmarc 1
    driver
      .findElement(By.id("6593949bc9e1f7b81cdd7a8c - Studio Lenmarc 1"))
      .click();
    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Enter your movie id"]'))
      .sendKeys("tt4495098");

    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Enter your price"]'))
      .sendKeys("50000");

    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Enter your show time"]'))
      .sendKeys("2024-12-02T17:00:00.000+00:00");

    await delay(1500);

    driver
      .findElement(By.xpath("//button[text()='Tambahkan Screening']"))
      .click();
    await delay(1500);
    driver.findElement(By.xpath("//button[text()='Refresh halaman']")).click();
    await delay(6000);
  } finally {
    // Close the browser window
    // await driver.quit();
  }
}

tambahMenuCineplex();
