import Modal from "~/components/modal";
import DatePicker from "../forms/datePicker";
import TextArea from "../forms/textarea";

interface Props {
  onClose: () => void;
}

export default function SendRequestModal({ onClose }: Props) {
  return (
    <Modal onClose={onClose}>
      <div className="w-96 flex justify-center flex-col space-y-5">
        <h1 className="text-2xl font-bold text-black">Send Request</h1>

        <div className="flex flex-row justify-between items-start text-black">
          <div className="flex flex-row justify-start">
            <div className="pr-1">From:</div>
            <DatePicker />
          </div>
          <div className="flex flex-row justify-start">
            <div className="pr-1">To:</div>
            <DatePicker />
          </div>

        </div>
        <TextArea />
        <button className="btn btn-primary no-animation">Send Request</button>
      </div>
    </Modal>
  );
}
