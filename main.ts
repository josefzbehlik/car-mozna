radio.setGroup(13)
let autoModeEnabled = true
let whiteLine = 0
let turnL = false
let turnR = false
let pinC = DigitalPin.P15
let pinL = DigitalPin.P14 // zkontrolovat piny
let pinR = DigitalPin.P13
let motor1 = PCAmotor.Motors.M1
let motor2 = PCAmotor.Motors.M4
pins.setPull(pinC, PinPullMode.PullNone)
pins.setPull(pinL, PinPullMode.PullNone)
pins.setPull(pinR, PinPullMode.PullNone)
let c = (whiteLine ^ pins.digitalReadPin(pinC)) == 0 ? false : true
let l = (whiteLine ^ pins.digitalReadPin(pinL)) == 0 ? false : true
let r = (whiteLine ^ pins.digitalReadPin(pinR)) == 0 ? false : true
//ARRAYconst pole: any = []
radio.onReceivedNumber(function (receivedNumber: number) {
    turnL = receivedNumber === 5;
    turnR = receivedNumber === 10;
    if (receivedNumber === 1) {
        autoModeEnabled = true
    }
    if (receivedNumber === 0) {
        autoModeEnabled = false
    }
})
    let pole : any= []
    //funkční
basic.forever(function () {
    let c = (whiteLine ^ pins.digitalReadPin(pinC)) == 0 ? false : true //1
    let l = (whiteLine ^ pins.digitalReadPin(pinL)) == 0 ? false : true //2
    let r = (whiteLine ^ pins.digitalReadPin(pinR)) == 0 ? false : true //3
    if (c) {
        pole.unshift(1)
        PCAmotor.MotorRun(motor1, -110)
        PCAmotor.MotorRun(motor2, -130)}
        else if (l) {
            pole.unshift(2)
        if (pole[0] === 3|| pole[0] === 2){
            if (turnL === true) {
                PCAmotor.MotorRun(motor1,0)
                PCAmotor.MotorRun(motor2,0)
            pole.shift
            basic.pause(0)
            PCAmotor.MotorStopAll()
            let turnL = false
            let turnR = false }
            else if (turnR === true) {
                PCAmotor.MotorRun(motor1, 0)
                PCAmotor.MotorRun(motor2, 0)
                pole.shift
                basic.pause(0)
                PCAmotor.MotorStopAll()
                let turnL = false
                let turnR = false}
                else{
                    PCAmotor.MotorRun(motor1, 90)
                PCAmotor.MotorRun(motor2, -120)}}}
                    else if (r) {
                        pole.unshift(3)
        if (pole[0] === 3 || pole[0] === 2) {
                            if (turnL === true) {
                                PCAmotor.MotorRun(motor1, 0)
                                PCAmotor.MotorRun(motor2, 0)
                                pole.shiftbasic.pause(0)
                                PCAmotor.MotorStopAll()
                                let turnL = false
                                let turnR = false}
                                else if (turnR === true) {
                                    PCAmotor.MotorRun(motor1, 0)
                                PCAmotor.MotorRun(motor2, 0)
                                    pole.shift
                                    basic.pause(0)
                                    PCAmotor.MotorStopAll()
                                    let turnL = false
                                    let turnR = false} 
                                    else {
                                        PCAmotor.MotorRun(motor1, 90)
                                        PCAmotor.MotorRun(motor2, -120)}}}})
