// Enum для типів героїв
enum HeroType {
    Warrior = "WARRIOR",
    Mage = "MAGE",
    Archer = "ARCHER"
}

// Enum для типів атак
enum AttackType {
    Physical = "PHYSICAL",
    Magical = "MAGICAL",
    Ranged = "RANGED"
}

// Interface для характеристик героя
interface HeroStats {
    health: number;
    attack: number;
    defense: number;
    speed: number;
}

// Interface для героя
interface Hero {
    id: number;
    name: string;
    type: HeroType;
    attackType: AttackType;
    stats: HeroStats;
    isAlive: boolean;
}

// Type для результату атаки
type AttackResult = {
    damage: number;
    isCritical: boolean;
    remainingHealth: number;
};

let heroIdCounter = 1;

// Функція створення нового героя
function createHero(name: string, type: HeroType): Hero {
    const baseStats: Record<HeroType, HeroStats> = {
        [HeroType.Warrior]: { health: 150, attack: 50, defense: 30, speed: 20 },
        [HeroType.Mage]: { health: 100, attack: 70, defense: 20, speed: 25 },
        [HeroType.Archer]: { health: 120, attack: 60, defense: 25, speed: 30 },
    };

    return {
        id: heroIdCounter++,
        name,
        type,
        attackType: type === HeroType.Warrior ? AttackType.Physical
            : type === HeroType.Mage ? AttackType.Magical
                : AttackType.Ranged,
        stats: baseStats[type],
        isAlive: true,
    };
}

// Функція розрахунку пошкодження
function calculateDamage(attacker: Hero, defender: Hero): AttackResult {
    const baseDamage = Math.max(attacker.stats.attack - defender.stats.defense, 0);
    const isCritical = Math.random() < 0.2; // 20% шанс критичного удару
    const damage = isCritical ? baseDamage * 2 : baseDamage;
    const remainingHealth = Math.max(defender.stats.health - damage, 0);

    return {
        damage,
        isCritical,
        remainingHealth,
    };
}

// Generic функція для пошуку героя в масиві
function findHeroByProperty<T extends keyof Hero>(
    heroes: Hero[],
    property: T,
    value: Hero[T]
): Hero | undefined {
    return heroes.find(hero => hero[property] === value);
}

// Функція проведення раунду бою між героями
function battleRound(hero1: Hero, hero2: Hero): string {
    if (!hero1.isAlive || !hero2.isAlive) {
        return "Один із героїв вже загинув. Бій неможливий.";
    }

    const attacker = hero1.stats.speed >= hero2.stats.speed ? hero1 : hero2;
    const defender = attacker === hero1 ? hero2 : hero1;

    const attackResult = calculateDamage(attacker, defender);
    defender.stats.health = attackResult.remainingHealth;

    if (defender.stats.health === 0) {
        defender.isAlive = false;
        return `${attacker.name} переміг ${defender.name}, завдавши ${attackResult.damage} пошкоджень!`;
    }

    return `${attacker.name} атакував ${defender.name}, завдавши ${attackResult.damage} пошкоджень. У ${defender.name} залишилось ${defender.stats.health} здоров'я.`;
}

// Практичне застосування
const heroes: Hero[] = [
    createHero("Дмитро", HeroType.Warrior),
    createHero("Мерлін", HeroType.Mage),
    createHero("Робін", HeroType.Archer),
];

// Демонстрація роботи
console.log("Герої:", heroes);

// Пошук героя за типом
const foundHero = findHeroByProperty(heroes, "type", HeroType.Mage);
console.log("Знайдений герой:", foundHero);

// Проведення бою між героями
const result1 = battleRound(heroes[0], heroes[1]);
console.log(result1);

const result2 = battleRound(heroes[0], heroes[2]);
console.log(result2);

// Показати фінальний стан героїв
console.log("Стан героїв після бою:", heroes);
