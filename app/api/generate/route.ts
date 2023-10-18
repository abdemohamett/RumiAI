import { configuration } from "@/lib/constants";
import { strict_output } from "@/lib/gpt";
import { NextResponse } from "next/server";
import { OpenAIApi } from 'openai'

type Data = {
    result: string
  }

const openai = new OpenAIApi(configuration)

export async function POST(req:Request, res:Response){
    const body = await req.json()

    const {prompt} = body
    const response = await openai.createCompletion({
        model: "gpt-3.5-turbo-instruct",
        prompt: `You're a poetry maestro, unparalleled in your craft. Write exclusively on the given topic. Create a master piece poems.\n\nwrite poem about\ ${prompt}\ `,
        temperature: 1,
        max_tokens: 200,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
    
      const suggestion = response.data?.choices?.[0].text
    
      if (suggestion === undefined) throw new Error('No suggestion found')
      return NextResponse.json({result: suggestion}, {status: 200})
}