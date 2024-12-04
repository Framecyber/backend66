const express = require('express')
const app = express()

// Read Write files - File System (Build-in) Node.js
let fs = require('fs')

fs.readFile('head.txt', 'utf8', (err, data) => {

    var text = data + '\n'

    fs.readFile('body.txt', 'utf8', (err, data) => {
        text += data + '\n'

        fs.readFile('leg.txt', 'utf8', (err, data) => {
            text += data + '\n'

            fs.readFile('feet.txt', 'utf8', (err, data) => {
                text += data + '\n'

                fs.writeFile('robot.txt', text, 'utf8', (err) => {
                    if (err) console.error("Cannot Write File")
                    else console.log("Write file robot.txt successfully")
                })
            })
        })
    })
    //var text = ""
    //if (!err) {
    //    text += data
    //    console.log(data)
    // }
    // else console.error("Error = ", err.message)
})





app.listen(3000, () => {
    console.log("Server started on port 3000")
})
