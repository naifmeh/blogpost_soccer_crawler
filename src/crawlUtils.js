async function waitAndCountElements(page, selector) {
    await page.waitForSelector(selector);
    return new Promise((resolve, reject) => {
        page.evaluate((sel) => document.querySelectorAll(sel).length, selector)
            .then((count) => resolve(count))
            .catch((err) => reject(err));
    });
}

async function waitAndClickElement(page, selector) {
    await page.waitForSelector(selector);
    return new Promise((resolve, reject) => {
        page.evaluate((sel) => document.querySelector(sel).click(), selector)
            .then((_) => resolve())
            .catch((err) => reject(err));
    });
}

async function getInnerText(page, selector) {
    return new Promise((resolve, reject) => {
        page.evaluate((sel) => {
                let text = document.querySelector(sel)
                return text ? text.innerText : null;
            }, selector)
            .then((txt) => resolve(txt))
            .catch((err) => reject(err));
    });
}

module.exports.waitAndCountElements = waitAndCountElements;
module.exports.waitAndClickElement = waitAndClickElement;
module.exports.getInnerText = getInnerText;