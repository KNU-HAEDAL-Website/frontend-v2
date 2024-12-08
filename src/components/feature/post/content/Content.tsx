'use client'

import { BlockNoteEditor, PartialBlock } from '@blocknote/core'
import { BlockNoteView } from '@blocknote/mantine'
import '@blocknote/react/style.css'

import './styles.css'

type PostContentProps = {
  content: string
}

const PostContent = ({ content }: PostContentProps) => {
  const initialContent = (JSON.parse(content) as PartialBlock[]) ?? undefined

  const editor = BlockNoteEditor.create({ initialContent })

  return (
    <BlockNoteView editor={editor} editable={false} data-theming-css-demo />
  )
}

export default PostContent
