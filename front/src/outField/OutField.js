import "./outField.css";
import OptionField from "../optionField/OptionField";
import Table from "../table/Table";
import Grafic from "../grafic/Grafic";

export default function OutField({
  base,
  now,
  check,
  date,
  minDate,
  maxDate,
  sortCat,
  sortProd,
  catDis,
  prodDis,
  show,
  setProdDis,
  setCatDis,
  setBase,
  setDate,
  setEdit,
  setCheck,
  setCost,
  setCount,
  setMinDate,
  setMaxDate,
  setCat,
  setProd,
  setSortCat,
  setSortProd,
  setShow,
}) {
  let dates = [];

  switch (check) {
    case "1":
      dates = [now];
      break;
    case "2":
      dates = [date];
      break;
    case "3":
      dates = getDiapazonDates({ ...base.list }, minDate, maxDate);
      break;
    case "4":
      dates = [...Object.keys({ ...base.list })];
      break;
  }

  let listSort = sortObject({ ...base.list });
  listSort = getDateFilter(listSort, dates);

  let view;
  if (show) {
    view = <Grafic listSort={listSort} />;
  } else {
    view = (
      <Table
        base={base}
        listSort={listSort}
        setBase={setBase}
        setDate={setDate}
        setCost={setCost}
        setCount={setCount}
        setEdit={setEdit}
        setCat={setCat}
        setProd={setProd}
      />
    );
  }

  let out = (
    <div className="outfield">
      <OptionField
        base={base}
        date={date}
        check={check}
        minDate={minDate}
        maxDate={maxDate}
        catDis={catDis}
        prodDis={prodDis}
        show={show}
        setCheck={setCheck}
        setDate={setDate}
        setEdit={setEdit}
        setMinDate={setMinDate}
        setMaxDate={setMaxDate}
        sortCat={sortCat}
        setSortCat={setSortCat}
        setSortProd={setSortProd}
        setCatDis={setCatDis}
        setProdDis={setProdDis}
        setShow={setShow}
      />
      {view}
    </div>
  );

  function sortObject(obj) {
    return Object.keys(obj)
      .sort()
      .reduce(function (result, key) {
        result[key] = obj[key];
        return result;
      }, {});
  }

  function getDateFilter(obj, targetDate) {
    let result = {};
    for (let date in obj) {
      if (targetDate.includes(date)) {
        for (let cat in obj[date]) {
          if (sortCat === "") {
            for (let prod in obj[date][cat]) {
              if (sortProd === "") {
                result[date] = obj[date];
              } else if (sortProd === prod) {
                result[date] = !result[date] ? {} : { ...{}, ...result[date] };
                result[date][cat] = {};
                result[date][cat][prod] = {};
                result[date][cat][prod] = obj[date][cat][prod];
              }
            }
          } else if (sortCat === cat) {
            for (let prod in obj[date][cat]) {
              if (sortProd === "") {
                result[date] = {};
                result[date][cat] = {};
                result[date][cat] = obj[date][cat];
              } else if (sortProd === prod) {
                result[date] = {};
                result[date][cat] = {};
                result[date][cat][prod] = {};
                result[date][cat][prod] = obj[date][cat][prod];
              }
            }
          }
        }
      }
    }
    return result;
  }

  function getDiapazonDates(obj, min, max) {
    let result = [];
    for (let key in obj) {
      if (key <= max && key >= min) {
        result.push(key);
      }
    }
    return result;
  }

  return out;
}
