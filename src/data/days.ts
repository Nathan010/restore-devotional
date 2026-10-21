import type { CategoryKey } from "./categories";
import { devotionals1to10 } from "./devotionals-1-10";
import { devotionals11to21 } from "./devotionals-11-21";
import { devotionals98to112 } from "./devotionals-98-112";

export type Day = {
  day: number;
  title: string;
  passage: string;
  category: CategoryKey;
  /** Written devotional body. When absent the day renders a Coming soon state. */
  body?: string[];
  reflection?: string[];
};

export type Movement = {
  numeral: string;
  title: string;
  start: number;
  end: number;
};

export const movements: Movement[] = [
  { numeral: "I", title: "Ruin, Exile, and Promise", start: 1, end: 12 },
  { numeral: "II", title: "The Return Begins", start: 13, end: 21 },
  { numeral: "III", title: "The Prophets Speak: Haggai", start: 22, end: 25 },
  { numeral: "IV", title: "The Prophets Speak: Zechariah", start: 26, end: 29 },
  { numeral: "V", title: "The Temple Finished", start: 30, end: 34 },
  { numeral: "VI", title: "A Greater Temple: John 2, and Psalm 126", start: 35, end: 36 },
  { numeral: "VII", title: "Meanwhile in Persia: Esther", start: 37, end: 41 },
  { numeral: "VIII", title: "Ezra Arrives", start: 42, end: 54 },
  { numeral: "IX", title: "The Silent Years: Psalm 130", start: 55, end: 55 },
  { numeral: "X", title: "Nehemiah Comes Home", start: 56, end: 61 },
  { numeral: "XI", title: "Building and Opposition", start: 62, end: 73 },
  { numeral: "XII", title: "Scripture Fulfilled: Luke 4", start: 74, end: 74 },
  { numeral: "XIII", title: "Revival", start: 75, end: 82 },
  { numeral: "XIV", title: "Covenant and City", start: 83, end: 89 },
  { numeral: "XV", title: "One New People: Ephesians 2", start: 90, end: 90 },
  { numeral: "XVI", title: "The Reforms Nobody Wanted to Make", start: 91, end: 96 },
  { numeral: "XVII", title: "Synthesis", start: 97, end: 97 },
  { numeral: "XVIII", title: "Unfinished Business: Malachi", start: 98, end: 101 },
  { numeral: "XIX", title: "Where the Story Was Always Heading", start: 102, end: 112 },
];

export function movementForDay(day: number): Movement {
  return movements.find((m) => day >= m.start && day <= m.end) ?? movements[0]!;
}

/** Small contextual "Where are we?" marker for the daily reader. */
export function historicalMarker(day: number): string {
  if (day <= 2) return "586 BC · Jerusalem · The city falls";
  if (day <= 11) return "586–540 BC · Babylon · Exile and promise";
  if (day === 12) return "539 BC · Babylon · Persia rises";
  if (day <= 21) return "538 BC · Persia · The return begins";
  if (day <= 29) return "520 BC · Jerusalem · The prophets speak";
  if (day <= 34) return "516 BC · Jerusalem · The temple finished";
  if (day === 35) return "c. AD 30 · Jerusalem · A greater temple";
  if (day === 36) return "After the return · Jerusalem · Songs of the restored";
  if (day <= 41) return "c. 480s–470s BC · Susa · God unnamed, God at work";
  if (day <= 54) return "458 BC · Jerusalem · Ezra arrives";
  if (day === 55) return "c. 450s BC · Waiting · The silent years";
  if (day <= 73) return "445 BC · Jerusalem · Nehemiah rebuilds";
  if (day === 74) return "c. AD 28 · Nazareth · Scripture fulfilled";
  if (day <= 89) return "445–444 BC · Jerusalem · Revival and covenant";
  if (day === 90) return "c. AD 60 · Ephesus · One new people";
  if (day <= 97) return "c. 432 BC · Jerusalem · Reform and relapse";
  if (day <= 101) return "c. 430 BC · Jerusalem · Unfinished business";
  return "The age of fulfilment · Christ, Spirit, new creation";
}

