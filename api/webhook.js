export default function handler(req, res) {
  // VERIFICAÇÃO (GET) — usada pelo Meta na hora de configurar o webhook
  if (req.method === 'GET') {
    const VERIFY_TOKEN = 'vxh7'; // mesmo token que você colocou no Meta

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.status(403).send('Forbidden');
    }
    return;
  }

  // RECEBIMENTO DE EVENTOS (POST)
  if (req.method === 'POST') {
    try {
      console.log('Webhook payload:', JSON.stringify(req.body, null, 2));
      res.status(200).send('EVENT_RECEIVED');
    } catch (e) {
      console.error('Erro ao processar payload:', e);
      res.status(500).send('Erro interno');
    }
    return;
  }

  // Outros métodos não permitidos
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end('Method Not Allowed');
}
