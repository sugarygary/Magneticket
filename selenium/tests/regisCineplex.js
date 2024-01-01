const { By, Key, Builder } = require("selenium-webdriver");

require("chromedriver");
async function delay(ms) {
  // return await for better async stack trace support in case of errors.
  return await new Promise((resolve) => setTimeout(resolve, ms));
}
async function regisCineplex() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://localhost:5173/cineplex/register");

    // Wait for 5 seconds after loading Google
    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Masukkan Nama Perusahaan"]'))
      .click();
    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Masukkan Nama Perusahaan"]'))
      .sendKeys("felixwijayaPerusahaan");

    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Masukkan Nama Bisnis"]'))
      .click();
    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Masukkan Nama Bisnis"]'))
      .sendKeys("felixwijayaBisnis");

    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Enter your email"]'))
      .click();
    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Enter your email"]'))
      .sendKeys("felixwijaya918@gmail.com");

    await delay(1500);

    let npwp = await driver.findElement(By.id("fotoNPWP"));
    await delay(1500);

    await npwp.sendKeys("E:\\Kuliah\\semester 5\\software testis\\ktm.jpg");

    let surat = await driver.findElement(By.id("fotoSurat"));
    await delay(1500);

    await surat.sendKeys("E:\\Kuliah\\semester 5\\software testis\\ktm.jpg");

    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Enter your password"]'))
      .click();
    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Enter your password"]'))
      .sendKeys("123");

    await delay(1500);

    driver
      .findElement(
        By.xpath('//input[@placeholder="Enter your confirm password"]')
      )
      .click();
    await delay(1500);

    driver
      .findElement(
        By.xpath('//input[@placeholder="Enter your confirm password"]')
      )
      .sendKeys("123");

    await delay(1500);

    driver.findElement(By.xpath('//input[@type="checkbox"]')).click();
    await delay(1500);

    driver.findElement(By.xpath("//button")).click();
    await delay(1500);
  } finally {
    // Close the browser window
    // await driver.quit();
  }
}

regisCineplex();
