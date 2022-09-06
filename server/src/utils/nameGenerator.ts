const ADJECTIVES = [
  'Awesome', 'Bold', 'Creative', 'Dapper', 'Eccentric', 'Fiesty', 'Golden',
  'Holy', 'Ignominious', 'Jolly', 'Kindly', 'Lucky', 'Mushy', 'Natural',
  'Oaken', 'Precise', 'Quiet', 'Rowdy', 'Sunny', 'Tall',
  'Unique', 'Vivid', 'Wonderful', 'Xtra', 'Yawning', 'Zesty',
];

const ANIMALS = [
  'Aardvark', 'Bat', 'Chipmunk', 'Dolphin', 'Elephant', 'Falcon', 'Gecko', 'Hawk',
  'Iguana', 'Jaguar', 'Kitten', 'Ladybug', 'Monkey', 'Narwhal', 'Octopus', 'Penguin',
  'Quail', 'Raccoon', 'Sheep', 'Tiger', 'Unicorn', 'Vole', 'Whale',
  'X-ray Fish', 'Yak', 'Zebra',
];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function nameGenerator() { rand(ADJECTIVES) + rand(ANIMALS); }
