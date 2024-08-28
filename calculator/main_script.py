import eel

eel.init("web")
@eel.expose
def calculate(num1, num2, num3, operator1, operator2):
    try:
        calcu_string = " ".join([num1, operator1, num2, operator2, num3])
        return eval(calcu_string)
    except Exception as e:
        return e
eel.start("main.html")

