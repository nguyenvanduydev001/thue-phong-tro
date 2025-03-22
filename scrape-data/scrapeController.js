const scrapers = require("./scraper");

const scrapeController = async (browserInstance) => {
  const url = "https://phongtro123.com/";
  try {
    let browser = await browserInstance;
    // gọi hàm cạo ở file scrape.js
    let categories = scrapers.scrapeCategory(browser, url);
  } catch (e) {
    console.log("Lỗi ở scrape controller:" + e);
  }
};

module.exports = scrapeController;
