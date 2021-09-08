const { Pool } = require('pg');

const dbConfig = {
	"user": process.env.POSTGRES_USER ? process.env.POSTGRES_USER : "soccer",
	"host": process.env.POSTGRES_HOST ? process.env.POSTGRES_HOST : "192.168.1.54",
	"database": process.env.POSTGRES_DB ? process.env.POSTGRES_DB : "soccer",
	"password": process.env.POSTGRES_PASSWORD ? process.env.POSTGRES_PASSWORD : "soccer",
	"port": process.env.POSTGRES_PORT ? process.env.POSTGRES_PORT : "5432"
};

let poolClients = new Pool(dbConfig);


async function insertRecords(records) {
    try {
        const query = `INSERT INTO gamerecords(
            hash,
            date,
            season,
            matchday, 
            home_team, 
            away_team,
            score,
            league_title) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`;

        let arrayRecords = records.map(rec => [rec.hash, rec.date, rec.season, rec.matchday, rec.home, rec.away, rec.score, rec.league]);
        await poolClients.query(query, arrayRecords);
    } catch(err) {
        console.error(err);
    }

}

module.exports.insertRecords = insertRecords;
