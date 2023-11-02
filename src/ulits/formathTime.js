import { format } from "date-fns";

export default function formathTime(time) {
    const timestamp = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);
    // Sử dụng hàm format để chuyển đổi thành chuỗi ngày/tháng
    const formattedDate = format(timestamp, 'dd/MM/yyyy HH:mm:ss');
    const dayOfWeek = format(timestamp, 'EEEE');
    return {dayOfWeek, formattedDate}
}