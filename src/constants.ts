import { StyleCategory, SelectedOptions } from './types';
import { Translations } from './en';

const hairstyleOptions = ['None', 'Short Pixie Cut', 'Long Wavy Hair', 'Spiky Mohawk', 'Sleek Bob', 'Braided Crown', 'Curly Afro', 'Man Bun', 'Undercut', 'Wolf Cut', 'Butterfly Cut', 'Curtain Bangs', 'Slicked Back'];
const outfitOptions = ['None', 'Black Tie Tuxedo', 'Elegant Ball Gown', 'Modern Business Suit', 'Hypebeast outfit with hoodie and sneakers', 'Skater style with baggy jeans and graphic tee', 'Techwear with cargo pants and jacket', 'Full basketball kit', 'Yoga outfit with leggings and top', 'Runner\'s gear with shorts and tank top', 'Vintage 1920s Flapper Dress', 'Cyberpunk Armor', 'Bohemian Chic Maxi Dress', 'Gothic Lolita Dress', 'Knight Armor', 'Quiet luxury - cashmere sweater and tailored trousers', 'Old money aesthetic - linen shirt and chino shorts', 'Parisian chic - trench coat, striped shirt, and scarf', 'Tokyo street style - oversized layers and unique accessories', 'Scandinavian minimalist - neutral tones, clean lines'];
const headwearOptions = ['None', 'Baseball Cap', 'Beanie', 'Fedora Hat', 'Cowboy Hat', 'Crown', 'Sci-fi Helmet', 'Flower Wreath', 'Beret', 'Bucket Hat', 'Silk Headscarf'];
const footwearOptions = ['None', 'High-top Sneakers', 'Leather Boots', 'Formal Dress Shoes', 'High Heels', 'Sandals', 'Cybernetic Boots', 'Chunky Loafers', 'Espadrilles', 'Classic White Sneakers'];
const environmentOptions = ['None', 'Futuristic Cityscape', 'Natural landscape of a lush tropical beach', 'Cozy Library', 'Natural landscape of an enchanted, misty forest', 'Minimalist Studio', 'Steampunk Workshop', 'On a mountain summit with a natural panoramic landscape view', 'Mars Colony', 'Natural landscape of the Italian Riviera coastline', 'Natural landscape of Kyoto during cherry blossom season', 'Natural landscape of a serene Swiss Alps meadow', 'Natural landscape of a Santorini caldera at sunset', 'Amidst the natural architecture of a bustling Moroccan souk'];
const postureOptions = ['None', 'Confident Stance', 'Thoughtful Pose', 'Dynamic Action Jump', 'Relaxed Lounging', 'Heroic Pose', 'Elegant Curtsy', 'Floating/Levitating', 'Candid laughing pose', 'Fashion magazine editorial pose', 'Leaning against a wall casually'];
const effectOptions = ['None', 'Retro Filter', 'Cinematic Lighting', 'Watercolor Painting', 'Neon Glow', 'Double Exposure', 'Glitch Art', 'Pencil Sketch', 'Golden hour sunlight effect', 'Soft focus dream-like effect', 'Black and white film noir effect'];

