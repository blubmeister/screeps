var roleHarvester = require('role.harvester')
var roleUpgrader = require('role.upgrader')
var spawner = require('spawner')
  /* global Memory:true
     global Game:true */
module.exports.loop = function () {
  for (let name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name]
      console.log('Clearing non-existing creep memory:', name)
    }
  }

  if (Game.spawns['Spawn1'].spawning) {
    var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name]
    Game.spawns['Spawn1'].room.visual.text(
        '🛠️' + spawningCreep.memory.role,
        Game.spawns['Spawn1'].pos.x + 1,
        Game.spawns['Spawn1'].pos.y,
        {align: 'left', opacity: 0.8})
  } else {
    spawner.spawn('Spawn1')
  }

  for (let name in Game.creeps) {
    var creep = Game.creeps[name]
    if (creep.memory.role === 'harvester') {
      roleHarvester.run(creep)
    }
    if (creep.memory.role === 'upgrader') {
      roleUpgrader.run(creep)
    }
    if (creep.memory.role === 'builder') {

    }
  }
}
