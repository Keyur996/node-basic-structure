export const setRoutes = (app) => {
    // console.log('--Me with app', app);

    app.get('/api/v1', (req, res, next) => {
        res.json({ req: req.url });
    });
}