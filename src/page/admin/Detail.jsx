import { checkPropTypes } from "prop-types";
import { AiOutlineClose } from "react-icons/ai";
import formathTime from "../../ulits/formathTime";
import { Link } from "react-router-dom";

const Detail = ({ data, setIsDetail }) => {
  const date = formathTime({
    seconds: data.created_at.seconds,
    nanoseconds: data.created_at.nanoseconds,
  });
  document.body.style.overflow = "hidden";
  return (
    <div>
      <div
        className="fixed z-20  inset-0 h-full  bg-[#00000089]"
        onClick={() => {
          document.body.style.overflow = "auto";
          setIsDetail(false);
        }}
      ></div>
      <div className=" flex  items-center justify-center p-5">
        <div className="bg-white z-40 rounded-lg fixed !max-w-full p-5  w-[1000px] left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] ">
          <div>
            <h1 className="text-center font-bold text-xl">
              Thống tin chi tiết
            </h1>
          </div>
          <span
            onClick={() => {
              document.body.style.overflow = "auto";
              setIsDetail(false);
            }}
            className="absolute top-0 right-0 text-2xl text-gray-500 cursor-pointer hover:rotate-90 transition-all duration-200 p-5 hover:text-red-500"
          >
            <AiOutlineClose />
          </span>
          <div className="flex justify-center items-center">
            <div className=" max-w-full">
              <div className="flex gap-5">
                <div className="basis-1/4">
                  <Link target="_blank" to={data.image}>
                    {" "}
                    <img className="w-full" src={data.image} alt="" />
                  </Link>
                </div>
                <div className="basis-3/4">
                  <table className="">
                    <tr className="">
                      <td className="font-bold py-3 px-3">Mã Giảng Viên/Nhân Viên:</td>
                      <td>{data.magv}</td>
                    </tr>
                    <tr className="">
                      <td className="font-bold py-3 px-3">Công đoàn:</td>
                      <td>{data.group}</td>
                    </tr>
                    <tr className="">
                      <td className="font-bold py-3 px-3">Địa chỉ:</td>
                      <td>{data.address}</td>
                    </tr>
                    <tr className="">
                      <td className="font-bold py-3 px-3">Ngày tạo:</td>
                      <td>{date.dayOfWeek + " " + date.formattedDate}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
Detail.propTypes = {
  data: checkPropTypes.object,
  setIsDetail: checkPropTypes.func,
};
export default Detail;
