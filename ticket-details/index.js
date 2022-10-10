/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.main = (req, res) => {
    let message = req.query.message || req.body.message || 'ticket-details';
    res.status(200).send(message);
};