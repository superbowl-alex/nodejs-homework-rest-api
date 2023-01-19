const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const email = { ...data, from: "superbowlalex@meta.ua" };
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
