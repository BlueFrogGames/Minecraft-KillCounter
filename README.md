# Minecraft Bedrock Edition Kill Counter

## Installation

- Download the [latest version](https://github.com/BlueFrog130/Minecraft-KillCounter/releases)
- Install via the `.mcpack` or `.mcaddon`
- Make sure you enable `Additional Modding Capabilities` on the map
- You will get a warning indicating this mod uses scripts

## Usage

This mod adds multiple tags and scoreboard entries into whatever map it is part of.

### Scoreboard Objectives

You can rename and modify any of the scoreboard objectives, but the mod will listen and increment only the following:

- `kc:all` - Tracks all kills of the player
- `kc:hostile` - Tracks hostile kills of the player (does not include Piglins or Pigmen)
- `kc:custom` - Custom tracker determined by tags

### Custom Tracker

To enable the custom tracker on a given player, just add a tag with the entity name to that player

Example:

- `tag add @a minecraft:spider`

The `kc:custom` scoreboard will not track `minecraft:spider` entity deaths.
Each player can have as many trackers on them, so be aware that the custom scoreboard will track each player based on their tags.

Example:

Player 1 Tags: `minecraft:spider`, `minecraft:creeper`
Player 2 Tags: `minecraft:cow`

The `kc:custom` score will increment when Player 1 kills a spider or a cow, but will not increment if player 2 kills one of those mobs.