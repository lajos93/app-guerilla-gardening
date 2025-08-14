import type { SerializedEditorState } from 'lexical'

export type AboutType = {
  backgroundColor: string
  title: string
  titleHighlight?: string
  richDescription?: SerializedEditorState
}

export type AboutBlockType = {
  blockType: 'about' //
} & AboutType
