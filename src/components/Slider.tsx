import styles from '@/styles/slider.module.scss';

interface Props {
    max: number;
    value: number;
    onChange: (e: React.ChangeEvent) => void;
}

export default function Slider({ max, value, onChange }: Props) {
    return (
        <input className={styles.input} type="range" min="0" max={max} value={value} onChange={onChange} />
    )
}