const COSTS = {
  MOVE: 50,
  WORK: 100,
  CARRY: 50,
  ATTACK: 80,
  RANGED_ATTACK: 150,
  HEAL: 250,
  TOUGH: 10,
  CLAIM: 600
}

var spawner = {
  spawn: function () {
    var idlers = {}
    for (let name in Game.creeps) {
      let creep = Game.creeps[name]
      let role = creep.memory.role
      if (!creep.memory.target) {
        idlers[role] = idlers[role] ? idlers[role] + 1 : 1
      }
    }
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester')
    console.log('Harvesters: ' + harvesters.length)
    console.log('Idle Harvesters: ' + idlers['harvester'])
    var newName = 'Harvester' + Game.time
    if (/* !idlers['harvester'] && */Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}}) === OK) {
      console.log('Spawning new harvester: ' + newName)
    }
  }
}

module.exports = spawner
