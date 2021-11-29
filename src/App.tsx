import { useState } from "react";
import styled from "styled-components";
import "./styles.scss";

function isInt(value: any) {
  let x = parseFloat(value);
  return !isNaN(value) && (x | 0) === x;
}

interface PlusMinusInputProps {
  quantity: number;
  updateQuantity: CallableFunction;
  isAddingDisabled: boolean;
}

interface UpdateQuantityArgs {
  diff: string; // Fixme: this is actually a number!!! Upate upateQuantity to match this
  actual: string;
}

const StyledInput = styled.input`
  display: inline-block;
  width: 33px;
  border: 1px solid #999999;
  border-radius: 3px;
  vertical-align: middle;
  font-size: 14px;
  text-align: center;
`;

const PlusMinusInput = ({
  quantity,
  updateQuantity,
  isAddingDisabled
}: PlusMinusInputProps) => {
  const [prevQuantity, setPrevQuantity] = useState(quantity);
  const [localQuantity, setLocalQuantity] = useState(quantity);

  // getDerivedStateFromProps
  if (prevQuantity !== quantity) {
    console.log(`setting local quantity to ${quantity}`);
    setLocalQuantity(quantity);
    setPrevQuantity(quantity);
  }

  return (
    <div>
      <div
        className="nomicon nomicon-minus plus-minus-round-button qty-btn minus-btn"
        onClick={() => updateQuantity({ diff: -1 })}
      ></div>
      <StyledInput
        className="plus-minus-quantity-input qty-input"
        value={localQuantity}
        onChange={(event) => {
          console.log(`onChange`);
          const intValue = parseInt(event.target.value, 10);
          setLocalQuantity(intValue);
        }}
        onBlur={(event) => {
          console.log(`onBlur`);
          const intValue = parseInt(event.target.value, 10);
          updateQuantity({ actual: intValue });
        }}
        disabled={isAddingDisabled}
      ></StyledInput>
      {!isAddingDisabled && (
        <div
          className="nomicon nomicon-plus plus-minus-round-button qty-btn add-btn"
          onClick={() => updateQuantity({ diff: 1 })}
        ></div>
      )}
    </div>
  );
};

export default function App() {
  const [quantity, setQuantity] = useState(0);

  const updateQuantity = ({ diff, actual }: UpdateQuantityArgs) => {
    if (actual && isInt(actual)) {
      setQuantity(parseInt(actual, 10));
    } else if (diff && isInt(diff)) {
      setQuantity(quantity + parseInt(diff, 10));
    } else {
      setQuantity(0);
    }
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      {quantity}
      <PlusMinusInput
        quantity={quantity}
        updateQuantity={updateQuantity}
        isAddingDisabled={true}
      />
      <PlusMinusInput
        quantity={quantity}
        updateQuantity={updateQuantity}
        isAddingDisabled={false}
      />
    </div>
  );
}
