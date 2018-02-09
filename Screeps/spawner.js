/* global _: true
          Game: true
          WORK: true
          MOVE: true
          CARRY: true
          OK: true */

var spawner = {
  spawn: function () {
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester')
    console.log('Harvesters: ' + harvesters.length)
    var newName = 'Harvester' + Game.time
    if (Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}}) === OK) {
      console.log('Spawning new harvester: ' + newName)
    }
  }
}

module.exports = spawner
