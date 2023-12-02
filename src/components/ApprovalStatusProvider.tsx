import { ReactNode, createContext, useContext, useState } from "react";
import { ApprovalStatus, Role } from "../sharedTypes";

type RoleWithApprovalStatus = {
  role: Role;
  approvalStatus: ApprovalStatus;
};

type ApprovalStatusContextType = {
  currentRequestedChange: RoleWithApprovalStatus | null;
  setCurrentRequestedChange: (
    newRequestedChange: RoleWithApprovalStatus | null
  ) => void;
};

const ApprovalStatusContext = createContext(
  null as ApprovalStatusContextType | null
);

export function useApprovalStatus() {
  const context = useContext(ApprovalStatusContext);
  return {
    currentRequestedChange: context?.currentRequestedChange,
    setCurrentRequestedChange: context?.setCurrentRequestedChange,
  };
}

export function ApprovalStatusProvider({ children }: { children: ReactNode }) {
  const [currentRequestedChange, setCurrentRequestedChange] = useState(
    null as RoleWithApprovalStatus | null
  );

  return (
    <ApprovalStatusContext.Provider
      value={{ currentRequestedChange, setCurrentRequestedChange }}
    >
      {children}
    </ApprovalStatusContext.Provider>
  );
}
