const scrapeCategory = (Browser, url) =>
  new Promise(async (resolve, reject) => {
    try {
      let page = await Browser.newPage();
      console.log(">> Mở tab mới...");
      await page.goto(url);
      console.log(">> Try cập vào " + url);
      await page.waitForSelector("#webpage");
      console.log(">> Website đã load xong...");

      const dataCategory = await page.$$eval(".pt123__nav > ul > li", (els) => {
        dataCategory = els.map((el) => {
          return {
            category: el.querySelector("a").innerText,
            link: el.querySelector("a").href,
          };
        });
        return dataCategory;
      });
      console.log(dataCategory);

      await page.close();
      console.log(">> Tab đã đóng.");
      resolve();
    } catch (error) {
      console.log("Lỗi ở scrapeCategory" + error);
      reject(error);
    }
  });

module.exports = {
  scrapeCategory,
};
