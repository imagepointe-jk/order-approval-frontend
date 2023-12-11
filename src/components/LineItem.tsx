import { WooCommerceLineItem } from "../sharedTypes";
import { generateDottedPriceRow } from "../utility";
import styles from "./styles/OrderData.module.css";

type LineItemProps = {
  lineItem: WooCommerceLineItem;
  editingPermission: boolean;
  onChange: (lineItem: WooCommerceLineItem) => void;
};

export function LineItem({
  lineItem,
  editingPermission,
  onChange,
}: LineItemProps) {
  if (editingPermission) {
    return (
      <div className={styles["line-item"]}>
        {lineItem.name}
        <div>
          Quantity:{" "}
          <input
            className={styles["line-item-number-input"]}
            type="number"
            value={lineItem.quantity}
            onChange={(e) =>
              onChange({ ...lineItem, quantity: +e.target.value })
            }
          />
        </div>
        <div>
          Total Price: $
          <input
            className={styles["line-item-number-input"]}
            type="number"
            value={lineItem.total}
            onChange={(e) => onChange({ ...lineItem, total: e.target.value })}
          />
        </div>
        <div>Tax: ${lineItem.totalTax}</div>
      </div>
    );
  }

  const leftText = `${lineItem.name.replace("(Product Options)", "")} x${
    lineItem.quantity
  }`;
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
            {location} - {[lineItem.design1Colors, lineItem.design2Colors][i]}
          </li>
        ))}
      </ul>
      <div className={styles["line-item-tax-row"]}>
        +${lineItem.totalTax} tax
      </div>
    </div>
  );
}
