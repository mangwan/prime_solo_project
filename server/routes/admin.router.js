const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//input info for a new song
// router.post('/', (req, res) => {
//     pool.query(`INSERT INTO "song" ("title", "artist", "lyric", "original_key", "tempo", "BPM", "CCLI", "spotify_uri", "album_cover")
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`, [req.body.title, req.body.artist, req.body.lyric, req.body.original_key, req.body.tempo, req.body.BPM, req.body.CCLI, req.body.spotify_uri, req.body.album_cover])
//     .then(response => {
//         res.sendStatus(201)
//     }).catch (error => {
//         console.log('error posting images:', error)
//     })
// });


//get all song requests from database
router.get('/song-request', (req, res) => {
    pool.query('SELECT * FROM "song_requests"')
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log('error in SELECT query', error);
            res.sendStatus(500);
        });
});

//delete songs
router.delete('/delete/:id', (req, res) => {
    pool.query(`DELETE FROM "song" WHERE "id"=$1;`, [req.params.id])
        .then(result => {
            res.sendStatus(201)
        }).catch(error => {
            console.log('error in DELETE query:', error)
        })
});

module.exports = router;