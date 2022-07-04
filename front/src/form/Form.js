import "./form.css";
import { useState } from "react";

export default function Form({
  base,
  edit,
  date,
  cat,
  prod,
  cost,
  count,
  setBase,
  setEdit,
  setDate,
  setCat,
  setProd,
  setCost,
  setCount,
}) {
  let [auth, setAuth] = useState("reg");
  let [name, setName] = useState("");
  let [pass, setPass] = useState("");
  let [errLogin, setErrLogin] = useState("");
  let [errPass, setErrPass] = useState("");
  let [errIsLogin, setErrIsLogin] = useState("");
  let [errAllFields, setErrAllFields] = useState("");

  let out;
  if (auth === "reg") {
    out = (
      <div className="form">
        <fieldset>
          <legend>Регистрация</legend>
          <p>
            <input
              type="text"
              placeholder="введите имя"
              value={name}
              onInput={(e) => setName(e.target.value)}
            />
            <span className="err">{errIsLogin}</span>
          </p>
          <p>
            <input
              type="password"
              placeholder="введите пароль"
              value={pass}
              onInput={(e) => setPass(e.target.value)}
            />
          </p>
          {/* <p>
          <input type="password" placeholder="повторите пароль" onCfng />
        </p> */}
          <p>
            <button onClick={handlerReg}>зарегестрироваться</button>
          </p>
          <p>
            <button onClick={() => setAuth("login")}>вход по паролю</button>
          </p>
        </fieldset>
      </div>
    );
  } else if (auth === "login") {
    out = (
      <div className="form">
        <fieldset>
          <legend>Вход по паролю</legend>
          <p>
            <input
              type="text"
              placeholder="введите имя"
              value={name}
              onInput={(e) => setName(e.target.value)}
            />
            <span className="err">{errLogin}</span>
          </p>
          <p>
            <input
              type="password"
              placeholder="введите пароль"
              value={pass}
              onInput={(e) => setPass(e.target.value)}
            />
          </p>
          <span className="err">{errPass}</span>

          <p>
            <button onClick={handlerLog}>войти</button>
          </p>
          <p>
            <button onClick={handlerOut}>к регистрации</button>
          </p>
        </fieldset>
      </div>
    );
  } else if (auth === "enter") {
    out = (
      <div className="form">
        <fieldset>
          <legend>{edit ? "Изменить запись" : "Добавить запись"}</legend>
          <p>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </p>
          <p>
            <input
              type="text"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
            />
          </p>
          <p>
            <input
              type="text"
              value={prod}
              onChange={(e) => setProd(e.target.value)}
            />
          </p>
          <p>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </p>
          <p>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
          </p>
          <p>
            <button onClick={handlerAdd}>
              {edit ? "сохранить изменения" : "добавить запись"}
            </button>
          </p>
          <p>
            <button onClick={handlerOut}>выход</button>
          </p>
          <p className="err">{errAllFields}</p>
        </fieldset>
      </div>
    );
  }

  function handlerReg() {
    if (name !== "" && pass !== "") {
      fetch("/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name,
          pass: pass,
        }),
      })
        .then((res) => (res = res.json()))
        .then((res) => {
          if (res === "этот логин занят") {
            setErrIsLogin("этот логин занят");
          } else {
            setErrLogin("");
            setErrPass("");
            setErrIsLogin("");
            setBase(res);
            setAuth("enter");
          }
          setPass("");
          setName("");
        });
    }
  }

  function handlerLog() {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        pass: pass,
      }),
    })
      .then((res) => (res = res.json()))
      .then((res) => {
        if (res === "нет такого юзера") setErrLogin("нет такого юзера");
        else if (res === "неверный пароль") setErrPass("неверный пароль");
        else {
          setErrIsLogin("");
          setErrLogin("");
          setErrPass("");
          setBase(res);
          setAuth("enter");
        }
        setPass("");
        setName("");
      });
  }

  function handlerOut() {
    setAuth(auth !== "login" ? "login" : "reg");
    setDate("");
    setCat("");
    setProd("");
    setCost("");
    setCount("");
    setBase([]);
    setEdit(false);
  }

  function handlerAdd() {
    if (
      date !== "" &&
      cat !== "" &&
      prod !== "" &&
      cost !== "" &&
      count !== ""
    ) {
      let list = { ...base.list };

      if (date in list) {
        if (cat in list[date]) {
          if (prod in list[date][cat]) {
            list[date][cat][prod] = { cost: cost, count: count };
          } else {
            list[date][cat] = {
              ...list[date][cat],
              ...{ [prod]: { cost: cost, count: count } },
            };
          }
        } else {
          list[date] = {
            ...list[date],
            ...{
              [cat]: { [prod]: { cost: cost, count: count } },
            },
          };
        }
      } else {
        list = {
          ...list,
          ...{
            [date]: { [cat]: { [prod]: { cost: cost, count: count } } },
          },
        };
      }

      let upDateBase = { ...base, ...{ list: list } };
      setBase(upDateBase);
      fetch("/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify(upDateBase),
      });
      setErrAllFields("");
      setEdit(false);
      setDate("");
      setCat("");
      setProd("");
      setCost("");
      setCount("");
    } else {
      setErrAllFields("все поля надо заполнить");
    }
  }

  return out;
}
