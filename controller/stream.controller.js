"use strict";

exports.get_jwt = async (req, res, next) => {
    try {
        res.status(200).send('value ...');
    } catch (error) {
        res.status(404).send(error);
    }
}