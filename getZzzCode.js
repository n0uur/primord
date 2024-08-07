const cheerio = require('cheerio')
let GiftCode
// Not good, but it help me alot when I want to test this file
if (require.main !== module) {
  GiftCode = require('./models/GiftCodes')
}

const getCodeFromProgameguides = async () => {
  const codes = []

  const response = await fetch(
    'https://progameguides.com/zenless-zone-zero/zenless-zone-zero-codes/'
  )
  const html = await response.text()
  const $ = cheerio.load(html)

  const lis = $('.wp-block-gamurs-article-content').find('li')
  lis.each((i, li) => {
    if ($(li).find('a').length > 0) {
      return
    }
    if ($(li).find('strong').length > 0) {
      if ($(li).find('strong').find('a').length > 0) {
        return
      }

      const code = $(li).find('strong').first().text()

      if (code && code !== '' && code === code.toUpperCase()) {
        codes.push({
          code: code.replace('—', ''),
          description: $(li).text().split('—')[1] || '-',
          type: 'zzz',
        })
      }
    }
  })

  return codes
}

const getZzzCode = async () => {
  const codes = []

  const progameguidesCodes = await getCodeFromProgameguides()

  codes.push(...progameguidesCodes)

  if (require.main === module) {
    return codes
  }

  const giftCodes = await GiftCode.find({
    type: 'zzz',
  })
  const filteredCodes = codes.filter((code) => {
    return !giftCodes.find((c) => c.code === code.code)
  })

  return filteredCodes
}

if (require.main === module) {
  ;(async () => {
    const codes = await getZzzCode()
    console.log(codes)
  })()
}

module.exports = getZzzCode
