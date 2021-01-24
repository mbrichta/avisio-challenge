import React from 'react';
import styles from './Filter.module.scss';

interface Props {
    name: string,
    values: string[],
    changeHadler: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    allOption?: boolean,
    firstOptionText?: string
}

const Filter: React.FC<Props> = ({ name, values, changeHadler, allOption = false, firstOptionText }) => {
    return (
        <>
            <select
                className={styles.select}
                onChange={changeHadler}
                name={name}
            >
                {allOption ? (<option value="all">{firstOptionText ? firstOptionText : "All"}</option>) : null}
                {values.map((value, indx) => (
                    <option key={indx} value={value}>{value}</option>
                ))}
            </select>
        </>
    )
}

export default Filter;