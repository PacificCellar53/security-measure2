radio.onReceivedNumber(function (receivedNumber) {
    // Show the number sent
    basic.showNumber(receivedNumber)
    // The recieved value is the same as the recieved number
    recievedvalue = receivedNumber
    // If the recieved value is 245 then start
    if (receivedNumber == 245) {
        // stop any alarm going off
        music.stopAllSounds()
        // clear the flashing lights
        basic.clearScreen()
        // Show the mailbox
        basic.showLeds(`
            . . . . .
            . # # # .
            . # # # .
            . . # . .
            . . # . .
            `)
    }
})
let recievedvalue = 0
radio.setGroup(255)
basic.forever(function () {
    basic.showNumber(pins.analogReadPin(AnalogPin.P1))
    // If the mailbox is opened
    if (pins.analogReadPin(AnalogPin.P1) > 950) {
        // change the radio group
        radio.setGroup(245)
        // send a message 
        radio.sendString("opened mailbox")
        // Play an alarm
        music.startMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Forever)
        // Flashing Lights
        basic.showLeds(`
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            `)
        basic.showLeds(`
            . . . . .
            . # # # .
            . # . # .
            . # # # .
            . . . . .
            `)
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    } else {
        // Send a message there is no problem
        radio.sendString("not opened")
        // Any alarm going on gets stopped
        music.stopAllSounds()
        // Clear any flashing lights left
        basic.clearScreen()
        // Show the mailbox
        basic.showLeds(`
            . . . . .
            . # # # .
            . # # # .
            . . # . .
            . . # . .
            `)
    }
})
