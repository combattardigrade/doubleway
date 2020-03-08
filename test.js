const fs = require('fs')
const path = require('path')
const translate = require('@vitalets/google-translate-api')

start = async () => {
    let htmlFile = fs.readFileSync(path.join('views', 'locales', 'origin.ejs'), 'utf8')
    // remove white spaces
    htmlFile = htmlFile.replace(/(\r\n|\n|\r)/gm, "");
    const re = /\>.*?\</g
    let results = htmlFile.match(re)
    let i, j = 0
    let error = 0
    try {
        for (let r of results) {
            // Get text
            let original = r
            r = r.replace('>', '')
            r = r.replace('<', '')

            if (r == '') continue

            // Translate text
            let res = await translate(r, { to: 'ru' })

            htmlFile = htmlFile.replace(r, res.text)
            i++
            j++
            if (i == 199) {
                i = 0
                await sleep(20000)
            }
            console.log(`${j} of ${results.length} `)
            await sleep(250)
        }
    }
    catch (e) {
        console.log(e)
        // let error = 1
        // fs.appendFile(path.join('views', 'locales', 'en', 'home-hi.ejs'), htmlFile, function (err) {
        //     if (err) return console.log(err);
        // })
    }
    finally {
        console.log('appending file...')
        fs.appendFile(path.join('views', 'locales', 'ru', 'faqeth.ejs'), htmlFile, function (err) {
            if (err) return console.log(err);
        })
    }




}
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
start()
