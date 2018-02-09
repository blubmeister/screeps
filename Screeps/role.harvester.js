/* global FIND_STRUCTURES FIND_SOURCES STRUCTURE_EXTENSION STRUCTURE_SPAWN RESOURCE_ENERGY ERR_NOT_IN_RANGE Room Creep */

var roleHarvester = {

    /** @param {Creep} creep **/
  run: function (creep) {
    if (creep.carry.energy < creep.carryCapacity) {
      let sources = creep.room.find(FIND_SOURCES)
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}})
      }
    } else {
      let targets = creep.room.find(FIND_STRUCTURES, {
        filter: function (structure) {
          return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity
        }
      })
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}})
        }
      }
    }
  }
}

function findBestSource (fromPos) {
  let freeSources = findFreeSources()
  freeSources.sort(function (a, b) {
    return Room.findPath(fromPos, a.pos) - Room.findPath(fromPos, b.pos)
  })
}

function findFreeSources () {
  let sources = Creep.room.find(FIND_SOURCES)
  let squares = {}
  sources.forEach(source => {
    squares[source.id] = walkableAdjacentSquares(source.pos)
  })
}

function walkableAdjacentSquares (pos) {
  let objects = Room.lookAtArea(pos.y - 1, pos.x - 1, pos.y + 1, pos.x + 1, true)
  let count = objects.filter(object => object.type === 'terrain' && object.terrain !== 'wall').length
  return count
}

module.exports = roleHarvester
