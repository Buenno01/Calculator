let runningTotal = 0;
let buffer = '0';
let operator = null;

const screenBuffer = document.querySelector('.buffer');
const screenRunningTotal = document.querySelector('.running__total');

const buttons = document.querySelectorAll('button');
buttons.forEach(function (e){
    e.addEventListener('click', (e)=>{
        buttonClick(e.target.innerText)
    })
})

function buttonClick(value){
    if (isNaN(value)){
        checkOperation(value);
    }
    else{
        handleNumber(value);
    }
    screenBuffer.innerText = buffer;
    screenRunningTotal.innerText = runningTotal;
}

function handleNumber(num){
    if (buffer == 0){
        buffer = '';
        buffer += num;
    } else{
        buffer += num;
    }
}

function checkOperation (symbol){
    switch(symbol){
        case '=':
            calculate(operator);
            operator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        
        case '←':
            if (buffer.length === 1){
                buffer = '0';
            } else{
                buffer = String(buffer).slice(0, buffer.length-1);
            }
            break;

        case '−':
        case '+':
        case '÷':
        case '×':
        calculate(symbol);
        operator = symbol;
        buffer = '0';
            break;

        case ',':
            if (buffer.includes('.')){
                break;
            } else{
                buffer += '.';
                break;
            }
        
        case '+/-':
            let a = parseInt(buffer)*(-1);
            buffer = a;
            break;
    }
}

function calculate (symbol){
    const floatBuffer = parseFloat(buffer);
    if (!operator){
        runningTotal = floatBuffer;
        buffer = '0';
        operator = symbol;
    } else {
        mathRun(floatBuffer);
    }
}

function mathRun(value){
    if (operator == '−'){
        runningTotal -= value;
    }

    else if (operator == '+'){
        runningTotal += value;
    }

    else if (operator == '÷'){
        runningTotal /= value;
    }

    else if (operator == '×'){
        runningTotal *= value;
    }
}