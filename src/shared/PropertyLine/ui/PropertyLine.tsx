import { helpers } from '../lib';
import styles from './PropertyLine.module.scss';

export type DetailStrokeProps = {
  name: string;
  value: string | string[] | undefined;
};

export function PropertyLine({ name, value }: DetailStrokeProps) {
  return (
    <div className={styles.propertyLine}>
      <span className={styles.propertyLine_name}>{name}:</span>
      <span className={styles.propertyLine_value}>
        {helpers.parsePropertyLineInput(value)}
      </span>
    </div>
  );
}
