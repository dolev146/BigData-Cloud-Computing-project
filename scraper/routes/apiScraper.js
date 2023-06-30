import express from "express";
const router = express.Router();

import puppeteer from "puppeteer";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get("/all-images", async (req, res) => {
    const browser = await puppeteer.launch();
  
    // Fetch images from spaceweatherlive.com
    let page = await browser.newPage();
    await page.goto("https://www.spaceweatherlive.com/en/solar-activity.html");
  
    const images = [
      { selector: "#SDO_512_0193", filename: "spaceweathersun.jpg" },
      { selector: "#SDO_HMIIF_512", filename: "sunspot-regions.jpg" },
      { selector: "#LASCO_C2", filename: "coronal-mass.jpg" },
      { selector: "#SDO_512_0131", filename: "solarflares.jpg" },
      { selector: "#EUVI195", filename: "far-side.jpg" },
    ];
  
    let responseImages = {};
  
    for (const img of images) {
      const imgUrl = await page.evaluate((selector) => {
        const img = document.querySelector(selector);
        return img.src;
      }, img.selector);
  
      console.log(`Image source URL: ${imgUrl}`);
  
      // Download the image
      const response = await fetch(imgUrl);
      const buffer = await response.arrayBuffer();
  
      // Encode the image to Base64
      const base64Image = Buffer.from(buffer).toString("base64");
  
      // Store in the responseImages object
      responseImages[img.filename] = base64Image;
    }
  
    // Fetch image from theskylive.com
    page = await browser.newPage();
    await page.goto("https://theskylive.com/sun-info");
  
    const theskylivesunImgUrl = await page.evaluate(() => {
      const img = document.querySelector(".sun_container img");
      return img.src;
    });
  
    console.log(`Image source URL: ${theskylivesunImgUrl}`);
  
    // Download the image
    const response = await fetch(theskylivesunImgUrl);
    const buffer = await response.arrayBuffer();
  
    // Encode the image to Base64
    const base64Image = Buffer.from(buffer).toString("base64");
  
    // Store in the responseImages object
    responseImages["theskylivesun.jpg"] = base64Image;
  
    browser.close();
  
    // Send the response
    res.status(200).json({ images: responseImages });
  });

export default router;
