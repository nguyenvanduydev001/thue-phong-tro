import authRouter from './auth.js'; // Đảm bảo có .js nếu dùng ES module

const initRoutes = (app) => {
   app.use('/api/v1/auth', authRouter);

   app.use('/', (req, res) => res.send('Server is running...'));
};

export default initRoutes;
