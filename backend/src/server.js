import express from 'express';
import multer from 'multer';

// import { getProductDetails } from './products.js';
import { getMenuDetails } from './menus.js';
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

//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

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
    const imageAsBase64 = req.body.imageAsBase64;

    if (!id) {
        return res.status(400).json({ error: 'Missing id parameter' });
    }

    if (!imageAsBase64) {
        return res.status(400).json({ error: 'Missing image' });
    }

    const menu = getMenuDetails(id);

    if (!menu) {
        return res.status(400).json({ error: 'Menu not found' });
    }

    const verificationResult = await verifyImage(menu, imageAsBase64);

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

    const product = {
        name: verificationResult.product,
        tokens: {
            LocalToken: Math.min(5, Math.max(0, Math.ceil(4 - Math.log10(verificationResult.foodMiles)))),
        }
    };

    console.log(product, verificationResult);

    const creditResponse = creditUser(userAddress, product, verificationResult);

    res.json({
        ...verificationResult,
        awardedTokens: product.tokens,
        credited: creditResponse,
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