type Seed = [number, string, string, CategoryKey];

const seeds: Seed[] = [
  [1, "When Everything Falls Apart", "2 Chronicles 36:15–21", "historical"],
  [2, "The Pain That Doesn't Get Skipped", "Psalm 137", "historical"],
  [3, "Seventy Years, Determined in Advance", "Jeremiah 25:8–14", "promise"],
  [4, "Build Houses in Babylon", "Jeremiah 29:1–14", "promise"],
  [5, "The Heart That Must Change", "Deuteronomy 30:1–10", "promise"],
  [6, "A New Covenant", "Jeremiah 31:31–34", "promise"],
  [7, "A New Heart and Spirit", "Ezekiel 36:22–32", "promise"],
  [8, "Can These Bones Live?", "Ezekiel 37:1–14", "promise"],
  [9, "Comfort My People", "Isaiah 40:1–11", "promise"],
  [10, "How Beautiful Are the Feet", "Isaiah 52:7–12", "promise"],
  [11, "The Servant Who Carries What Reform Can't Fix", "Isaiah 53:4–6, 10–12", "promise"],
  [12, "The Prayer Behind the Decree", "Daniel 9:1–19", "historical"],
  [13, "The God Who Moves Kings", "2 Chronicles 36:22–23 and Ezra 1:1–4", "ezraneh"],
  [14, "The Freewill Offering", "Ezra 1:5–11", "ezraneh"],
  [15, "A Remnant, Named and Numbered", "Ezra 2 (selected: 1–2, 59–63, 64–70)", "ezraneh"],
  [16, "An Altar Rebuilt Despite Fear", "Ezra 3:1–6", "ezraneh"],
  [17, "A Foundation, and Workers Organised", "Ezra 3:7–9", "ezraneh"],
  [18, "Weeping and Rejoicing, Indistinguishable", "Ezra 3:10–13", "ezraneh"],
  [19, '"Let Us Help You"', "Ezra 4:1–5", "ezraneh"],
  [20, "The Accusation Letter", "Ezra 4:6–16", "ezraneh"],
  [21, "When the Work Stops", "Ezra 4:17–24", "ezraneh"],
  [22, "Consider Your Ways", "Haggai 1:1–11", "prophet"],
  [23, "The Spirit Stirred, and They Obeyed", "Haggai 1:12–15", "prophet"],
  [24, "The Latter Glory, and a Holiness That Isn't Contagious", "Haggai 2:1–19", "prophet"],
  [25, "Zerubbabel, the Signet Ring", "Haggai 2:20–23", "prophet"],
  [26, "Return to Me; Filthy Garments and the Branch", "Zechariah 1:1–6; 3:1–10", "prophet"],
  [27, "Not by Might, Nor by Power", "Zechariah 4:1–14", "prophet"],
  [28, "The Branch Who Will Build the Temple", "Zechariah 6:9–15; 8:1–8", "prophet"],
  [29, "Your King Is Coming to You, Humble", "Zechariah 9:9–13", "prophet"],
  [30, "The Prophets Speak, and the Work Resumes", "Ezra 5:1–2", "ezraneh"],
  [31, "An Honest Inquiry, and Providence Inside Bureaucracy", "Ezra 5:3–17", "ezraneh"],
  [32, "A Pagan King Funds the Worship of Israel's God", "Ezra 6:1–12", "ezraneh"],
  [33, "Finished, and Joyfully Dedicated", "Ezra 6:13–18", "ezraneh"],
  [34, "Passover, and Joy That Reaches Gentile Hearts", "Ezra 6:19–22", "ezraneh"],
  [35, "Destroy This Temple", "John 2:13–22", "nt"],
  [36, "When the LORD Restored Our Fortunes", "Psalm 126", "historical"],
  [37, "A Queen Deposed, a Girl Chosen", "Esther 1:1–2:18", "historical"],
  [38, "Loyalty and a Plot", "Esther 2:19–4:3", "historical"],
  [39, "For Such a Time as This", "Esther 4:4–17", "historical"],
  [40, "The Banquet and the Reversal", "Esther 5:1–7:10", "historical"],
  [41, "Deliverance, and a God Present Even When Unnamed", "Esther 8:1–10:3", "historical"],
  [42, "A Man Who Set His Heart", "Ezra 7:1–10", "ezraneh"],
  [43, "A King's Extravagant Provision", "Ezra 7:11–20", "ezraneh"],
  [44, "Protecting the Priests from Tax and Wrath", "Ezra 7:21–24", "ezraneh"],
  [45, "Ezra's Charge, and His Praise", "Ezra 7:25–28", "ezraneh"],
  [46, "Those Who Went Up with Ezra", "Ezra 8:1–14", "ezraneh"],
  [47, "Levites Recruited, and Fasting Instead of an Armed Escort", "Ezra 8:15–23", "ezraneh"],
  [48, "Weighed, Counted, Delivered Safely", "Ezra 8:24–36", "ezraneh"],
  [49, "The Report That Horrified Ezra", "Ezra 9:1–4", "ezraneh"],
  [50, "A Prayer That Begins in Shame", "Ezra 9:5–9", "ezraneh"],
  [51, "A Prayer That Ends in Confession", "Ezra 9:10–15", "ezraneh"],
  [52, "Corporate Weeping, and a Way Forward", "Ezra 10:1–6", "ezraneh"],
  [53, "A Careful, Costly Process", "Ezra 10:7–17", "ezraneh"],
  [54, "The Names, and an Ending with No Neat Resolution", "Ezra 10:18–44", "ezraneh"],
  [55, "Waiting for the LORD", "Psalm 130", "prayer"],
  [56, "Bad News in Susa", "Nehemiah 1:1–4", "ezraneh"],
  [57, "A Prayer of Adoration, Confession, and Request", "Nehemiah 1:5–11", "ezraneh"],
  [58, "Courage Before the King", "Nehemiah 2:1–8", "ezraneh"],
  [59, "A Night Ride Around the Ruins", "Nehemiah 2:9–16", "ezraneh"],
  [60, "Let Us Rise Up and Build", "Nehemiah 2:17–20", "ezraneh"],
  [61, "Unless the LORD Builds the House", "Psalm 127", "prayer"],
  [62, "Leaders and Priests Build First", "Nehemiah 3:1–16", "ezraneh"],
  [63, "Ordinary Names, Ordinary Sections of Wall", "Nehemiah 3:17–32", "ezraneh"],
  [64, "Ridicule, and a Mind to Work", "Nehemiah 4:1–6", "ezraneh"],
  [65, 'Conspiracy, Fear, and "Remember the Lord"', "Nehemiah 4:7–14", "ezraneh"],
  [66, "A Trowel in One Hand, a Sword in the Other", "Nehemiah 4:15–23", "ezraneh"],
  [67, "Oppression Inside the Covenant Community", "Nehemiah 5:1–5", "ezraneh"],
  [68, "A Costly Confrontation", "Nehemiah 5:6–13", "ezraneh"],
  [69, "Nehemiah's Example of Self-Denial", "Nehemiah 5:14–19", "ezraneh"],
  [70, '"I Am Doing a Great Work"', "Nehemiah 6:1–9", "ezraneh"],
  [71, "Discerning a False Prophet", "Nehemiah 6:10–14", "ezraneh"],
  [72, "Fifty-Two Days", "Nehemiah 6:15–19", "ezraneh"],
  [73, "A Census, and Guarding What Was Built", "Nehemiah 7:1–73", "ezraneh"],
  [74, "Jesus Reads, and Announces Fulfilment", "Luke 4:16–21", "nt"],
  [75, "The Law Read Aloud, and Understood", "Nehemiah 8:1–8", "ezraneh"],
  [76, "The Joy of the LORD Is Your Strength", "Nehemiah 8:9–12", "ezraneh"],
  [77, "A Forgotten Feast, Rediscovered", "Nehemiah 8:13–18", "ezraneh"],
  [78, "Confession and Worship Together", "Nehemiah 9:1–5", "ezraneh"],
  [79, "A Prayer That Rehearses History", "Nehemiah 9:6–15", "ezraneh"],
  [80, "Wilderness Rebellion, Mercy That Wouldn't Let Go", "Nehemiah 9:16–25", "ezraneh"],
  [81, "Centuries of the Same Cycle", "Nehemiah 9:26–31", "ezraneh"],
  [82, '"We Are Slaves" — Honest Lament', "Nehemiah 9:32–38", "ezraneh"],
  [83, "Those Who Signed Their Names", "Nehemiah 10:1–27", "ezraneh"],
  [84, "Specific, Costly Commitments", "Nehemiah 10:28–39", "ezraneh"],
  [85, "Volunteers for a Half-Empty City", "Nehemiah 11:1–24", "ezraneh"],
  [86, "The Wider Land, Remembered", "Nehemiah 11:25–36", "ezraneh"],
  [87, "Generations of Priests and Levites", "Nehemiah 12:1–26", "ezraneh"],
  [88, "Two Choirs, Joy Heard Far Off", "Nehemiah 12:27–43", "ezraneh"],
  [89, "Ordinary Structures of Worship, Restored", "Nehemiah 12:44–47", "ezraneh"],
  [90, "Christ Our Peace, a Holy Temple in the Lord", "Ephesians 2:11–22", "nt"],
  [91, "Rereading the Law, Still Being Formed", "Nehemiah 13:1–3", "ezraneh"],
  [92, "Tobiah's Room in the Temple", "Nehemiah 13:4–9", "ezraneh"],
  [93, '"Remember Me, O My God, Concerning This"', "Nehemiah 13:10–14", "ezraneh"],
  [94, "Confronting Sabbath-Breaking", "Nehemiah 13:15–22", "ezraneh"],
  [95, "The Old Sin Returns", "Nehemiah 13:23–27", "ezraneh"],
  [96, "An Abrupt Ending, and a Final Prayer", "Nehemiah 13:28–31", "ezraneh"],
  [97, "Two Books, One Story", "Nehemiah 13:31b", "ezraneh"],
  [98, "Blemished Sacrifices, Halfhearted Worship", "Malachi 1:6–14", "prophet"],
  [99, "Do We Not All Have One Father?", "Malachi 2:10–16", "prophet"],
  [100, "Robbing God", "Malachi 3:6–12", "prophet"],
  [101, "A Book of Remembrance, and Elijah to Come", "Malachi 3:16–4:6", "prophet"],
  [102, "Worship in Spirit and Truth", "John 4:19–26", "nt"],
  [103, "Living Stones, a Spiritual House", "1 Peter 2:4–10", "nt"],
  [104, "A Better Covenant", "Hebrews 8:6–13", "nt"],
  [105, "A Better Sacrifice, Once for All", "Hebrews 9:11–14", "nt"],
  [106, "Confidence to Draw Near", "Hebrews 10:19–25", "nt"],
  [107, "Pentecost: the Spirit Poured Out", "Acts 2:1–41", "nt"],
  [108, "Circumcision of the Heart, One Family", "Galatians 3:26–29; Romans 2:28–29", "nt"],
  [109, "Everything Written About Me Must Be Fulfilled", "Luke 24:44–49", "nt"],
  [110, "A New Heaven and a New Earth", "Revelation 21:1–8", "nt"],
  [111, "No Temple, for the Lamb Is Its Temple", "Revelation 21:22–22:5", "nt"],
  [112, "Until He Comes", "Revelation 22:12–21", "nt"],
];

type Written = { body: string[]; reflection: string[] };

const written: Record<number, Written> = {
  ...devotionals1to10,
  ...devotionals11to21,
  ...devotionals98to112,
};

export const days: Day[] = seeds.map(([day, title, passage, category]) => {
  const w = written[day];
  return w
    ? { day, title, passage, category, body: w.body, reflection: w.reflection }
    : { day, title, passage, category };
});

export const TOTAL_DAYS = days.length;

export function getDay(day: number): Day | undefined {
  return days.find((d) => d.day === day);
}

export function bibleGatewayUrl(passage: string): string {
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(passage)}&version=NIV`;
}