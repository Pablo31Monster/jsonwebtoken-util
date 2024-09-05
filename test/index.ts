import express from 'express';
import { verifyToken, verifyRefreshToken } from '../src';

export const app = express();

app.get('/protected', verifyToken, (_, res) => {
    res.status(200).json({ message: 'Protected route' });
});

app.get('/refresh', verifyRefreshToken, (_, res) => {
    res.status(200).json({ message: 'Refresh route' });
});

export const server = app.listen(3000);
