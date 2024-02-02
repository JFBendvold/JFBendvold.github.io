import styles from '@/styles/components/dashboard/ProductList.module.css';

export default function Product({ KeyIndex, ProdInfo }) {

    return (
        <div key={KeyIndex} className={styles.productItemContainer}>
            <p>Artikkelnavn: {ProdInfo.product_name}</p>
            <p>Pris: {ProdInfo.price}</p>
            <p>Beskrivelse: {ProdInfo.product_descpription}</p>
            <p>Antall: {ProdInfo.quantity}</p>
        </div>
    );
}