import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";

// **************************************
class SessionLength extends React.Component {
  constructor(props) {
    super(props);

    this.incrementHandler = this.incrementHandler.bind(this);
    this.decrementHandler = this.decrementHandler.bind(this);
  }

  incrementHandler() {
    this.props.handleIncrements1("session", "+");
    return;
  }

  decrementHandler() {
    this.props.handleIncrements1("session", "-");
    return;
  }

  render() {
    return (
      <div id="session-length-container" className="length-display-1">
        <div id="session-label" className="length-display-2">
          Session Length
        </div>
        <div id="session-length-display" className="length-display-3">
          <div id="session-length">{this.props.sessionLength}</div>
          <div>
            <button
              id="session-increment"
              type="button"
              onClick={this.incrementHandler}
            >
              <i className="fa-solid fa-angle-up"></i>
            </button>
            <button
              id="session-decrement"
              type="button"
              onClick={this.decrementHandler}
            >
              <i className="fa-solid fa-angle-down"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// **************************************
class SessionTimer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="session-container">
        <div id="timer-label" className="title">
          {this.props.sessionTitle}
        </div>
        <div id="time-left" className="time-left">
          {this.props.sessionTimer}
        </div>
      </div>
    );
  }
}

// **************************************
class BreakLength extends React.Component {
  constructor(props) {
    super(props);

    this.incrementHandler = this.incrementHandler.bind(this);
    this.decrementHandler = this.decrementHandler.bind(this);
  }

  incrementHandler() {
    this.props.handleIncrements1("break", "+");
    return;
  }

  decrementHandler() {
    this.props.handleIncrements1("break", "-");
    return;
  }

  render() {
    return (
      <div id="break-container" className="length-display-1">
        <div id="break-label" className="length-display-2">
          Break Length
        </div>
        <div id="break-display" className="length-display-3">
          <div id="break-length">{this.props.breakLength}</div>
          <div>
            <button
              id="break-increment"
              type="button"
              onClick={this.incrementHandler}
            >
              <i className="fa-solid fa-angle-up"></i>
            </button>
            <button
              id="break-decrement"
              type="button"
              onClick={this.decrementHandler}
            >
              <i className="fa-solid fa-angle-down"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class Controls extends React.Component {
  constructor(props) {
    super(props);

    this.clickPlay = this.clickPlay.bind(this);
    this.clickReset = this.clickReset.bind(this);
  }

  clickPlay() {
    this.props.toggleTimer1();
    return;
  }

  clickReset() {
    this.props.handleReset1();
    return;
  }

  render() {
    return (
      <div id="control-section">
        <button
          id="start_stop"
          className="control-button"
          type="button"
          onClick={this.clickPlay}
        >
          Play
        </button>
        <button
          id="reset"
          className="control-button"
          type="button"
          onClick={this.props.handleReset1}
        >
          Reset
        </button>
        <button type="button" onClick={this.props.test1}>
          Test
        </button>
      </div>
    );
  }
}
// **************************************
class AppSessionTimer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionLength: 25,
      sessionSeconds: 1500,
      breakLength: 5,
      breakSeconds: 300,
      timerDisplay: "25:00",
      timerTitle: "SESSION",
      timerStatus: "off",
      timerSeconds: 1500,
      timerInterval: null,
    };

    this.handleIncrements = this.handleIncrements.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.timeToStr = this.timeToStr.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.test = this.test.bind(this);
    this.test2 = this.test2.bind(this);
  }

  handleIncrements(target, sign) {
    let tmpLenInt = 0;
    let tmpDispStr = "00";
    // console.log("Function: handleIncrements - ","Break: ", this.state.breakLength, "    Session: ", this.state.sessionLength);

    if (target === "session") {
      // Incrementing or decrementing the Session Length

      tmpLenInt = this.state.sessionLength;

      if (sign === "+") {
        tmpLenInt += 1;
      } else {
        tmpLenInt -= 1;
      }

      if (tmpLenInt > 0 && tmpLenInt < 61) {
        // Only allow updates if the limits have NOT been reached
        this.setState({ sessionLength: tmpLenInt });
        this.setState({ sessionSeconds: tmpLenInt * 60 });

        tmpDispStr = tmpDispStr + tmpLenInt + ":00";
        tmpDispStr = tmpDispStr.substring(tmpDispStr.length - 5);
        this.setState({ timerDisplay: tmpDispStr });
        this.setState({ timerSeconds: tmpLenInt * 60 });
      }
    } else if (target === "break") {
      // Incrementing or decrementing the Break Length
      tmpLenInt = this.state.breakLength;

      if (sign === "+") {
        tmpLenInt += 1;
      } else {
        tmpLenInt -= 1;
      }

      if (tmpLenInt > 0 && tmpLenInt < 61) {
        // Only allow updates if the limits have NOT been reached
        this.setState({ breakLength: tmpLenInt });
        this.setState({ breakSeconds: tmpLenInt * 60 });
      }
    }

    // console.log("Break: ", this.state.breakLength, "    Session: ", this.state.sessionLength);
    return;
  }

  handleReset() {
    // console.log("Function: handleReset - ","Break: ", this.state.breakLength, "    Session: ", this.state.sessionLength);
    clearInterval(this.state.timerInterval);

    this.setState({ sessionLength: 25 });
    this.setState({ sessionSeconds: 1500 });
    this.setState({ timerStatus: "off" });
    this.setState({ timerDisplay: "25:00" });
    this.setState({ timerSeconds: 1500 });
    this.setState({ timerTitle: "SESSION" });
    this.setState({ breakLength: 5 });
    this.setState({ breakSeconds: 300 });

    document.getElementById("time-left").innerHTML = "25:00";
    document.getElementById("start_stop").innerHTML = "Play";

    this.playAudio("stop");

    return;
  }

