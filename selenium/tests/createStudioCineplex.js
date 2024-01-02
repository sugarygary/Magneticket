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

    driver.findElement(By.xpath('//a[text()="Tambah Studio"]')).click();
    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Masukkan Nama Studio"]'))
      .sendKeys("Studio Lenmarc 1");

    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Masukkan Tipe Studio"]'))
      .sendKeys("2d");

    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Masukkan Jumlah Baris"]'))
      .sendKeys("5");

    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Masukkan Jumlah Kolom"]'))
      .sendKeys("6-12-6");

    await delay(1500);

    driver.findElement(By.xpath("//button[text()='Tambah']")).click();
    await delay(1500);
    driver.findElement(By.xpath("//button[text()='Refresh halaman']")).click();
    await delay(1500);
  } finally {
    // Close the browser window
    // await driver.quit();
  }
}

tambahMenuCineplex();
