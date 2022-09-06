const ADJECTIVES = [
    'Awesome', 'Bold', 'Creative', 'Dapper', 'Eccentric', 'Fiesty', 'Golden',
    'Holy', 'Ignominious', 'Jolly', 'Kindly', 'Lucky', 'Mushy', 'Natural',
    'Oaken', 'Precise', 'Quiet', 'Rowdy', 'Sunny', 'Tall',
    'Unique', 'Vivid', 'Wonderful', 'Xtra', 'Yawning', 'Zesty',
];

const FIRST_NAMES = [
    'Anna', 'Bobby', 'Cameron', 'Danny', 'Emmett', 'Frida', 'Gracie', 'Hannah',
    'Isaac', 'Jenova', 'Kendra', 'Lando', 'Mufasa', 'Nate', 'Owen', 'Penny',
    'Quincy', 'Roddy', 'Samantha', 'Tammy', 'Ulysses', 'Victoria', 'Wendy',
    'Xander', 'Yolanda', 'Zelda',
];

const LAST_NAMES = [
    'Anchorage', 'Berlin', 'Cucamonga', 'Davenport', 'Essex', 'Fresno',
    'Gunsight', 'Hanover', 'Indianapolis', 'Jamestown', 'Kane', 'Liberty',
    'Minneapolis', 'Nevis', 'Oakland', 'Portland', 'Quantico', 'Raleigh',
    'SaintPaul', 'Tulsa', 'Utica', 'Vail', 'Warsaw', 'XiaoJin', 'Yale',
    'Zimmerman',
];

/*
* I feel like users are going to be confused if it's some random name like "Bobby Berlin" or, even better,
* "Wendy XiaoJin" haha. Why not something like Google Doc's animals?
*/

/*
const ANIMALS = [
    'Aardvark', 'Bat', 'Chipmunk', 'Dolphin', 'Elephant', 'Falcon', 'Gecko', 'Hawk',
    'Iguana', 'Jaguar', 'Kitten', 'Ladybug', 'Monkey', 'Narwhal', 'Octopus', 'Penguin',
    'Quail', 'Raccoon', 'Sheep', 'Tiger', 'Unicorn', 'Vole', 'Whale',
    'X-ray Fish', 'Yak', 'Zebra',
];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function nameGenerator() { rand(ADJECTIVES) + rand(ANIMALS)};

*/

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function nameGenerator() { rand(ADJECTIVES) + rand(FIRST_NAMES) + rand(LAST_NAMES) };
