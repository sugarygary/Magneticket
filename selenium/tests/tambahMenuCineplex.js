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

    driver.findElement(By.xpath('//a[text()="Menu"]')).click();
    await delay(1500);

    driver
      .findElement(By.className("p-2 biruCariTiket  text-white rounded"))
      .click();
    await delay(1500);

    let fotoMakan = driver.findElement(By.id("fotoMenu"));
    fotoMakan.sendKeys("E:\\Kuliah\\semester 5\\software testis\\ktm.jpg");
    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Enter your menu"]'))
      .sendKeys("ktm goreng");

    await delay(1500);

    driver
      .findElement(By.xpath('//input[@placeholder="Enter your price"]'))
      .sendKeys("25000");

    await delay(1500);

    driver.findElement(By.xpath("//textarea")).sendKeys("nasi goreng mantap");

    await delay(1500);

    driver.findElement(By.xpath("//button[text()='Buat Menu']")).click();
    await delay(1500);

    driver.findElement(By.xpath("//button[text()='Refresh halaman']")).click();
    await delay(1500);
  } finally {
    // Close the browser window
    // await driver.quit();
  }
}

tambahMenuCineplex();
