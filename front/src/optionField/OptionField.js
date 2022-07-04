import "./optionField.css";
import uuid from "react-uuid";

export default function OptionField({
  base,
  date,
  check,
  minDate,
  maxDate,
  sortCat,
  sortProd,
  catDis,
  prodDis,
  show,
  setDate,
  setCheck,
  setMinDate,
  setMaxDate,
  setSortCat,
  setSortProd,
  setCatDis,
  setProdDis,
  setShow,
}) {
  let listCat = getListCats({ ...base.list });
  let listProd = getListProds({ ...base.list });

  let out = (
    <fieldset className="optionField">
      <legend>Выборка</legend>
      <div>
        <input
          type="radio"
          name="date"
          value="1"
          checked={check === "1" ? true : false}
          onChange={(e) => setCheck(e.target.value)}
        />
        список на сегодня
      </div>
      <div>
        <input
          type="radio"
          name="date"
          value="2"
          checked={check === "2" ? true : false}
          onChange={(e) => setCheck(e.target.value)}
        />
        выбрать дату
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <input
          type="radio"
          name="date"
          value="3"
          checked={check === "3" ? true : false}
          onChange={(e) => setCheck(e.target.value)}
        />
        выбрать диапазон
        <input
          type="date"
          value={minDate}
          onChange={(e) => setMinDate(e.target.value)}
        />
        <input
          type="date"
          value={maxDate}
          onChange={(e) => setMaxDate(e.target.value)}
        />
      </div>
      <div>
        <input
          type="radio"
          name="date"
          value="4"
          checked={check === "4" ? true : false}
          onChange={(e) => setCheck(e.target.value)}
        />
        за всё время
      </div>
      <div>
        <input type="checkbox" onChange={handlerSortCatON} />
        <select
          value={sortCat}
          onChange={(e) => setSortCat(e.target.value)}
          disabled={catDis}
        >
          {[...listCat].map((item) => {
            return <option key={uuid()}>{item}</option>;
          })}
        </select>
        выборка по категоии
      </div>
      <div>
        <input type="checkbox" onChange={handlerSortProdON} />
        <select
          value={sortProd}
          onChange={(e) => setSortProd(e.target.value)}
          disabled={prodDis}
        >
          {[...listProd].map((item) => {
            return <option key={uuid()}>{item}</option>;
          })}
        </select>
        выборка по продукту
      </div>
      <div>
        <input type="checkbox" onChange={() => setShow(!show)} />
        Перекллючить на {show ? "таблицу" : "график"}
      </div>
    </fieldset>
  );

  function handlerSortCatON(e) {
    if (e.target.checked) {
      setCatDis(false);
    } else {
      setCatDis(true);
      setSortCat("");
    }
  }

  function handlerSortProdON(e) {
    if (e.target.checked) {
      setProdDis(false);
    } else {
      setProdDis(true);
      setSortProd("");
    }
  }

  function getListCats(obj) {
    let result = ["выбрать"];
    for (let d in obj) {
      for (let c in obj[d]) {
        result.push(c);
      }
    }
    return new Set(result);
  }

  function getListProds(obj) {
    let result = ["выбрать"];
    for (let d in obj) {
      for (let c in obj[d]) {
        for (let p in obj[d][c]) {
          result.push(p);
        }
      }
    }
    return new Set(result);
  }

  return out;
}