const translationMap: Record<string, keyof Translations> = {
    'None': 'option_none', 'Short Pixie Cut': 'option_shortPixieCut', 'Long Wavy Hair': 'option_longWavyHair', 'Spiky Mohawk': 'option_spikyMohawk', 'Sleek Bob': 'option_sleekBob', 'Braided Crown': 'option_braidedCrown', 'Curly Afro': 'option_curlyAfro', 'Man Bun': 'option_manBun', 'Undercut': 'option_undercut', 'Wolf Cut': 'option_wolfCut', 'Butterfly Cut': 'option_butterflyCut', 'Curtain Bangs': 'option_curtainBangs', 'Slicked Back': 'option_slickedBack',
    'Black Tie Tuxedo': 'option_blackTieTuxedo', 'Elegant Ball Gown': 'option_elegantBallGown', 'Modern Business Suit': 'option_modernBusinessSuit', 'Hypebeast outfit with hoodie and sneakers': 'option_hypebeastOutfit', 'Skater style with baggy jeans and graphic tee': 'option_skaterStyle', 'Techwear with cargo pants and jacket': 'option_techwear', 'Full basketball kit': 'option_basketballKit', 'Yoga outfit with leggings and top': 'option_yogaOutfit', 'Runner\'s gear with shorts and tank top': 'option_runnersGear', 'Vintage 1920s Flapper Dress': 'option_flapperDress', 'Cyberpunk Armor': 'option_cyberpunkArmor', 'Bohemian Chic Maxi Dress': 'option_bohemianChic', 'Gothic Lolita Dress': 'option_gothicLolita', 'Knight Armor': 'option_knightArmor', 'Quiet luxury - cashmere sweater and tailored trousers': 'option_quietLuxury', 'Old money aesthetic - linen shirt and chino shorts': 'option_oldMoney', 'Parisian chic - trench coat, striped shirt, and scarf': 'option_parisianChic', 'Tokyo street style - oversized layers and unique accessories': 'option_tokyoStreetStyle', 'Scandinavian minimalist - neutral tones, clean lines': 'option_scandinavianMinimalist',
    'Baseball Cap': 'option_baseballCap', 'Beanie': 'option_beanie', 'Fedora Hat': 'option_fedoraHat', 'Cowboy Hat': 'option_cowboyHat', 'Crown': 'option_crown', 'Sci-fi Helmet': 'option_scifiHelmet', 'Flower Wreath': 'option_flowerWreath', 'Beret': 'option_beret', 'Bucket Hat': 'option_bucketHat', 'Silk Headscarf': 'option_silkHeadscarf',
    'High-top Sneakers': 'option_hightopSneakers', 'Leather Boots': 'option_leatherBoots', 'Formal Dress Shoes': 'option_formalShoes', 'High Heels': 'option_highHeels', 'Sandals': 'option_sandals', 'Cybernetic Boots': 'option_cyberneticBoots', 'Chunky Loafers': 'option_chunkyLoafers', 'Espadrilles': 'option_espadrilles', 'Classic White Sneakers': 'option_classicWhiteSneakers',
    'Futuristic Cityscape': 'option_futuristicCityscape', 'Natural landscape of a lush tropical beach': 'option_tropicalBeach', 'Cozy Library': 'option_cozyLibrary', 'Natural landscape of an enchanted, misty forest': 'option_enchantedForest', 'Minimalist Studio': 'option_minimalistStudio', 'Steampunk Workshop': 'option_steampunkWorkshop', 'On a mountain summit with a natural panoramic landscape view': 'option_mountainTop', 'Mars Colony': 'option_marsColony', 'Natural landscape of the Italian Riviera coastline': 'option_italianRiviera', 'Natural landscape of Kyoto during cherry blossom season': 'option_kyotoCherryBlossom', 'Natural landscape of a serene Swiss Alps meadow': 'option_swissAlps', 'Natural landscape of a Santorini caldera at sunset': 'option_santorini', 'Amidst the natural architecture of a bustling Moroccan souk': 'option_moroccanSouk',
    'Confident Stance': 'option_confidentStance', 'Thoughtful Pose': 'option_thoughtfulPose', 'Dynamic Action Jump': 'option_dynamicActionJump', 'Relaxed Lounging': 'option_relaxedLounging', 'Heroic Pose': 'option_heroicPose', 'Elegant Curtsy': 'option_elegantCurtsy', 'Floating/Levitating': 'option_floating', 'Candid laughing pose': 'option_candidLaugh', 'Fashion magazine editorial pose': 'option_fashionEditorialPose', 'Leaning against a wall casually': 'option_leaningOnWall',
    'Retro Filter': 'option_retroFilter', 'Cinematic Lighting': 'option_cinematicLighting', 'Watercolor Painting': 'option_watercolorPainting', 'Neon Glow': 'option_neonGlow', 'Double Exposure': 'option_doubleExposure', 'Glitch Art': 'option_glitchArt', 'Pencil Sketch': 'option_pencilSketch', 'Golden hour sunlight effect': 'option_goldenHour', 'Soft focus dream-like effect': 'option_softFocus', 'Black and white film noir effect': 'option_filmNoir',
};


export const getStyleCategories = (t: Translations): StyleCategory[] => [
  {
    title: t.hairstyle,
    key: 'hairstyle',
    options: hairstyleOptions.map(o => ({ value: o, label: t[translationMap[o]] })),
  },
  {
    title: t.outfit,
    key: 'outfit',
    options: outfitOptions.map(o => ({ value: o, label: t[translationMap[o]] })),
  },
  {
    title: t.headwear,
    key: 'headwear',
    options: headwearOptions.map(o => ({ value: o, label: t[translationMap[o]] })),
  },
  {
    title: t.footwear,
    key: 'footwear',
    options: footwearOptions.map(o => ({ value: o, label: t[translationMap[o]] })),
  },
  {
    title: t.environment,
    key: 'environment',
    options: environmentOptions.map(o => ({ value: o, label: t[translationMap[o]] })),
  },
  {
    title: t.posture,
    key: 'posture',
    options: postureOptions.map(o => ({ value: o, label: t[translationMap[o]] })),
  },
  {
    title: t.effect,
    key: 'effect',
    options: effectOptions.map(o => ({ value: o, label: t[translationMap[o]] })),
  },
];

export const DEFAULT_SELECTED_OPTIONS: SelectedOptions = {
    hairstyle: 'None',
    outfit: 'None',
    environment: 'None',
    posture: 'None',
    effect: 'None',
    headwear: 'None',
    footwear: 'None',
};
