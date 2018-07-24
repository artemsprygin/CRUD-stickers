const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidID(req,res,next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error('Invalid id'));
  }
function isValidSticker(sticker) {
  const hasTitle = typeof sticker.title == 'string' &&
                          sticker.title.trim()!='';
  const hasUrl = typeof sticker.url == 'string' &&
                          sticker.url.trim()!='';
  const hasDescription = typeof sticker.description == 'string' &&
                          sticker.description.trim()!='';
  const hasRating = !isNaN(sticker.rating);
  return hasTitle && hasUrl && hasDescription && hasRating;
}

router.get('/', (req,res) => {
  queries.getAll().then(stickers => {
  res.json(stickers);
  });
});

router.get('/:id', isValidID, (req,res,next) => {
  queries.getOne(req.params.id).then(stickers => {
    if(stickers) {
    res.json(stickers);
  } else {
    next();
  }
});
});

router.post('/', (req,res,next) => {
  if(isValidSticker(req.body)) {
    // insert into db
    queries.create(req.body).then(stickers => {
      res.json(stickers[0]);
    });
  }
  else {
    next(new Error('Invalid sticker'));
  }
});
router.delete('/:id', isValidID,  (req,res) => {
  queries.deleteOne(req.params.id).then(stickers => {
    res.json({
      deleted: true
    });
  });
});

router.put('/:id', isValidID, (req,res,next) => {
  if (isValidSticker(req.body)) {
      // update sticker
      queries.update(req.params.id,req.body).then(stickers => {
        res.json(stickers[0]);
      })
  } else {
    next(new Error('Invalid sticker'));
  }
});

module.exports = router;
