const DEBUG = true

var PathFinding = require('./PathFinding')
var roleHarvester = {

    /** @param {Creep} creep **/
  run: function (creep) {
    if (creep.carry.energy < creep.carryCapacity) {
      // let target = Game.getObjectById(creep.memory.target)
      // if (DEBUG) console.log('TARGET: ' + target + ', ISSOURCE: ' + (target instanceof Source))
      // if (!target || creep.harvest(target) !== OK) {
      let target = PathFinding.findTargetsByDistance(creep, FIND_SOURCES)[0]
      if (target) {
        if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
          if (DEBUG) console.log(creep.name + ' - target:' + target)
          PathFinding.moveTo(creep, target, {visualizePathStyle: {stroke: '#ffaa00'}})
        } else {
          if (DEBUG) console.log(creep.name + ' - harvesting')
        }
      } else {
        creep.say('🤔️' + 'idle')
      }
    } else {
      let target = PathFinding.findTargetsByDistance(creep, FIND_STRUCTURES, {
        filter: structure => (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity
      })[0]
      if (target) {
        if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          if (DEBUG) console.log(creep.name + ' - target:' + target)
          PathFinding.moveTo(creep, target, {visualizePathStyle: {stroke: '#ffffff'}})
        }
      } else {
        creep.say('🤔️' + 'idle')
      }
    }
  }
}
module.exports = roleHarvester
