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

router.get("/theskylivesun", (req, res) => {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://theskylive.com/sun-info");

    const imgUrl = await page.evaluate(() => {
      const img = document.querySelector(".sun_container img");
      return img.src;
    });

    console.log(`Image source URL: ${imgUrl}`);

    // Download the image
    const response = await fetch(imgUrl);
    const buffer = await response.arrayBuffer();

    const filePath = path.resolve(__dirname, "images", "theskylivesun.jpg"); // Change filename as you wish

    // Ensure images directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    fs.writeFile(filePath, Buffer.from(buffer), () => {
      console.log("Image downloaded");
      browser.close();
    });
  })();

  res.status(200).json({ message: "image downloaded seccussfully" });
});


router.get("/spaceweathersun", (req, res) => {
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto("https://www.spaceweatherlive.com/en/solar-activity.html");
  
      const imgUrl = await page.evaluate(() => {
        const img = document.querySelector("#SDO_512_0193");
        return img.src;
      });
  
      console.log(`Image source URL: ${imgUrl}`);
  
      // Download the image
      const response = await fetch(imgUrl);
      const buffer = await response.arrayBuffer();
  
      const filePath = path.resolve(__dirname, "images", "spaceweathersun.jpg"); // Change filename as you wish
  
      // Ensure images directory exists
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
  
      fs.writeFile(filePath, Buffer.from(buffer), () => {
        console.log("Image downloaded");
        browser.close();
      });
    })();
  
    res.status(200).json({ message: "image downloaded seccussfully" });
  });

  router.get("/sunspot-regions", (req, res) => {
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto("https://www.spaceweatherlive.com/en/solar-activity.html");
  
      const imgUrl = await page.evaluate(() => {
        const img = document.querySelector("#SDO_HMIIF_512");
        return img.src;
      });
  
      console.log(`Image source URL: ${imgUrl}`);
  
      // Download the image
      const response = await fetch(imgUrl);
      const buffer = await response.arrayBuffer();
  
      const filePath = path.resolve(__dirname, "images", "sunspot-regions.jpg"); // Change filename as you wish
  
      // Ensure images directory exists
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
  
      fs.writeFile(filePath, Buffer.from(buffer), () => {
        console.log("Image downloaded");
        browser.close();
      });
    })();
  
    res.status(200).json({ message: "image downloaded seccussfully" });
  });


  router.get("/coronal-mass", (req, res) => {
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto("https://www.spaceweatherlive.com/en/solar-activity.html");
  
      const imgUrl = await page.evaluate(() => {
        const img = document.querySelector("#LASCO_C2");
        return img.src;
      });
  
      console.log(`Image source URL: ${imgUrl}`);
  
      // Download the image
      const response = await fetch(imgUrl);
      const buffer = await response.arrayBuffer();
  
      const filePath = path.resolve(__dirname, "images", "coronal-mass.jpg"); // Change filename as you wish
  
      // Ensure images directory exists
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
  
      fs.writeFile(filePath, Buffer.from(buffer), () => {
        console.log("Image downloaded");
        browser.close();
      });
    })();
  
    res.status(200).json({ message: "image downloaded seccussfully" });
  });

  router.get("/solarflares", (req, res) => {
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto("https://www.spaceweatherlive.com/en/solar-activity.html");
  
      const imgUrl = await page.evaluate(() => {
        const img = document.querySelector("#SDO_512_0131");
        return img.src;
      });
  
      console.log(`Image source URL: ${imgUrl}`);
  
      // Download the image
      const response = await fetch(imgUrl);
      const buffer = await response.arrayBuffer();
  
      const filePath = path.resolve(__dirname, "images", "solarflares.jpg"); // Change filename as you wish
  
      // Ensure images directory exists
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
  
      fs.writeFile(filePath, Buffer.from(buffer), () => {
        console.log("Image downloaded");
        browser.close();
      });
    })();
  
    res.status(200).json({ message: "image downloaded seccussfully" });
  });


  router.get("/far-side", (req, res) => {
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto("https://www.spaceweatherlive.com/en/solar-activity.html");
  
      const imgUrl = await page.evaluate(() => {
        const img = document.querySelector("#EUVI195");
        return img.src;
      });
  
      console.log(`Image source URL: ${imgUrl}`);
  
      // Download the image
      const response = await fetch(imgUrl);
      const buffer = await response.arrayBuffer();
  
      const filePath = path.resolve(__dirname, "images", "far-side.jpg"); // Change filename as you wish
  
      // Ensure images directory exists
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
  
      fs.writeFile(filePath, Buffer.from(buffer), () => {
        console.log("Image downloaded");
        browser.close();
      });
    })();
  
    res.status(200).json({ message: "image downloaded seccussfully" });
  });





router.post("/", (req, res) => {
  console.log("post request create user");
  res.status(200).json({ message: "success create user" });
});

export default router;
