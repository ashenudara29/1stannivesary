/**
 * =========================================================================
 * 💜 OUR LITTLE UNIVERSE — CENTRAL LOVE STORY CONFIGURATION 💜
 * =========================================================================
 * 
 * Customize everything here without touching code or components!
 * Replace nicknames, dates, passcode, messages, photos, and music.
 * 
 * Images: Place your photos in /public/images/month-01/, etc.
 * Music: Place your audio tracks in /public/music/our-song.mp3, etc.
 */

export interface PhotoMemory {
  id: string;
  url: string;
  caption: string;
  date?: string;
  location?: string;
  secretNote?: string; // Optional secret note revealed by clicking the small heart
}

export interface MonthGift {
  title: string;
  subtitle: string;
  content: string;
  iconType: 'hug' | 'reason' | 'promise' | 'compliment' | 'joke' | 'dedication' | 'memory';
}

export interface MonthMilestone {
  monthNumber: number;
  title: string;
  date: string;
  tagline: string;
  introDescription: string;
  musicTrack?: string;
  musicTitle?: string;
  photos: PhotoMemory[];
  gift: MonthGift;
  themeColor?: string;
}
export interface LoveStoryConfig {
  couple: {
    girlfriendNickname: string;
    myNickname: string;
    anniversaryDate: string; // YYYY-MM-DD for dynamic days counter
  };
  security: {
    passcode: string; // 4 to 6 digit secret passcode
    hintText: string;
    errorMessage: string;
  };
  music: {
    songTitle: string;
    artist: string;
    dedication: string;
    audioFile: string; // e.g. "/music/our-song.mp3"
  };
  secretEnvelope: {
    title: string;
    subtitle: string;
    letterContent: string[];
    buttonText: string;
  };
  fingerprint: {
    heading: string;
    instruction: string;
    subtext: string;
    steps: string[];
  };
  anniversaryLetter: {
    heading: string;
    salutation: string;
    paragraphs: string[];
    signoff: string;
    closingName: string;
  };
  months: MonthMilestone[];
  reasonsILoveYou: string[];
  finale: {
    heading: string;
    subheading: string;
    giftBoxTitle: string;
    letterParagraphs: string[];
    favoritePhotoUrl?: string;
    favoritePhotoCaption?: string;
  };
}

