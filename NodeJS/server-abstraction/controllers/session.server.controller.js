'use strict';

const router = require('express').Router();

module.exports = function(sessionRepository) {

    router.get('/classes/:classId/sessions', async (req, res, next) => {

        try {
            let sessions = await sessionRepository.findByClassId(req.params.classId);
            res.json(sessions);
        } catch(error) {
            next(error);
        }

    });

    return router;
}