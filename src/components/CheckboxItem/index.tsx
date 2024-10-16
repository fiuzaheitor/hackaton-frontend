import React from 'react'
import './styles.scss'
import {Check} from 'react-feather'

interface CheckboxItemProps {
    name: string;
    onChange?: (value: boolean) => void
}

export const CheckboxItem: React.FC<CheckboxItemProps> = ({name, onChange}) => {
    const [checked, setChecked] = React.useState(false)

    return(
        <div className='item'>
            <div className='item__checkbox'>
                <label htmlFor={name} className={`checkbox__label ${checked&&"checkbox__label--active"}`}>{checked&&<Check color='white'/>}</label>
                <input name={name} id={name} type='checkbox' checked={checked} onChange={() => setChecked(!checked)}/>
            </div>
            <div className='item__name'>
                <p>{name}</p>
            </div>
        </div>
    )
}