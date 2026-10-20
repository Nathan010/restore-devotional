export type MemoryVerse = {
  week: number;
  reference: string;
  /** The church's preferred translation for all Scripture on this site. */
  translation: "NIV";
  /** NIV wording supplied directly for this project. */
  nivText: string;
  /** Short theme / learning prompt. */
  theme: string;
  section: string;
};

export const TOTAL_WEEKS = 16;
export const DAYS_PER_WEEK = 7;
export const PREFERRED_TRANSLATION = "NIV";

/** Days 1–7 = Week 1, 8–14 = Week 2, ... 106–112 = Week 16. */
export function weekForDay(day: number): number {
  const d = Math.min(Math.max(Math.floor(day), 1), TOTAL_WEEKS * DAYS_PER_WEEK);
  return Math.floor((d - 1) / DAYS_PER_WEEK) + 1;
}

/** First and last day number of a given week. */
export function weekRange(week: number): { start: number; end: number } {
  const w = Math.min(Math.max(Math.floor(week), 1), TOTAL_WEEKS);
  return { start: (w - 1) * DAYS_PER_WEEK + 1, end: w * DAYS_PER_WEEK };
}

/** The supplied NIV text to practise. */
export function practiceText(v: MemoryVerse): { text: string } {
  return { text: v.nivText };
}

