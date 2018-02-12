import React from "react";
import "./countdown.css";

class Countdown extends React.Component {

    static get DURATION() {
        return 2 * 60 * 60 * 1000;
    }

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.endTime = Date.now() + Countdown.DURATION;
        this.hours = 2;
        this.minutes = 0;
        this.seconds = 0;

        this.setState({
            endTime: Date.now() + Countdown.DURATION,
            hours: 2,
            minutes: 0,
            seconds: 0
        });
        
        setInterval(this.updateTime.bind(this), 1000);
    }

    updateTime() {
        let time = this.endTime - Date.now();

        this.setState({
            seconds: Math.floor(time / 1000) % 60,
            minutes: Math.floor(time / (1000 * 60)) % 60,
            hours: Math.floor(time / (1000 * 60 * 60))
        })
    }

    pad(n) {
        if (n < 10) {
            return `0${n}`;
        } else {
            return n;
        }
    }

    render() {

        return (
            <div className="pure-g">
                <div className="pure-u-1-3">
                    <div className="time">
                        {this.pad(this.state.hours)}
                    </div>
                </div> 
                <div className="pure-u-1-3">
                    <div className="time">
                        {this.pad(this.state.minutes)}
                    </div>
                </div>
                <div className="pure-u-1-3">
                    <div className="time">
                        {this.pad(this.state.seconds)}
                    </div>
                </div>             
            </div>
        );
    }
}

export default Countdown;