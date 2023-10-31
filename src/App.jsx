import { Route, Routes } from "react-router-dom";
import Layout from "./layout";
import Home from "./page/home";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { useEffect } from "react";
function App() {
  
  const colRef = collection(db, "students");
  console.log(colRef);
  useEffect(() => {
    getDocs(colRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        console.log(doc.data());
      })
    })
  })
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
