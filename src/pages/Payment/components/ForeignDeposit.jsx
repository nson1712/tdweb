import EarthIcon from "../../../../public/icons/EarthIcon"

const ForeignDeposit = () => {
  return (
    <div
      className="relative bg-white border-1 border-slate-200 rounded-lg flex px-3 py-2.5 gap-x-4 hover:!bg-slate-50 transition duration-300 cursor-pointer z-10"
      onClick={() => window.open("https://m.me/185169981351799?text=Mình ở nước ngoài, muốn nạp kim cương. Toidoc hỗ trợ mình nhé!")}
    >
      <EarthIcon />
      <div>
        <div className="text-base font-semibold">Dành cho khách hàng nước ngoài</div>
        <div className="text-slate-500 text-xs sm:text-sm line-clamp-1">
          Liên hệ trực tiếp admin, hỗ trợ nhiệt tình, chu đáo,...
        </div>
      </div>
    </div>
  )
}

export default ForeignDeposit