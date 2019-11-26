export class Item {
  constructor(pos, size = [10, 10]) {
    /**
     * Where this item's top left corner is, [x, y].
     */
    this.pos = pos;
    /**
     * The item's bounding rectangle size, [w, h].
     */
    this.size = size;
    /**
     * The item's orientation. [1, 1] is north-east, [0, -1] is south.
     */
    this.dir = [0, 0];
    /**
     * The item's velocity in "km/h"
     */
    this.v = 0;
    /**
     * How many points should be deducted before this item is removed.
     */
    this.health = 1;
  }

  /**
   * Called to get the object opportunity to do something
   * specific, like spawning a new object.
   *
   * @param {number} t Current world time
   */
  tick(t) {
    //
  }

  /**
   * Method that is called when the item hits a wall.
   * Does nothing by default.
   */
  hitWall() {
    //
  }

  /**
   * Called wnen this item hits another item.
   *
   * @param {Item} obj
   */
  hit(obj) {
    //
  }
}
