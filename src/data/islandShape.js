// Stylised outline of Nantucket on the 1000 x 640 board.
// Approximate cartography for the prototype, to be replaced by the illustrator's final map.

// Main body, clockwise from Smith Point (west tip).
export const MAIN_ISLAND = [
  [34, 466], [62, 450], [92, 430], [130, 410], [172, 398], [240, 380], [330, 360],
  [392, 350], [430, 344], [444, 334], [456, 336], [462, 352], [474, 366], [494, 374],
  [530, 376], [566, 368], [604, 360], [642, 350], [680, 344], [712, 336], [738, 326],
  [756, 318], [776, 324], [804, 334], [832, 350], [856, 372], [874, 398], [888, 430],
  [894, 458], [888, 488], [872, 516], [842, 538], [792, 552], [720, 560], [640, 566],
  [572, 568], [512, 568], [452, 564], [398, 556], [330, 544], [262, 528], [200, 510],
  [142, 494], [92, 484], [52, 478],
];

// Great Point spit and the Coatue, which enclose Nantucket Harbor.
export const COATUE = [
  [752, 318], [760, 290], [764, 250], [782, 220], [786, 186], [770, 150], [750, 116],
  [730, 86], [720, 76], [726, 96], [744, 136], [756, 176], [752, 212], [736, 238],
  [700, 258], [656, 276], [610, 292], [566, 306], [528, 318], [506, 324], [512, 330],
  [540, 326], [584, 314], [628, 300], [672, 286], [714, 270], [740, 262], [746, 290],
];

// Tuckernuck, west of Madaket (decorative).
export const TUCKERNUCK = [
  [-6, 408], [10, 398], [30, 400], [40, 410], [30, 420], [8, 422],
];

// Ponds (decorative).
export const PONDS = [
  { name: 'Hummock Pond', points: [[372, 500], [380, 488], [388, 500], [384, 530], [376, 536], [370, 520]] },
  { name: 'Miacomet Pond', points: [[450, 520], [456, 508], [462, 520], [460, 548], [452, 552], [448, 536]] },
  { name: 'Sesachacha Pond', points: [[820, 372], [836, 366], [846, 378], [836, 392], [822, 388]] },
];

export const MAP_LABELS = [
  { text: 'NANTUCKET  SOUND', x: 270, y: 250, size: 17, spacing: 8, rotate: -4 },
  { text: 'ATLANTIC  OCEAN', x: 600, y: 616, size: 18, spacing: 9 },
  { text: 'Nantucket Harbor', x: 620, y: 322, size: 12, italic: true, rotate: -12 },
  { text: 'Coatue', x: 600, y: 286, size: 11, italic: true, rotate: -16 },
  { text: 'Great Point', x: 700, y: 64, size: 12, italic: true },
  { text: 'Tuckernuck', x: 22, y: 386, size: 10, italic: true },
];
