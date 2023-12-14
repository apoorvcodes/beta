import OpenAI from 'openai'
import axios from 'axios'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export const maxDuration = 300;
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
  let data: string
  try {
  const resp = await axios.get("https://connai.up.railway.app/api/connect", {
    headers: {
      "Authorization": `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InljLmNvbm5haUBnbWFpbC5jb20iLCJ1c2VySWQiOiJjbHE0dTJmaXIwMDAwNXhiaDd1cDd0bWVtIiwiaWF0IjoxNzAyNTM2MTU1fQ.cFFtMW6E_vDC8NcbIGgFZm4AQc1CK1G4UQOJWlcGLDY"}`
    },
    data: {
      prompt: prompt,
    }
  }, )
  data = resp.data.successMessage;
} catch (e) {
  console.log("err", e)
  data = "Something went wrong, Maybe we are getting too many requests from beta users!. Please try again later."
}   
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
    controller.enqueue(encoder.encode(text));
  },
});
return new Response(readableStream.pipeThrough(transformStream), {
  headers: {
    'Content-Type': 'text/html; charset=utf-8',
  },
});
}
