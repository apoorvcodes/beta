import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'

export default function IndexPage() {
  const id = "Hi"

  return <Chat id={id} />
}
