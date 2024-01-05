const { By, Key, Builder } = require("selenium-webdriver");

require("chromedriver");
async function delay(ms) {
  // return await for better async stack trace support in case of errors.
  return await new Promise((resolve) => setTimeout(resolve, ms));
}
async function createEventPromo() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://localhost:5173/event-organizer/login");

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

    driver.findElement(By.xpath('//a[text()="Event"]')).click();
    await delay(1500);

    let poster = await driver.findElement(By.xpath('//input[@id="poster"]'));
    poster.sendKeys("C:\\Users\\HP\\Pictures\\luffy.jpg");
    await delay(1500);

    let banner = await driver.findElement(By.id('banner'));
    banner.sendKeys("C:\\Users\\HP\\Pictures\\luffy.jpg");
    await delay(1500);

    driver
        .findElement(By.id('namaEvent'))
        .sendKeys("Coldplay");
     await delay(1500);

     driver
        .findElement(By.id('venue'))
        .sendKeys("Tunjungan Plaza");
     await delay(1500);

     driver
        .findElement(By.id('address'))
        .sendKeys("Jalan Duku Kupang blok A no 19");
     await delay(1500);

    let input_tanggal = await driver.findElement(By.id('tanggalEvent'));
    input_tanggal.clear();
    input_tanggal.sendKeys("18/01/2024");
    await delay(1500);

    let surat = await driver.findElement(By.id('surat'));
    surat.sendKeys("C:\\Users\\HP\\Pictures\\luffy.jpg");
    await delay(1500);

    driver
        .findElement(By.id('deskripsi'))
        .sendKeys("Konser Coldplay di Tunjungan Plaza Jalan Duku Kupang blok A no 19");
     await delay(1500);

     let kota = await driver.findElement(By.id('city'));
     kota.sendKeys("AMBON");
     await delay(1500);

     driver
        .findElement(By.id('namaKategori'))
        .sendKeys("VIP");
     await delay(1500);

     driver
        .findElement(By.id('hargaTiket'))
        .sendKeys("50000");
     await delay(1500);

     driver
        .findElement(By.id('slotTiket'))
        .sendKeys("1000");
     await delay(1500);

    driver.findElement(By.id('buttonTambahKategori')).click();
    await delay(1500);

    driver
        .findElement(By.id('namaKategori'))
        .sendKeys("VVIP");
    await delay(1500);

    driver
        .findElement(By.id('hargaTiket'))
        .sendKeys("100000");
    await delay(1500);

    driver
        .findElement(By.id('slotTiket'))
        .sendKeys("100");
    await delay(1500);

    driver.findElement(By.id('buttonTambahKategori')).click();
    await delay(1500);

    driver
        .findElement(By.id('namaKategori'))
        .sendKeys("VVVIP");
    await delay(1500);

    driver
        .findElement(By.id('hargaTiket'))
        .sendKeys("1000000");
    await delay(1500);

    driver
        .findElement(By.id('slotTiket'))
        .sendKeys("20");
    await delay(1500);

    driver.findElement(By.id('buttonTambahKategori')).click();
    await delay(1500);

    let zona = await driver.findElement(By.id('zona'));
    zona.sendKeys("C:\\Users\\HP\\Pictures\\luffy.jpg");
    await delay(1500);

    driver.findElement(By.xpath('//input[@type="checkbox"]')).click();
    await delay(1500);

    driver.findElement(By.id('buatJadwalKonser')).click();
    await delay(1500);

    driver.findElement(By.css('.text-sm.bg-gray-800.rounded-full.px-4#user-menu-button')).click();
     await delay(1500);

     driver.findElement(By.xpath('//button[contains(text(), "Sign out")]')).click();
     await delay(1500);

  } finally {
    await driver.quit();
  }
}

createEventPromo();
