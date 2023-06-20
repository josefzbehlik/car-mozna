radio.setGroup(13)

// let serialnum = 111111111111
// radio.onReceivedString(function (receivedString: string) {
//     if (serialnum != radio.receivedPacket(RadioPacketProperty.SerialNumber)) return;
//     let data = receivedString.split(";")

//     let x = parseInt(data[0]) - 1024
//     let y = parseInt(data[1]) - 1024

//     let M1_MAXSPEED = 250
//     let M4_MAXSPEED = 250

//     let LOWER_DEADZONE = 300
//     let UPPER_DEADZONE = 600

//     let m1 = PCAmotor.Motors.M1
//     let m4 = PCAmotor.Motors.M4

//     let x_scale = Math.constrain(Math.abs(x), LOWER_DEADZONE, UPPER_DEADZONE) / (UPPER_DEADZONE - LOWER_DEADZONE)
//     let y_scale = Math.constrain(Math.abs(y), LOWER_DEADZONE, UPPER_DEADZONE) / (UPPER_DEADZONE - LOWER_DEADZONE)


//     let M1Speed = 0
//     let M4Speed = 0

//     if (x > LOWER_DEADZONE) {
//         M1Speed -= M1_MAXSPEED * x_scale
//         M4Speed += M4_MAXSPEED * x_scale
//     } else if (x < -LOWER_DEADZONE) {
//         M1Speed += M1_MAXSPEED * x_scale
//         M4Speed -= M4_MAXSPEED * x_scale
//     }
//     if (y > LOWER_DEADZONE) {
//         M1Speed += M1_MAXSPEED * y_scale
//         M4Speed += M4_MAXSPEED * y_scale
//     } else if (y < -LOWER_DEADZONE) {
//         M1Speed -= M1_MAXSPEED * y_scale
//         M4Speed -= M4_MAXSPEED * y_scale
//     }

//     PCAmotor.MotorRun(m1, M1Speed / 2)
//     PCAmotor.MotorRun(m4, M4Speed / 2)

// })

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
