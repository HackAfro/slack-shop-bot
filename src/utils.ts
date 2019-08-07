import fetch from 'node-fetch';

export const sendMessage = (order) => {
  const message = `A new order was just created`;

  const messageBody = dataBuilder(order);
  const body = {
    channel: 'general',
    attachments: messageBody,
    text: message,
  };
  console.log('Message body', { body });

  console.log('Sending message request');
  return makeRequest(body);
};

const makeRequest = (data) => {
  const url = 'https://slack.com/api/chat.postMessage';
  const headers = {
    Authorization: `Bearer ${process.env.SLACK_ACCESS_TOKEN}`,
    'Content-type': 'application/json',
  };
  console.log({ headers });

  return fetch(url, {
    method: 'post',
    body: JSON.stringify(data),
    headers,
  });
};

const dataBuilder = (order) => {
  const { items } = order;
  const itemSections = items.map((item) => {
    return {
      text: item.name,
      color: '#3AA3E3',
      thumb_url: item.image
    };
  });

  const data = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*There are ${items.length} items*`,
      },
    },
    ...itemSections,
    {
      type: 'action',
      elements: [
        {
          name: 'View Order',
          text: 'View Order',
          type: 'button',
          value: 'chess',
        },
      ],
    },
  ];
  return data;
};
