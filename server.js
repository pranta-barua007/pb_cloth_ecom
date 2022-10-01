const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');
const morgan = require('morgan');
const helmet = require('helmet');


if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 8000;

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          "script-src": ["'self'", "apis.google.com", "checkout.stripe.com"],
          "img-src": ["'self'", "i.ibb.co", "i.imgur.com", "q.stripe.com"],
          "frame-src": ["'self'", "pb-cloth-db.firebaseapp.com", "checkout.stripe.com"],
          "connect-src": ["'self'", "securetoken.googleapis.com", "firestore.googleapis.com", "www.googleapis.com"]
        },
      },
  }));
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(express.static(path.join(__dirname, 'client', 'build')));
if(process.env.NODE_ENV === 'production') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
};


app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };
    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(400).send({ error: stripeErr });
        } else {
            res.status(200).send({ success: stripeRes});
        }
    });
});

// app.get('/service-worker.js', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'public', 'service-worker.js'));
// });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, error => {
    if(error) throw error;
    console.log('Server is running on port ' + port);
});
