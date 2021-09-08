module.exports.SELECTORS = {
    ENGLAND: "#headerlocal > div > div > div:nth-child(1) > table:nth-child(2) > tbody > tr > td:nth-child(11) > span > a",
    FRANCE: "#headerlocal > div > div > div:nth-child(1) > table:nth-child(2) > tbody > tr > td:nth-child(19) > span > a",

    //Matches selector
    matches: "#content > div:nth-child(3) > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td > a:nth-child(2)",
    matchday_content: "#content > div.row > div > table:nth-child(2) > tbody > tr > td",
    matchday: "#content > div.row > div > table:nth-child(2) > tbody > tr > td:nth-child(NTH_DAY) > a",

    //Season
    season_count: "#content > div:nth-child(2) > div:nth-child(1) > table > tbody > tr > td:nth-child(4) > table > tbody > tr > td > div > div > a",
    season: "#content > div:nth-child(2) > div:nth-child(1) > table > tbody > tr > td:nth-child(4) > table > tbody > tr > td > div > div > a:nth-child(NTH_SEASON)",

    game_content: "#btable > tbody",
    game_infos: "#btable > tbody > tr:nth-child(NTH_GAME) > td:nth-child(NTH_INFO)",

    league_name: "#content > div:nth-child(2) > div:nth-child(1) > table > tbody > tr > td:nth-child(3) > h1",

    page_type_table: "#content > div:nth-child(4) > div > table:nth-child(1) > tbody > tr > td > table > tbody > tr > td",

    INFO_POSITIONS: {
        "home_team": "2",
        "away_team": "4",
        "date": "1",
        "score": "3"
    }
   
};

let SECOND_SELECTORS_A = {
    matches: "#content > div:nth-child(4) > div > table:nth-child(1) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > a",
    matchday_content: "#content > div:nth-child(4) > div > table:nth-child(3) > tbody > tr > td:nth-child(2) > div:nth-child(1) > ul > li",
    matchday: "#content > div:nth-child(4) > div > table:nth-child(3) > tbody > tr > td:nth-child(2) > div:nth-child(1) > ul > li:nth-child(NTH_DAY) > a",

    game_content: "#content > div:nth-child(4) > div > table:nth-child(3) > tbody > tr > td:nth-child(2) > div:nth-child(1) > div:nth-child(NTH_MATCHDAY) > table > tbody > tr > td > table > tbody",
    game_infos: "#content > div:nth-child(4) > div > table:nth-child(3) > tbody > tr > td:nth-child(2) > div:nth-child(1) > div:nth-child(NTH_MATCHDAY) > table > tbody > tr > td > table > tbody > tr:nth-child(NTH_GAME) > td:nth-child(NTH_INFO)",

    INFO_POSITIONS: {
        "home_team": "2",
        "away_team": "2",
        "date": "1",
        "score": "3"
    }
};


let SECOND_SELECTORS_B = {
    matches: "#content > div:nth-child(4) > div > table:nth-child(1) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > a",
    matchday_content: "#content > div:nth-child(4) > div > table:nth-child(3) > tbody > tr > td:nth-child(2) > div:nth-child(4) > ul > li",
    matchday: "#content > div:nth-child(4) > div > table:nth-child(3) > tbody > tr > td:nth-child(2) > div:nth-child(4) > ul > li:nth-child(NTH_DAY) > a",

    game_content: "#content > div:nth-child(4) > div > table:nth-child(3) > tbody > tr > td:nth-child(2) > div:nth-child(4) > div:nth-child(NTH_MATCHDAY) > table > tbody > tr > td > table > tbody",
    game_infos: "#content > div:nth-child(4) > div > table:nth-child(3) > tbody > tr > td:nth-child(2) > div:nth-child(4) > div:nth-child(NTH_MATCHDAY) > table > tbody > tr > td > table > tbody > tr:nth-child(NTH_GAME) > td:nth-child(NTH_INFO)",

    INFO_POSITIONS: {
        "home_team": "2",
        "away_team": "2",
        "date": "1",
        "score": "3"
    }
};

module.exports.SECOND_SELECTORS = [SECOND_SELECTORS_A, SECOND_SELECTORS_B];