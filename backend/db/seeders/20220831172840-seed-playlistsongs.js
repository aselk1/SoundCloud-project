'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "PlaylistSongs";
    return await queryInterface.bulkInsert(options, [
      {
        songId: 1,
        playlistId: 1
      },
      {
        songId: 2,
        playlistId: 1
      },
      {
        songId: 3,
        playlistId: 1
      },
      {
        songId: 4,
        playlistId: 1
      },
      {
        songId: 5,
        playlistId: 2
      },
      {
        songId: 6,
        playlistId: 2
      },
      {
        songId: 7,
        playlistId: 2
      },
      {
        songId: 8,
        playlistId: 2
      },
      {
        songId: 9,
        playlistId: 3
      },
      {
        songId: 10,
        playlistId: 3
      },
      {
        songId: 11,
        playlistId: 3
      },
      {
        songId: 12,
        playlistId: 3
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "PlaylistSongs";
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
        [Op.and]: [{
          songId: { [Op.in]: [1, 2, 3, 4] }
        }, {
          playlistId: { [Op.in]: [1, 2, 3] }
        }]
    }, { // to fix auto increment
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
