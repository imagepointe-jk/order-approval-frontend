import { useEffect, useState } from "react";
import "./App.css";
import { ApprovalBox } from "./components/ApprovalBox";
import { ImageContainer } from "./components/ImageContainer";
import { OrderData } from "./components/OrderData";
import { OrderStatus } from "./components/OrderStatus";
import { WorkflowData } from "./sharedTypes";
import { fetchWorkflowData } from "./fetch";
import { ApprovalConfirmationModal } from "./components/ApprovalConfirmationModal";
import { useApprovalStatus } from "./components/ApprovalStatusProvider";
import { AccessErrorScreen } from "./components/AccessErrorScreen";
import { getAccessCodeFromURL } from "./utility";

function App() {
  const [workflowData, setWorkflowData] = useState(
    undefined as WorkflowData | undefined
  );
  const [isLoading, setIsLoading] = useState(true);

  const { currentRequestedChange, setCurrentRequestedChange } =
    useApprovalStatus(); //TODO: figure out why these are sometimes undefined

  async function fetchData() {
    setIsLoading(true);
    const accessCode = getAccessCodeFromURL();
    const fetchedData = await fetchWorkflowData(accessCode);
    if (!fetchedData.data) {
      console.error(fetchedData.error);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setWorkflowData(fetchedData.data);
  }

  function changeApprovalStatus() {
    if (!workflowData || !currentRequestedChange || !setCurrentRequestedChange)
      return;

    const newWorkflowData = { ...workflowData };
    const userWithRole = newWorkflowData.userData.users.find(
      (user) => user.role === currentRequestedChange.role
    );
    if (userWithRole)
      userWithRole.approvalStatus = currentRequestedChange.approvalStatus;

    setWorkflowData(newWorkflowData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading)
    return (
      <div style={{ textAlign: "center" }}>
        <header></header>
        <h2>Loading...</h2>
      </div>
    );
  if (!workflowData)
    return (
      <>
        <header></header>
        <AccessErrorScreen />
      </>
    );

  return (
    <>
      <header></header>
      <div className="main-flex">
        <div>
          <ImageContainer imgUrl={workflowData.imageUrl} />
          <OrderData
            editingPermission={
              workflowData.userData.activeUser.role === "editor"
            }
            lineItems={workflowData.lineItems}
            total={workflowData.total}
            totalTax={workflowData.totalTax}
            wcOrderId={workflowData.wcOrderId}
            shippingTotal={+workflowData.shippingTotal}
            feesTotal={workflowData.feeLines.reduce(
              (accum, fee) => accum + +fee.total,
              0
            )}
            refreshDataFunction={fetchData}
          />
        </div>
        <div className="approval-column">
          {workflowData.userData.users
            .filter((user) => user.role !== "artist" && user.role !== "editor")
            .map((user) => (
              <ApprovalBox
                role={user.role}
                approvalStatus={user.approvalStatus}
                userPermission={
                  user.role === workflowData.userData.activeUser.role
                }
              />
            ))}
          <OrderStatus />
        </div>
      </div>
      {currentRequestedChange && setCurrentRequestedChange && (
        <ApprovalConfirmationModal
          onYes={() => {
            console.log("Confirmed!");
            changeApprovalStatus();
            setCurrentRequestedChange(null);
          }}
          onNo={() => setCurrentRequestedChange(null)}
        />
      )}
    </>
  );
}

export default App;
