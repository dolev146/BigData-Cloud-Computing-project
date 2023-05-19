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

// interface CosmicEventInterface {
//   eventTS: number;
//   eventSource: string;
//   ra: RALocationUnits;
//   dec: DECLocationUnits;
//   eventType: EventType;
//   urgency: number;
// }

const getRandomNumberByMaxVal = (maxVal: number) => {
  return Math.floor(Math.random() * maxVal);
};

function generateValidDEC() {
  const minDEC = -90;
  const maxDEC = 90;

  // Generate a random number between -90 and 90 (inclusive)
  const randomDEC = Math.floor(Math.random() * (maxDEC - minDEC + 1)) + minDEC;

  return randomDEC;
}

class CosmicEvent {
  eventTS: number;
  eventSource: string;
  ra: RALocationUnits;
  dec: DECLocationUnits;
  eventType: EventType;
  urgency: number;

  constructor(
    eventTS: number,
    eventSource: string,
    eventType: EventType,
    urgency: number
  ) {
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
    this.eventType = eventType;
    this.urgency = urgency;
    this.eventSource = eventSource;
    this.eventTS = eventTS;
  }
}