export const memoryVerses: MemoryVerse[] = [
  {
    week: 1,
    reference: "Jeremiah 31:33",
    translation: "NIV",
    nivText:
      "“This is the covenant I will make with the people of Israel after that time,” declares the Lord. “I will put my law in their minds and write it on their hearts. I will be their God, and they will be my people.”",
    theme: "The new covenant — the law written on the heart",
    section: "Ruin, Exile, and Promise",
  },
  {
    week: 2,
    reference: "Ezra 1:1–2",
    translation: "NIV",
    nivText:
      "“In the first year of Cyrus king of Persia, in order to fulfill the word of the Lord spoken by Jeremiah, the Lord moved the heart of Cyrus king of Persia to make a proclamation throughout his realm and also to put it in writing: 2 “This is what Cyrus king of Persia says: “‘The Lord, the God of heaven, has given me all the kingdoms of the earth and he has appointed me to build a temple for him at Jerusalem in Judah”",
    theme: "Restoration begins with God",
    section: "The Return Begins",
  },
  {
    week: 3,
    reference: "Ezra 3:11",
    translation: "NIV",
    nivText:
      "“With praise and thanksgiving they sang to the Lord: “He is good; his love toward Israel endures forever.” And all the people gave a great shout of praise to the Lord, because the foundation of the house of the Lord was laid.”",
    theme: "Worship amid the rubble",
    section: "The Return Begins",
  },
  {
    week: 4,
    reference: "Zechariah 4:6",
    translation: "NIV",
    nivText:
      "“So he said to me, “This is the word of the Lord to Zerubbabel: ‘Not by might nor by power, but by my Spirit,’ says the Lord Almighty.”",
    theme: "Not by strength, but by the Spirit",
    section: "The Prophets Speak",
  },
  {
    week: 5,
    reference: "John 2:19",
    translation: "NIV",
    nivText: "“Jesus answered them, “Destroy this temple, and I will raise it again in three days.””",
    theme: "Jesus, the greater temple",
    section: "A Greater Temple",
  },
  {
    week: 6,
    reference: "Ezra 7:10",
    translation: "NIV",
    nivText:
      "“For Ezra had devoted himself to the study and observance of the Law of the Lord, and to teaching its decrees and laws in Israel.”",
    theme: "Study, do, teach",
    section: "Ezra Arrives",
  },
  {
    week: 7,
    reference: "Psalm 130:5",
    translation: "NIV",
    nivText: "“I wait for the Lord, my whole being waits, and in his word I put my hope.”",
    theme: "Waiting on the word",
    section: "The Silent Years",
  },
  {
    week: 8,
    reference: "Nehemiah 2:18",
    translation: "NIV",
    nivText:
      "“I also told them about the gracious hand of my God on me and what the king had said to me. They replied, “Let us start rebuilding.” So they began this good work.”",
    theme: "The gracious hand of God — let us rise up and build",
    section: "Nehemiah Comes Home",
  },
  {
    week: 9,
    reference: "Nehemiah 4:14",
    translation: "NIV",
    nivText:
      "“After I looked things over, I stood up and said to the nobles, the officials and the rest of the people, “Don’t be afraid of them. Remember the Lord, who is great and awesome, and fight for your families, your sons and your daughters, your wives and your homes.””",
    theme: "Remember the Lord",
    section: "Building and Opposition",
  },
  {
    week: 10,
    reference: "Nehemiah 8:10",
    translation: "NIV",
    nivText:
      "“Nehemiah said, “Go and enjoy choice food and sweet drinks, and send some to those who have nothing prepared. This day is holy to our Lord. Do not grieve, for the joy of the Lord is your strength.””",
    theme: "Joy as strength",
    section: "Revival",
  },
  {
    week: 11,
    reference: "Nehemiah 9:17",
    translation: "NIV",
    nivText:
      "“They refused to listen and failed to remember the miracles you performed among them. They became stiff-necked and in their rebellion appointed a leader in order to return to their slavery. But you are a forgiving God, gracious and compassionate, slow to anger and abounding in love. Therefore you did not desert them.”",
    theme: "A God ready to forgive",
    section: "Confession and Covenant",
  },
  {
    week: 12,
    reference: "Psalm 127:1",
    translation: "NIV",
    nivText:
      "“Unless the Lord builds the house, the builders labor in vain. Unless the Lord watches over the city, the guards stand watch in vain.”",
    theme: "Unless the LORD builds",
    section: "Walls and Watchmen",
  },
  {
    week: 13,
    reference: "Isaiah 53:5–6",
    translation: "NIV",
    nivText:
      "“But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed. We all, like sheep, have gone astray, each of us has turned to our own way; and the Lord has laid on him the iniquity of us all.”",
    theme: "The Servant bears our sin",
    section: "The Deeper Wound",
  },
  {
    week: 14,
    reference: "Hebrews 10:19–22",
    translation: "NIV",
    nivText:
      "“Therefore, brothers and sisters, since we have confidence to enter the Most Holy Place by the blood of Jesus, by a new and living way opened for us through the curtain, that is, his body, and since we have a great priest over the house of God, let us draw near to God with a sincere heart and with the full assurance that faith brings, having our hearts sprinkled to cleanse us from a guilty conscience and having our bodies washed with pure water.”",
    theme: "Draw near through Jesus",
    section: "Covenant Fulfilled",
  },
  {
    week: 15,
    reference: "Ephesians 2:19–20",
    translation: "NIV",
    nivText:
      "“Consequently, you are no longer foreigners and strangers, but fellow citizens with God’s people and also members of his household, built on the foundation of the apostles and prophets, with Christ Jesus himself as the chief cornerstone.”",
    theme: "One new people",
    section: "One New People",
  },
  {
    week: 16,
    reference: "Revelation 21:4–5",
    translation: "NIV",
    nivText:
      "“‘He will wipe every tear from their eyes. There will be no more death’ or mourning or crying or pain, for the old order of things has passed away.” “He who was seated on the throne said, “I am making everything new!” Then he said, “Write this down, for these words are trustworthy and true.””",
    theme: "All things new",
    section: "Where the Story Was Always Heading",
  },
];

export function memoryVerseForWeek(week: number): MemoryVerse {
  return memoryVerses[Math.min(Math.max(week, 1), TOTAL_WEEKS) - 1]!;
}

export function memoryVerseForDay(day: number): MemoryVerse {
  return memoryVerseForWeek(weekForDay(day));
}