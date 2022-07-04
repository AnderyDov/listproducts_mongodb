import "./table.css";
import uuid from "react-uuid";

export default function Table({
  base,
  listSort,
  setBase,
  setDate,
  setEdit,
  setCost,
  setCount,
  setCat,
  setProd,
}) {
  let rows = [];
  let sumAll = 0;

  for (let date in listSort) {
    for (let cat in listSort[date]) {
      for (let prod in listSort[date][cat]) {
        let cost = listSort[date][cat][prod].cost;
        let count = listSort[date][cat][prod].count;
        let sum = cost * count;
        sumAll += sum;
        rows.push(
          <tr key={uuid()}>
            <td>{date}</td>
            <td>{cat}</td>
            <td>{prod}</td>
            <td>{cost}</td>
            <td>{count}</td>
            <td>{sum}</td>
            <td>
              <button onClick={(e) => handlerEdit(e)}>изменить</button>
            </td>
            <td>
              <button onClick={(e) => handlerDel(e)}>удалить</button>
            </td>
          </tr>
        );
      }
    }
  }

  let out = (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Дата</th>
            <th>Категория</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Колличество</th>
            <th>Сумма</th>
            <th>Изменение</th>
            <th>Удаление</th>
          </tr>
          {rows}
        </tbody>
      </table>
      <div>Общая стоимость: {sumAll}</div>
    </div>
  );

  function handlerEdit(e) {
    setEdit(true);
    let t = e.target.parentElement.parentElement;

    setDate(t.children[0].innerHTML);
    setCat(t.children[1].innerHTML);
    setProd(t.children[2].innerHTML);
    setCost(t.children[3].innerHTML);
    setCount(t.children[4].innerHTML);
  }

  function handlerDel(e) {
    setDate("");
    setCat("");
    setProd("");
    setCost("");
    setCount("");
    let t = e.target.parentElement.parentElement;

    let date = t.children[0].innerHTML;
    let cat = t.children[1].innerHTML;
    let prod = t.children[2].innerHTML;

    let temp = Object.assign({}, base);

    delete temp["list"][date][cat][prod];
    if (Object.keys(temp["list"][date][cat]).length === 0) {
      delete temp["list"][date][cat];
    }
    if (Object.keys(temp["list"][date]).length === 0) {
      delete temp["list"][date];
    }
    setBase(temp);

    fetch("/del", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify(temp),
    });
  }

  return out;
}
