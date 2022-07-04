import "./App.css";
import OutField from "./outField/OutField";
import Form from "./form/Form";
import { useState } from "react";

export default function App() {
  let now = `${new Date().getFullYear()}-${formate(
    new Date().getMonth() + 1
  )}-${formate(new Date().getDate())}`;

  let [base, setBase] = useState([]);
  let [date, setDate] = useState("");
  let [cat, setCat] = useState("");
  let [prod, setProd] = useState("");
  let [cost, setCost] = useState("");
  let [count, setCount] = useState("");
  let [sumAll, setSumAll] = useState(0);

  let [check, setCheck] = useState("4");
  let [minDate, setMinDate] = useState(now);
  let [maxDate, setMaxDate] = useState(now);
  let [sortCat, setSortCat] = useState("");
  let [sortProd, setSortProd] = useState("");
  let [catDis, setCatDis] = useState(true);
  let [prodDis, setProdDis] = useState(true);

  let [edit, setEdit] = useState(false);

  let [show, setShow] = useState(false);

  let out = (
    <div className="App">
      <Form
        base={base}
        edit={edit}
        date={date}
        cat={cat}
        prod={prod}
        cost={cost}
        count={count}
        setBase={setBase}
        setEdit={setEdit}
        setDate={setDate}
        setCat={setCat}
        setProd={setProd}
        setCost={setCost}
        setCount={setCount}
      />
      <OutField
        base={base}
        check={check}
        now={now}
        date={date}
        minDate={minDate}
        maxDate={maxDate}
        sortCat={sortCat}
        sortProd={sortProd}
        catDis={catDis}
        prodDis={prodDis}
        show={show}
        setBase={setBase}
        setEdit={setEdit}
        setCheck={setCheck}
        setDate={setDate}
        setCat={setCat}
        setProd={setProd}
        setCost={setCost}
        setCount={setCount}
        setMinDate={setMinDate}
        setMaxDate={setMaxDate}
        setSortCat={setSortCat}
        setSortProd={setSortProd}
        setCatDis={setCatDis}
        setProdDis={setProdDis}
        setShow={setShow}
      />
    </div>
  );

  function formate(num) {
    num = String(num);
    return num.length === 1 ? "0" + num : num;
  }

  return out;
}
