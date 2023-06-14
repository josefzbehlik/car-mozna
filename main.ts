radio.setGroup(13)
let whiteLine = 0

let direction = false

let speed = 125
let turnSpeed = 90

let pinC = DigitalPin.P15
let pinL = DigitalPin.P14 // zkontrolovat piny
let pinR = DigitalPin.P13

pins.setPull(pinC, PinPullMode.PullNone)
pins.setPull(pinL, PinPullMode.PullNone)
pins.setPull(pinR, PinPullMode.PullNone)

radio.onReceivedNumber(function (receivedNumber: number) {
    if (receivedNumber === 5) {
        direction = false
        basic.showLeds(`
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . .
        `)
    }
    if (receivedNumber === 10) {
        direction = true
        basic.showLeds(`
        . . # . .
        . . . # .
        # # # # #
        . . . # .
        . . # . .
        `)
    }
})

basic.forever(function () {
    let c = (whiteLine ^ pins.digitalReadPin(pinC)) == 0 ? false : true //1
    let l = (whiteLine ^ pins.digitalReadPin(pinL)) == 0 ? false : true //2
    let r = (whiteLine ^ pins.digitalReadPin(pinR)) == 0 ? false : true //3

    if (l && r) {
        if (direction) {
            //doprava
            PCAmotor.MotorRun(PCAmotor.Motors.M1, -speed * 0.84)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, speed)
            basic.pause(500)
            PCAmotor.MotorRun(PCAmotor.Motors.M1, -speed * 0.84)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, -speed)
            basic.pause(200)
        } else if (!direction){
            //doleva
            PCAmotor.MotorRun(PCAmotor.Motors.M1, speed * 0.84)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, -speed)
            basic.pause(500)
            PCAmotor.MotorRun(PCAmotor.Motors.M1, -speed * 0.84)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, -speed)
            basic.pause(200)
        }
    } else if (r) {
        PCAmotor.MotorRun(PCAmotor.Motors.M1, -turnSpeed * 0.84)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, speed)
    } else if (l) {
        PCAmotor.MotorRun(PCAmotor.Motors.M1, speed * 0.84)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, -turnSpeed)
    } else {
        PCAmotor.MotorRun(PCAmotor.Motors.M1, -speed * 0.84)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, -speed)
    }  
})
