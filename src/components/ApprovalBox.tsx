import { useState } from "react";
import { ApprovalStatus, Role, approvalStatuses } from "../sharedTypes";

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
    <div className="approval-box round-border">
      <div className="capitalize">{role}</div>
      {userPermission && (
        <div>
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
        </div>
      )}
      {!userPermission && <div>{approvalState}</div>}
    </div>
  );
}
