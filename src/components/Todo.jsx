import { useState } from "react";
import todo from "../images/todo.png";

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [addData, getAddData] = useState([]);
  const [toggleChanger, setToggleChanger] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const toAdd = () => {
    if (!inputData) {
      alert("Your Field is Empty!");
    } else if (inputData && !toggleChanger) {
      getAddData(
        addData.map((currElm) => {
          if (currElm.id === isEditItem) {
            return { ...currElm, name: inputData };
          }
          return currElm;
        })
      );
      setToggleChanger(true);
      setInputData("");
      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      getAddData([...addData, allInputData]);
      setInputData("");
    }
  };

  const deleteItem = (index) => {
    const updatedItems = addData.filter((currElm) => {
      return index !== currElm.id;
    });
    getAddData(updatedItems);
  };

  const removingItems = () => {
    getAddData([]);
  };

  const editItem = (id) => {
    const myItem = addData.find((currElm) => {
      return id === currElm.id;
    });
    setToggleChanger(false);
    setInputData(myItem.name);
    setIsEditItem(id);
  };

  return (
    <>
      <div className="brand">
        <span className="brand-name">DAILY LISTING</span>
        <span className="tagline"> Your Daily Manager</span>
      </div>

      <figure>
        <img
          src={todo}
          className="my-logo"
          id="main-logo"
          alt="Our Brand Icon"
        />
      </figure>

      <div className="content" id="main-content">
        <span className="list-now">Hurry Up! Start Listing Now.</span>
        <div className="item">
          <input
            type="text"
            placeholder="Add Items Here..."
            className="input-listing"
            maxLength={18}
            value={inputData}
            onChange={(e) => {
              setInputData(e.target.value);
            }}
          />
          {toggleChanger ? (
            <button className="functional-button" onClick={toAdd}>
              ADD
            </button>
          ) : (
            <button className="functional-button" onClick={toAdd}>
              Edit
            </button>
          )}
        </div>

        {addData.map((currElm) => {
          return (
            <div className="listing" key={currElm.id}>
              <h4 className="content-list">{currElm.name}</h4>
              <button
                className="functional-button"
                onClick={() => editItem(currElm.id)}
              >
                Edit
              </button>
              <button
                className="functional-button"
                onClick={() => deleteItem(currElm.id)}
              >
                Delete
              </button>
            </div>
          );
        })}

        <div className="item">
          <button className="checklist" onClick={removingItems}>
            <span>CHECKLIST</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;
