// api/webhooks.js  (Vercel Serverless Function - CommonJS)
module.exports = (req, res) => {
  try {
    if (req.method === 'GET') {
      const mode = req.query['hub.mode'];
      const token = req.query['hub.verify_token'];
      const challenge = req.query['hub.challenge'];

      if (mode === 'subscribe' && token === 'VXH7') {
        return res.status(200).send(challenge);
      }
      return res.status(403).send('Forbidden');
    }

    if (req.method === 'POST') {
      // webhook do WhatsApp vai postar aqui
      return res.status(200).send('EVENT_RECEIVED');
    }

    return res.status(404).end();
  } catch (e) {
    return res.status(500).send('SERVER_ERROR');
  }
};
 