export const loveStoryConfig: LoveStoryConfig = {
  couple: {
    girlfriendNickname: "My Sweetest Bubu 🧸",
    myNickname: "Your Loving Dudu 🐻",
    anniversaryDate: "2024-10-10", // 1 year anniversary reference
  },

  security: {
    passcode: "1010", // EDIT THIS: Can be your anniversary date (e.g. 1010) or any 4-6 digit pin
    hintText: "Hint: The day our magical story officially began 💜 (Default: 1010)",
    errorMessage: "Oops, not quite! Try our special date again, my love 🥺💔",
  },

  music: {
    songTitle: "Until I Found You (Our Universe Melody)",
    artist: "Dedicated with All My Heart",
    dedication: "To the girl who turned my everyday life into poetry. Every beat belongs to you.",
    audioFile: "/music/our-song.mp3",
  },

  secretEnvelope: {
    title: "Wait, there's a tiny message for you...",
    subtitle: "Someone made a little surprise just for your heart 💜",
    letterContent: [
      "Hi, my favorite person! 🧸💜",
      "Are you ready to enter our little universe?",
      "There's a whole year of love, laughter, silly late-night talks, unforgettable memories, and little surprises waiting just for you."
    ],
    buttonText: "Continue, My Love ✨",
  },

  fingerprint: {
    heading: "One More Little Thing...",
    instruction: "Place your finger here, my love 💜",
    subtext: "Touch and hold for 3 seconds to open your letter.",
    steps: [
      "Finding your heartbeat...",
      "Connecting our memories...",
      "Checking our little universe...",
      "Love verified! 💜"
    ],
  },

  anniversaryLetter: {
    heading: "💌 මගේ චූටි මැණික් කැටේ.. ❤️🧸",
    salutation: "",
    paragraphs: [
      "අපි දෙන්නා ආදරේ කරන්න පටන් අරන් අදට අවුරුද්දක් නේද 💗 අපි එකතු කරගත්ත ලස්සන මතක, එකට හිනා වුණ හැටි, පුංචි පුංචි රණ්ඩු, තරහ වෙලා ආයෙත් යාළු වුණ හැටි මේ හැමදේම මට හරිම වටිනවා. ❤️",
      "ඔයා මගේ ජීවිතේට ආවට පස්සේ තමයි මගේ ලෝකේ මෙච්චර ලස්සන වුනේ ඇත්තටම. ඔයා තමයි මගේ ජීවිතේ මට හම්බ වුණු වටිනම කෙනා, මගේ හැමදේම ඔයා. 🫶🏻💕 ඔයාගේ එක හිනාවකට, මගේ මුළු දවසම ලස්සන කරන්න පුළුවන් චූටි පැංචෝ.. ❤️🫂",
      "මම දන්නවා අපි හැම වෙලාවෙම perfect නෑ කියලා. සමහර වෙලාවට රණ්ඩු වෙයි, තරහ වෙයි, තේරුම් ගන්න බැරි වෙයි. ඒත් මොන දේ වුණත් මට ඕනේ හැමදේකදීම ඔයා මගේ ළඟින් ඉන්නයි. 🥹❤️",
      "මගේ පැංචියෝ, මට ආදරේ කරනවටත්, මගේ ළඟින් ඉන්නවටත්, මගේ ජීවිතේ මෙච්චර ලස්සන කරනවටත් ගොඩක් ස්තූතියි. මට පුළුවන් නම් ආයෙත් මුල ඉඳන් ජීවිතේ පටන් ගන්න, මම ආයෙත් තෝරගන්නේ ඔයාවමයි. මොකද මගේ හිත හැමදාමත් තෝරගන්නේ ඔයාව විතරයි. 💋💗",
      "මට ඕනේ ඉස්සරහටත් ඔයා එක්ක තව ගොඩක් මතක එකතු කරන්න, ඔයාගේ හීන හැබෑ කරගන්න ඔයාට උදව් කරන්න, ඔයා දුකින් ඉන්නකොට ඔයාගේ ළඟින් ඉන්න, ඔයා සතුටින් ඉන්නකොට ඔයාත් එක්ක සතුටු වෙන්න. මොන දේ වුණත් ඔයාට ආදරේ කරන කෙනෙක් ඔයා ළඟ ඉන්නවා කියලා හැමදාම දැනෙන්න සලස්වන්නයි මට ඕනේ. 🫂💞",
      "අපේ පළවෙනි අවුරුද්ද ඉවර වුණාට අපේ ආදර කතාව තාම පටන් ගත්තා විතරයි. තව ගොඩක් දුර අපිට යන්න තියෙනවා, එකට හීන දකින්න, ඒ හැම හීනයක්ම එකට හැබෑ කරගන්න අපිට පුළුවන් වෙන්න ඕනේ. 🥹♾️❤️",
      "මම ඔයාට අදත් ආදරෙයි, හෙටත් ආදරෙයි, මගේ ජීවිතේ ඉතුරු හැම දවසකමත් ආදරෙයි. 🧸🎀💋"
    ],
    signoff: "ආදරෙයි මගේ චූටි මැණිකට කියාගන්න බැරි තරම්! ❤️🫂💌",
    closingName: "ඔයාගේ පණ්ඩිත කොල්ලා ❤️"
  },

  months: [
    {
      monthNumber: 1,
      title: "Our Beginning",
      date: "Month 1 • The Spark",
      tagline: "Where two strangers became each other's favorite person.",
      introDescription: "The day everything changed for the better. The awkward smiles, the fluttering heartbeats, and the realization that something beautiful was beginning.",
      musicTrack: "/music/month-01.mp3",
      musicTitle: "A Thousand Years",
      photos: [
        {
          id: "m1-1",
          url: "/images/month-01/photo-1.jpg",
          caption: "Our very first photo together — both of us pretending not to be nervous!",
          date: "Day 1",
          location: "Where it all started",
          secretNote: "My heart was racing so fast when you stood next to me. I knew right then you were someone extraordinary."
        },
        {
          id: "m1-2",
          url: "/images/month-01/photo-2.jpg",
          caption: "That warm coffee date where we lost track of time for hours.",
          date: "Week 2",
          location: "Our cozy cafe corner",
          secretNote: "I ordered coffee I didn't even like just so we could sit and keep talking."
        }
      ],
      gift: {
        title: "Reason I Fell For You #1",
        subtitle: "A little token from Month One 🎁",
        content: "The genuine kindness in your eyes when you laughed at my silly joke. You made me feel seen and completely at ease from minute one.",
        iconType: "reason"
      }
    },
    {
      monthNumber: 2,
      title: "Late Night Talks",
      date: "Month 2 • Soft Whispers",
      tagline: "Staying awake until 3 AM just to hear your sleepy laugh.",
      introDescription: "Our conversations never seemed to run dry. From deep dreams to silly memes, every conversation brought us closer.",
      musicTrack: "/music/month-02.mp3",
      musicTitle: "Warm & Cozy",
      photos: [
        {
          id: "m2-1",
          url: "/images/month-02/photo-1.jpg",
          caption: "Screenshot of our marathon video calls — looking sleepy but happy.",
          date: "Late Night",
          location: "On our phones",
          secretNote: "I'd sacrifice any amount of sleep just to listen to your voice before drifting off."
        }
      ],
      gift: {
        title: "A Midnight Promise",
        subtitle: "From Month Two with Love 🌙",
        content: "I promise to always be the person you can call, no matter what time it is, whenever the world gets too heavy or you simply want to talk.",
        iconType: "promise"
      }
    },
    {
      monthNumber: 3,
      title: "First Adventures",
      date: "Month 3 • Little Getaways",
      tagline: "Hand in hand, discovering new horizons together.",
      introDescription: "Taking our first road trips and exploring new corners of the city. Every place felt ten times more magical with your hand in mine.",
      musicTrack: "/music/month-03.mp3",
      musicTitle: "Sunlit Pathways",
      photos: [
        {
          id: "m3-1",
          url: "/images/month-03/photo-1.jpg",
          caption: "That sunset we stopped on the highway to admire together.",
          date: "Golden Hour",
          location: "Scenic Viewpoint",
          secretNote: "I spent more time watching your face glow in the sunset than looking at the sky."
        }
      ],
      gift: {
        title: "Favorite Memory #3",
        subtitle: "The Road Trip Giggle 🚗",
        content: "Singing terribly off-key to old pop songs with the windows rolled down. Your laugh during the chorus is etched in my mind forever.",
        iconType: "memory"
      }
    },
    {
      monthNumber: 4,
      title: "Cozy Rainy Days",
      date: "Month 4 • Warm Blankets",
      tagline: "Wrapped in blankets, eating snacks, watching our favorite movies.",
      introDescription: "Not every day needed an extravagant plan. The rainy afternoons shared over warm noodles and blankets were pure bliss.",
      musicTrack: "/music/month-04.mp3",
      musicTitle: "Rain on the Glass",
      photos: [
        {
          id: "m4-1",
          url: "/images/month-04/photo-1.jpg",
          caption: "Movie marathon fort on the couch with double popcorn.",
          date: "Rainy Sunday",
          location: "Living Room Fort",
          secretNote: "You fell asleep halfway through the movie on my shoulder. I didn't dare move a single muscle!"
        }
      ],
      gift: {
        title: "A Sweet Compliment",
        subtitle: "Month Four Warmth 🌧️",
        content: "You have this unbelievable gift of turning ordinary rainy days into the coziest, most peaceful sanctuary.",
        iconType: "compliment"
      }
    },
    {
      monthNumber: 5,
      title: "Silly Laughs & Inside Jokes",
      date: "Month 5 • Pure Joy",
      tagline: "We developed a language only the two of us understand.",
      introDescription: "Half glances across the room, hilarious face filters, and jokes nobody else would ever find funny.",
      musicTrack: "/music/month-05.mp3",
      musicTitle: "Playful Melody",
      photos: [
        {
          id: "m5-1",
          url: "/images/month-05/photo-1.jpg",
          caption: "The goofy photo booth strips we swore we'd never show anyone.",
          date: "Weekend Fun",
          location: "Photo Booth Arcade",
          secretNote: "We made the most ridiculous faces, and yet you looked breathtaking in every single frame."
        }
      ],
      gift: {
        title: "Our Private Joke",
        subtitle: "Bubu & Dudu Mode Activated 🧸",
        content: "Whenever you pout your cheeks just like Bubu bear, I completely melt. You are forever my adorable goofball.",
        iconType: "joke"
      }
    },
    {
      monthNumber: 6,
      title: "Half a Year of Magic",
      date: "Month 6 • 6 Months Milestone",
      tagline: "Halfway through our first year, falling deeper every day.",
      introDescription: "Six whole months! We looked back at how much we had grown and knew our bond was something rare and deeply cherished.",
      musicTrack: "/music/month-06.mp3",
      musicTitle: "Golden Memories",
      photos: [
        {
          id: "m6-1",
          url: "/images/month-06/photo-1.jpg",
          caption: "Our 6-month celebration dinner with candle glow and dessert.",
          date: "6 Month Mark",
          location: "Our Special Spot",
          secretNote: "I looked across the table and thought: 'I want to celebrate every milestone with this girl forever.'"
        }
      ],
      gift: {
        title: "A Big Virtual Hug",
        subtitle: "Halfway Hug 🫂",
        content: "Sending you the tightest, warmest bear hug in the universe right now. Press this button anytime you need to feel wrapped in love.",
        iconType: "hug"
      }
    },
    {
      monthNumber: 7,
      title: "Supporting Each Other",
      date: "Month 7 • Standing Strong",
      tagline: "Being each other's calm in every storm.",
      introDescription: "When busy schedules and tough weeks tested us, holding your hand reminded me that together, we can weather anything.",
      musicTrack: "/music/month-07.mp3",
      musicTitle: "Gentle Strength",
      photos: [
        {
          id: "m7-1",
          url: "/images/month-07/photo-1.jpg",
          caption: "A quiet moment of comfort when we both needed a breather.",
          date: "Midweek Evening",
          location: "Quiet Park Bench",
          secretNote: "Thank you for listening when things were heavy. You are my safe haven."
        }
      ],
      gift: {
        title: "My Dedication to You",
        subtitle: "Month Seven Gratitude 💜",
        content: "You are my greatest cheerleader and my gentle anchor. Thank you for always believing in me, even when I doubted myself.",
        iconType: "dedication"
      }
    },
    {
      monthNumber: 8,
      title: "Food Dates & Sweet Treats",
      date: "Month 8 • Yum & Fun",
      tagline: "Hunting for boba, pastries, and delicious dinners.",
      introDescription: "Our shared obsession with good food, sweet treats, and 'just one more bite' of whatever you ordered.",
      musicTrack: "/music/month-08.mp3",
      musicTitle: "Sweet Harmony",
      photos: [
        {
          id: "m8-1",
          url: "/images/month-08/photo-1.jpg",
          caption: "You proudly holding up that giant dessert we promised we'd share.",
          date: "Dessert Night",
          location: "Sweet Treats Bakery",
          secretNote: "The joy on your face when the food arrived was the cutest thing I've ever witnessed."
        }
      ],
      gift: {
        title: "Sweet Compliment #8",
        subtitle: "Treat Time 🍰",
        content: "Sharing food with you is my favorite thing, even though you always steal the best fry from my plate! (You can have all of them!)",
        iconType: "compliment"
      }
    },
    {
      monthNumber: 9,
      title: "Starlit Evenings",
      date: "Month 9 • Moonlit Walks",
      tagline: "Walking quietly under the night sky, dreaming about the future.",
      introDescription: "Long strolls with the cool night breeze, fingers intertwined, talking about where we want our lives to lead.",
      musicTrack: "/music/month-09.mp3",
      musicTitle: "Night Sky Serenade",
      photos: [
        {
          id: "m9-1",
          url: "/images/month-09/photo-1.jpg",
          caption: "Shadows of our two silhouettes under the streetlamps.",
          date: "Evening Stroll",
          location: "Under the stars",
          secretNote: "I wished on every star that night that you'd stay by my side for every year to come."
        }
      ],
      gift: {
        title: "Reason I Love You #9",
        subtitle: "Under The Stars ✨",
        content: "Because with you, silence is never awkward. Just walking beside you fills my heart with total peace.",
        iconType: "reason"
      }
    },
    {
      monthNumber: 10,
      title: "Little Surprises",
      date: "Month 10 • Thoughtful Touches",
      tagline: "Unexpected flowers, handwritten notes, and sweet gestures.",
      introDescription: "The small things that mean the whole world — leaving cute sticky notes, surprising each other with snacks, and random hugs.",
      musicTrack: "/music/month-10.mp3",
      musicTitle: "Tender Whispers",
      photos: [
        {
          id: "m10-1",
          url: "/images/month-10/photo-1.jpg",
          caption: "The tiny doodle note tucked into your bag.",
          date: "Surprise Morning",
          location: "Everyday Moments",
          secretNote: "Seeing your smile brighten up when you discover a little surprise is my greatest reward."
        }
      ],
      gift: {
        title: "A Meaningful Date",
        subtitle: "Month Ten Token 💌",
        content: "10 months together, and my love for you hasn't faded one bit — it has multiplied by a million.",
        iconType: "promise"
      }
    },
    {
      monthNumber: 11,
      title: "Almost 365 Days",
      date: "Month 11 • The Countdown",
      tagline: "Can you believe we're almost at a full whole year?",
      introDescription: "Time flew by so fast because every moment with you is joyous. We began counting down to our first milestone.",
      musicTrack: "/music/month-11.mp3",
      musicTitle: "Anticipation of Forever",
      photos: [
        {
          id: "m11-1",
          url: "/images/month-11/photo-1.jpg",
          caption: "Looking back at old photos together and smiling at how far we've come.",
          date: "Scrapbook Day",
          location: "Memory Lane",
          secretNote: "I realized that 365 days is only the first chapter of our lifetime together."
        }
      ],
      gift: {
        title: "A Special Promise",
        subtitle: "Countdown Gift ⏳",
        content: "I promise that no matter how many years pass, I will keep courting you, surprising you, and loving you like day one.",
        iconType: "promise"
      }
    },
    {
      monthNumber: 12,
      title: "One Year of Us",
      date: "Month 12 • 365 Days of Love",
      tagline: "365 days, countless smiles, one everlasting love story.",
      introDescription: "Today we celebrate the most wonderful year of our lives. 12 full chapters written together in our little universe.",
      musicTrack: "/music/month-12.mp3",
      musicTitle: "Our Forever Theme",
      photos: [
        {
          id: "m12-1",
          url: "/images/month-12/photo-1.jpg",
          caption: "Our official 1st Anniversary portrait — forever my favorite person.",
          date: "Anniversary Day",
          location: "Our Universe",
          secretNote: "I love you more today than yesterday, but not half as much as tomorrow."
        }
      ],
      gift: {
        title: "1st Anniversary Dedication",
        subtitle: "The 365-Day Crown 👑💜",
        content: "Happy 1st Anniversary, my beautiful girlfriend! You made this year the happiest, brightest, and most magical chapter of my life.",
        iconType: "dedication"
      }
    }
  ],

  reasonsILoveYou: [
    "Because your smile instantly melts any stress I have had all day.",
    "Because even the simplest, most mundane moments feel magical when I'm with you.",
    "Because I love the sound of your laugh, especially when you can barely breathe from giggling.",
    "Because being with you feels like home — warm, safe, and welcoming.",
    "Because you're my favorite person to share all the little, silly things with.",
    "Because I would still choose you, in every lifetime and every universe.",
    "Because the way your eyes crinkle when you're truly happy is the prettiest sight.",
    "Because you encourage my dreams and never let me feel alone.",
    "Because you give the warmest, most restorative hugs in the entire world.",
    "Because you make me want to be the best version of myself every single day.",
    "Because you remember the little details I mention in passing.",
    "Because you are effortlessly gorgeous, even in oversized pajamas with messy hair.",
    "Because your heart is so gentle, sweet, and caring toward everyone.",
    "Because holding your hand makes everything in life feel calm and right.",
    "Because you love me for exactly who I am, quirks and all."
  ],

  finale: {
    heading: "365 Days of Loving You",
    subheading: "And if I could do it all again, I would still choose you.",
    giftBoxTitle: "One Last Little Surprise for You 🎁",
    letterParagraphs: [
      "Happy First Anniversary, My Love! 💜",
      "Thank you for being part of my favorite chapter.",
      "If the universe gave me a thousand chances to begin again, I would still hope to find you in every single one.",
      "This is our first year, not the end of our story.",
      "There are still so many little adventures waiting for us, so many pictures to take, so many songs to share, and so many memories we haven't made yet.",
      "Wherever life takes us, I hope we keep finding reasons to smile together.",
      "You will always be a very special part of my little universe.",
      "I love you, my favorite person. Happy Anniversary! 🧸💗"
    ],
    favoritePhotoUrl: "/images/finale/our-favorite-memory.jpg",
    favoritePhotoCaption: "Our most treasured memory from our first year together 💜"
  }
};
