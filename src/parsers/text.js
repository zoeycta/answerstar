// @ts-check

const { isSensible } = require('../util')

/**
 * @param {Element} elem
 */
function parse (elem) {
  try {
    // @ts-ignore
    const type = elem.dataNode._type
    const id = elem.id.substr(3) // div${id}
    if (type === 'question') {
      const tid = _utilsParseTID(elem)
      const title = elem.querySelector('.div_title_question')
      const content = title.childNodes[0].textContent
      const s = isSensible(content)
      const f = [...elem.querySelector('.div_title_question_all > .div_title_question').childNodes]
        // @ts-ignore
        .filter(x => !(x.tagName === 'SPAN' && ['req', 'qtypetip'].some(c => x.classList.contains(c))))
        .map(x => x.textContent).join('')
        .replace(/(\s*\n\s*)+/g, '\n')
        .replace(/[ \t\r\f]+/g, ' ')
      // Type = t, elem = root elem, meta = { i = tidBase, s = ignore, f = problem text }
      return { type: 't', elem, id, meta: { i: tid, s, f } }
    }
  } catch (e) {
    console.error(e)
  }
}

/**
 * @param {Element} elem
 */
function get (elem) {
  try {
    return elem.querySelector('textarea').value
  } catch (e) {
    console.error(e)
    return ''
  }
}

/**
 * @param {Element} elem
 * @param {string} result
 */
function set (elem, result) {
  try {
    const possible = result.split('|').map(x => x.trim())
    const some = possible[Math.floor(Math.random() * possible.length)]
    elem.querySelector('textarea').value = some
  } catch (e) {
    console.error(e)
  }
}

/**
 * @param {Element} elem
 * @param {string} result
 */
function display (elem, result) {
  try {
    const ta = elem.querySelector('textarea')
    const answer = document.createElement('textarea')
    answer.setAttribute('topic', 'fdd-display')
    answer.value = result
    answer.readOnly = true
    answer.style.width = '100%'
    ta.after(answer)
  } catch (e) {
    console.error(e)
  }
}

/**
 * @param {Element} elem
 */
function hide (elem) {
  try {
    const d = elem.querySelector('textarea[topic="fdd-display"]')
    if (d) d.remove()
  } catch (e) {
    console.error(e)
  }
}

/**
 * @param {Element} elem
 */
function _utilsParseTID (elem) {
  const ta = elem.querySelector('textarea')
  return ta.id
}

module.exports = { parse, get, set, display, hide }
