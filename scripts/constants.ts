const scoreboardPrefix = 'kc:';

export const hostileMobs = [
	'minecraft:blaze',
	'minecraft:creeper',
	'minecraft:drowned',
	'minecraft:elder_guardian',
	'minecraft:endermite',
	'minecraft:evocation_illager',
	'minecraft:ghast',
	'minecraft:guardian',
	'minecraft:husk',
	'minecraft:magma_cube',
	'minecraft:phantom',
	'minecraft:pillager',
	'minecraft:ravager',
	'minecraft:shulker',
	'minecraft:silverfish',
	'minecraft:skeleton',
	'minecraft:slime',
	'minecraft:stray',
	'minecraft:vex',
	'minecraft:vindicator',
	'minecraft:witch',
	'minecraft:wither_skeleton',
	'minecraft:zombie',
	'minecraft:zombie_villager',
	'minecraft:zombie_villager',
	'minecraft:zombie_villager_v2',
	'minecraft:ender_dragon',
	'minecraft:wither',
];

export const scoreboards = {
	hostile: {
		objective: scoreboardPrefix + 'hostile',
		display: 'Hostile Kills',
	},
	all: {
		objective: scoreboardPrefix + 'all',
		display: 'All Kills',
	},
	custom: {
		objective: scoreboardPrefix + 'custom',
		display: 'Custom Kills',
	},
};
