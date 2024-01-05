const { By, Key, Builder } = require("selenium-webdriver");

require("chromedriver");
async function delay(ms) {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}
async function createKodePromo() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://localhost:5173/cineplex/login");
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

    driver.findElement(By.xpath('//a[text()="Promo"]')).click();
    await delay(1500);

    driver.findElement(By.linkText('Tambah Kode Promo')).click();
    await delay(1500)

    driver
        .findElement(By.id('kodePromo'))
        .sendKeys("Promo Tahun Baru Imlek");
     await delay(1500);

    let input_tanggal = await driver.findElement(By.id('masaBerlaku'));
    input_tanggal.clear();
    input_tanggal.sendKeys("28/02/2024");
    await delay(1500);

    driver
        .findElement(By.id('potongan'))
        .sendKeys("40000");
     await delay(1500);

     driver.findElement(By.xpath('//button[contains(text(), "Buat Kode Promo")]')).click();
     await delay(1500)

     driver.findElement(By.css('.text-sm.bg-gray-800.rounded-full.px-4#user-menu-button')).click();
     await delay(1500);

     driver.findElement(By.xpath('//button[contains(text(), "Sign out")]')).click();
     await delay(1500);

  } finally {
    await driver.quit();
  }
}

createKodePromo();