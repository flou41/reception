radio.onReceivedNumber(function (receivedNumber) {
    x = receivedNumber
})
radio.onReceivedString(function (receivedString) {
    bouton = receivedString
})
radio.onReceivedValue(function (name, value) {
    y = value
})
let t = 0
let cote = 0
let joueur = 0
let deplacement = 0
let y = 0
let bouton = ""
let x = 0
radio.setGroup(2)
basic.forever(function () {
    if (deplacement == 0) {
        if (x == 0 && y < 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, Math.abs(y))
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, Math.abs(y))
        } else if (x == 0 && y > 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, y)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, y)
        } else if (x < 0 && y == 0) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, Math.abs(x))
        } else if (x > 0 && y == 0) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, x)
        } else if (x < 0 && y < 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, Math.abs(x))
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, x - Math.abs(y))
        } else if (x < 0 && y > 0) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, Math.abs(x))
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, x - Math.abs(y))
        } else if (x > 0 && y == 0) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, x)
        } else if (x > 0 && y == 0) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, x)
        } else if (x == 0 && y == 0) {
            maqueen.motorStop(maqueen.Motors.M1)
        }
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
    } else if (deplacement == 1) {
        maqueen.motorStop(maqueen.Motors.All)
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
                maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
                maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
            } else if (cote == 1) {
                cote = 0
                maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
                maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
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
        if (x > 0 && x < 51) {
        	
        } else if (x >= 51 && x < 102) {
        	
        } else if (x >= 102 && x < 153) {
        	
        } else if (x >= 153 && x < 204) {
        	
        } else if (x >= 204 && x < 255) {
        	
        }
    }
    basic.showString("" + (deplacement))
})
