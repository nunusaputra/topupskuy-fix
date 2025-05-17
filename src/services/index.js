import mobileLegend from "../assets/images/ml.jpeg";
import magicChess from "../assets/images/magic-chess.jpeg";
import freeFire from "../assets/images/ff.jpeg";
import pubg from "../assets/images/pubg.jpeg";
import hok from "../assets/images/hok.jpeg";
import hago from "../assets/images/Hago.jpeg";
import lita from "../assets/images/lita.jpeg";
import cod from "../assets/images/cod.jpeg";
import sus from "../assets/images/sus.jpeg";
import aov from "../assets/images/aov.jpeg";
import zepeto from "../assets/images/zepeto.jpeg";
import arenaBreakout from "../assets/images/arena-breakout.jpeg";
import bloodStrike from "../assets/images/blood-strike.jpeg";
import coc from "../assets/images/coc.jpeg";
import metalSlug from "../assets/images/metal-slug.jpeg";
import eggyParty from "../assets/images/eggy-party.jpeg";
import gensin from "../assets/images/gensin.jpeg";
import honkai from "../assets/images/honkai.jpeg";
import lol from "../assets/images/lol.jpeg";
import pb from "../assets/images/pb.jpeg";
import man from "../assets/images/man.jpeg";
import undawn from "../assets/images/undawn.jpeg";
import valo from "../assets/images/valo.jpeg";
import zzz from "../assets/images/zzz.jpeg";
import gold from "../assets/images/gold.png";
import silver from "../assets/images/silver.png";
import bronze from "../assets/images/bronze.png";
import spay from "../assets/images/spay.png";
import qris from "../assets/images/qris.png";
import bni from "../assets/images/bni.png";
import bca from "../assets/images/bca.png";
import bri from "../assets/images/bri.png";
import mandiri from "../assets/images/mandiri.png";
import indomaret from "../assets/images/indomaret.png";
import dana from "../assets/images/dana.jpeg";
import banner1 from "../assets/images/banner-1.png";
import banner2 from "../assets/images/gusion-banner.png";
import banner3 from "../assets/images/genshin-banner.png";

import axios from "axios";
import { API_URL } from "../env";

export const fetchMetadata = async () => {
  const { data } = await axios.get(`${API_URL}/layout`);
  return data;
};

export const fetchColorTemplate = async () => {
  const { data } = await axios.get(`${API_URL}/color-template`);
  return data;
}

export const fetchProducts = async () => {
  const { data } = await axios.get(`${API_URL}/products`);
  return data;
};

export const fetchProduct = async (slug, unique) => {
  const { data } = await axios.get(
    `${API_URL}/product-detail/${slug}/${unique}`
  );
  return data;
};

export const fetchHistory = async (phone) => {
  const { data } = await axios.get(`${API_URL}/purchases/${phone}`);
  return data;
};

export const fetchPurchaseDetail = async (slug) => {
  const { data } = await axios.get(`${API_URL}/purchase-detail/${slug}`);
  return data;
};

export const fetchUpgradeTopupDetail = async (invoice) => {
  const { data } = await axios.get(`${API_URL}/topup-member/${invoice}`);
  return data;
};

export const fetchDataMember = async (uniqueCode) => {
  const { data } = await axios.get(`${API_URL}/user/data/${uniqueCode}`);
  return data;
};

export const fetchUpgradeMembership = async () => {
  const { data } = await axios.get(`${API_URL}/upgrade-membership/`);
  return data;
};

export const fetchPayment = async () => {
  const { data } = await axios.get(`${API_URL}/channel`);
  return data;
};

