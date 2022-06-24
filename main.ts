radio.onReceivedNumber(function (receivedNumber) {
    x = receivedNumber
})
radio.onReceivedString(function (receivedString) {
    bouton = receivedString
})
radio.onReceivedValue(function (name, value) {
    y = value
})
let y = 0
let bouton = ""
let x = 0
radio.setGroup(2)
let cote = 0
let deplacement = 1
let joueur = 0
let t = 0
basic.forever(function () {
    if (deplacement == 1) {
        pins.analogWritePin(AnalogPin.P0, 1023)
    } else {
        pins.analogWritePin(AnalogPin.P0, 0)
    }
    if (joueur == 1) {
        pins.analogWritePin(AnalogPin.P1, 1023)
    } else {
        pins.analogWritePin(AnalogPin.P1, 0)
        if (t == 1) {
            pins.analogWritePin(AnalogPin.P2, 1023)
            basic.pause(100)
            pins.analogWritePin(AnalogPin.P2, 0)
        } else {
            pins.analogWritePin(AnalogPin.P2, 0)
        }
    }
})
basic.forever(function () {
    if (deplacement == 0) {
        maqueen.servoRun(maqueen.Servos.S2, 90)
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
        if (x == 0 && y < 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, Math.abs(y) * 40 / 80)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, Math.abs(y) * 40 / 80)
        } else if (x == 0 && y > 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, y * 40 / 80)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, y * 40 / 80)
        } else if (x < 0 && y == 0) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, Math.abs(x) * 40 / 80)
        } else if (x > 0 && y == 0) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, x * 40 / 80)
        } else if (x < 0 && y < 0) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, Math.constrain(Math.abs(x), 0, 30))
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, Math.constrain(Math.abs(x) - Math.abs(y), 0, 30))
        } else if (x < 0 && y > 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, Math.constrain(Math.abs(x), 0, 30))
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, Math.constrain(Math.abs(x) - y, 0, 30))
        } else if (x > 0 && y == 0) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, x)
        } else if (x > 0 && y == 0) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, x)
        } else if (x == 0 && y == 0) {
            maqueen.motorStop(maqueen.Motors.M1)
        }
    } else if (deplacement == 1) {
        maqueen.motorStop(maqueen.Motors.All)
        if (cote == 0) {
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
        } else if (cote == 1) {
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
        }
    }
})
basic.forever(function () {
    if (bouton == "A") {
        if (deplacement == 0) {
            deplacement = 1
        } else {
            deplacement = 0
        }
    } else if (bouton == "B") {
        if (deplacement == 0) {
            if (joueur == 0) {
                joueur = 1
            } else {
                joueur = 0
            }
        } else if (deplacement == 1) {
            if (cote == 0) {
                cote = 1
            } else if (cote == 1) {
                cote = 0
            }
        }
    } else if (bouton == "AB") {
        t = 1
        basic.pause(500)
        t = 0
    }
    basic.pause(200)
})
basic.forever(function () {
    if (deplacement == 1) {
        if (cote == 0) {
            if (x > 0) {
                maqueen.servoRun(maqueen.Servos.S2, Math.constrain(x + 90, 90, 180))
            }
        } else if (cote == 1) {
            if (x > 0) {
                maqueen.servoRun(maqueen.Servos.S2, Math.constrain(90 - x, 0, 90))
            }
        }
        if (t == 1) {
            basic.pause(500)
            maqueen.servoRun(maqueen.Servos.S2, 90)
            basic.pause(5000)
        }
    }
})
basic.forever(function () {
    if (deplacement == 0) {
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 || maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1) {
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 40)
            } else if (maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 40)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
            }
        }
    }
})
