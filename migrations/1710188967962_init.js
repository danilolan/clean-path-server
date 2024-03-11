/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("customer", {
    id: { type: "serial", primaryKey: true },
    updatedAt: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    createdAt: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    name: { type: "varchar(100)", notNull: true },
    email: { type: "varchar(100)", notNull: true },
    positionX: { type: "integer", notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("customer");
};