export const dataList = [
  {
    id: 1,
    name: "Mobile Legends",
    publisher: "Montoon",
    image: mobileLegend,
    type: "Games",
    item_name: "Diamond",
    ranking: gold,
    count_buy: 5000,
    price: 10000, // Harga dalam IDR
    topup_package: "86 Diamonds",
  },
  {
    id: 2,
    name: "Magic Chess Go Go",
    publisher: "Montoon",
    image: magicChess,
    type: "Games",
    item_name: null,
    ranking: null,
    count_buy: 500,
    price: 15000,
    topup_package: "100 Magic Coins",
  },
  {
    id: 3,
    name: "Free Fire",
    publisher: "Garena",
    image: freeFire,
    type: "Games",
    item_name: null,
    ranking: null,
    count_buy: 300,
    price: 12000,
    topup_package: "100 Diamonds",
  },
  {
    id: 4,
    name: "PUBG Mobile",
    publisher: "Tencent",
    image: pubg,
    type: "Games",
    item_name: null,
    ranking: null,
    count_buy: 250,
    price: 50000,
    topup_package: "660 UC",
  },
  {
    id: 5,
    name: "Honors of Kings",
    publisher: "TiMi Studio Group",
    image: hok,
    type: "Games",
    item_name: null,
    ranking: null,
    count_buy: 400,
    price: 20000,
    topup_package: "300 Tokens",
  },
  {
    id: 6,
    name: "Valorant",
    publisher: "Riot",
    image: valo,
    type: "Games",
    item_name: "Valorant Point",
    ranking: silver,
    count_buy: 4000,
    price: 25000,
    topup_package: "300 Valorant Points",
  },
  {
    id: 7,
    name: "Genshin Impact",
    publisher: "MiHoYo",
    image: gensin,
    type: "Games",
    item_name: "Genesis Crystals",
    ranking: bronze,
    count_buy: 3000,
    price: 50000,
    topup_package: "6480 Genesis Crystals",
  },
  {
    id: 8,
    name: "Call of Duty Mobile",
    publisher: "Tencent",
    image: cod,
    type: "Games",
    item_name: null,
    ranking: null,
    count_buy: 100,
    price: 30000,
    topup_package: "520 CP",
  },
  {
    id: 9,
    name: "Blood Strike",
    publisher: "NetEase Games",
    image: bloodStrike,
    type: "Games",
    item_name: null,
    ranking: null,
    count_buy: 210,
    price: 20000,
    topup_package: "300 Blood Coins",
  },
  {
    id: 10,
    name: "Zenless Zone Zero",
    publisher: "MiHoYo",
    image: zzz,
    type: "Games",
    item_name: null,
    ranking: null,
    count_buy: 50,
    price: 45000,
    topup_package: "500 Crystals",
  },
  {
    id: 11,
    name: "Honkai Star Rail",
    publisher: "MiHoYo",
    image: honkai,
    type: "Games",
    item_name: null,
    ranking: null,
    count_buy: 30,
    price: 47000,
    topup_package: "6480 Stellar Jades",
  },
  {
    id: 12,
    name: "Clash of Clans",
    publisher: "Supercell",
    image: coc,
    type: "Games",
    item_name: null,
    ranking: null,
    count_buy: 1000,
    price: 10000,
    topup_package: "500 Gems",
  },
  {
    id: 13,
    name: "Undawn",
    publisher: "Garena",
    image: undawn,
    type: "Games",
    item_name: null,
    ranking: null,
    count_buy: 520,
    price: 25000,
    topup_package: "1000 Silver Coins",
  },
  {
    id: 14,
    name: "League of Legends",
    publisher: "Riot Games",
    image: lol,
    type: "Games",
    item_name: null,
    ranking: null,
    count_buy: 1500,
    price: 35000,
    topup_package: "500 RP",
  },
  {
    id: 15,
    name: "Metal Slug: Awakening",
    publisher: "TiMi Studio Group",
    image: metalSlug,
    type: "Games",
    item_name: null,
    ranking: null,
    count_buy: 2000,
    price: 18000,
    topup_package: "500 Tokens",
  },
  {
    id: 16,
    name: "Arena of Valor",
    publisher: "Garena",
    image: aov,
    type: "Games",
    item_name: null,
    ranking: null,
    count_buy: 34,
    price: 16000,
    topup_package: "300 Vouchers",
  },
  {
    id: 17,
    name: "Point Blank",
    publisher: "Zapeto",
    image: pb,
    type: "Games",
    item_name: null,
    ranking: null,
    count_buy: 2500,
    price: 12000,
    topup_package: "1000 PB Cash",
  },
  {
    id: 18,
    name: "Zepeto",
    publisher: "Zepeto",
    image: zepeto,
    type: "Games",
    item_name: null,
    ranking: null,
    count_buy: 10,
    price: 30000,
    topup_package: "1000 Zems",
  },
  {
    id: 19,
    name: "Eggy Party",
    publisher: "Eggy Party",
    image: eggyParty,
    type: "Games",
    item_name: null,
    ranking: null,
    count_buy: 12,
    price: 25000,
    topup_package: "500 Eggs",
  },
  {
    id: 20,
    name: "Sausage Man",
    publisher: "XD Inc",
    image: man,
    type: "Games",
    item_name: null,
    ranking: null,
    count_buy: 5,
    price: 20000,
    topup_package: "500 Sausage Coins",
  },
  {
    id: 21,
    name: "Super Sus",
    publisher: "PI Production Pte. Ltd.",
    image: sus,
    type: "Games",
    item_name: null,
    ranking: null,
    count_buy: 52,
    price: 18000,
    topup_package: "200 Gold",
  },
  {
    id: 22,
    name: "Arena Breakout",
    publisher: "Level Infinite",
    image: arenaBreakout,
    type: "Games",
    item_name: null,
    ranking: null,
    count_buy: 23,
    price: 40000,
    topup_package: "1000 Tokens",
  },
  {
    id: 23,
    name: "Hago",
    publisher: "Hago",
    image: hago,
    type: "Entertainment",
    item_name: null,
    ranking: null,
    count_buy: 500,
    price: 12000,
    topup_package: "500 Coins",
  },
  {
    id: 24,
    name: "Lita",
    publisher: "Lita",
    image: lita,
    type: "Entertainment",
    ranking: null,
    count_buy: 236,
    price: 15000,
    topup_package: "300 Gems",
  },
];

