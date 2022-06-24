def on_received_number(receivedNumber):
    global x
    x = receivedNumber
radio.on_received_number(on_received_number)

def on_received_string(receivedString):
    global bouton
    bouton = receivedString
radio.on_received_string(on_received_string)

def on_received_value(name, value):
    global y
    y = value
radio.on_received_value(on_received_value)

y = 0
bouton = ""
x = 0
radio.set_group(2)
cote = 0
deplacement = 1
joueur = 0
t = 0

def on_forever():
    if deplacement == 1:
        pins.analog_write_pin(AnalogPin.P0, 1023)
    else:
        pins.analog_write_pin(AnalogPin.P0, 0)
    if joueur == 1:
        pins.analog_write_pin(AnalogPin.P1, 1023)
    else:
        pins.analog_write_pin(AnalogPin.P1, 0)
        if t == 1:
            pins.analog_write_pin(AnalogPin.P2, 1023)
            basic.pause(100)
            pins.analog_write_pin(AnalogPin.P2, 0)
        else:
            pins.analog_write_pin(AnalogPin.P2, 0)
basic.forever(on_forever)

def on_forever2():
    if deplacement == 0:
        maqueen.servo_run(maqueen.Servos.S2, 90)
        maqueen.write_led(maqueen.LED.LED_LEFT, maqueen.LEDswitch.TURN_OFF)
        maqueen.write_led(maqueen.LED.LED_RIGHT, maqueen.LEDswitch.TURN_OFF)
        if x == 0 and y < 0:
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, abs(y) - 10)
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, abs(y) - 10)
        elif x == 0 and y > 0:
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, y - 10)
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, y - 10)
        elif x < 0 and y == 0:
            maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, abs(x))
        elif x > 0 and y == 0:
            maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CCW, x)
        elif x < 0 and y < 0:
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, abs(x))
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, x - abs(y))
        elif x < 0 and y > 0:
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, abs(x))
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, x - abs(y))
        elif x > 0 and y == 0:
            maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CCW, x)
        elif x > 0 and y == 0:
            maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, x)
        elif x == 0 and y == 0:
            maqueen.motor_stop(maqueen.Motors.M1)
    elif deplacement == 1:
        maqueen.motor_stop(maqueen.Motors.ALL)
        if cote == 0:
            maqueen.write_led(maqueen.LED.LED_LEFT, maqueen.LEDswitch.TURN_OFF)
            maqueen.write_led(maqueen.LED.LED_RIGHT, maqueen.LEDswitch.TURN_ON)
        elif cote == 1:
            maqueen.write_led(maqueen.LED.LED_LEFT, maqueen.LEDswitch.TURN_ON)
            maqueen.write_led(maqueen.LED.LED_RIGHT, maqueen.LEDswitch.TURN_OFF)
basic.forever(on_forever2)

def on_forever3():
    global deplacement, joueur, cote, t
    if bouton == "A":
        if deplacement == 0:
            deplacement = 1
        else:
            deplacement = 0
    elif bouton == "B":
        if deplacement == 0:
            if joueur == 0:
                joueur = 1
            else:
                joueur = 0
        elif deplacement == 1:
            if cote == 0:
                cote = 1
            elif cote == 1:
                cote = 0
    elif bouton == "AB":
        t = 1
        basic.pause(500)
        t = 0
    basic.pause(200)
basic.forever(on_forever3)

def on_forever4():
    if deplacement == 1:
        if cote == 0:
            if x > 0:
                maqueen.servo_run(maqueen.Servos.S2, Math.constrain(x + 90, 90, 180))
        elif cote == 1:
            if x > 0:
                maqueen.servo_run(maqueen.Servos.S2, Math.constrain(90 - x, 0, 90))
        if t == 1:
            basic.pause(500)
            maqueen.servo_run(maqueen.Servos.S2, 90)
            basic.pause(5000)
basic.forever(on_forever4)
