import type { SerializedEditorState } from 'lexical'

export type AboutType = {
  anchor?: string
  backgroundColor: string
  title: string
  titleHighlight?: string
  richDescription?: SerializedEditorState
}

export type AboutBlockType = {
  blockType: 'about' //
} & AboutType
