import axios from 'axios';
import { randomUUID } from 'crypto';

const PaymentHandler = async (req, res) => {
  console.log('Payment request');
  if (req.method === 'POST') {
    try {
      const { data } = await axios.post(
        'https://connect.squareupsandbox.com/v2/payments',
        {
          source_id: req.body.sourceId,
          idempotency_key: randomUUID(),
          amount_money: {
            amount: 100,
            currency: 'USD'
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  } else {
    res.status(500).send();
  }
};

export default PaymentHandler;