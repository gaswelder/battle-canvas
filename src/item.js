const KMPH_TO_PXPMS = 0.001;

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
    const v = this.v * KMPH_TO_PXPMS;
    this.pos[0] += this.dir[0] * v * dt;
    this.pos[1] += this.dir[1] * v * dt;
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

  render(c) {
    c.beginPath();
    c.strokeStyle = "1px solid red;";
    c.rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
    c.stroke();
  }
}
