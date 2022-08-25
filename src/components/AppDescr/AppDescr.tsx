import styles from './appdescr.module.scss';

export function AppDescr() {
  return (
    <div className={styles.descr}>
      <h2 className={styles.listTitle}>
        Ура! Теперь можно начать работать:
      </h2>
      <ul>
        <li><span className={styles.dot} />
          <span className={styles.text}>Выберите категорию и&nbsp;напишите название текущей задачи</span></li>
        <li><span className={styles.dot} />
          <span className={styles.text}>Запустите таймер (&laquo;помидор&raquo;)</span></li>
        <li><span className={styles.dot} />
          <span className={styles.text}>Работайте пока &laquo;помидор&raquo; не&nbsp;прозвонит</span></li>
        <li><span className={styles.dot} />
          <span className={styles.text}>Сделайте короткий перерыв (5&nbsp;минут)</span></li>
        <li><span className={styles.dot} />
          <span className={styles.text}>Продолжайте работать &laquo;помидор&raquo; за&nbsp;&laquo;помидором&raquo;, пока задача не&nbsp;будут выполнена. Каждые 4&nbsp;&laquo;помидора&raquo; делайте длинный перерыв (15&nbsp;минут).</span></li>
      </ul>
    </div>
  );
}
