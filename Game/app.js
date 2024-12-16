// Enum ��� ���� �����
var HeroType;
(function (HeroType) {
    HeroType["Warrior"] = "WARRIOR";
    HeroType["Mage"] = "MAGE";
    HeroType["Archer"] = "ARCHER";
})(HeroType || (HeroType = {}));
// Enum ��� ���� ����
var AttackType;
(function (AttackType) {
    AttackType["Physical"] = "PHYSICAL";
    AttackType["Magical"] = "MAGICAL";
    AttackType["Ranged"] = "RANGED";
})(AttackType || (AttackType = {}));
let heroIdCounter = 1;
// ������� ��������� ������ �����
function createHero(name, type) {
    const baseStats = {
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
function calculateDamage(attacker, defender) {
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
function findHeroByProperty(heroes, property, value) {
    return heroes.find(hero => hero[property] === value);
}
// ������� ���������� ������ ��� �� �������
function battleRound(hero1, hero2) {
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
const heroes = [
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
//# sourceMappingURL=app.js.map