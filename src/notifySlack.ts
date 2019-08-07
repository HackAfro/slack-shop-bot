import { sendMessage } from './utils';

module.exports = async (event) => {
  try {
    const res = await sendMessage(event.data);
    const json = await res.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }

  return {
    data: event.data,
  };
};
