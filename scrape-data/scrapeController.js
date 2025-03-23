const scrapers = require("./scraper");

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

    await scrapers.scrape(browser, selectedCategories[0].link);
  } catch (e) {
    console.log("Lỗi ở scrape controller:" + e);
  }
};

module.exports = scrapeController;
