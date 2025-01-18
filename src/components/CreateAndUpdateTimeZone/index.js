import { CalendarTwoTone } from "@ant-design/icons"
import { DateTime } from "luxon"

const CreateAndUpdateTimeZone = ({createdAt, updatedAt}) => {
  return (
    <div className="text-[12px] md:text-sm text-slate-500">
              <CalendarTwoTone /> Ngày đăng:{" "}
              {DateTime.fromMillis(createdAt ?? 0, { zone: "utc" }).toFormat(
                "dd/MM/yyyy"
              )}{" "}
              - Cập nhật:{" "}
              {DateTime.fromMillis(updatedAt ?? 0, { zone: "utc" }).toFormat(
                "dd/MM/yyyy"
              )}
            </div>
  )
}

export default CreateAndUpdateTimeZone