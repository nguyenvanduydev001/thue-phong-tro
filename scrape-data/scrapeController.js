const scrapers = require("./scraper");
const fs = require("fs");

const scrapeController = async (browserInstance) => {
  const url = "https://phongtro123.com/";
  const indexs = [0, 1, 2, 3];
  try {
    let browser = await browserInstance;
    // gọi hàm cạo ở file scrape.js
    const categories = await scrapers.scrapeCategory(browser, url);
    const selectedCategories = categories.filter((category, index) =>
      indexs.some((i) => i === index)
    );

    let result0 = await scrapers.scrape(browser, selectedCategories[0].link);
    fs.writeFile("phongtro.json", JSON.stringify(result0), (err) => {
      if (err) console.log("Ghi data vô file json thất bại: " + err);
      console.log("Thêm data thành công !");
    });

    let result1 = await scrapers.scrape(browser, selectedCategories[1].link);
    fs.writeFile("nhanguyencan.json", JSON.stringify(result1), (err) => {
      if (err) console.log("Ghi data vô file json thất bại: " + err);
      console.log("Thêm data thành công !");
    });

    let result2 = await scrapers.scrape(browser, selectedCategories[2].link);
    fs.writeFile("canhochungcu.json", JSON.stringify(result2), (err) => {
      if (err) console.log("Ghi data vô file json thất bại: " + err);
      console.log("Thêm data thành công !");
    });

    let result3 = await scrapers.scrape(browser, selectedCategories[3].link);
    fs.writeFile("canhomini.json", JSON.stringify(result3), (err) => {
      if (err) console.log("Ghi data vô file json thất bại: " + err);
      console.log("Thêm data thành công !");
    });
    await browser.close();
  } catch (e) {
    console.log("Lỗi ở scrape controller:" + e);
  }
};

module.exports = scrapeController;