export const dataPayment = [
  {
    id: 1,
    name: "Dana",
    images: dana,
    type: "e-wallet",
  },
  {
    id: 2,
    name: "Indomaret",
    images: indomaret,
    type: "convenience-store",
  },
  {
    id: 3,
    name: "Shopeepay",
    images: spay,
    type: "e-wallet",
  },
  {
    id: 4,
    name: "Mandiri",
    images: mandiri,
    type: "bank",
  },
  {
    id: 5,
    name: "BNI",
    images: bni,
    type: "bank",
  },
  {
    id: 6,
    name: "BCA",
    images: bca,
    type: "bank",
  },
  {
    id: 7,
    name: "BRI",
    images: bri,
    type: "bank",
  },
  {
    id: 8,
    name: "Qris",
    images: qris,
    type: "qris",
  },
];

export const dataBanner = [
  {
    id: 1,
    name: "Banner 1",
    images: banner1,
  },
  {
    id: 2,
    name: "Banner 2",
    images: banner2,
  },
  {
    id: 3,
    name: "Banner 3",
    images: banner3,
  },
];

export const diamondPass = [
  {
    id: 1,
    title: "Weekly Diamond Pass",
    price: 27199,
  },
  {
    id: 2,
    title: "Weekly Diamond Pass 2x",
    price: 54399,
  },
  {
    id: 3,
    title: "Weekly Diamond Pass 3x",
    price: 81477,
  },
  {
    id: 4,
    title: "Weekly Diamond Pass 4x",
    price: 108636,
  },
  {
    id: 5,
    title: "Weekly Diamond Pass 5x",
    price: 135795,
  },
  {
    id: 6,
    title: "301 Diamonds (Starlight)",
    price: 79114,
  },
  {
    id: 7,
    title: "5 Diamonds (5 + 0 Bonus)",
    price: 1461,
  },
  {
    id: 8,
    title: "12 Diamonds (11 + 1 Bonus)",
    price: 3404,
  },
  {
    id: 9,
    title: "19 Diamonds (17 + 2 Bonus)",
    price: 5351,
  },
  {
    id: 10,
    title: "28 Diamonds (25 + 3 Bonus)",
    price: 7784,
  },
  {
    id: 11,
    title: "44 Diamonds (40 + 4 Bonus)",
    price: 11675,
  },
  {
    id: 12,
    title: "59 Diamonds (53 + 6 Bonus)",
    price: 15567,
  },
  {
    id: 13,
    title: "85 Diamonds (77 + 8 Bonus)",
    price: 22377,
  },
  {
    id: 14,
    title: "118 Diamonds (107 + 11 Bonus)",
    price: 31134,
  },
  {
    id: 15,
    title: "144 Diamonds (130 + 14 Bonus)",
    price: 37944,
  },
  {
    id: 16,
    title: "170 Diamonds (154 + 16 Bonus)",
    price: 44754,
  },
  {
    id: 17,
    title: "240 Diamonds (217 + 23 Bonus)",
    price: 63106,
  },
  {
    id: 18,
    title: "284 Diamonds (257 + 27 Bonus)",
    price: 76247,
  },
  {
    id: 19,
    title: "340 Diamonds (308 + 32 Bonus)",
    price: 89507,
  },
  {
    id: 20,
    title: "408 Diamonds (367 + 41 Bonus)",
    price: 106799,
  },
  {
    id: 21,
    title: "568 Diamonds (503 + 65 Bonus)",
    price: 145670,
  },
  {
    id: 22,
    title: "632 Diamonds (561 + 71 Bonus)",
    price: 162698,
  },
  {
    id: 23,
    title: "738 Diamonds (657 + 81 Bonus)",
    price: 190424,
  },
  {
    id: 24,
    title: "750 Diamonds (665 + 85 Bonus)",
    price: 193828,
  },
  {
    id: 25,
    title: "875 Diamonds (774 + 101 Bonus)",
    price: 223282,
  },
  {
    id: 26,
    title: "960 Diamonds (851 + 109 Bonus)",
    price: 245659,
  },
  {
    id: 27,
    title: "1045 Diamonds (928 + 117 Bonus)",
    price: 268036,
  },
  {
    id: 28,
    title: "1171 Diamonds (1030 + 141 Bonus)",
    price: 300938,
  },
  {
    id: 29,
    title: "1283 Diamonds (1141 + 142 Bonus)",
    price: 330081,
  },
  {
    id: 30,
    title: "1750 Diamonds (1548 + 202 Bonus)",
    price: 446564,
  },
  {
    id: 31,
    title: "2010 Diamonds (1708 + 302 Bonus)",
    price: 485392,
  },
  {
    id: 32,
    title: "2250 Diamonds (1925 + 325 Bonus)",
    price: 548499,
  },
  {
    id: 33,
    title: "2885 Diamonds (2482 + 403 Bonus)",
    price: 708675,
  },
  {
    id: 34,
    title: "3453 Diamonds (2985 + 468 Bonus)",
    price: 854345,
  },
  {
    id: 35,
    title: "4020 Diamonds (3416 + 604 Bonus)",
    price: 970785,
  },
  {
    id: 36,
    title: "4830 Diamonds (4003 + 827 Bonus)",
    price: 1164837,
  },
  {
    id: 37,
    title: "5705 Diamonds (4777 + 928 Bonus)",
    price: 1388119,
  },
  {
    id: 38,
    title: "6840 Diamonds (5711 + 1129 Bonus)",
    price: 1650299,
  },
  {
    id: 39,
    title: "7715 Diamonds (6485 + 1230 Bonus)",
    price: 1873512,
  },
  {
    id: 40,
    title: "9660 Diamonds (8006 + 1654 Bonus)",
    price: 2329674,
  },
  {
    id: 41,
    title: "14490 Diamonds (12009 + 2481 Bonus)",
    price: 3494511,
  },
];

