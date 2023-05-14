import express from 'express';
const app = express();
const port = 3000;
import { handler } from "./front/build/handler.js"

app.use(handler);

app.listen(port, () => {
    console.log(`server running in port ${port}`);
})