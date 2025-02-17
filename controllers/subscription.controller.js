import { workflowClient } from '../config/upstash.js';
import Subscription from '../models/subscription.model.js';

const SERVER_URL = process.env.SERVER_URL;

//criação de inscritos
export const createSubscription = async (req, res, next) => {
  try {
    //essa parte é a validação do usuário antes de cria-lo
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger(
      //{ url, body, headers, workflowRunId, retries },
      {
        url: `${SERVER_URL}/api/v1/workflows/subscription/remider`,
        body: JSON.stringify({ subscriptionId: subscription.id }),
        headers: { 'content-type': 'application/json' },
        retries: 0,
      }
    );

    //se estiver dado tudo certo com a validação então a subscription é aceita.
    res.status(201).json({ success: true, data: subscription });
  } catch (e) {
    next(e);
  }
};
//EXEMPLE BODY
//http://localhost:5000/api/v1/subscriptions (POST)
/*"name": "Netflix Brasil",
	"price": "20.00",
	"currency": "BRL",
	"frequency": "monthly",
	"category": "entertainment",
	"startDate": "2024-02-01T00:00:00.000Z",
	"paymentMethod": "Credit Card" 
  */

//Faz requisições de usuários. // /api/v1/subscriptions/user/coloque o id aqui.
export const getUserSubscriptions = async (req, res, next) => {
  try {
    //Check se o usuário é o mesmo que o do token
    //o ID e o token estão vinculados um ao outro então se forem
    //diferentes não é o mesmo usuário.
    if (req.user.id != req.params.id) {
      const error = new Error('You are not the owner of this account');
      error.status = 401;
      throw error;
    }
    //Se não houver problemas então esse usuário esta autorizado a
    //fazer requisições de outros usuários.
    const subscriptions = await Subscription.find({ user: req.params.id });
    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
};
