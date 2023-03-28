import Modal from "~/components/modal";

interface Props {
  onClose: () => void;
}

export default function SendRequestModal({ onClose }: Props) {
  return (
    <Modal onClose={onClose}>
      <div className="w-96 flex justify-center items-center flex-col">
        <h1 className="text-2xl font-bold">Send Request</h1>
        <textarea ></textarea>
        <button className="btn btn-primary">Send Request</button>
      </div>
    </Modal>
  );
}
