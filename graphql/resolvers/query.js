const { models } = require('../../models');
const { Op } = require('sequelize')

module.exports = {
  event (root, { id }) {
    return models.Event.findById(id);
  },
  /* @bug
   *
   * object method's `arguments` is not the same
   * as `args`, passed as the 2-nd argument.
   */

  events (root, args, context) {
    return models.Event.findAll({
      where: {
        dateStart: {
          [Op.gt]: args.dateStart
            ? new Date(args.dateStart)
            : null,
        },
        dateEnd: {
          [Op.lt]: args.dateEnd
            ? new Date(args.dateEnd)
            : null
        }
      }
    }, context);
  },
  user (root, { id }) {
    return models.User.findById(id);
  },
  users (root, args, context) {
    return models.User.findAll({}, context);
  },
  /*
   * @bug
   *
   * `return models.Room.findAll({ offset: 1 }, context);`
   * As a result, it fetches not all rooms.
   *
   * As a consequence,
   * there's no need for { offset: 1 } at all
   *
   */
  rooms (root, args, context) {
    return models.Room.findAll({}, context);
  }
};
