// server.js
const express = require('express');
const { OpenAI } = require("openai");
const app = express();
const port = 3000;
// const openai = new OpenAI({ apiKey: process.env.APIKEY }); // Replace 'your-api-key' with your actual API key
const openai = new OpenAI({apiKey:'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'}); // Replace 'your-api-key' with your actual API key

app.use(express.static('public'));

app.get('/get', async (req, res) => {
  const params = req.query;
  if (!params || !params.category || !params.event || !params.type) {
    res.status(421).send("less parameters");
  }
  let toSend = "  write me " + "example of 3  " + params.category + " emotional " + params.type + " to" + params.event;
  if (params.age !== '') {
    const parse_int = parseInt(params.age);
    if (isNaN(parse_int)) {
      res.status(421).send("age imposible")
    }
    toSend += " for age " + params.age;
  }
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: toSend }],
      model: 'gpt-3.5-turbo',
      temperature: 0.8
    });

    console.log(chatCompletion.choices[0].message.content);
    res.send(chatCompletion.choices[0].message.content);
  }

  catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = { app };