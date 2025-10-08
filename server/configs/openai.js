import OpenAI from "openai";

const openai = new OpenAI({
    //apiKey: "GEMINI_API_KEY",
    //baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
     apiKey:process.env.OPENAI_API_KEY
});


export default openai;