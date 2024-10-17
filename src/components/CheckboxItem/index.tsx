import React, { useEffect } from "react";
import "./styles.scss";
import { Check } from "react-feather";

interface CheckboxItemProps {
  name: string;
  id?: string;
  onChange?: any;
  checked?: boolean;
  setChecked?: any;
}

export const CheckboxItem: React.FC<CheckboxItemProps> = ({
  name,
    id,
  onChange,
  checked,
  setChecked,
}) => {
  return (
    <div className="item">
      <div className="item__checkbox">
        <label
          htmlFor={name}
          className={`checkbox__label ${checked && "checkbox__label--active"}`}
        >
          {checked && <Check color="white" />}
        </label>
        <input
            name={name}
            id={name}
            type="checkbox"
            checked={checked}
            onChange={() => {
                setChecked ? setChecked(name) : onChange(id);
            }}
        />
      </div>
      <div className="item__name">
        <p>{name}</p>
      </div>
    </div>
  );
};
