const scrapeCategory = (Browser, url) =>
  new Promise(async (resolve, reject) => {
    try {
      let page = await Browser.newPage();
      console.log(">> Mở tab mới...");
      await page.goto(url);
      console.log(">> Try cập vào " + url);
      await page.waitForSelector("#webpage");
      console.log(">> Website đã load xong...");

      const dataCategory = await page.$$eval(
        "nav.pt123__nav > ul > li",
        (els) => {
          dataCategory = els.map((el) => {
            return {
              category: el.querySelector("a").innerText,
              link: el.querySelector("a").href,
            };
          });
          return dataCategory;
        }
      );

      // console.log(dataCategory);

      await page.close();
      console.log(">> Tab đã đóng...");
      resolve(dataCategory);
    } catch (error) {
      console.log("Lỗi ở scrapeCategory" + error);
      reject(error);
    }
  });

const scrape = (browser, url) =>
  new Promise(async (resolve, reject) => {
    try {
      let newPage = await browser.newPage();
      console.log(">> Đã mở tab mới...");
      await newPage.goto(url);
      console.log(">> Đã truy cập vào trang " + url);
      await newPage.waitForSelector("main");
      console.log(">> Đã load xong trang tab main...");

      const scrapeData = {};

      // Lấy header
      const headerData = await newPage.$eval("header.mt-2.mb-3", (el) => {
        return {
          title: el.querySelector("h1.fs-4").innerText,
          description: el.querySelector("p.fs-7").innerText,
        };
      });
      scrapeData.header = headerData;

      // console.log(headerData);

      // Lấy links detail item
      const detailLinks = await newPage.$$eval(
        "div.col-md-9.col-lg-8 > ul.post__listing > li",
        (els) => {
          return els
            .map((el) => {
              return (
                el.querySelector("div.pt-3 > h3 > a")?.href ||
                el.querySelector("div.flex-grow-1 > h3 > a")?.href ||
                null
              );
            })
            .filter((link) => link !== null);
        }
      );

      // console.log(detailLinks);
      const scraperDetail = async (link) =>
        new Promise(async (resolve, reject) => {
          try {
            let pageDetail = await browser.newPage();
            await pageDetail.goto(link);
            console.log(">> Try cập " + link);
            await pageDetail.waitForSelector("main");

            const detailData = {};
            // Bắt đầu cạo
            // Cạo ảnh
            const images = await pageDetail.$$eval(
              "#carousel_Photos > div.carousel-inner.bg-dark.rounded-top > div.carousel-item",
              (els) => {
                images = els.map((el) => {
                  return el.querySelector("img")?.getAttribute("data-src");
                });
                return images;
              }
            );
            detailData.images = images;
            // console.log(images);

            // Lấy header detail
            const header = await pageDetail.$eval(
              "header.border-bottom.pb-4.mb-4",
              (el) => {
                return {
                  title: el.querySelector(
                    "#webpage > main > div:nth-child(2) > div > div.col-md-9.col-lg-8 > div.bg-white.shadow-sm.rounded.p-4.mb-3 > header > h1"
                  )?.innerText,
                  star: el
                    .querySelector(
                      "div.badge.d-inline-flex.align-items-center.fs-11.fw-normal.text-uppercase.mb-1 > div"
                    )
                    .className.replace(/^\D+/g, ""),
                  address: el.querySelector("address")?.innerText,
                  attribute: {
                    price: el.querySelector(
                      "div.d-flex.justify-content-between > div.d-flex > span.text-price.fs-5.fw-bold"
                    )?.innerText,
                    acreage: el.querySelector(
                      "#webpage > main > div:nth-child(2) > div > div.col-md-9.col-lg-8 > div.bg-white.shadow-sm.rounded.p-4.mb-3 > header > div.d-flex.justify-content-between > div.d-flex > span:nth-child(3)"
                    )?.innerText,
                    published: el.querySelector(
                      "div.d-flex.justify-content-between > div.d-flex > time"
                    )?.innerText,
                    hashtag: el.querySelector(
                      "#webpage > main > div:nth-child(2) > div > div.col-md-9.col-lg-8 > div.bg-white.shadow-sm.rounded.p-4.mb-3 > header > div.d-flex.justify-content-between > div:nth-child(2) > span"
                    )?.innerText,
                  },
                };
              }
            );
            console.log(header);

            await pageDetail.close();
            console.log(">> Đã đóng tab " + link);
            resolve();
          } catch (error) {
            console.log("Lấy data detail lỗi: " + error);
            reject(error);
          }
        });

      for (let link of detailLinks) {
        await scraperDetail(link);
      }

      await browser.close();
      console.log(">> Trình duyệt đã đóng.");
      resolve();
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  scrapeCategory,
  scrape,
};
