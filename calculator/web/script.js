

function validateInput(element) {
    const value = element.value;
    const regex = /^-?\d+(\.\d+)?$/;
    if (!regex.test(value)) {
        element.reportValidity();
    } else {
        element.setCustomValidity('');
    }
}

var invalidChars = [
    "+",
    "e",
    "-"
  ];
  
document.getElementById("num1").addEventListener("input", function() {
    this.value = this.value.replace(/[e\+\-]/gi, "");
  });
  
document.getElementById("num1").addEventListener("keydown", function(e) {
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  });

  document.getElementById("num2").addEventListener("input", function() {
    this.value = this.value.replace(/[e\+\-]/gi, "");
  });
  
document.getElementById("num2").addEventListener("keydown", function(e) {
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  });

  document.getElementById("num3").addEventListener("input", function() {
    this.value = this.value.replace(/[e\+\-]/gi, "");
  });
  
document.getElementById("num3").addEventListener("keydown", function(e) {
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  });

async function performCalculation() {
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    const num3 = document.getElementById('num3').value;
    error_alert = document.getElementById("error-popup")
    if (num1 === "" || num2 === "" || num3 === ""){
        error_alert.innerHTML = "Input must not be empty!"
        error_alert.classList.remove("hidden");
    }
    else{
        try {
            const operator1 = document.getElementById('operator1').value;
            const operator2 = document.getElementById('operator2').value;
            result = await eel.calculate(num1, num2, num3, operator1, operator2)()
            document.getElementById("result").value = result
            error_alert.classList.add("hidden");
        } catch (error) {
            error_alert.innerHTML = "An Error has Occurred!"
            error_alert.classList.remove("hidden");
        }
    }
}

function reset(){
  num1 = document.getElementById('num1')
  num2 = document.getElementById('num2')
  num3 = document.getElementById('num3')
  result = document.getElementById("result")
  num1.value = ""
  num2.value = ""
  num3.value = ""
  result.value = ""
}