const DEBUG = true

var PathFinding = {
  moveTo: function (creep, target, opts) {
    if (DEBUG) console.log('moveTo: ' + creep + ', ' + target + ', ' + opts)
    creep.memory.target = target.id
    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}})
  },

  findTargetsByDistance: function (creep, type, opts) {
    if (DEBUG) console.log('findBestTarget: ' + creep + ', ' + type + ', ' + opts)
    let freeTargets = PathFinding.findFreeTargets(creep, type, opts)
    if (freeTargets) {
      let distance = {}
      freeTargets.forEach(function (target) {
        distance[target.id] = creep.room.findPath(creep.pos, target.pos).length
      })
      freeTargets.sort((targetOne, targetTwo) => distance[targetOne.id] - distance[targetTwo.id])
      return freeTargets
    } else {
      return []
    }
  },

  findFreeTargets: function (creep, type, opts) {
    if (DEBUG) console.log('findFreeTargets: ' + creep.room + ' ' + type + ', ' + opts)
    let targets = creep.room.find(type, opts)
    let squares = {}
    // iterate over clone
    targets.slice(0).forEach(function (target) {
      if (DEBUG) console.log('CONSIDERED TARGET: ' + target.id)
      if ((!opts || (opts && !opts.ignoreEnemies)) && PathFinding.enemyNearby(creep.room, target.pos, 1)) {
        targets.splice(targets.indexOf(target), 1)
      }
      squares[target.id] = PathFinding.walkableAdjacentSquares(creep.room, target.pos)
    })
    for (let name in Game.creeps) {
      if (name === creep.name) continue //
      let loopCreep = Game.creeps[name]
      if (loopCreep.memory.target) {
        targets.forEach(function (target) {
          if (Game.getObjectById(loopCreep.memory.target) === target) {
            squares[target.id]--
          }
        })
      }
    }
    return targets.filter(target => squares[target.id] > 0)
  },

  walkableAdjacentSquares: function (room, pos) {
    let objects = room.lookAtArea(pos.y - 1, pos.x - 1, pos.y + 1, pos.x + 1, true)
    let count = objects.filter(object => object.type === 'terrain' && object.terrain !== 'wall').length
    return count
  },

  enemyNearby: function (room, pos, distance) {
    let objects = room.lookAtArea(pos.y - distance, pos.x - distance, pos.y + distance, pos.x + distance, true)
    for (let name in objects) {
      let object = objects[name]
      if (object.type === 'creep' && object.creep.owner.username !== 'lubold') {
        return true
      }
    }
    return false
  }
}

module.exports = PathFinding
