'use client'

import { use, useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import './tinymce.css'

const initOptions = {
  skin_url: '/tinymce/skins/ui/oxide',
  content_style: `
    body { margin: 4rem; }
    .mce-toc { border:0px ;right: 8%;min-width: 250px;top:20px }
    .mce-content-body [contentEditable=false][data-mce-selected] { outline:0px }
    .mce-content-body {width:60%}
  `, // 设置内容样式
  with: '100px',
  height: 'calc(100vh - 52px)',
  min_height: 100,
  placeholder: '直接输入正文...', // 设置占位符
  language_url: '/tinymce/langs/zh-Hans.js', // 设置本地语言，在本地的路径
  language: 'zh-Hans', // 设置本地语言
  plugins:
    'customHyy quickbars help autosave lists advlist code charmap link fullscreen emoticons wordcount image codesample  directionality autosave  visualblocks autolink anchor  importcss insertdatetime media pagebreak  preview searchreplace table toc', // 插件
  toolbar: false, // 工具栏
  toolbar_mode: 'sliding', // 工具栏模式
  autosave_ask_before_unload: false, // 编辑器是否应提示用户在尝试关闭当前窗口时告知他们有未保存的更改
  autosave_interval: '2s', // 编辑器在拍摄当前内容的快照和将其保存到本地存储之间应等待的时间。默认为“ 30s”
  autosave_prefix: 'tinymce-autosave', // 用于保存的键的前缀
  block_formats: '正文=p; 标题1=h1; 标题2=h2; 标题3=h3; 标题4=h4; 标题5=h5; 标题6=h6', // 设置块格式
  line_height_formats: '1 1.2 1.4 1.6 2 2.5 3', // 设置行高格式
  readonly: true, // 设置只读
  statusbar: true, // 是否隐藏状态栏
  menubar: false, // 是否隐藏菜单栏
  branding: false, // 是否隐藏品牌
  resize: false, // 是否允许调整大小
  help_accessibility: true, // 是否在 TinyMCE 状态栏中显示用于访问“帮助”对话框的键盘快捷键。
  a11y_advanced_options: true, // 是否在“插入链接”对话框中显示高级选项
  file_picker_callback: (cb: any) => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.addEventListener('change', (e: any) => {
      const file = e.target.files[0]
      const reader = new FileReader() as any
      reader.addEventListener('load', () => {
        const id = 'blobid' + new Date().getTime()
        // @ts-ignore
        const blobCache = tinymce.activeEditor.editorUpload.blobCache
        const base64 = reader.result.split(',')[1]
        const blobInfo = blobCache.create(id, file, base64)
        blobCache.add(blobInfo)
        cb(blobInfo.blobUri(), { title: file.name })
      })
      reader.readAsDataURL(file)
    })
    input.click()
  },
  help_tabs: [
    'shortcuts',
    'keyboardnav',
    //  'plugins', 'versions'
  ], // 设置帮助选项卡
  image_advtab: true, // 是否显示高级选项卡
  image_dimensions: true, // 是否显示图像尺寸
  image_description: true, // 是否显示图像描述
  image_caption: true, // 是否显示图像标题
  image_title: true, // 是否显示图像标题
  image_class_list: [
    { title: '无', value: '' },
    { title: '居中', value: 'img-center' },
    { title: '左浮动', value: 'img-left' },
    { title: '右浮动', value: 'img-right' },
  ], // 设置图像类列表
  file_picker_types: 'image', // 设置文件选择器类型
  automatic_uploads: true, // 是否自动上传
  paste_convert_word_fake_lists: true, // 插入word文档需要该属性
  paste_webkit_styles: 'all', // 粘贴时的样式
  paste_merge_formats: true, // 合并格式
  nonbreaking_force_tab: false, // 禁用非打断空格
  paste_auto_cleanup_on_paste: false, // 禁用粘贴时的自动清理
  paste_remove_styles_if_webkit: false, // 禁用webkit粘贴时的样式
  paste_strip_class_attributes: false, // 禁用粘贴时的类属性
  paste_retain_style_properties: 'all', // 粘贴时的样式
  paste_data_images: true, // 粘贴时的图片
  paste_enable_default_filters: true, // 粘贴时的过滤器
  paste_word_valid_elements: '*[*]', // 粘贴时的元素
  paste_word_remove_styles: false, // 粘贴时的样式
  paste_word_remove_font_styles: false, // 粘贴时的字体样式
  paste_word_cleanup_on_paste: false, // 粘贴时的清理
  paste_word_inline_styles: false, // 粘贴时的内联样式
  paste_word_tab_interval: 0, // 粘贴时的间隔
  skeletonScreen: true,
  quickbars_image_toolbar: 'alignleft aligncenter alignright | rotateleft rotateright | imageoptions',
  quickbars_selection_toolbar: 'bold italic underline quicklink h2 h3 blockquote quickimage quicktable tablemergecells',
  quickbars_insert_toolbar: 'p h2 h3 bullist numlist quickimage quicktable hr',
  formats: {
    formatpainter_checklist: { selector: 'ul', classes: 'tox-checklist' },
    formatpainter_liststyletype: { selector: 'ul,ol', styles: { listStyleType: '%value' } },
    formatpainter_borderstyle: {
      selector: 'td,th',
      styles: {
        borderTopStyle: '%valueTop',
        borderRightStyle: '%valueRight',
        borderBottomStyle: '%valueBottom',
        borderLeftStyle: '%valueLeft',
      },
      remove_similar: true,
    },
    formatpainter_bordercolor: {
      selector: 'td,th',
      styles: {
        borderTopColor: '%valueTop',
        borderRightColor: '%valueRight',
        borderBottomColor: '%valueBottom',
        borderLeftColor: '%valueLeft',
      },
      remove_similar: true,
    },
    formatpainter_backgroundcolor: { selector: 'td,th', styles: { backgroundColor: '%value' }, remove_similar: true },
    formatpainter_removeformat: [
      {
        selector: 'b,strong,em,i,font,u,strike,sub,sup,dfn,code,samp,kbd,var,cite,mark,q,del,ins',
        remove: 'all',
        split: true,
        expand: false,
        block_expand: true,
        deep: true,
      },
      { selector: 'span', attributes: ['style', 'class'], remove: 'empty', split: true, expand: false, deep: true },
      { selector: '*:not(tr,td,th,table)', attributes: ['style', 'class'], split: false, expand: false, deep: true },
    ],
  },
  toc_header: 'div', // 设置目录的标题
  toc_depth: 6, // 设置目录的深度
  setup: (editor: any) => {
    editor.on('keyup', () => {
      editor.execCommand('mceInsertOrUpdateToc')
    })
    editor.on('init', () => {
      editor.execCommand('mceInsertOrUpdateToc')
    })
  },
}

export default function Tinymce(props: { value: string }) {
  const { value } = props
  const editorRef = useRef<any>(null)
  const tinymceScriptSrc = process.env.NEXT_PUBLIC_BASE_DOC_URL!

  useEffect(() => {
    if (editorRef.current && props.value) {
      editorRef.current.setContent(props.value)
    }
  }, [props.value])

  const handleEditorInit = (evt: any, editor: any) => {
    editorRef.current = editor
    if (value) {
      editorRef.current.setContent(value)
    }
  }

  return (
    <div className="w-full relative">
      <div id="sample" className="TinyMCE_wrap">
        <Editor tinymceScriptSrc={tinymceScriptSrc} onInit={handleEditorInit} value={value} init={initOptions as any} disabled={true} />
        <div
          id="outside-toc"
          className="outside-toc absolute top-[101px] right-[15px] w-[300px] h-[calc(100% - 140px)] overflow-y-auto p-[10px] z-200 bg-white"
        ></div>
        <div id="show" className=" outside-btn hidden right-[10px] absolute top-[50px] overflow-y-auto p-[10px]"></div>
      </div>
    </div>
  )
}
