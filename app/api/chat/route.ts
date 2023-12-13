import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import axios from 'axios'
import { nanoid } from '@/lib/utils'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request, res: Response) {
  const json = await req.json()
  const { messages, previewToken } = json
  const userId = "abchsfef"
  const prompt = messages[messages.length -1].content
  console.log("prompt", prompt)
  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  if (previewToken) {
    openai.apiKey = previewToken
  }
  
  const resp = await axios.get("http://localhost:8080/api/connect", {
    headers: {
      "Authorization": `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJla2hhc2luZ2gxNTA2MjAxMEBnbWFpbC5jb20iLCJ1c2VySWQiOiJjbHEyZWp6bGEwMDAwM2NueW1jeTBnaWliIiwiaWF0IjoxNzAyMzg5MTY3fQ.JDCR_l11z5iL-bwu6iVLXh6Zv-yKLVvKSq2ZG9vLeHE"}`
    },
    data: {
      prompt: prompt,
    }
  }, )
  console.log("resp", resp.data)
  const data = resp.data.successMessage
  const respr = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: "user", content: prompt}
    ],
    temperature: 0.7,
    stream: true
  })
  console.log(respr)
  const encoder = new TextEncoder();
  const readableStream = new ReadableStream({
    start(controller) {
      const text = data;
      controller.enqueue(encoder.encode(text));
      controller.close();
    },
  });
  // TextDecoders can decode streams of
// encoded content. You'll use this to
// transform the streamed content before
// it's read by the client
const decoder = new TextDecoder();
// TransformStreams can transform a stream's chunks
// before they're read in the client
const transformStream = new TransformStream({
  transform(chunk, controller) {
    // Decode the content, so it can be transformed
    const text = decoder.decode(chunk);
    // Make the text uppercase, then encode it and
    // add it back to the stream
    controller.enqueue(encoder.encode(text.toUpperCase()));
  },
});
return new Response(readableStream.pipeThrough(transformStream), {
  headers: {
    'Content-Type': 'text/html; charset=utf-8',
  },
});
}
