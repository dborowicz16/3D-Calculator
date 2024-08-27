import { useState } from 'react';

const App = () => {
  const [result, setResult] = useState(0);
  const [currentDigit, setCurrentDigit] = useState(null);
  const [calculation, setCalculation] = useState('');
  const [showCurrentDigit, setShowCurrentDigit] = useState(false);
  const [clearPressCount, setClearPressCount] = useState(0);

  // AC button appears under these conditions
  const isAllClear = (calculation === '' || clearPressCount > 0);

  // TODO: Add different conditions for all clear vs clear
  const clearCalculator = () => {
    setCalculation('');
    setResult(0);
    setCurrentDigit(0);
  }
  // Updates the currently inputted digit and the overall calculation
  const handleDigitSelection = (event) => {
    const digit = event.target.innerText;
    const lastCharIsDigit = Number.isInteger(parseInt(calculation.charAt(calculation.length - 1)));

    // If last entered char is an int then append the currently entered digit to make a multi-digit int
    if (lastCharIsDigit) {
      setCurrentDigit(currentDigit + digit);
    } else {
      setCurrentDigit(digit);
    }

    setCalculation(calculation + digit);
    setShowCurrentDigit(true);
  }

  // Evaluates the expression string and displays the result
  const calculateResult = () => {
    setResult(eval(calculation));
    setShowCurrentDigit(false);
  }

  // Finds the index of the digit immediately after the last operator
  const getCurrentDigitStartIndex = () => {
    const lastAdditionIndex = calculation.lastIndexOf('+');
    const lastSubtractionIndex = calculation.lastIndexOf('-');
    const lastMultiplicationIndex = calculation.lastIndexOf('*');
    const lastDivisionIndex = calculation.lastIndexOf('/');
    const operatorLastIndices = [lastAdditionIndex, lastSubtractionIndex, lastMultiplicationIndex, lastDivisionIndex];
    const lastOperatorIndex = Math.max(...operatorLastIndices);

    return lastOperatorIndex + 1;
  }

  // Changes current digit sign positive or negative
  const toggleSign = () => {
    if (currentDigit >= 0) {
      const calculationWithoutCurrentDigit = calculation.substring(0, getCurrentDigitStartIndex());
      setCurrentDigit(`-${currentDigit}`);
      setCalculation(calculationWithoutCurrentDigit + `(-${currentDigit})`);
    } else {
      const calculationWithoutCurrentDigit = calculation.substring(0, getCurrentDigitStartIndex() - 2);
      setCurrentDigit(Math.abs(currentDigit));
      setCalculation(calculationWithoutCurrentDigit + `${Math.abs(currentDigit)}`);
    }
  }

  return (
    <>
      <div className="case">
        <div className="resultScreen">
          <p className="resultText">{showCurrentDigit ? currentDigit : result}</p>
        </div>
        <div className="row">
          <button className="blue" onClick={clearCalculator}>{isAllClear ? 'AC' : 'C'}</button>
          <button className="blue" onClick={toggleSign}>+/-</button>
          <button className="blue">%</button>
          <button className="orange" onClick={() => setCalculation(calculation + '/')}>÷</button>
        </div>

        <div className="row">
          <button className="white" onClick={handleDigitSelection}>7</button>
          <button className="white" onClick={handleDigitSelection}>8</button>
          <button className="white" onClick={handleDigitSelection}>9</button>
          <button className="orange" onClick={() => setCalculation(calculation + '*')}>x</button>
        </div>

        <div className="row">
          <button className="white" onClick={handleDigitSelection}>4</button>
          <button className="white" onClick={handleDigitSelection}>5</button>
          <button className="white" onClick={handleDigitSelection}>6</button>
          <button className="orange" onClick={() => setCalculation(calculation + '-')}>-</button>
        </div>

        <div className="row">
          <button className="white" onClick={handleDigitSelection}>1</button>
          <button className="white" onClick={handleDigitSelection}>2</button>
          <button className="white" onClick={handleDigitSelection}>3</button>
          <button className="orange" onClick={() => setCalculation(calculation + '+')}>+</button>
        </div>

        <div className="row">
          <button className="white" onClick={handleDigitSelection}>0</button>
          <button className="white">.</button>
          <button className="white">ans</button>
          <button className="orange" onClick={calculateResult}>=</button>
        </div>
      </div>
    </>
  )
}

export default App
