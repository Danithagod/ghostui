import { Product } from '../types';

export const products: Product[] = [
  // Potions
  {
    id: 'healing-draught',
    name: 'Healing Draught',
    description: 'Restores vitality and mends minor wounds',
    fullDescription: 'A crimson potion that glows with inner warmth. When consumed, it accelerates natural healing processes and closes minor wounds within minutes. The taste is surprisingly sweet with hints of cherry and cinnamon.',
    price: 25.99,
    category: 'potions',
    image: '/potions/healing-draught.png',
    ingredients: ['Dragon\'s Blood', 'Honey', 'Crushed Rubies'],
    effects: ['Heals 50 HP', 'Removes bleeding status'],
    rarity: 'common'
  },
  {
    id: 'invisibility-brew',
    name: 'Invisibility Brew',
    description: 'Grants temporary invisibility',
    fullDescription: 'A shimmering, translucent liquid that seems to bend light around itself. Drinking this potion renders the user completely invisible for up to one hour. The effect can be broken by attacking or casting spells.',
    price: 89.99,
    category: 'potions',
    image: '/potions/invisibility-brew.png',
    ingredients: ['Ghost Essence', 'Moonstone Powder', 'Chameleon Scales'],
    effects: ['Invisibility for 60 minutes', 'Muffled footsteps'],
    rarity: 'rare'
  },
  {
    id: 'fire-resistance',
    name: 'Fireproof Philter',
    description: 'Protects against flames and heat',
    fullDescription: 'An orange potion that feels warm to the touch. Grants complete immunity to fire damage and extreme heat for a limited time. Popular among dragon hunters and forge workers.',
    price: 45.50,
    category: 'potions',
    image: '/potions/fire-resistance.png',
    ingredients: ['Salamander Ash', 'Obsidian Dust', 'Phoenix Feather'],
    effects: ['Fire immunity for 30 minutes', 'Comfortable in extreme heat'],
    rarity: 'uncommon'
  },

  // Elixirs
  {
    id: 'moonlit-mending',
    name: 'Moonlit Mending Elixir',
    description: 'Heals wounds under moonlight',
    fullDescription: 'A silvery potion that accelerates healing when consumed during lunar hours. The elixir contains concentrated moonlight essence and works best when the moon is visible. Heals even grievous wounds over the course of a night.',
    price: 45.99,
    category: 'elixirs',
    image: '/potions/moonlit-mending.png',
    ingredients: ['Moon Petals', 'Silver Dust', 'Unicorn Tears'],
    effects: ['Accelerated Healing', 'Night Vision (temporary)', 'Peaceful sleep'],
    rarity: 'rare'
  },
  {
    id: 'strength-elixir',
    name: 'Titan\'s Strength Elixir',
    description: 'Grants superhuman strength',
    fullDescription: 'A thick, golden elixir that courses with raw power. Drinking this grants the strength of ten men for several hours. Warriors prize this elixir before battle, though overuse can lead to muscle fatigue.',
    price: 67.00,
    category: 'elixirs',
    image: '/potions/strength-elixir.png',
    ingredients: ['Giant\'s Blood', 'Iron Shavings', 'Bull\'s Heart Extract'],
    effects: ['Strength +100 for 3 hours', 'Increased carrying capacity'],
    rarity: 'uncommon'
  },
  {
    id: 'wisdom-elixir',
    name: 'Elixir of Clarity',
    description: 'Enhances mental acuity and focus',
    fullDescription: 'A crystal-clear elixir that sparkles with inner light. Sharpens the mind, enhances memory recall, and grants perfect focus for complex tasks. Scholars and mages rely on this for their most demanding work.',
    price: 52.75,
    category: 'elixirs',
    image: '/potions/wisdom-elixir.png',
    ingredients: ['Sage Leaves', 'Crystal Dew', 'Owl Feather'],
    effects: ['Enhanced intelligence', 'Perfect concentration', 'Photographic memory (temporary)'],
    rarity: 'uncommon'
  },

  // Ingredients
  {
    id: 'dragon-scales',
    name: 'Dragon Scales',
    description: 'Rare scales from ancient dragons',
    fullDescription: 'Iridescent scales harvested from dragons. Each scale is incredibly durable and contains residual magical energy. Essential for crafting high-level protection potions and enchantments.',
    price: 150.00,
    category: 'ingredients',
    image: '/ingredients/dragon-scales.png',
    ingredients: [],
    effects: [],
    rarity: 'legendary'
  },
  {
    id: 'mandrake-root',
    name: 'Mandrake Root',
    description: 'Screaming root with potent properties',
    fullDescription: 'A gnarled root that resembles a tiny humanoid figure. When harvested, it emits a piercing shriek. Despite the difficulty in obtaining it, mandrake root is essential for many powerful potions and antidotes.',
    price: 35.00,
    category: 'ingredients',
    image: '/ingredients/mandrake-root.png',
    ingredients: [],
    effects: [],
    rarity: 'uncommon'
  },
  {
    id: 'nightshade',
    name: 'Nightshade Berries',
    description: 'Poisonous berries for dark potions',
    fullDescription: 'Deep purple berries that grow only in shadow. Highly toxic in their raw form, but when properly prepared, they form the base of many powerful potions. Handle with extreme care.',
    price: 18.50,
    category: 'ingredients',
    image: '/ingredients/nightshade.png',
    ingredients: [],
    effects: [],
    rarity: 'common'
  },

  // Cursed Items
  {
    id: 'cursed-luck',
    name: 'Potion of Cursed Fortune',
    description: 'Brings luck... at a terrible price',
    fullDescription: 'A black potion with swirling purple mist. Grants incredible luck for one day, but extracts a heavy toll. Every stroke of good fortune is balanced by an equal misfortune later. Use with extreme caution.',
    price: 13.00,
    category: 'cursed',
    image: '/potions/cursed-luck.png',
    ingredients: ['Raven\'s Claw', 'Broken Mirror Shards', 'Four-Leaf Clover (wilted)'],
    effects: ['Extreme luck for 24 hours', 'Curse: Equal bad luck follows'],
    rarity: 'rare'
  },
  {
    id: 'madness-brew',
    name: 'Brew of Temporary Madness',
    description: 'Induces controlled insanity',
    fullDescription: 'A bubbling green concoction that smells of decay. Drinking this potion grants visions of impossible things and temporary immunity to fear and pain. However, the user loses all sense of self-preservation.',
    price: 8.99,
    category: 'cursed',
    image: '/potions/madness-brew.png',
    ingredients: ['Toadstool Caps', 'Spider Venom', 'Grave Dirt'],
    effects: ['Immunity to fear', 'Immunity to pain', 'Curse: Reckless behavior'],
    rarity: 'uncommon'
  },
  {
    id: 'soul-binding',
    name: 'Soul-Binding Draught',
    description: 'Links two souls together',
    fullDescription: 'A mysterious potion that glows with an eerie light. When two people drink from the same vial, their souls become linked. They can sense each other\'s emotions and location, but also share each other\'s pain.',
    price: 99.99,
    category: 'cursed',
    image: '/potions/soul-binding.png',
    ingredients: ['Phantom Essence', 'Blood of Both Parties', 'Eternal Rose Petals'],
    effects: ['Soul link established', 'Shared emotions', 'Curse: Shared pain and suffering'],
    rarity: 'legendary'
  },

  // Additional variety
  {
    id: 'speed-potion',
    name: 'Quicksilver Potion',
    description: 'Grants supernatural speed',
    fullDescription: 'A liquid silver potion that seems to vibrate in its container. Drinking this grants incredible speed and reflexes for a short duration. Time seems to slow down for the user.',
    price: 55.00,
    category: 'potions',
    image: '/potions/speed-potion.png',
    ingredients: ['Quicksilver', 'Hummingbird Wings', 'Lightning in a Bottle'],
    effects: ['Speed +200 for 15 minutes', 'Enhanced reflexes'],
    rarity: 'rare'
  },
  {
    id: 'mana-restore',
    name: 'Arcane Restoration Elixir',
    description: 'Restores magical energy',
    fullDescription: 'A deep blue elixir that crackles with arcane energy. Instantly restores magical reserves and clears mental fatigue. Essential for any practicing mage.',
    price: 38.00,
    category: 'elixirs',
    image: '/potions/mana-restore.png',
    ingredients: ['Mana Crystals', 'Starlight Essence', 'Wizard\'s Beard Lichen'],
    effects: ['Restores 100 Mana', 'Clears mental fatigue'],
    rarity: 'common'
  },
  {
    id: 'phoenix-down',
    name: 'Phoenix Down',
    description: 'Legendary revival ingredient',
    fullDescription: 'A single feather from a phoenix, still warm with the bird\'s eternal flame. The most precious ingredient in all of alchemy, capable of bringing someone back from the brink of death.',
    price: 500.00,
    category: 'ingredients',
    image: '/ingredients/phoenix-down.png',
    ingredients: [],
    effects: [],
    rarity: 'legendary'
  }
];
