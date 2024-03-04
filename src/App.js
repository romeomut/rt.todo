import React, { useEffect, useState } from "react";
import "./App.css";
import { v4 } from "uuid";
import randomColor from "randomcolor";
import Draggable from "react-draggable";

function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  //

  const newItem = () => {
    if (!item.trim() !== "") {
      const newItem = {
        id: v4(),
        item,
        color: randomColor({ luminosity: "light" }),
        defaultPosition: { x: 500, y: -500 },
      };

      setItems((items) => [...items, newItem]);
      setItem("");
    } else {
      alert("Enter something...");
      setItem("");
    }
  };

  //

  const deleteNode = (id) => {
    setItems(items.filter((el) => el.id !== id));
  };

  //

  const updatePosition = (data, index) => {
    let arr = [...items];
    arr[index].defaultPosition = { x: data.x, y: data.y };
    setItems(arr);
  };

  //

  // const keyPress = (e) => {
  //   if (e.keyCode === 13) {
  //     newItem();
  //   }
  // };

  //

  return (
    <div className="App">
      <div className="wrapper">
        <input
          value={item}
          type="text"
          placeholder="Enter something"
          onChange={(e) => setItem(e.target.value)}
          // onKeyPress={(e) => keyPress(0)}
        />
        <button className="enter" onClick={newItem}>
          ENTER
        </button>
      </div>

      {items.map((item, index) => {
        return (
          <Draggable
            key={index}
            defaultPosition={item.defaultPosition}
            onStop={(_, data) => {
              updatePosition(data, index);
            }}
          >
            <div className="todo__item" style={{ backgroundColor: item.color }}>
              {`${item.item}`}
              <button className="delete" onClick={() => deleteNode(item.id)}>
                X
              </button>
            </div>
          </Draggable>
        );
      })}
    </div>
  );
}

export default App;
