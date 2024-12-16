// Enum ��� ���� �����
enum HeroType {
    Warrior = "WARRIOR",
    Mage = "MAGE",
    Archer = "ARCHER"
}

// Enum ��� ���� ����
enum AttackType {
    Physical = "PHYSICAL",
    Magical = "MAGICAL",
    Ranged = "RANGED"
}

// Interface ��� ������������� �����
interface HeroStats {
    health: number;
    attack: number;
    defense: number;
    speed: number;
}

// Interface ��� �����
interface Hero {
    id: number;
    name: string;
    type: HeroType;
    attackType: AttackType;
    stats: HeroStats;
    isAlive: boolean;
}

// Type ��� ���������� �����
type AttackResult = {
    damage: number;
    isCritical: boolean;
    remainingHealth: number;
};

let heroIdCounter = 1;

// ������� ��������� ������ �����
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
        stats: { ...baseStats[type] },
        isAlive: true,
    };
}

// ������� ���������� �����������
function calculateDamage(attacker: Hero, defender: Hero): AttackResult {
    const baseDamage = Math.max(attacker.stats.attack - defender.stats.defense, 0);
    const isCritical = Math.random() < 0.2; // 20% ���� ���������� �����
    const damage = isCritical ? baseDamage * 2 : baseDamage;
    const remainingHealth = Math.max(defender.stats.health - damage, 0);

    return {
        damage,
        isCritical,
        remainingHealth,
    };
}

// Generic ������� ��� ������ ����� � �����
function findHeroByProperty<T extends keyof Hero>(
    heroes: Hero[],
    property: T,
    value: Hero[T]
): Hero | undefined {
    return heroes.find(hero => hero[property] === value);
}

// ������� ���������� ������ ��� �� �������
function battleRound(hero1: Hero, hero2: Hero): string {
    if (!hero1.isAlive || !hero2.isAlive) {
        return "One of the heroes has already died. The battle is impossible.";
    }

    const attacker = hero1.stats.speed >= hero2.stats.speed ? hero1 : hero2;
    const defender = attacker === hero1 ? hero2 : hero1;

    const attackResult = calculateDamage(attacker, defender);
    defender.stats.health = attackResult.remainingHealth;

    if (defender.stats.health === 0) {
        defender.isAlive = false;
        return `${attacker.name} won ${defender.name}, inflicting ${attackResult.damage} damages!`;
    }

    return `${attacker.name} attacked ${defender.name}, inflicting ${attackResult.damage} damages.  ${defender.name} is left. ${defender.stats.health} health.`;
}

// ������� ��� ��� �� ���� �������
function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function playGame(heroes: Hero[]): Promise<void> {
    while (heroes.filter(hero => hero.isAlive).length > 1) {
        const aliveHeroes = heroes.filter(hero => hero.isAlive);
        const hero1 = aliveHeroes[Math.floor(Math.random() * aliveHeroes.length)];
        let hero2: Hero;
        do {
            hero2 = aliveHeroes[Math.floor(Math.random() * aliveHeroes.length)];
        } while (hero1 === hero2);

        console.log(battleRound(hero1, hero2));
        await delay(1000); // �������� 1 ������� �� ��������
    }

    const winner = heroes.find(hero => hero.isAlive);
    console.log(winner ? '${ winner.name } is the last hero and has won the game!' : "All the heroes were killed.");
}

// ��������� ������������
const heroes: Hero[] = [
    createHero("Dmitry", HeroType.Warrior),
    createHero("Merlin", HeroType.Mage),
    createHero("Robin.", HeroType.Archer),
];

// ������� ���
console.log("Heroes:", heroes);
playGame(heroes);

// �������� ��������� ���� �����
console.log("The state of the characters after the game:", heroes);