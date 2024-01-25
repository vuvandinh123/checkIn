import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { checkPropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { AiOutlineClose } from "react-icons/ai";
import { db } from "../firebaseConfig";
ChartJS.register(ArcElement, Tooltip, Legend);

const Model = ({ setIsModel }) => {
  const colRef = collection(db, "students");
  const [chartData, setChartData] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const groupChart = [
      "CĐ Công Nghệ",
      "CĐ  Kỹ Thuật",
      "CĐ  Kinh Tế",
      "CĐ  Phòng Ban",
      "CĐ  Đào Tạo",
    ];
    const fetchChart = async () => {
      let chartData = [];
      const promises = groupChart.map(async (group) => {
        const q = query(colRef, where("group", "==", group));
        const querySnapshot = await getDocs(q);
        chartData.push(querySnapshot.size);
        return querySnapshot.size;
      });
      await Promise.all(promises);
      setChartData(chartData);
    };
    fetchChart();
  }, []);
  const data = {
    labels: [
      "CĐ Công Nghệ",
      "CĐ  Kỹ Thuật",
      "CĐ  Kinh Tế",
      "CĐ  Phòng Ban",
      "CĐ  Đào Tạo",
    ],
    datasets: [
      {
        label: "Số người",
        data: chartData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  document.body.style.overflow = "hidden";
  return (
    <>
      <div
        className="fixed z-20  inset-0 h-full  bg-[#00000089]"
        onClick={() => {
          document.body.style.overflow = "auto";
          setIsModel(false);
        }}
      ></div>
      <div className=" flex items-center justify-center z-10 p-5">
        <div className="bg-white z-50 rounded-lg fixed !max-w-full p-5  w-[1000px] left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] ">
          <div>
            <h1 className="text-center font-bold text-xl">Thống kê chi tiết</h1>
          </div>
          <span
            onClick={() => {
              document.body.style.overflow = "auto";
              setIsModel(false);
            }}
            className="absolute top-0 right-0 text-2xl text-gray-500 cursor-pointer hover:rotate-90 transition-all duration-200 p-5 hover:text-red-500"
          >
            <AiOutlineClose />
          </span>
          <div className="flex justify-center items-center">
            <div className="w-[500px] max-w-full">
              <Doughnut data={data} />
            </div>
          </div>
          <div className="mt-5">
            <div className="flex items-center justify-center">
              <ul className="flex items-center gap-5">
                <li>
                  <span className="font-bold">CĐ Công nghệ:</span>{" "}
                  {chartData[0]}{" "}
                  <sub className="text-[10px] capitalize">người</sub>
                </li>
                <li>
                  <span className="font-bold">CĐ Kỹ thuật:</span> {chartData[1]}{" "}
                  <sub className="text-[10px] capitalize">người</sub>
                </li>
                <li>
                  <span className="font-bold">CĐ Kinh tế:</span> {chartData[2]}{" "}
                  <sub className="text-[10px] capitalize">người</sub>
                </li>
                <li>
                  <span className="font-bold">CĐ Phòng ban:</span>{" "}
                  {chartData[3]}{" "}
                  <sub className="text-[10px] capitalize">người</sub>
                </li>
                <li>
                  <span className="font-bold">CĐ Đào tạo:</span> {chartData[4]}{" "}
                  <sub className="text-[10px] capitalize">người</sub>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
Model.propTypes = {
  data: checkPropTypes.array,
  setIsModel: checkPropTypes.func,
  isModel: checkPropTypes.bool,
};
export default Model;
