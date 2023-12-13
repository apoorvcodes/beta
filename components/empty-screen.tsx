import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'Checking netlify data',
    message: `Hey connect summarise my netlify data`
  },
  {
    heading: 'Querying your google docs',
    message: 'Hey connect explain and summarise me my latest google doc and what it was about: \n'
  },
  {
    heading: 'Draft an doc using your chat',
    message: `Hey connect check my chat on discord and create a google doc about it, specially inlcude:`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome to Connect Mvp!
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          This is a small demo for our yc application{' '}
          .
        </p>
        <p className="leading-normal text-muted-foreground">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
