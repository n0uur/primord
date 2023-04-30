const cheerio = require('cheerio')
let GiftCode
// Not good, but it help me alot when I want to test this file
if (require.main !== module) {
  GiftCode = require('./models/GiftCodes')
}
const getCodeFromPockettactics = async () => {
  const codes = []

  const response = await fetch(
    'https://www.pockettactics.com/genshin-impact/codes'
  )
  const html = await response.text()
  const $ = cheerio.load(html)

  const uls = $('div.entry-content').find('ul')
  uls.each((i, ul) => {
    $(ul)
      .find('li')
      .each((i, li) => {
        if ($(li).find('a').length > 0) {
          return
        }
        if ($(li).find('strong').length > 0) {
          if ($(li).find('strong').find('a').length > 0) {
            return
          }

          const code = $(li).find('strong').first().text()
          if (code !== '' && code === code.toUpperCase()) {
            codes.push({
              code,
              description: $(li)
                .text()
                .split('—')[1]
                .replace('(new!)', '')
                .trim(),
            })
          }
        }
      })
  })

  return codes
}

const getCodeFromProgameguides = async () => {
  const codes = []

  const response = await fetch(
    'https://progameguides.com/genshin-impact/genshin-impact-codes/'
  )
  const html = await response.text()
  const $ = cheerio.load(html)

  const lis = $('div.entry-content').find('li')
  lis.each((i, li) => {
    if ($(li).find('a').length > 0) {
      return
    }
    if ($(li).find('strong').length > 0) {
      if ($(li).find('strong').find('a').length > 0) {
        return
      }

      const code = $(li).find('strong').first().text()

      if (code !== '' && code === code.toUpperCase()) {
        codes.push({
          code: code.replace('—', ''),
          description: $(li).text().split('—')[1],
        })
      }
    }
  })

  return codes
}

const getGenshinCode = async () => {
  const codes = []

  // const pockettacticsCodes = await getCodeFromPockettactics()
  const pockettacticsCodes = []
  const progameguidesCodes = await getCodeFromProgameguides()

  codes.push(...progameguidesCodes)

  // pockettacticsCodes.forEach((code) => {
  //   if (progameguidesCodes.find((c) => c.code === code.code)) {
  //     codes.push(code)
  //   }
  // })

  if (require.main === module) {
    return codes
  }

  const giftCodes = await GiftCode.find()
  const filteredCodes = codes.filter((code) => {
    return !giftCodes.find((c) => c.code === code.code)
  })

  return filteredCodes
}

if (require.main === module) {
  ;(async () => {
    const codes = await getGenshinCode()
    console.log(codes)
  })()
}

module.exports = getGenshinCode
