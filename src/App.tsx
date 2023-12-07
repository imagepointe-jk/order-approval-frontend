import { useEffect, useState } from "react";
import tempImg from "../public/vite.svg";
import "./App.css";
import { ApprovalBox } from "./components/ApprovalBox";
import { ImageContainer } from "./components/ImageContainer";
import { OrderData } from "./components/OrderData";
import { OrderStatus } from "./components/OrderStatus";
import { WorkflowData } from "./sharedTypes";
import { fetchWorkflowData } from "./fetch";
import { ApprovalConfirmationModal } from "./components/ApprovalConfirmationModal";
import { useApprovalStatus } from "./components/ApprovalStatusProvider";

function App() {
  const [workflowData, setWorkflowData] = useState(
    undefined as WorkflowData | undefined
  );

  const { currentRequestedChange, setCurrentRequestedChange } =
    useApprovalStatus(); //TODO: figure out why these are sometimes undefined

  async function fetchData() {
    const splitURL = document.URL.split("/");
    const lastURLPiece = splitURL[splitURL.length - 1];

    const fetchedData = await fetchWorkflowData(lastURLPiece);
    if (!fetchedData.data) {
      console.error(fetchedData.error);
      return;
    }

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

  return (
    <>
      <header></header>
      {workflowData && (
        <div className="main-flex">
          <div>
            <ImageContainer img={tempImg} />
            <OrderData
              userPermission={
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
            />
          </div>
          <div className="approval-column">
            {workflowData.userData.users
              .filter(
                (user) => user.role !== "artist" && user.role !== "editor"
              )
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
      )}
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
