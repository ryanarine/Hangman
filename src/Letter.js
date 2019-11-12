import React from "react";

const offset = 97;

function Letter(props) {
  if (props.used) {
    return <button className={"letter-used"}>{String.fromCharCode(props.letter + offset)}</button>;
  } else {
    return (
      <button className={"letter"} onClick={() => props.click(props.letter)}>
        {String.fromCharCode(props.letter + offset)}
      </button>
    );
  }
}

export default Letter;
