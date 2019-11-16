import React, { Component } from "react";
import "./Hangman.css";
import Letter from "./Letter";
import { words } from "./Words";
import man from "./hangman.svg";
import { paths } from "./Paths";
import { gsap } from "gsap";

const offset = 65;

class Hangman extends Component {
  constructor() {
    super();
    this.state = {
      over: false,
      tries: 0,
      word: words[Math.floor(Math.random() * words.length)],
      used: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
        14: false,
        15: false,
        16: false,
        17: false,
        18: false,
        19: false,
        20: false,
        21: false,
        22: false,
        23: false,
        24: false,
        25: false
      }
    };
    this.type = this.type.bind(this);
    this.mapLetter = this.mapLetter.bind(this);
    this.click = this.click.bind(this);
    this.getWord = this.getWord.bind(this);
    this.genWord = this.genWord.bind(this);
    this.hit = this.hit.bind(this);
    this.didWin = this.didWin.bind(this);
  }

  mapLetter(letter) {
    return <Letter key={letter} letter={letter} used={this.state.used[letter]} click={this.click} />;
  }

  getWord() {
    let word = this.state.word;
    let result = [];
    let cap = word.toUpperCase();
    var code;
    if (this.state.over) {
      return word;
    }
    for (let i = 0; i < cap.length; i++) {
      code = cap.charCodeAt(i);
      if (code >= offset && code <= offset + 25) {
        if (this.state.used[code - offset]) {
          result.push(word.charAt(i));
        } else {
          result.push(" _ ");
        }
      } else {
        result.push(word.charAt(i));
      }
    }
    return result.join("");
  }

  genWord() {
    document.getElementById("man").style.clipPath = paths[0];
    gsap.fromTo("#genWord", { rotateX: 0, duration: 1 }, { rotateX: 360, duration: 1 });
    this.setState({
      over: false,
      tries: 0,
      word: words[Math.floor(Math.random() * words.length)],
      used: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
        14: false,
        15: false,
        16: false,
        17: false,
        18: false,
        19: false,
        20: false,
        21: false,
        22: false,
        23: false,
        24: false,
        25: false
      }
    });
  }

  hit(letter) {
    if (!this.state.over && this.state.word.toUpperCase().indexOf(String.fromCharCode(letter)) < 0) {
      document.getElementById("man").style.clipPath = paths[this.state.tries + 1];
      if (this.state.tries + 2 >= paths.length) {
        this.setState({ tries: this.state.tries + 1, over: true });
        return false;
      }
      this.setState({ tries: this.state.tries + 1 });
    }
    return true;
  }

  didWin() {
    if (this.getWord() === this.state.word) {
      let duration = 5;
      let opacity = 0;
      let ease = "Power3.easeOut";
      gsap.fromTo(".pulse", { scale: 0, opacity: 1, duration: 0 }, { scale: 40, opacity, duration, ease, stagger: 0.5 });
      this.setState({ over: true });
    }
  }

  render() {
    let row1 = [16, 22, 4, 17, 19, 24, 20, 8, 14, 15].map(this.mapLetter);
    let row2 = [0, 18, 3, 5, 6, 7, 9, 10, 11].map(this.mapLetter);
    let row3 = [25, 23, 2, 21, 1, 13, 12].map(this.mapLetter);
    return (
      <main>
        <div className="pulse"></div>
        <div className="pulse"></div>
        <div className="pulse"></div>
        <h1>Hangman</h1>
        <img src={man} id="man" alt="Man on noose" />
        <div id="word">
          <p>{this.getWord()}</p>
        </div>
        <div id="row1" className="row">
          {row1}
        </div>
        <div id="row2" className="row">
          {row2}
        </div>
        <div id="row3" className="row">
          {row3}
        </div>
        <button id="genWord" onClick={this.genWord}>
          New Word
        </button>
      </main>
    );
  }

  type(e) {
    if (e.which === 32) {
      this.genWord();
      return;
    }
    let index = e.which - offset;
    if (!this.state.over && index >= 0 && index <= 25 && !this.state.used[index]) {
      if (this.hit(e.which)) {
        this.setState({ used: { ...this.state.used, [index]: true } }, this.didWin);
      } else {
        this.setState({ used: { ...this.state.used, [index]: true } });
      }
    }
  }

  click(letter) {
    if (!this.state.over) {
      if (this.hit(letter + offset)) {
        this.setState({ used: { ...this.state.used, [letter]: true } }, this.didWin);
      } else {
        this.setState({ used: { ...this.state.used, [letter]: true } });
      }
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", this.type);
  }
}
export default Hangman;
