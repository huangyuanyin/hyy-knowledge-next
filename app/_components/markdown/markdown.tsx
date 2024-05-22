import React, { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import './markdown.css'

export default function Markdown(props: { value: string }) {
  const { value } = props

  // @ts-ignore
  return <MDEditor value={value} preview="preview" hideToolbar onChange={value} className="custom-md-editor" />
}
