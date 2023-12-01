import { WorkflowData, workflowDataSchema } from "./sharedTypes";
import { INTERNAL_SERVER_ERROR } from "./statusCodes";

export async function fetchWorkflowData(
  accessCode: string
): Promise<{ data?: WorkflowData; statusCode?: number; error?: string }> {
  const apiUrl = import.meta.env.VITE_ORDER_APPROVAL_API_URL;
  if (!apiUrl) {
    return {
      statusCode: INTERNAL_SERVER_ERROR,
      error: "There was a server error. Try again later.",
    };
  }

  const requestOptions = {
    method: "GET",
  };

  try {
    const response = await fetch(
      `${apiUrl}/workflow/${accessCode}`,
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
