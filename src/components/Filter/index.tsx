import React from 'react';
import styles from './Filter.module.scss';

interface Props {
    name: string,
    values: string[],
    changeHadler: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    allOption?: boolean
}

const Filter: React.FC<Props> = ({ name, values, changeHadler, allOption = false }) => {
    return (
        <>
            <select
                className={styles.filterSelect}
                onChange={changeHadler}
                name={name}
            >
                {allOption ? (<option value="all">All</option>) : null}
                {values.map((value, indx) => (
                    <option key={indx} value={value}>{value}</option>
                ))}
            </select>
        </>
    )
}

export default Filter;