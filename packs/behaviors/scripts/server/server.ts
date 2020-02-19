/// <reference types="minecraft-scripting-types-server" />

namespace Server
{
    const system = server.registerSystem(0, 0);
    const prefix = "killcounter:";
    const scoreboardPrefix= "kc:";
    const hostileMobs = [
        "minecraft:blaze",
        "minecraft:creeper",
        "minecraft:drowned",
        "minecraft:elder_guardian",
        "minecraft:endermite",
        "minecraft:evocation_illager",
        "minecraft:ghast",
        "minecraft:guardian",
        "minecraft:husk",
        "minecraft:magma_cube",
        "minecraft:phantom",
        "minecraft:pillager",
        "minecraft:ravager",
        "minecraft:shulker",
        "minecraft:silverfish",
        "minecraft:skeleton",
        "minecraft:slime",
        "minecraft:stray",
        "minecraft:vex",
        "minecraft:vindicator",
        "minecraft:witch",
        "minecraft:wither_skeleton",
        "minecraft:zombie",
        "minecraft:zombie_villager",
        "minecraft:zombie_villager",
        "minecraft:zombie_villager_v2",
        "minecraft:ender_dragon",
        "minecraft:wither"
    ];

    const objectives = [
        {
            objective: scoreboardPrefix + "hostile",
            display: "Hostile"
        },
        {
            objective: scoreboardPrefix + "all",
            display: "All"
        }
    ];

    // Setup which events to listen for
    system.initialize = function()
    {
        // set up your listenToEvents and register server-side components here.
        this.listenForEvent(prefix + "player_joined", ({ data }) =>
        {
            initializeScoreboard();
        });
        this.listenForEvent("minecraft:entity_death", ({ data }) =>
        {
            if(data.killer && (data.killer as IEntity).__identifier__ !== "minecraft:player")
                return;

            if(hostileMobs.indexOf((data.entity as IEntity).__identifier__) > -1)
            {
                incrementScore(scoreboardPrefix+"hostile", data.killer);
            }
            incrementScore(scoreboardPrefix+"all", data.killer);
        });
    }

    function initializeScoreboard()
    {
        for(let obj of objectives)
        {
            if(obj.objective.length > 16)
            {
                obj.objective = obj.objective.substr(0, 16);
            }
            system.executeCommand(`/scoreboard objectives add ${obj.objective} dummy ${obj.display}`, () => {});
            system.executeCommand(`/scoreboard players add @a ${obj.objective} 0`, () => {});
        }
    }

    function incrementScore(objective: string, player: IEntity)
    {
        let { x, y, z } = system.getComponent<IPositionComponent>(player, "minecraft:position").data;
        system.executeCommand(`/scoreboard players add @e[x=${x},y=${y},z=${z},dx=0,dy=0,dz=0,type=player] ${objective} 1`, (callback) => { });
    }
}
