import styles from "./styles/OrderStatus.module.css";

export function OrderStatus() {
  return (
    <div className={`${styles["order-status-container"]} round-border`}>
      Waiting On Proof
    </div>
  );
}
