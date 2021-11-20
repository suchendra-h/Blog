import { sendEmail } from "../util/sendEmail.js";

export const testEmailRoute = {
  path: "/api/test-email",
  method: "post",
  handler: async (req, res) => {
    try {
      await sendEmail({
        to: "milad.hassani+testsendgrid@gmail.com",
        from: "milad.hassani@gmail.com",
        subject: "Testing sendgrid",
        text: "This works",
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
