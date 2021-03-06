const knex = require('./knex');

module.exports = {
  getAll() {
    return knex('sticker');
  },
  getOne(id) {
    return knex('sticker').where('id',id).first();
  },
  create(sticker) {
    return knex('sticker').insert(sticker,'*');
  },
  deleteOne(id) {
    return knex('sticker').where('id',id).del();
  },
  update(id,sticker) {
    return knex('sticker').where('id',id).update(sticker,'*');
  },
}
