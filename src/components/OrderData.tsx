import { modifyWooCommerceLineItems } from "../fetch";
import { WooCommerceLineItem } from "../sharedTypes";
import { generateDottedPriceRow, getAccessCodeFromURL } from "../utility";
import { parseWooCommerceLineItemsJson } from "../validations";
import { LineItem } from "./LineItem";
import styles from "./styles/OrderData.module.css";
import { useState } from "react";

type OrderDataProps = {
  wcOrderId: number;
  lineItems: WooCommerceLineItem[];
  total: string;
  totalTax: string;
  editingPermission: boolean;
  feesTotal: number;
  shippingTotal: number;
  refreshDataFunction: () => Promise<void>;
};

export function OrderData({
  editingPermission,
  lineItems,
  total,
  totalTax,
  wcOrderId,
  feesTotal,
  shippingTotal,
  refreshDataFunction,
}: OrderDataProps) {
  const initialLineItems = lineItems;
  const [lineItemsState, setLineItemsState] = useState(lineItems);
  const [editRequestError, setEditRequestError] = useState(
    null as string | null
  );
  const feesLine = generateDottedPriceRow("Fees", feesTotal.toFixed(2), 40);
  const shippingLine = generateDottedPriceRow(
    "Shipping",
    shippingTotal.toFixed(2),
    40
  );
  const bottomLine = generateDottedPriceRow("Total", total, 40);

  function changeLineItemInState(changedLineItem: WooCommerceLineItem) {
    const newLineItems = [...lineItemsState];
    const lineItemWithId = newLineItems.find(
      (lineItem) => lineItem.id === changedLineItem.id
    );
    if (!lineItemWithId) return;

    const index = newLineItems.indexOf(lineItemWithId);
    newLineItems[index] = changedLineItem;
    setLineItemsState(newLineItems);
  }

  async function submitChanges() {
    const accessCode = getAccessCodeFromURL();
    console.log("sending...");
    const response = await modifyWooCommerceLineItems(
      accessCode,
      lineItemsState
    );
    if (!response.ok) {
      setEditRequestError("Unable to submit changes.");
      setLineItemsState(initialLineItems);
      return;
    }
    const json = await response.json();
    await refreshDataFunction();
    // const parsed = parseWooCommerceLineItemsJson(json);
    console.log("success!");
    //! Currently the order total does not visually update after a successful edit without a page refresh
    // setLineItemsState(parsed);
  }

  //TODO: allow editor to revert changes instead of submitting them
  function revertChanges() {
    setLineItemsState(initialLineItems);
  }

  return (
    <div>
      <div>Order #{wcOrderId}</div>
      <div className={styles["line-items-container"]}>
        {lineItemsState.map((lineItem) => (
          <LineItem
            editingPermission={editingPermission}
            lineItem={lineItem}
            onChange={changeLineItemInState}
          />
        ))}
      </div>
      <div className={styles["price-row"]}>
        {shippingLine.map((part) => (
          <div>{part}</div>
        ))}
      </div>
      <div className={styles["price-row"]}>
        {feesLine.map((part) => (
          <div>{part}</div>
        ))}
      </div>
      <div className={styles["price-row"]}>
        {bottomLine.map((part) => (
          <div>{part}</div>
        ))}
      </div>
      {editingPermission && (
        <button onClick={() => submitChanges()}>Submit Changes</button>
      )}
      {editingPermission && editRequestError && (
        <div style={{ color: "red" }}>{editRequestError}</div>
      )}
    </div>
  );
}
