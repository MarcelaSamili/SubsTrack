import dayjs from 'dayjs';
import { emailTemplates } from './emial-template.js';
import transporter, { accountEmail } from '../config/nodemailer.js';

export const sendRemiderEmail = async ({ to, type, subscription }) => {
  if (!to || !type) throw new Error('Missing required parameters');

  const template = emailTemplates.find(t => t.label == type);

  if (!template) throw new Error('Invalid email type');

  const mailInfo = {
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate).format('MMM D, YYYY'),
    planName: subscription.name,
    price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
    PaymentMethod: subscription.PaymentMethod,
  };

  const message = template.generateBody(mailInfo);

  const subject = template.generateSubject(mailInfo);

  const mailOptions = {
    from: accountEmail,
    to: to,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error, 'Error Sending Email');

    console.log('Email Send: ' + info.response);
  });
};
