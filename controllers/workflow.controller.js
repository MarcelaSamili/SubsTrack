/*Esse código é um serviço de envio de lembretes 
de renovação de assinatura usando Express e a biblioteca dayjs 
para manipulação de datas. Ele é projetado para funcionar com a 
infraestrutura da Upstash Workflow, que gerencia tarefas assíncronas.*/

import dayjs from 'dayjs'; // come to "npm install dayjs" //Biblioteca para manipulação de datas

import { createRequire } from 'module'; //createRequire: Necessário para usar o require em módulos ES (usando import.meta.url).
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express'); //serve: Função da Upstash para criar um serviço serverless.

import Subscription from '../models/subscription.model.js';

//Array com os dias antes da renovação em que os
const REMINDERS = [7, 5, 2, 1];
//lembretes serão enviados (7, 5, 2 e 1 dia).

export const sendReminders = serve(async context => {
  const { subscriptionId } = context.requestPayload; // Contexto (context): Informações da requisição e métodos da Upstash Workflow.
  //subscriptionId: ID da assinatura passada na requisição.
  const subscription = await fetchSubscription(context, subscriptionId); //fetchSubscription: Busca a assinatura no banco de dados.

  //VALIDAÇÃO
  if (!subscription || subscription.status != 'active') return; //Verifica se a assinatura existe e está ativa (subscription.status != active).

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    //Checa se a data de renovação não já passou (renewalDate.isBefore(dayjs())).
    console.log(
      `Renewal date has passed for subscription ${subscriptionId}. Stoping workflow`
    );
    return;
  }

  //LÓGICA DE LEMBRETES
  for (const daysBefore of REMINDERS) {
    //Itera sobre os dias definidos em REMINDERS.
    const reminderDate = renewalDate.subtract(daysBefore, 'day'); //Calcula a data do lembrete usando

    if (reminderDate.isAfter(dayjs())) {
      //Se a data do lembrete for futura, utiliza sleepUntilReminder para pausar o workflow até a data.
      await sleepUntilReminder(
        context,
        label`Reminder ${daysBefore} days before`,
        reminderDate
      );
    }
    //Depois, dispara o lembrete com triggerReminder.
    await triggerReminder(context, label`Reminder ${daysBefore} days before`);
  }
});

//Busca a assinatura pelo ID e preenche as informações do usuário (nome e e-mail).
const fetchSubscription = async (context, subscriptionId) => {
  return await context.run('get subscription', () => {
    //context.run: Método da Upstash para monitorar e logar a operação.
    return Subscription.findById(subscriptionId).populate('user', 'name email');
  }); //populate('user', 'name email'): Inclui o nome e e-mail do usuário na resposta.
};

//Pausa a execução do workflow até a data do lembrete.
const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  //context.sleepUntil: Método da Upstash que retoma a execução automaticamente na data especificada.
  await context.sleepUntil(label, date.toDate());
}; //label: Descrição do lembrete para identificação no log.

//Dispara o lembrete.
const triggerReminder = async (context, label) => {
  //context.run: Envolve o envio do lembrete para logging e rastreamento
  return await context.run(label, () => {
    console.log(`Triggering ${label} reminder`);
    // Aqui poderiam ser incluídos envios de e-mail, SMS, notificações push, etc.
  });
};

/*Fluxo Geral:
1-O workflow é iniciado com um subscriptionId.
2-A assinatura é buscada no banco de dados.
3-Se a assinatura não existe, está inativa, ou já passou da data de renovação, o fluxo termina.
4-Para cada dia configurado em REMINDERS, verifica-se se o lembrete deve ser enviado.
5-Se a data do lembrete ainda não chegou, o workflow "dorme" até essa data.
6-Após o tempo de espera, o lembrete é disparado.
7-O ciclo se repete para os próximos lembretes.
*/
