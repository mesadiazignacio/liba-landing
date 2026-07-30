import puppeteer from 'puppeteer'
import fs from 'node:fs'

const OUT = '/private/tmp/claude-501/-Users-nacho-Desktop-liba-landing/a7c01c7a-20d1-4713-b06e-acb8ebad0048/scratchpad/shots'
fs.mkdirSync(OUT, { recursive: true })

const routes = [
  ['home', '/'],
  ['about', '/about-us'],
  ['services', '/services'],
  ['procedures', '/procedures'],
  ['faqs', '/faqs'],
  ['contact', '/contact-us'],
]

const viewports = [
  ['desktop', 1440, 900],
  ['mobile', 390, 844, true],
]

const browser = await puppeteer.launch({ headless: 'new' })

for (const [vpName, w, h, mobile] of viewports) {
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1, isMobile: !!mobile, hasTouch: !!mobile })
  for (const [name, path] of routes) {
    await page.goto('http://localhost:4321' + path, { waitUntil: 'networkidle2' })
    await new Promise((r) => setTimeout(r, 1800))
    // scroll through to trigger whileInView
    const height = await page.evaluate(async () => {
      const total = document.body.scrollHeight
      for (let y = 0; y < total; y += 400) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 60))
      }
      window.scrollTo(0, 0)
      await new Promise((r) => setTimeout(r, 500))
      return total
    })
    await new Promise((r) => setTimeout(r, 600))
    await page.screenshot({ path: `${OUT}/${vpName}-${name}-fold.png` })
    await page.screenshot({ path: `${OUT}/${vpName}-${name}-full.png`, fullPage: true })
    console.log(vpName, name, 'height', height)
  }
  await page.close()
}

// Interaction/inspection pass on home desktop
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle2' })
await new Promise((r) => setTimeout(r, 1800))

const audit = await page.evaluate(() => {
  const res = { interactive: [], headings: [], iframes: [], deadButtons: [] }
  document.querySelectorAll('a,button').forEach((el) => {
    const cs = getComputedStyle(el)
    const r = el.getBoundingClientRect()
    res.interactive.push({
      tag: el.tagName,
      text: (el.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 60),
      href: el.getAttribute('href'),
      w: Math.round(r.width),
      h: Math.round(r.height),
      bg: cs.backgroundColor,
      color: cs.color,
      pointerEvents: cs.pointerEvents,
    })
  })
  document.querySelectorAll('h1,h2,h3').forEach((el) =>
    res.headings.push({ tag: el.tagName, text: (el.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 90) }),
  )
  document.querySelectorAll('iframe').forEach((el) => res.iframes.push(el.src))
  return res
})
fs.writeFileSync(`${OUT}/home-audit.json`, JSON.stringify(audit, null, 2))
console.log(JSON.stringify(audit, null, 2))

await browser.close()
