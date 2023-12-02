import { ChangeEventHandler, useState } from "react";
import { ApprovalStatus, Role, approvalStatuses } from "../sharedTypes";
import styles from "./styles/ApprovalBox.module.css";
import { useApprovalStatus } from "./ApprovalStatusProvider";

type ApprovalBoxProps = {
  role: Role;
  userPermission: boolean; //does the user have permission to edit this box?
  approvalStatus: ApprovalStatus;
};

export function ApprovalBox({
  role,
  userPermission,
  approvalStatus,
}: ApprovalBoxProps) {
  const { setCurrentRequestedChange } = useApprovalStatus();
  function clickNewStatus(role: Role, approvalStatus: ApprovalStatus) {
    if (!setCurrentRequestedChange) return;

    setCurrentRequestedChange({
      approvalStatus,
      role,
    });
  }

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
                  checked={approvalStatus === status}
                  onChange={() => clickNewStatus(role, status)}
                />
                <span className="capitalize">{status}</span>
              </label>
            ))}
          </>
        )}
        {!userPermission && (
          <div className={`${styles["other-user-approval-text"]} capitalize`}>
            {approvalStatus}
          </div>
        )}
      </div>
    </div>
  );
}
