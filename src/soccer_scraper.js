const puppeteer = require('puppeteer');
const fetch = require("cross-fetch");
const {
    PuppeteerBlocker
} = require("@cliqz/adblocker-puppeteer");
const crypto = require("crypto");
const { insertRecords } = require("./sqlUtils");
const { SECOND_SELECTORS, SELECTORS } = require("./selectors");
const { waitAndClickElement, 
        waitAndCountElements,
        getInnerText } = require("./crawlUtils");

const URL = "https://www.soccerstats.com/";



const COUNTRIES = [SELECTORS.ENGLAND, SELECTORS.FRANCE];

const DATE_RE = /[a-zA-Z\.]{2,4} [0-9]{1,2} [a-zA-Z\.]{2,4}/;


async function run() {
    let properties = {
        "args": ['--disable-notifications', '--no-sandbox'],
        "headless": true
    };

    let browser = await puppeteer.launch(properties);
    let page = await browser.newPage();

    let MATCHES_SELECTOR = SELECTORS;
    let matchday_start = 2;
    let is_older_type = false;
    let nb_table_fetch = 1;

    const blocker = await PuppeteerBlocker.fromLists(fetch, [
        'https://easylist.to/easylist/easylist.txt',
        'https://www.i-dont-care-about-cookies.eu/abp/'
    ]);

    blocker.enableBlockingInPage(page);

    await page.goto(URL, {
        timeout: 60000,
        waitUntil: 'domcontentloaded'
    }).then(() => {
        console.log('success');
    });

    let complete_data = [];
    for (let country of COUNTRIES) {
        await waitAndClickElement(page, country);

        await page.waitForSelector(SELECTORS.matches);
        await page.click(SELECTORS.matches);

        await page.waitForSelector(SELECTORS.league_name);
        let league_name = await getInnerText(page, SELECTORS.league_name);

        let number_seasons = await waitAndCountElements(page, SELECTORS.season_count);
        for (let season = 1; season <= number_seasons; season++) {
            let season_selector = SELECTORS.season.replace("NTH_SEASON", season);
            await waitAndClickElement(page, season_selector);
            await waitAndClickElement(page, SELECTORS.matches);

            await page.waitForSelector(season_selector);
            let seasonText = await getInnerText(page, season_selector);

            let contentPageType = await getInnerText(page, SELECTORS.page_type_table);


            for (let table_fetch = 0; table_fetch < nb_table_fetch; table_fetch++) {

                if (contentPageType && contentPageType == "All matches") {
                    MATCHES_SELECTOR = SECOND_SELECTORS[table_fetch];
                    await waitAndClickElement(page, MATCHES_SELECTOR.matches);
                    matchday_start = 1;
                    is_older_type = true;
                    nb_table_fetch = 2;
                }
                const number_matchdays = await waitAndCountElements(page, MATCHES_SELECTOR.matchday_content);
                let matchday_selector_replacement = 2;
                let max_matchday = is_older_type ? number_matchdays + 1 : number_matchdays;

                for (let matchday = matchday_start; matchday < max_matchday; matchday++) {

                    let matchday_selector = MATCHES_SELECTOR.matchday.replace("NTH_DAY", matchday);
                    await waitAndClickElement(page, matchday_selector);
                    await page.waitForSelector(matchday_selector);
                    let matchdayText = await getInnerText(page, matchday_selector);
                    console.log(matchdayText, seasonText)
                    await page.waitForSelector(MATCHES_SELECTOR.game_content.replace("NTH_MATCHDAY", matchday_selector_replacement));
                    let number_games = await page.evaluate((sel) => {
                        let table = document.querySelector(sel);
                        return table.querySelectorAll(":scope > tr").length;
                    }, MATCHES_SELECTOR.game_content.replace("NTH_MATCHDAY", matchday_selector_replacement));

                    for (let game = 1; game <= number_games; game++) {
                        let game_date = await getInnerText(page, MATCHES_SELECTOR.game_infos
                            .replace("NTH_GAME", game)
                            .replace("NTH_INFO", MATCHES_SELECTOR.INFO_POSITIONS.date)
                            .replace("NTH_MATCHDAY", matchday_selector_replacement));

                        let home_team = await getInnerText(page, MATCHES_SELECTOR.game_infos
                            .replace("NTH_GAME", game)
                            .replace("NTH_INFO", MATCHES_SELECTOR.INFO_POSITIONS.home_team)
                            .replace("NTH_MATCHDAY", matchday_selector_replacement));
                    
                        let away_team = await getInnerText(page, MATCHES_SELECTOR.game_infos
                            .replace("NTH_GAME", game)
                            .replace("NTH_INFO", MATCHES_SELECTOR.INFO_POSITIONS.away_team)
                            .replace("NTH_MATCHDAY", matchday_selector_replacement));

                        let score = await getInnerText(page, MATCHES_SELECTOR.game_infos
                            .replace("NTH_GAME", game)
                            .replace("NTH_INFO", MATCHES_SELECTOR.INFO_POSITIONS.score)
                            .replace("NTH_MATCHDAY", matchday_selector_replacement));

                        if (is_older_type) {
                            away_team = home_team.split(" - ")[1];
                            home_team = home_team.split(" - ")[0];
                        }

                        if (DATE_RE.test(game_date)) {
                            const hash = crypto.createHash('sha256').update(game_date + season + home_team + away_team + score).digest('base64');
                            complete_data.push({
                                "hash": hash,
                                "date": game_date,
                                "home": home_team,
                                "score": score,
                                "away": away_team,
                                "matchday": matchdayText,
                                "season": seasonText,
                                "league": league_name
                            })
                        }
                    }
                    matchday_selector_replacement++;
                }
                 
            }
            MATCHES_SELECTOR = SELECTORS;
            matchday_start = 2;
            is_older_type = false;
            nb_table_fetch = 1;
        }

        await page.goto(URL, {
            timeout: 60000,
            waitUntil: 'domcontentloaded'
        });
    }

    await browser.close();

    console.log("Inserting records...");
    await insertRecords(complete_data);
    console.log("Done");
}

run();