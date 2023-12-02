import { useApprovalStatus } from "./ApprovalStatusProvider";
import { Modal } from "./Modal";

type ApprovalConfirmationModalProps = {
  onYes: () => void;
  onNo: () => void;
};

export function ApprovalConfirmationModal({
  onYes,
  onNo,
}: ApprovalConfirmationModalProps) {
  const { currentRequestedChange } = useApprovalStatus();
  return (
    <Modal>
      You are about to change your status to{" "}
      {currentRequestedChange?.approvalStatus}. Are you sure?{" "}
      <button onClick={onYes}>Yes</button>
      <button onClick={onNo}>No</button>
    </Modal>
  );
}
