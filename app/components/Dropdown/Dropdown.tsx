import styles from './dropdown.module.css'

export default function Dropdown<T extends string>({ name, items, selected, setChange }: {
    name: string,
    items: T[],
    selected?: T,
    setChange: (value: T) => void,
}) {
    return (
        <select 
            name={name} 
            value={selected}
            className={styles['dropdown']} 
            onChange={(e) => setChange(e.target.value as T)}
        >
            <option value="">{name}</option>
            {items.map(item => (
                <option key={crypto.randomUUID()} value={item}>
                    {item}
                </option>
            ))}
        </select>
    )
}