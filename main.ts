radio.onReceivedNumber(function (receivedNumber) {
    x = receivedNumber
})
radio.onReceivedValue(function (name, value) {
    y = value
})
let y = 0
let x = 0
radio.setGroup(2)
basic.forever(function () {
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
})
