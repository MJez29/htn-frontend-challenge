import React from "react";
import Axios from "axios";

import Event from "./event";

import "./schedule.css";

import Helper from "../../helper";

class Schedule extends React.Component {

    static get HOUR_HEIGHT() {
        return 80;
    }
    
    constructor(props) {
        super(props);

        this.state = {};
        
        // Gets the event data from the server
        Axios.get("https://hackthenorth.com/fe-schedule.json")
            .then((res) => {
                this.initSchedule(res.data);
                this.forceUpdate();
            })
            .catch((err) => {
                console.log(err);
            })

        this.tempData = {
            "id": 472,
            "title": "Registration",
            "description": null,
            "start_time": "2018-09-15T17:30:00-04:00",
            "end_time": "2018-09-16T02:00:00-04:00",
            "location": "The Tent",
            "tags": [
                "meeting"
            ],
            "created_at": "2018-09-15T04:00:59-04:00",
            "updated_at": "2018-09-15T04:00:59-04:00"
        }

        this.initTimes = this.initTimes.bind(this);
        this.initSchedule = this.initSchedule.bind(this);
    }

    /**
     * Creates an array of React components that are aligned to display the times in the schedule timeline
     */
    initTimes() {
        let scheduleTimes = [];

        this.earliestTime.setMinutes(0, 0, 0);
        this.latestTime = new Date(this.latestTime + 1000 * 60 * 60);
        this.latestTime.setMinutes(0, 0, 0);

        let n = Math.ceil((this.latestTime - this.earliestTime) / (1000 * 60 * 60));
        console.log(this.earliestTime);
        console.log(this.latestTime);
        console.log(n);

        for (let i = 0; i < n; i++) {
            let t = new Date(this.earliestTime.getTime() + i * 60 * 60 * 1000);
            
            // If the start of a new day
            if (t.getHours() == 0) {
                scheduleTimes.push(
                    <h1 className="schedule-day" style={ {
                        top: `calc(${i * Schedule.HOUR_HEIGHT}px - 1.5em)`
                    } }>
                        { Helper.toWeekday(t.getDay()) }
                    </h1>
                )
            } else {
                scheduleTimes.push(
                    <span className="schedule-time" style={ {
                        top: `calc(${i * Schedule.HOUR_HEIGHT}px - 0.4em)`
                    } }>
                        { `${t.getHours()}:${ Helper.padTime(t.getMinutes())}` }
                    </span>
                );
            }
        }

        this.timeColumn = (
            <div className="schedule-times" style={ {
                height: n * Schedule.HOUR_HEIGHT
            } }>
                { scheduleTimes }
            </div>        
        )
    }

    initSchedule(data) {
        this.earliestTime = new Date(8640000000000000);
        this.latestTime = new Date(-8640000000000000);

        this.scheduleData = [];
        for (let i = 0; i < data.length; ++i) {
            this.scheduleData.push({
                id: data[i].id,
                title: data[i].title,
                description: data[i].description,
                startTime: new Date(data[i].start_time),
                endTime: new Date(data[i].end_time),
                location: data[i].location,
                tags: data[i].tags
            });

            // Adjusts earliest time if necessary
            if (this.scheduleData[i].startTime < this.earliestTime) {
                this.earliestTime = this.scheduleData[i].startTime;
            }

            // Adjusts the latest time if necessary
            if (this.scheduleData[i].endTime > this.latestTime) {
                this.latestTime =this.scheduleData[i].endTime;
            }
        }

        this.initTimes();
    }

    render() {

        return (
            <div className="schedule-container">
                { this.timeColumn }
            </div>
        );
    }

}

export default Schedule;