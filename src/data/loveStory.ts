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

export interface OpenWhenLetter {
  id: string;
  category: string;
  icon: string;
  teaser: string;
  letter: string;
  signoff: string;
}

export interface FutureMemory {
  id: string;
  title: string;
  icon: string;
  description: string;
  isWish?: boolean;
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
  openWhenLetters: OpenWhenLetter[];
  futureMemories: FutureMemory[];
  finale: {
    heading: string;
    subheading: string;
    giftBoxTitle: string;
    letterParagraphs: string[];
    favoritePhotoUrl?: string;
    favoritePhotoCaption?: string;
    dateCoupon: {
      title: string;
      validUntil: string;
      perks: string[];
    };
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
    subtext: "Hold it for a few seconds to unlock our memories.",
    steps: [
      "Finding your heartbeat...",
      "Connecting our memories...",
      "Checking our little universe...",
      "Love verified! 💜"
    ],
  },

  anniversaryLetter: {
    heading: "To My Favorite Person in the Whole Universe 💜",
    salutation: "My love,",
    paragraphs: [
      "Happy First Anniversary to us! 💜",
      "One whole year of us, and somehow, you still give me butterflies like it's the very beginning.",
      "Out of all the people in this world, I'm so grateful that our paths crossed and that I get to call you mine.",
      "Thank you for every smile, every laugh, every little moment, and even the days when things weren't perfect. Every memory with you has become a little piece of my favorite story.",
      "You have become such a special part of my life. Sometimes, even the smallest moments with you become the memories I want to keep forever.",
      "If I could choose again, in every lifetime and every universe, I would still choose you.",
      "This is only the beginning of our story, baby. There are so many more memories to create, places to visit, dreams to chase, and anniversaries to celebrate together.",
      "You are my favorite hello, my safest place, and my sweetest little universe.",
      "Thank you for being you, for being part of my life, and for making this first year so special.",
      "Happy 1st Anniversary, my love. Here's to our forever. 🧸💗"
    ],
    signoff: "Forever yours,",
    closingName: "Your favorite person 💜"
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

  openWhenLetters: [
    {
      id: "miss-me",
      category: "Open when you miss me",
      icon: "🥺",
      teaser: "For when you wish I was right beside you...",
      letter: "My sweet love,\n\nIf you're reading this, it means you're missing me right now. I want you to close your eyes, take a deep breath, and remember this: even when miles or hours separate us, my heart is right there with you.\n\nEvery beat belongs to you. Look at the moon tonight — we are looking at the exact same sky. I am counting down the minutes until I can wrap my arms around you again.\n\nText me right now with a purple heart so I know you're thinking of me too. I love you endlessly.",
      signoff: "Sending you the biggest virtual hug 🫂💜"
    },
    {
      id: "feel-sad",
      category: "Open when you feel sad",
      icon: "🌧️",
      teaser: "A warm blanket of words for difficult moments...",
      letter: "Hey beautiful,\n\nI hate that you're feeling down right now. I wish I could magically take all your sadness away and trade it for pure happiness.\n\nIt is okay to not be okay. You don't have to carry the whole world on your shoulders today. Let yourself rest, drink some warm water, and remember that you are strong, you are deeply loved, and tomorrow is a brand new sunrise.\n\nI am right here in your corner, always. You never have to face anything alone.",
      signoff: "You are my strongest warrior, baby. Love you forever."
    },
    {
      id: "need-a-hug",
      category: "Open when you need a hug",
      icon: "🧸",
      teaser: "A giant, cozy, warm Bubu-and-Dudu embrace...",
      letter: "My favorite girl,\n\nConsider this an official, non-expiring coupon for a giant, bone-crushing, warm bear hug!\n\nImagine me wrapping my arms around your shoulders, tucking your head against my chest, and holding you until you feel safe and relaxed. Feel that warmth? That is all my love surrounding you right now.\n\nKeep holding on, my sweet Bubu. Real hugs are coming soon!",
      signoff: "Tightly in my arms forever 🐻🫂"
    },
    {
      id: "want-to-smile",
      category: "Open when you want to smile",
      icon: "✨",
      teaser: "A quick boost of silliness and laughter...",
      letter: "Hey cutie!\n\nDid you know that penguins propose with pebbles, sea otters hold hands while sleeping so they don't drift away, and I am completely, head-over-heels obsessed with you?\n\nRemember the time we laughed so hard our stomachs ached? Or the funny faces you make when you're concentrating? You have the most infectious, radiant smile in the universe — please show it to the world today!",
      signoff: "Smile for me, my sunshine! 😊💜"
    },
    {
      id: "difficult-day",
      category: "Open when you are having a difficult day",
      icon: "⚡",
      teaser: "When everything feels overwhelming and exhausting...",
      letter: "My brave love,\n\nSome days just test our patience to the limit. If today felt heavy, unfair, or exhausting, please take a deep breath and let it out.\n\nYou survived 100% of your worst days so far, and you will get through this one too. You are capable, intelligent, resilient, and far more wonderful than any bad day can diminish.\n\nTonight, treat yourself kindly. Take a hot shower, put on comfortable clothes, and know that I am so proud of you for trying your best.",
      signoff: "Always proud of you, no matter what 🌟"
    },
    {
      id: "remember-love",
      category: "Open when you need to remember how much I love you",
      icon: "💗",
      teaser: "In case you ever doubt how deeply you are adored...",
      letter: "My precious heart,\n\nIf you ever wonder how much you mean to me, let me remind you: you are the best thing that ever happened to my life.\n\nI love your kindness, your silly humor, your brilliant mind, your soft voice, your gentle touch, and every single quirk that makes you who you are. You don't have to earn my love or prove anything — you are loved simply for being you.\n\nMy love for you isn't temporary; it is woven into every thought, every plan, and every dream I have for the future.",
      signoff: "More than all the stars in the night sky 🌌💜"
    },
    {
      id: "feel-special",
      category: "Open when you want to feel special",
      icon: "👑",
      teaser: "A reminder of just how extraordinary you are...",
      letter: "To my Queen,\n\nYou walk into a room and make it lighter. You have an energy that brings comfort to everyone around you, and especially to me.\n\nYou are gorgeous inside and out. Out of billions of souls on this planet, you are the one my heart recognized. Never forget your worth, your grace, and the beauty you bring to this world every single day.\n\nYou are my absolute dream girl.",
      signoff: "You are one in a universe 👑✨"
    },
    {
      id: "remember-first-year",
      category: "Open when you want to remember our first year",
      icon: "📖",
      teaser: "A warm stroll back through our 365 days together...",
      letter: "My love,\n\nLook at how much we built in 365 days! Twelve months filled with dates, phone calls, laughter, lessons, milestones, and so much sweetness.\n\nWe turned an ordinary year into an extraordinary adventure. Whenever you read this, look at how far we have walked hand in hand. We are proof that real love only grows stronger and sweeter with time.\n\nHere is to year two, year three, and all the decades waiting for us!",
      signoff: "Happy 1st Anniversary and beyond 🥂💜"
    }
  ],

  futureMemories: [
    {
      id: "f1",
      title: "Our Next Anniversary Getaway",
      icon: "✈️",
      description: "Booking that dream vacation where we can wake up near the ocean, watch the sunrise, and celebrate another year of loving each other.",
      isWish: false
    },
    {
      id: "f2",
      title: "Places We Want to Visit",
      icon: "🌸",
      description: "Walking under blooming cherry blossoms, exploring quaint streets, and discovering cozy coffee shops across the globe together.",
      isWish: false
    },
    {
      id: "f3",
      title: "Our Future Date Adventures",
      icon: "🎡",
      description: "Going to carnival ferris wheels at midnight, pottery classes, cooking extravagant dinners at home, and dancing in the kitchen.",
      isWish: false
    },
    {
      id: "f4",
      title: "Watching Countless Sunsets",
      icon: "🌅",
      description: "Finding new cliffside spots, beaches, and rooftops to watch the golden sun dip below the horizon with your head resting on my shoulder.",
      isWish: false
    },
    {
      id: "f5",
      title: "Taking More Silly Pictures",
      icon: "📸",
      description: "Filling an entire physical scrapbook with goofy selfies, holiday photos, candid giggles, and photobooth strips.",
      isWish: false
    },
    {
      id: "f6",
      title: "Celebrating Little Achievements",
      icon: "🥂",
      description: "Being there for every promotion, every personal victory, every finished goal, cheering the loudest for each other.",
      isWish: false
    },
    {
      id: "f7",
      title: "Building Our Dream Sanctuary",
      icon: "🏡",
      description: "Creating a cozy home filled with warm fairy lights, fluffy pillows, plants, books, good music, and endless love.",
      isWish: true
    },
    {
      id: "f8",
      title: "Growing Old & Sweet Together",
      icon: "👵👴",
      description: "Wrinkled smiles, decades of shared jokes, still holding hands on park benches, still each other's favorite hello and sweetest kiss.",
      isWish: true
    }
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
    favoritePhotoCaption: "Our most treasured memory from our first year together 💜",
    dateCoupon: {
      title: "VIP 1st Anniversary Romantic Date Invitation 🎟️",
      validUntil: "Valid for Lifetime / Redeemable Anytime",
      perks: [
        "One all-expenses-paid dreamy dinner date at your favorite restaurant",
        "Unlimited warm hugs and forehead kisses on demand",
        "Dessert of your choice with zero sharing required",
        "Late night scenic drive with your favorite playlist on repeat"
      ]
    }
  }
};
