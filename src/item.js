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

  run(dt) {
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
   * Called when the item is hit by something.
   */
  punch(item) {
    if (item.creator && item.creator == this) {
      return;
    }
    this.health -= item.v;
    item.health = 0;
  }
}
