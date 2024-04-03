!(function () {
  function t(a, b) {
    if ((void 0 === b && (b = 2), 0 === a)) return '0 B'
    var c = Math.floor(Math.log(a) / Math.log(1024))
    return parseFloat((a / Math.pow(1024, c)).toFixed(0 > b ? 0 : b)) + ' ' + 'BKMGTPEZY'.split('')[c]
  }
  function r(a) {
    a.focus()
    z(function (b) {
      for (var c = 0; c < b.length; c++)
        u(a, b[c], function (g, m) {
          0 < a.dom.select('span#' + g).length ? a.dom.replace(m, g) : a.selection.setContent(m.outerHTML)
        })
    })
  }
  function A(a) {
    a.ui.registry.getAll().icons.attachment ||
      a.ui.registry.addIcon(
        'attachment',
        '<svg width="20" height="20"><path d="M16.3 9.3a.8.8 0 00-1 0l-5.5 5.4a2.8 2.8 0 01-4.3-.4v-.1l-.2-.3-.1-.2a3 3 0 01-.2-.6V13c0-.9.2-1.7.8-2.2L11.7 5c.6-.7 1.6-.7 2.3 0a1.6 1.6 0 010 2.2L8 13a.4.4 0 01-.7-.3v-.3L12.2 8c.3-.3.3-.8 0-1a.8.8 0 00-1 0l-4.7 4.5a1.9 1.9 0 000 2.7c.8.7 2 .7 2.8 0L15 8.3a3 3 0 000-4.4 3.1 3.1 0 00-4.4 0L4.8 9.7a4.2 4.2 0 000 6 4.3 4.3 0 006 0l5.5-5.3.2-.6c0-.2 0-.4-.2-.5" fill-rule="evenodd"/></svg>'
      )
    a.ui.registry.addButton('attachment', {
      icon: 'attachment',
      tooltip: '\u63d2\u5165\u9644\u4ef6',
      onAction: function () {
        return r(a)
      }
    })
    a.ui.registry.addMenuItem('attachment', {
      icon: 'attachment',
      text: '\u63d2\u5165\u9644\u4ef6',
      onAction: function () {
        return r(a)
      }
    })
    a.ui.registry.addButton('attachment-download', {
      text: '\u4e0b\u8f7d',
      onAction: function () {
        a: {
          var b = 0
          for (var c = a.selection.getNode().children; b < c.length; b++) {
            var g = c[b]
            if (g.hasAttribute('href')) {
              b = g.getAttribute('href')
              break a
            }
          }
          b = '#'
        }
        c = b
        b = document.createElement('a')
        b.target = '_blank'
        b.href = c
        b.rel = 'noreferrer noopener'
        c = document.createEvent('MouseEvents')
        c.initMouseEvent('click', !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null)
        document.body.appendChild(b)
        b.dispatchEvent(c)
        document.body.removeChild(b)
      }
    })
    a.ui.registry.addContextToolbar('attachment', {
      predicate: function (b) {
        return !((b = b || a.selection.getNode()), !a.dom.getParent(b, 'span[class="attachment"]'))
      },
      items: 'attachment-download',
      position: 'node',
      scope: 'node'
    })
  }
  tinymce.util.Tools.resolve('tinymce.util.Promise')
  tinymce.util.Tools.resolve('tinymce.Env')
  tinymce.util.Tools.resolve('tinymce.util.Delay')
  var z = function (a) {
      var b = document.createElement('input')
      b.setAttribute('type', 'file')
      b.setAttribute('accept', '*/*')
      b.setAttribute('multiple', 'multiple')
      b.onchange = function (c) {
        c = c.target.files
        null != a && a(c)
      }
      b.click()
    },
    u = function (a, b, c) {
      var g,
        m,
        k,
        l,
        p,
        q,
        v,
        w,
        n,
        x = a.getParam('attachment_max_size') || 209715200
      b.size > x
        ? ((g = t(x)),
          a.notificationManager.open({
            text: '\u9644\u4ef6\u6700\u5927\u652f\u6301 ' + g + '\uff0c\u8d85\u8fc7 ' + g + ' \u7684\u9644\u4ef6\u5c06\u4e0d\u4f1a\u88ab\u4e0a\u4f20\u3002',
            type: 'warning',
            timeout: 5e3
          }))
        : ((m = a.getParam('attachment_upload_handler')),
          (k = a.getParam('attachment_icons_path', 'https://unpkg.com/@npkg/tinymce-plugins/plugins/attachment/icons')),
          (l = a.dom.uniqueId()),
          (p = 'attachment_' + l),
          (q = t(b.size)),
          (v =
            k +
            '/' +
            (function (d) {
              if (d) {
                var e = d.lastIndexOf('.')
                if (-1 === e) return 'default_file.svg'
                d = d.substr(e + 1).toLowerCase()
                e = 0
                for (
                  var f = [
                    { ext: 'txt', icon: 'file_type_text' },
                    { ext: 'doc', icon: 'file_type_word2' },
                    { ext: 'docx', icon: 'file_type_word2' },
                    { ext: 'pdf', icon: 'file_type_pdf2' },
                    { ext: 'xls', icon: 'file_type_excel2' },
                    { ext: 'xlsx', icon: 'file_type_excel2' },
                    { ext: 'ppt', icon: 'file_type_powerpoint2' },
                    { ext: 'pptx', icon: 'file_type_powerpoint2' },
                    { ext: 'ai', icon: 'file_type_ai2' },
                    { ext: 'psd', icon: 'file_type_photoshop2' },
                    { ext: 'zip', icon: 'file_type_zip' },
                    { ext: 'rar', icon: 'file_type_zip' },
                    { ext: 'jpg', icon: 'file_type_image' },
                    { ext: 'jpeg', icon: 'file_type_image' },
                    { ext: 'png', icon: 'file_type_image' },
                    { ext: 'gif', icon: 'file_type_image' },
                    { ext: 'js', icon: 'file_type_js' },
                    { ext: 'xml', icon: 'file_type_xml' },
                    { ext: 'htm', icon: 'file_type_html' },
                    { ext: 'html', icon: 'file_type_html' },
                    { ext: 'json', icon: 'file_type_light_json' },
                    { ext: 'fon', icon: 'file_type_light_font' },
                    { ext: 'font', icon: 'file_type_light_font' },
                    { ext: 'svg', icon: 'file_type_image' },
                    { ext: 'exe', icon: 'file_type_binary' },
                    { ext: 'bin', icon: 'file_type_binary' },
                    { ext: 'dll', icon: 'file_type_binary' },
                    { ext: 'pkg', icon: 'file_type_package' },
                    { ext: 'wav', icon: 'file_type_audio' },
                    { ext: 'mp3', icon: 'file_type_audio' },
                    { ext: 'mp4', icon: 'file_type_video' },
                    { ext: 'mov', icon: 'file_type_video' },
                    { ext: 'avi', icon: 'file_type_video' },
                    { ext: 'java', icon: 'file_type_java' },
                    { ext: 'cs', icon: 'file_type_csharp' },
                    { ext: 'css', icon: 'file_type_css' },
                    { ext: 'py', icon: 'file_type_python' },
                    { ext: 'sln', icon: 'file_type_vscode3' },
                    { ext: 'go', icon: 'file_type_go' },
                    { ext: '7z', icon: 'file_type_zip' },
                    { ext: 'sketch', icon: 'file_type_sketch' },
                    { ext: 'patch', icon: 'file_type_patch' },
                    { ext: 'org', icon: 'file_type_org' },
                    { ext: 'md', icon: 'file_type_markdown' },
                    { ext: 'jar', icon: 'file_type_jar' },
                    { ext: 'dmg', icon: 'file_type_dmg' },
                    { ext: 'accdb', icon: 'file_type_access' },
                    { ext: 'apk', icon: 'file_type_apk' },
                    { ext: 'eps', icon: 'file_type_eps' },
                    { ext: 'ico', icon: 'file_type_ico' },
                    { ext: 'iso', icon: 'file_type_iso' },
                    { ext: 'key', icon: 'file_type_keynote' },
                    { ext: 'numbers', icon: 'file_type_number' },
                    { ext: 'reg', icon: 'file_type_reg' },
                    { ext: 'rp', icon: 'file_type_rp' },
                    { ext: 'rtf', icon: 'file_type_rtf' },
                    { ext: 'sketch', icon: 'file_type_sketch' },
                    { ext: 'swf', icon: 'file_type_swf' },
                    { ext: 'url', icon: 'file_type_url' },
                    { ext: 'wma', icon: 'file_type_wma' },
                    { ext: 'xmind', icon: 'file_type_xmind' },
                    { ext: 'cat', icon: 'file_type_cat' }
                  ];
                  e < f.length;
                  e++
                ) {
                  var h = f[e]
                  if (h.ext === d) return h.icon + '.svg'
                }
              }
              return 'default_file.svg'
            })(b.name)),
          (w = k + '/error.png'),
          (n = (function (d, e) {
            var f = document.createElement('img')
            f.setAttribute('src', e.icon)
            f.setAttribute('width', '30px')
            var h = document.createElement('span')
            h.setAttribute('id', 'progress_' + e.id)
            h.innerText = '0%'
            var y = document.createElement('span')
            y.innerText = e.title + ' (' + e.size + ')'
            d = d.dom.create('span', { id: 'attachment_' + e.id, class: 'attachment upload_progress' })
            return d.appendChild(f), d.appendChild(h), d.appendChild(y), (d.contentEditable = 'false'), d
          })(a, { id: l, icon: k + '/loading.gif', title: b.name, size: q })),
          c(p, n),
          m(
            b,
            function (d) {
              var e = b.name,
                f = document.createElement('img')
              f.setAttribute('src', v)
              f.setAttribute('width', '30px')
              var h = document.createElement('a')
              h.innerText = e + ' (' + q + ')'
              h.setAttribute('href', d)
              d = a.dom.create('span', { id: 'attachment_' + l, class: 'attachment' })
              n = (d.appendChild(f), d.appendChild(h), (d.contentEditable = 'false'), d)
              c(p, n)
            },
            function (d) {
              var e = b.name,
                f = document.createElement('img')
              f.setAttribute('src', w)
              f.setAttribute('width', '30px')
              var h = document.createElement('span')
              h.innerText = d + ' - ' + e + ' (' + q + ')'
              d = a.dom.create('span', { class: 'attachment upload_error' })
              n = (d.appendChild(f), d.appendChild(h), (d.contentEditable = 'false'), d)
              c(p, n)
            },
            function (d) {
              var e = a.dom.select('span#progress_' + l)
              a.dom.setHTML(e, d)
            }
          ))
    }
  tinymce.PluginManager.add('attachment', function (a, b) {
    a.__proto__.getContent = (function (c) {
      return function () {
        return arguments && 0 == arguments.length
          ? '<style>' +
              a.getParam('attachment_style', '.attachment>img{display:inline-block!important;max-width:30px!important;}.attachment>a{display:contents!important;}', 'string') +
              '</style>' +
              c.apply(this, arguments).replace(/<style>([\S\s\t]*?)<\/style>/gi, '')
          : c.apply(this, arguments)
      }
    })(a.__proto__.getContent)
    A(a)
    a.addCommand('mceAttachment', function () {
      r(a)
    })
    a.on('drop', function (c) {
      c = c.dataTransfer
      if (null != c && ((c = c.files), null != c))
        for (var g = 0; g < c.length; g++) {
          var m = c[g]
          ;(function (k) {
            var l = k.lastIndexOf('.')
            if (-1 === l) return !1
            k = k.substr(l)
            return /.(gif|jpe?g|png)$/i.test(k)
          })(m.name) ||
            u(a, m, function (k, l) {
              0 < a.dom.select('span#' + k).length ? a.dom.replace(l, k) : a.selection.setContent(l.outerHTML)
            })
        }
    })
  })
  return {
    getMetadata: function () {
      return { name: pluginName, url: 'https://github.com/Five-great/tinymce-plugins' }
    }
  }
})()
