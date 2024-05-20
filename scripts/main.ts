import { world, system } from '@minecraft/server';
import { hostileMobs, scoreboards } from './constants';

world.afterEvents.entityDie.subscribe((e) => {
	// Todo: add score to player
	const entity = e.damageSource.damagingEntity;
	if (!entity || entity.typeId !== 'minecraft:player') {
		return;
	}

	const id = e.deadEntity.typeId;

	const tags = entity.getTags();

	if (hostileMobs.indexOf(id) > -1) {
		world.scoreboard.getObjective(scoreboards.hostile.objective)?.addScore(entity, 1);
	}

	if (tags.indexOf(id) > -1) {
		world.scoreboard.getObjective(scoreboards.custom.objective)?.addScore(entity, 1);
	}

	world.scoreboard.getObjective(scoreboards.all.objective)?.addScore(entity, 1);
});

world.afterEvents.playerJoin.subscribe((e) => {
	const player = world.getPlayers({ name: e.playerName })[0];
	if (!player) {
		return;
	}
	for (let key in scoreboards) {
		const obj = scoreboards[key as keyof typeof scoreboards];
		const objective = world.scoreboard.getObjective(obj.objective);
		if (!objective) {
			continue;
		}

		objective.setScore(player, 0);
	}
});

system.run(initializeScoreboard);

async function initializeScoreboard() {
	for (let key in scoreboards) {
		const obj = scoreboards[key as keyof typeof scoreboards];
		if (obj.objective.length > 16) {
			obj.objective = obj.objective.slice(0, 17);
		}

		// Check if the objective already exists
		if (world.scoreboard.getObjective(obj.objective)) {
			continue;
		}

		const objective = world.scoreboard.addObjective(obj.objective, obj.display);

		world.getAllPlayers().forEach((p) => {
			objective.setScore(p, 0);
		});
	}
}
