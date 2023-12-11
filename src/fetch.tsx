import {
  WooCommerceLineItemModification,
  WorkflowData,
  workflowDataSchema,
} from "./sharedTypes";
import { INTERNAL_SERVER_ERROR } from "./statusCodes";

const apiUrl = () => {
  const apiUrl = import.meta.env.VITE_ORDER_APPROVAL_API_URL;
  if (!apiUrl) {
    throw new Error("Something went wrong on our end. Please try again later.");
  }
  return apiUrl;
};

export async function fetchWorkflowData(
  accessCode: string
): Promise<{ data?: WorkflowData; statusCode?: number; error?: string }> {
  const url = apiUrl();
  const requestOptions = {
    method: "GET",
  };

  try {
    const response = await fetch(
      `${url}/workflow/${accessCode}`,
      requestOptions
    );
    const json = await response.json();
    if (!response.ok) {
      return {
        statusCode: response.status,
        error: json.error,
      };
    }
    const parsedData = workflowDataSchema.parse(json);
    return { data: parsedData };
  } catch (error) {
    console.error(error);
    return {
      statusCode: INTERNAL_SERVER_ERROR,
      error: "Unknown error.",
    };
  }
}

export async function modifyWooCommerceLineItems(
  accessCode: string,
  lineItems: WooCommerceLineItemModification[]
) {
  const url = apiUrl();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    line_items: lineItems,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
  };

  return fetch(
    `${url}/workflow/${accessCode}/order/line-items`,
    requestOptions
  );
}
