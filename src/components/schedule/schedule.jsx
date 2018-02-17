import React from "react";
import Axios from "axios";

import Event from "./event";
import Filterer from "./filterer";

import "./schedule.css";

import Helper from "../../helper";

class Schedule extends React.Component {

    static get HOUR_HEIGHT() {
        return 80;
    }
    
    constructor(props) {
        super(props);

        this.state = {
            keyword: "",
            tags: {
                lightningChallenge: true,
                talk: true,
                logistics: true,
                workshop: true,
                judging: true,
                food: true,
                meetup: true
            },
            visibleEventComponents: []
        };

        this.events = [];
        
        // Gets the event data from the server
        Axios.get("https://hackthenorth.com/fe-schedule.json")
            .then((res) => {
                this.initEvents(res.data);
                this.initTimes();
                this.updateEvents();
                this.forceUpdate();
            })
            .catch((err) => {
                console.error(err);
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
        this.initEvents = this.initEvents.bind(this);
        this.updateEvents = this.updateEvents.bind(this);
    }

    /**
     * Creates an array of React components that are aligned to display the times in the schedule timeline
     */
    initTimes() {
        let scheduleTimes = [];

        this.earliestTime.setMinutes(0, 0, 0);
        this.latestTime = new Date(this.latestTime.getTime() + 1000 * 60 * 60);
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

    initEvents(data) {
        this.earliestTime = new Date(8640000000000000);
        this.latestTime = new Date(-8640000000000000);

        this.events = [];
        for (let i = 0; i < data.length; ++i) {
            this.events.push(new Event(data[i]));

            // Adjusts earliest time if necessary
            if (this.events[i].startTime < this.earliestTime) {
                this.earliestTime = this.events[i].startTime;
            }

            // Adjusts the latest time if necessary
            if (this.events[i].endTime > this.latestTime) {
                this.latestTime =this.events[i].endTime;
            }
        }
    }

    onFilterKeywordChange(e) {
        this.setState({
            
        })
    }

    /**
     * Handles when one of the tag filters is changed
     * @param { Event } e 
     */
    onFilterTagChange(e) {
        this.setState({

        })
    }

    /**
     * 
     * @param { Event[] } visible 
     * @returns { number[] }
     */
    orderTimes(visible) {
        let order = [];

        for (let i = 0; i < visible.length; ++i) {
            order.push(visible[i].startTime.getTime(), visible[i].endTime.getTime());
        }

        order.sort();

        return order;
    }

    updateEvents() {
        let visibleEvents = [];
        
        for (let i = 0; i < this.events.length; ++i) {
            if (this.events[i].passesFilters(this.state.keyword, this.state.tags)) {
                visibleEvents.push(this.events[i]);
            }
        }

        // Orders all important times of the visible events
        let orderedTimes = this.orderTimes(visibleEvents);

        // The counter to detect when events overlap
        let overlapCounter = [];

        // Initializes all values to 0
        for (let i = 0; i < orderedTimes.length; ++i) {
            overlapCounter.push(0);
        }

        console.log(visibleEvents);

        let totalMaxOverlap = 0;

        for (let i = 0; i < visibleEvents.length; ++i) {
            let st = visibleEvents[i].startTime.getTime();
            let et = visibleEvents[i].endTime.getTime();

            let start = orderedTimes.findIndex((e) => {
                return e == st;
            });

            let end = orderedTimes.findIndex((e) => {
                return e == et;
            })

            // The maximum number of events that the current event overlaps with at one time
            let curMaxOverlap = 0;

            if (start != -1 && end != -1) {
                for (let i = start; i < end; ++i) {

                    // Updates the max overlaps
                    curMaxOverlap = Math.max(curMaxOverlap, overlapCounter[i]);
                    totalMaxOverlap = Math.max(totalMaxOverlap, overlapCounter[i]);

                    overlapCounter[i]++;
                }
                console.log(curMaxOverlap);
                // Offsets the event based on its position and the positions of events around it
                visibleEvents[i].setOffset(curMaxOverlap, st / 60000 - this.earliestTime.getTime() / 60000);
            } else {
                console.error("Find in orderedTimes failed.");
            }
        }

        this.setState({
            visibleEventComponents: visibleEvents.map((e) => {
                return <Event data={ e } />;
            })
        });
    }

    render() {

        return (
            <div className="schedule-container">
                <h1>Schedule</h1>
                <hr/>
                <Filterer onKeywordChange={ this.onFilterKeywordChange } onTagChange={ this.onFilterTagChange }/>
                <div className="schedule-content-container">
                    { this.timeColumn }
                    <div className="pure-menu pure-menu-horizontal pure-menu-scrollable event-container">
                        { this.state.visibleEventComponents }
                    </div>
                </div>
            </div>
        );
    }

}

export default Schedule;