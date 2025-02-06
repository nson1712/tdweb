import GoldenTicketIcon from "../../../public/icons/GoldenTicketIcon";

const GoldenTicket = ({ goldenTicketPercent }) => {
  return (
    <div className="flex flex-row gap-x-0.5">
      <p className="text-[#E8B80E] text-[14px] font-bold leading-[16px] self-center">
        {goldenTicketPercent}%
      </p>
      <div className="self-center">
        <GoldenTicketIcon />
      </div>
    </div>
  );
};

export default GoldenTicket;
