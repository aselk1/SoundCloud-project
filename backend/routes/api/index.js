// backend/routes/api/index.js
const router = require('express').Router();
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
//session and user routes
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs.js');
const artistsRouter = require('./artists.js');
const playlistsRouter = require('./playlists.js');
const commentsRouter = require('./comments.js');
const albumsRouter = require('./albums.js');
const { restoreUser, requireAuth} = require('../../utils/auth.js');

router.use(restoreUser); //connect restoreUser before any other middleware

//connect other routers
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/songs', songsRouter);
router.use('/artists', artistsRouter);
router.use('/playlists', playlistsRouter);
router.use('/comments', commentsRouter);
router.use('/albums', albumsRouter);

// router.post('/test', function (req, res) { // test router
//     res.json({ requestBody: req.body });
// });

// router.get( // test restoreUser middleware
//     '/restore-user',
//     (req, res) => {
//         return res.json(req.user);
//     }
// );

// // GET /api/require-auth
// router.get( // test requireAuth
//     '/require-auth',
//     requireAuth,
//     (req, res) => {
//         return res.json(req.user);
//     }
// );

// // GET /api/set-token-cookie
// router.get('/set-token-cookie', async (_req, res) => { // test set token cookies
//     const user = await User.findOne({
//         where: {
//             username: 'Demo-lition'
//         }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
// });

module.exports = router;
