import { CalendarTwoTone } from "@ant-design/icons"
import { DateTime } from "luxon"

const CreateAndUpdateTimeZone = ({createdAt, updatedAt}) => {
  return (
    <div className="text-[12px] md:text-sm text-slate-500">
              <CalendarTwoTone /> Ngày đăng:{" "}
              {createdAt ? DateTime.fromISO(createdAt).toFormat("dd/MM/yyyy") : ""}
              - Cập nhật:{" "}
              {updatedAt ? DateTime.fromISO(updatedAt).toFormat("dd/MM/yyyy") : ""}
            </div>
  )
}

export default CreateAndUpdateTimeZone