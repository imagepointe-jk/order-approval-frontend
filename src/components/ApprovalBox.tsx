import { useState } from "react";
import { ApprovalStatus, Role, approvalStatuses } from "../sharedTypes";
import styles from "./styles/ApprovalBox.module.css";

type ApprovalBoxProps = {
  role: Role;
  userPermission: boolean; //does the user have permission to edit this box?
  initialApprovalStatus: ApprovalStatus; // the approval status when the page is first visited
};

export function ApprovalBox({
  role,
  userPermission,
  initialApprovalStatus,
}: ApprovalBoxProps) {
  const [approvalState, setApprovalState] = useState<ApprovalStatus>(
    initialApprovalStatus
  );

  return (
    <div className={`${styles["main-container"]} round-border`}>
      <div className={`${styles["role-heading"]} capitalize`}>{role}</div>
      <div className={styles["input-area"]}>
        {userPermission && (
          <>
            {approvalStatuses.map((status) => (
              <label htmlFor={`${role}-${status}`}>
                <input
                  type="radio"
                  name={`${role}-approvalStatus`}
                  id={`${role}-${status}`}
                  checked={approvalState === status}
                  onChange={() => setApprovalState(status)}
                />
                <span className="capitalize">{status}</span>
              </label>
            ))}
          </>
        )}
        {!userPermission && (
          <div className={`${styles["other-user-approval-text"]} capitalize`}>
            {approvalState}
          </div>
        )}
      </div>
    </div>
  );
}
