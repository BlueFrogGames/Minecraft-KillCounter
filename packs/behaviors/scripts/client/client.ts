/// <reference types="minecraft-scripting-types-client" />

namespace Client
{
    const system = client.registerSystem(0, 0);
    const prefix = "killcounter:"

    let player: IEntity = null;

    // Setup which events to listen for
    system.initialize = function()
    {
        // set up your listenToEvents and register client-side components here.
        this.registerEventData(prefix + "player_joined", { player: null });

        this.listenForEvent("minecraft:client_entered_world", ({ data }) =>
        {
            player = data.player;
            let joinEvent = this.createEventData(prefix + "player_joined");
            joinEvent.data = data;
            this.broadcastEvent(prefix + "player_joined", joinEvent);
        });
    }
}
