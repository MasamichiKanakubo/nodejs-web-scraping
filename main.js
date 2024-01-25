const express = require('express');
const PORT = 8000

const axios = require('axios');
const cheerio = require('cheerio');

const data = [];

// web scraping method
const URL = "https://www.amazon.co.jp/s?k=javascript&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=BQG7L881YAT6&sprefix=javascrip%2Caps%2C245&ref=nb_sb_noss_2"
axios(URL)
    .then((response) => {
        const htmlParser = response.data;
        // console.log(htmlParser)

        const $ = cheerio.load(htmlParser);
        $(".puis-card-container").each(function () {
            const title = $(this).find(".a-size-base-plus").text();
            const price = $(this).find(".a-price-whole").text();
            data.push({ title, price });
        });
        console.log(data.slice(0, 10))

    })
    .catch((error) => console.log(error));

const app = express();
app.listen(PORT, console.log("server running"))