export const historyPayment = [
  {
    id: 1,
    image: mobileLegend,
    name: "Mobile Legends",
    paket: "86 Diamonds",
    price: 10000,
    paymentMethod: "Gopay",
    date: "02 Maret 2025",
    status: "Success",
    color: "#00FF00",
  },
  {
    id: 2,
    image: valo,
    name: "Valorant",
    paket: "120 Valorant Point",
    price: 15000,
    paymentMethod: "QRIS",
    date: "01 Maret 2025",
    status: "Failed",
    color: "#FF0000",
  },
  {
    id: 3,
    image: freeFire,
    name: "Free Fire",
    paket: "1000 Silver Coins",
    price: 25000,
    paymentMethod: "Dana",
    date: "28 Februari 2025",
    status: "Belum Bayar",
    color: "#FFFF00",
  },
];

export const upgrade = [
  {
    id: 1,
    paket: "Non Membership",
    price: 0,
  },
  {
    id: 2,
    paket: "Silver",
    price: 200000,
  },
  {
    id: 3,
    paket: "Gold",
    price: 250000,
  },
  {
    id: 4,
    paket: "Platinum",
    price: 300000,
  },
];

export const topup = [
  {
    id: 1,
    price: 20000,
  },
  {
    id: 2,
    price: 50000,
  },
  {
    id: 3,
    price: 100000,
  },
];
