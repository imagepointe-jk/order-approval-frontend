import tempImg from "../public/vite.svg";
import "./App.css";
import { ApprovalBox } from "./components/ApprovalBox";
import { ImageContainer } from "./components/ImageContainer";
import { OrderData } from "./components/OrderData";
import { OrderStatus } from "./components/OrderStatus";
import { Role, roles } from "./sharedTypes";

function App() {
  const tempRole: Role = "approver";
  const splitURL = document.URL.split("/");
  const lastURLPiece = splitURL[splitURL.length - 1];

  return (
    <div className="main-flex">
      <div>
        <ImageContainer img={tempImg} />
        <OrderData />
      </div>
      <div>
        {roles.map((role) => (
          <ApprovalBox
            role={role}
            initialApprovalStatus="undecided"
            userPermission={role === tempRole}
          />
        ))}
        <OrderStatus />
      </div>
    </div>
  );
}

export default App;