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
        stats: baseStats[type],
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
        return "���� �� ����� ��� �������. ��� ����������.";
    }

    const attacker = hero1.stats.speed >= hero2.stats.speed ? hero1 : hero2;
    const defender = attacker === hero1 ? hero2 : hero1;

    const attackResult = calculateDamage(attacker, defender);
    defender.stats.health = attackResult.remainingHealth;

    if (defender.stats.health === 0) {
        defender.isAlive = false;
        return `${attacker.name} ������ ${defender.name}, �������� ${attackResult.damage} ����������!`;
    }

    return `${attacker.name} �������� ${defender.name}, �������� ${attackResult.damage} ����������. � ${defender.name} ���������� ${defender.stats.health} ������'�.`;
}

// ��������� ������������
const heroes: Hero[] = [
    createHero("������", HeroType.Warrior),
    createHero("�����", HeroType.Mage),
    createHero("����", HeroType.Archer),
];

// ������������ ������
console.log("����:", heroes);

// ����� ����� �� �����
const foundHero = findHeroByProperty(heroes, "type", HeroType.Mage);
console.log("��������� �����:", foundHero);

// ���������� ��� �� �������
const result1 = battleRound(heroes[0], heroes[1]);
console.log(result1);

const result2 = battleRound(heroes[0], heroes[2]);
console.log(result2);

// �������� ��������� ���� �����
console.log("���� ����� ���� ���:", heroes);
