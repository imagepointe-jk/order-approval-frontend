import { WooCommerceLineItem } from "../sharedTypes";
import { generateDottedPriceRow } from "../utility";
import styles from "./styles/OrderData.module.css";

type OrderDataProps = {
  wcOrderId: number;
  lineItems: WooCommerceLineItem[];
  total: string;
  totalTax: string;
  allowEdits: boolean;
};

//! For some reason the order total coming from WooCommerce is not equal to the
//! price of the line items plus their tax. This should be investigated.

export function OrderData({
  allowEdits,
  lineItems,
  total,
  totalTax,
  wcOrderId,
}: OrderDataProps) {
  const bottomLine = generateDottedPriceRow("Total", total, 40);

  return (
    <div>
      <div>Order #{wcOrderId}</div>
      <div className={styles["line-items-container"]}>
        {lineItems.map((lineItem) => {
          const leftText = `${lineItem.name.replace(
            "(Product Options)",
            ""
          )} x${lineItem.quantity}`;
          const row = generateDottedPriceRow(leftText, lineItem.total, 40);

          return (
            <div className={styles["line-item"]}>
              <div className={styles["price-row"]}>
                {row.map((row) => (
                  <div>{row}</div>
                ))}
              </div>
              <ul>
                {lineItem.printLocations.map((location, i) => (
                  <li>
                    {location} -{" "}
                    {[lineItem.design1Colors, lineItem.design2Colors][i]}
                  </li>
                ))}
              </ul>
              <div className={styles["line-item-tax-row"]}>
                +${lineItem.totalTax} tax
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles["price-row"]}>
        {bottomLine.map((part) => (
          <div>{part}</div>
        ))}
      </div>
    </div>
  );
}