  playAudio(str) {
    // console.log("Function: playAudio - ","Break: ", this.state.breakLength, "    Session: ", this.state.sessionLength);

    const audioElement = document.getElementById("beep");
    if (str === "play") {
      audioElement.volume = 0.5;
      audioElement.play();
    } else if (str === "stop") {
      audioElement.load();
    }
    return;
  }

  timeToStr(sec) {
    // console.log("Function: timeToStr - ","Break: ", this.state.breakLength, "    Session: ", this.state.sessionLength);

    let tmpSec = "00" + (sec % 60); // Grab the second part
    let tmpMin = "00" + Math.floor(sec / 60); // Grab the minute part
    return (
      tmpMin.substring(tmpMin.length - 2) +
      ":" +
      tmpSec.substring(tmpSec.length - 2)
    );
  }

  updateTimer() {
    // console.log("Function: updateTimer - ","Break: ", this.state.breakLength, "    Session: ", this.state.sessionLength);

    if (this.state.timerSeconds === 0) {
      if (this.state.timerTitle === "SESSION") {
        this.setState({ timerTitle: "BREAK" });
        this.setState({ timerSeconds: this.state.breakSeconds });
        this.setState({
          timerDisplay: this.timeToStr(this.state.breakLength * 60),
        });
        this.setState({ timerStatus: "on" });
        this.test2("break");
      } else {
        // It must be "BREAK"
        this.setState({ timerTitle: "SESSION" });
        this.setState({ timerSeconds: this.state.sessionSeconds });
        this.setState({
          timerDisplay: this.timeToStr(this.state.sessionLength * 60),
        });
        this.setState({ timerStatus: "on" });
        this.test2("session");
      }
      this.playAudio("play");
      // console.log( "Timer title: ", this.state.timerTitle, " |  Session Length: ", this.state.sessionLength, " |  Break Length: ", this.state.breakLength );
    }

    this.setState({ timerSeconds: this.state.timerSeconds - 1 });
    document.getElementById("time-left").innerHTML = this.timeToStr(
      this.state.timerSeconds
    );

    // console.log("Timer: ", this.state.timerTitle, "  -  Display: ", this.timeToStr(this.state.timerSeconds), "  -  Seconds: ", this.state.timerSeconds );

    return;
  }

  toggleTimer() {
    // console.log("Function: toggleTimer - ", "Break: ", this.state.breakLength, "    Session: ", this.state.sessionLength);

    if (this.state.timerStatus === "off") {
      this.setState({ timerStatus: "on" });
      this.setState({ timerInterval: setInterval(this.updateTimer, 1000) });
      document.getElementById("start_stop").innerHTML = "Pause";
    } else {
      this.setState({ timerStatus: "off" });
      clearInterval(this.state.timerInterval);
      document.getElementById("start_stop").innerHTML = "Play";
    }
    return;
  }

  // Function for the Test button
  test() {
    // Due to the fact that you cannot query a state immediately after it has been set I added
    // a Test button with the Play and Reset buttons.  The sole purpose of this buttton is to
    // query the breakLength state.

    console.log(
      "Function: test - ",
      "Break: ",
      this.state.breakLength,
      "    Session: ",
      this.state.sessionLength
    );
    console.log("State is: ", this.state.breakLength);
  }

  // Function for use in updateTimer().
  test2(p) {
    // To log all the relevant details
    if (p === "session") {
      console.log(
        "TIMER  Title: ",
        this.state.timerTitle,
        "  |  Display: ",
        this.state.timerDisplay,
        "  |  Seconds: ",
        this.state.timerSeconds,
        "  |  SESSION Length: ",
        this.state.sessionLength
      );
      console.log(
        "time-left: ",
        document.getElementById("time-left").innerHTML,
        "  |  session-length: ",
        document.getElementById("session-length").innerHTML
      );
    } else {
      console.log(
        "TIMER  Title: ",
        this.state.timerTitle,
        "  |  Display: ",
        this.state.timerDisplay,
        "  |  Seconds: ",
        this.state.timerSeconds,
        "  |  BREAK Length: ",
        this.state.breakLength
      );
      console.log(
        "time-left: ",
        document.getElementById("time-left").innerHTML,
        "  |  break-length: ",
        document.getElementById("break-length").innerHTML
      );
    }
  }

  render() {
    return (
      <div id="app-session-timer">
        <div id="app-title">25 + 5 Session Timer</div>
        <hr className="solid"></hr>
        <div id="display-area">
          <div id="session-length-area">
            <SessionLength
              sessionLength={this.state.sessionLength}
              handleIncrements1={this.handleIncrements}
            />
          </div>
          <div id="session-timer">
            <SessionTimer
              sessionTitle={this.state.timerTitle}
              sessionTimer={this.state.timerDisplay}
            />
          </div>
          <div id="break-length-area">
            <BreakLength
              breakLength={this.state.breakLength}
              handleIncrements1={this.handleIncrements}
            />
          </div>
        </div>
        <div id="controls">
          <Controls
            toggleTimer1={this.toggleTimer}
            handleReset1={this.handleReset}
            test1={this.test}
          />
        </div>
        <audio
          id="beep"
          src="https://res.cloudinary.com/jamtd/video/upload/v1649359083/Sounds/sound_ex_machina_Applause_Clapping_Crowd_Ambience_grjlsl.mp3"
        ></audio>
      </div>
    );
  }
}

// ************************************
ReactDOM.render(<AppSessionTimer />, document.getElementById("app"));
