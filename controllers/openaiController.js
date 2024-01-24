const openai = require('openai');

const client = new openai.OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateImage = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await client.images.generate({
      model: 'dall-e-3',
      prompt,
      size: '256x256',
      quality: 'standard',
      n: 1,
    });

    const imageUrl = response.data.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The image could not be generated',
    });
  }
};

module.exports = { generateImage };
