'use client'


import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

import axios from 'axios'
import Image from 'next/image'
import TypewriterComponent from 'typewriter-effect'
import { Loader2 } from 'lucide-react'

const Home = () => {

  const [prompt, setPrompt] = React.useState('')
  const [suggestion, setSuggestion] = React.useState('')
  const [loading, setLoading] = React.useState(false)


  const onSubmit = async () => {
    // Set loading state
    setLoading(true)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      const suggestion: { result: string } = await res.json()
      const { result } = suggestion
      console.log('result', result)

      setSuggestion(result)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      setPrompt('')
    }
  }


  return (
    <div className='text-center my-4 max-w-md mx-auto pt-16 pb-20'>
      <h1 className='text-center md:text-6xl text-5xl  font-medium pb-4'>Rumi Writer</h1>
      <p className='text-white/60 text-lg md:mx-0 mx-20'>
      <TypewriterComponent
            options={{
              strings: [
                "Ask Rumi to write you a poem about anything"
              ],
              autoStart: true,
              loop: true,

            }}
          />
      </p>

      <div className='mt-20 pb-2 mx-12 gap-2'>
       <Textarea
       className='text-white/80 bg-gray-900/30'
        placeholder='what you want the poem to be about (ex.a
          cat on the moon)'

     onChange={(e) => setPrompt(e.target.value)}
     value={prompt}
       />
      </div>
       <div className='ml-auto'>
       <Button
       disabled={loading}
       onClick={() => {onSubmit()}}
       className='ml-60' size={'lg'}>
        {loading ? 
       <Loader2 className="animate-spin"/>
        :
       'Generate'
      }
       </Button>
       </div>
        
      {suggestion && (
        <div className='mt-6 flex flex-col items-center justify-center transition-all'>
          <Image
          className='rounded-full -py-8 h-36'
          width={150}
          height={120}
          quality={100}
          src={'/Buildspace-logo.webp'}
          alt=""
          />

          <h1 className='text-center text-3xl  font-medium py-4'>Poem by Rumi</h1>
          <p className='text-md text-white/70 md:mx-10 mx-16 leading-6 mt-4 font-light'>{suggestion}</p>

          {/* <p className='text-md text-white/70 mx-10 leading-6 mt-4'>
          <TypewriterComponent
            options={{

              strings: [
                `${suggestion}`
              ],
              autoStart: true,
              
              // speed: 50
              loop: false,
              
            }}
          />
          </p> */}
       </div>
       )} 
    </div>
  )
}

export default Home