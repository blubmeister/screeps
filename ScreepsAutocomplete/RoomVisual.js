/**
 * Room visuals provide a way to show various visual debug info in game rooms.
 * You can use the RoomVisual object to draw simple shapes that are visible only to you.
 * Every existing Room object already contains the visual property,
 * but you also can create new RoomVisual objects for any room (even without visibility) using the constructor.
 *
 * @param {string} roomName The room name.
 *
 * @class
 * @constructor
 *
 * @see {@link http://support.screeps.com/hc/en-us/articles/115000962829-RoomVisual}
 */
RoomVisual = function(roomName) { };

RoomVisual.prototype =
{
    /**
     * The name of the room.
     *
     * @see {@link http://support.screeps.com/hc/en-us/articles/115000962829-RoomVisual#roomName}
     *
     * @type {string}
      */
    roomName: "",

    /**
     * Draw a line.
     *
     * @see {@link http://support.screeps.com/hc/en-us/articles/115000962829-RoomVisual#line}
     *
     * @type {function}
     *
     * @param {
     */
}