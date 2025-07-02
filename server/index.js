import dotenv from 'dotenv';
dotenv.config();
import sql from "./db.js";

import express from 'express';
import cors from 'cors';
import scrapeAndStoreData from "./scrape-cron.js";
import getParts from "./suggestedData.js";

const app = express();
app.use(cors());
app.use(express.json());


// post because when called from the cron job, we need to send a post request to the server
app.post("/update-scrape", async (req, res) => {
  await scrapeAndStoreData();
  res.send('Scraping complete');
});

app.post("/get-parts", async (req, res) => {
  const { parts } = req.body;
  const finalParts = await getParts(parts);
  if (finalParts) {
    res.json({finalParts});
    console.log(finalParts);
  } else {
    res.status(404).json({ error: "No parts found" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


