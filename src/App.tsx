import { useEffect, useState } from "react";
import tempImg from "../public/vite.svg";
import "./App.css";
import { ApprovalBox } from "./components/ApprovalBox";
import { ImageContainer } from "./components/ImageContainer";
import { OrderData } from "./components/OrderData";
import { OrderStatus } from "./components/OrderStatus";
import { WorkflowData, roles } from "./sharedTypes";
import { fetchWorkflowData } from "./fetch";

function App() {
  const [workflowData, setWorkflowData] = useState(
    undefined as WorkflowData | undefined
  );

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
              allowEdits={false}
              lineItems={workflowData.lineItems}
              total={workflowData.total}
              totalTax={workflowData.totalTax}
              wcOrderId={workflowData.wcOrderId}
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
                  initialApprovalStatus={user.approvalStatus}
                  userPermission={
                    user.role === workflowData.userData.activeUser.role
                  }
                />
              ))}
            <OrderStatus />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
