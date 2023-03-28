import Modal from "~/components/modal";

interface Props {
  onClose: () => void;
}

export default function SendRequestModal({ onClose }: Props) {
  return (
    <Modal onClose={onClose}>
      <div className="w-96 flex justify-center flex-col space-y-5">
        <h1 className="text-2xl font-bold">Send Request</h1>
        <div className="flex flex-row justify-between items-start">
          <div className="flex flex-row justify-start">
            <div className="pr-1">From:</div>
            <input type="date"  className="border border-black pl-2"/>
          </div>
          <div className="flex flex-row justify-start">
            <div className="pr-1">To:</div>
            <input type="date"  className="border border-black pl-2"/>
          </div>

        </div>
        <textarea className="border border-black p-2 resize-none w-full"></textarea>
        <button className="btn btn-primary">Send Request</button>
      </div>
    </Modal>
  );
}
