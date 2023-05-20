interface RALocationUnits {
  hours: number;
  minutes: number;
  seconds: number;
}
interface DECLocationUnits {
  degrees: number;
  minutes: number;
  seconds: number;
}

enum EventType {
  GRB = "GRB",
  ApparentBrightnessRise = "Apparent Brightness Rise",
  UVRise = "UV Rise",
  XRayRise = "XRay Rise",
  Comet = "Comet",
}

enum EventSource {
  MMT = "MMT",
  GeminiObservatoryTelescopes = "Gemini Observatory Telescopes",
  VLT = "Very Large Telescope",
  SubaruTelescope = "Subaru Telescope",
  LBT = "Large Binocular Telescope",
  SALT = "Southern African Large Telescope",
  HET = "Hobby-Eberly Telescope",
  GranTeCan = "Gran Telescopio Canarias",
  GMT = "The Giant Magellan Telescope",
  TMT = "Thirty Meter Telescope",
  ELT = "European Extremely Large Telescope",
}

const getRandomEventSourceEnumValue = () => {
  const eventSources = Object.keys(EventSource);
  const randomIndex = Math.floor(Math.random() * eventSources.length);
  const randomEnumValue = eventSources[randomIndex];
  return randomEnumValue;
};

const getRandomEventTypeEnumValue = () => {
  const eventSources = Object.keys(EventType);
  const randomIndex = Math.floor(Math.random() * eventSources.length);
  const randomEnumValue = eventSources[randomIndex];
  return randomEnumValue;
};

const getRandomNumberByMaxVal = (maxVal: number) => {
  return Math.floor(Math.random() * maxVal);
};

const generateValidDEC = () => {
  const minDEC = -90;
  const maxDEC = 90;

  // Generate a random number between -90 and 90 (inclusive)
  const randomDEC = Math.floor(Math.random() * (maxDEC - minDEC + 1)) + minDEC;

  return randomDEC;
};

class CosmicEvent {
  eventTS: number;
  eventSource: string;
  ra: RALocationUnits;
  dec: DECLocationUnits;
  eventType: string;
  urgency: number;

  constructor(urgency: number) {
    this.ra = {
      minutes: getRandomNumberByMaxVal(59),
      hours: getRandomNumberByMaxVal(23),
      seconds: getRandomNumberByMaxVal(59),
    };
    this.dec = {
      minutes: getRandomNumberByMaxVal(59),
      seconds: getRandomNumberByMaxVal(59),
      degrees: generateValidDEC(),
    };
    this.eventType = getRandomEventTypeEnumValue();
    this.eventSource = getRandomEventSourceEnumValue();
    this.urgency = urgency;
    this.eventTS = new Date().getTime();
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const main = async () => {



  let eventCounter = 0;
  let eventToPublish;
  console.log("starting to generate events");

  while (true) {
    let priority = getRandomNumberByMaxVal(2);

    if (eventCounter % 100 === 0) {
      eventToPublish = new CosmicEvent(3);
    }

    if (eventCounter % 1000 === 0) {
      eventToPublish = new CosmicEvent(4);
    }

    if (eventCounter % 10000 === 0) {
      eventToPublish = new CosmicEvent(5);
    }

    if (eventCounter === undefined) {
      eventToPublish = new CosmicEvent(priority);
    }

    eventCounter++;
    eventToPublish = undefined;
    sleep(1000);
  }
};

main()
  .then(() => {
    console.log("Done");
  })
  .catch(() => {
    console.error("ERROR OCCURED!!");
  });