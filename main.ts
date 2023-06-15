radio.setGroup(13)
let whiteLine = 0

let pinShoot = DigitalPin.P2
let pinEcho = DigitalPin.P1
let directionC = false
let directionR = false
let directionL = false
let speed = 150
let turnSpeed = 110

let m1 = PCAmotor.Motors.M1
let m4 = PCAmotor.Motors.M4

let pinC = DigitalPin.P15
let pinL = DigitalPin.P14 // zkontrolovat piny
let pinR = DigitalPin.P13

pins.setPull(pinC, PinPullMode.PullNone)
pins.setPull(pinL, PinPullMode.PullNone)
pins.setPull(pinR, PinPullMode.PullNone)

radio.onReceivedNumber(function (receivedNumber: number) {
    if (receivedNumber === 5) {
        directionL = true
        basic.showLeds(`
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . .
        `)
    }
    if (receivedNumber === 10) {
        directionR = true
        basic.showLeds(`
        . . # . .
        . . . # .
        # # # # #
        . . . # .
        . . # . .
        `)}
        if (receivedNumber === 15) {
            directionR = false
            directionL = false
            directionC = true
            basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
    }
})

basic.forever(function () { 
    let c = (whiteLine ^ pins.digitalReadPin(pinC)) == 0 ? false : true 
    let l = (whiteLine ^ pins.digitalReadPin(pinL)) == 0 ? false : true 
    let r = (whiteLine ^ pins.digitalReadPin(pinR)) == 0 ? false : true 
    let obstacle = sonar.ping(pinShoot, pinEcho, PingUnit.Centimeters, 50)

    if (obstacle < 15 && obstacle > 0) {
        PCAmotor.MotorStopAll()
        basic.pause(100)
        music.playTone(Note.C, music.beat(BeatFraction.Whole))
        PCAmotor.MotorRun(m1, -speed * 0.84)
        PCAmotor.MotorRun(m4, speed)
        basic.pause(1200)
        

    }

    if (l && r) {
        if (directionR) {
            //doprava
            PCAmotor.MotorRun(m1, -speed * 0.84)
            PCAmotor.MotorRun(m4, speed)
            basic.pause(500)
            PCAmotor.MotorRun(m1, -speed * 0.84)
            PCAmotor.MotorRun(m4, -speed)
            basic.pause(200)
            directionR = false
            basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
            directionC = true
        } else if (directionL){
            //doleva
            PCAmotor.MotorRun(m1, speed * 0.84)
            PCAmotor.MotorRun(m4, -speed)
            basic.pause(470)
            PCAmotor.MotorRun(m1, -speed * 0.84)
            PCAmotor.MotorRun(m4, -speed)
            basic.pause(200)
            directionL = false
            basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
            directionC = true
        }
    } else if (directionC) {
            PCAmotor.MotorRun(m1, -speed * 0.84)
            PCAmotor.MotorRun(m4, -speed)
            basic.pause(200)
            directionC = false
        }
    else if (r) {
        PCAmotor.MotorRun(m1, -speed * 0.84)
        PCAmotor.MotorRun(m4, turnSpeed)
        basic.pause(3)
    } else if (l) {
        PCAmotor.MotorRun(m1, turnSpeed * 0.84)
        PCAmotor.MotorRun(m4, -speed)
        basic.pause(36)
    } else {
        PCAmotor.MotorRun(m1, -speed * 0.84)
        PCAmotor.MotorRun(m4, -speed)
        basic.pause(3)
    }  
    
})
