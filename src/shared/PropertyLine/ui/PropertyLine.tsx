import styles from './PropertyLine.module.scss';

export type DetailStrokeProps = { type: string; value: string | undefined };

export function PropertyLine({ type, value }: DetailStrokeProps) {
  return (
    <div className={styles.propertyLine}>
      <span className={styles.propertyLine_name}>{type}:</span>
      <span className={styles.propertyLine_value}>{value ?? '--'}</span>
    </div>
  );
}
