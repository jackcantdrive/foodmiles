import express from 'express';
import multer from 'multer';

import { getProductDetails } from './products.js';
import { verifyImage } from './verification.js';

// edit this to mock out the net
//-*-*-
// to actually credit user
import { creditUser } from './creditUser.js';
//--*--
// to mock out and allow running with `node src/server.js`
// const creditUser = () => false;
//-*-*-

const app = express();
const port = 8555;

const upload = multer({ dest: 'uploads/' });

app.use(express.json());

app.use(express.static('./src/public'));

app.get('/getProductDetails', (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({ error: 'Missing id parameter' });
    }

    const product = getProductDetails(id);
    res.json(product);
});

app.post('/verify', upload.single('image'), async (req, res) => {
    const id = req.body.id;
    const userAddress = req.body.userAddress;
    const image = req.file;

    if (!id) {
        return res.status(400).json({ error: 'Missing id parameter' });
    }

    if (!image) {
        return res.status(400).json({ error: 'Missing image' });
    }

    const product = getProductDetails(id);

    if (!product) {
        return res.status(400).json({ error: 'Product not found' });
    }

    const verificationResult = await verifyImage(product, image);

    if (!verificationResult.verified) {
        console.log('Verification failed:', verificationResult.failedVerificationMessage);
        res.json(verificationResult);
        return;
    }

    if (!userAddress) {
        res.json({
            ...verificationResult,
            credited: false,
            creditErrorMessage: 'Missing user address',
        });
        return;
    }

    const creditResponse = creditUser(userAddress, product, verificationResult);

    res.json({
        ...verificationResult,
        credited: creditResponse,
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

