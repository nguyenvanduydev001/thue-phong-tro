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
                    ?.className?.replace(/^\D+/g, ""),
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
            // console.log(header);

            detailData.header = header;
            // Thông tin mô tả
            const mainContentHeader = await pageDetail.$eval(
              "div.border-bottom.pb-3.mb-4",
              (el) =>
                el.querySelector("div.border-bottom.pb-3.mb-4 > h2.fs-5.mb-3")
                  .innerText
            );
            const mainConTentContent = await pageDetail.$$eval(
              "div.border-bottom.pb-3.mb-4 > p",
              (els) => els.map((el) => el.innerText)
            );
            detailData.mainContent = {
              header: mainContentHeader,
              content: mainConTentContent,
            };
            // console.log(mainContentHeader);
            // console.log(mainConTentContent);

            // Thông tin nổi bật
            let overviewHeader = null;

            try {
              overviewHeader = await pageDetail.$eval(
                "#webpage > main > div:nth-child(2) > div > div.col-md-9.col-lg-8 > div.bg-white.shadow-sm.rounded.p-4.mb-3 > div:nth-child(3)",
                (el) => {
                  const header = el.querySelector("h2.fs-5.mb-3");
                  return header ? header.innerText.trim() : null;
                }
              );
            } catch (error) {
              overviewHeader = null;
            }
            const overviewContent = await pageDetail.$$eval(
              "#webpage > main > div:nth-child(2) > div > div.col-md-9.col-lg-8 > div.bg-white.shadow-sm.rounded.p-4.mb-3 > div:nth-child(3) > div > div",
              (divs) =>
                divs
                  .filter((div) => div.tagName.toLowerCase() !== "h2")
                  .map((div, index, arr) => {
                    if (index % 2 === 0 && arr[index + 1]) {
                      return {
                        name: div.innerText.trim(),
                        content: arr[index + 1].innerText.trim(),
                      };
                    }
                  })
                  .filter(Boolean)
            );

            detailData.overview = {
              header: overviewHeader,
              content: overviewContent,
            };
            // console.log(overviewHeader);
            // console.log(overviewContent);

            await pageDetail.close();
            console.log(">> Đã đóng tab " + link);
            resolve(detailData);
          } catch (error) {
            console.log("Lấy data detail lỗi: " + error);
            reject(error);
          }
        });
      const details = [];
      for (let link of detailLinks) {
        const detail = await scraperDetail(link);
        details.push(detail);
      }
      scrapeData.body = details;
      console.log(">> Trình duyệt đã đóng.");
      resolve(scrapeData);
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  scrapeCategory,
  scrape,
};
