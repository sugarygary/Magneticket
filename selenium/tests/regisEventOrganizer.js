const { By, Key, Builder } = require("selenium-webdriver");

require("chromedriver");
async function delay(ms) {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}
async function regisEventOrganizer() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://localhost:5173/event-organizer/register");
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
      .sendKeys("asdasdasd@gmail.com");

    await delay(1500);

    let npwp = await driver.findElement(By.id("fotoNPWP"));
    await delay(1500);

    await npwp.sendKeys("C:\\Users\\HP\\Pictures\\luffy.jpg");

    let surat = await driver.findElement(By.id("fotoSurat"));
    await delay(1500);

    await surat.sendKeys("C:\\Users\\HP\\Pictures\\luffy.jpg");

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
    await driver.quit();
  }
}

regisEventOrganizer();
