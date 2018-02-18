import React from "react";
import Axios from "axios";

import Event from "./event";
import RenderableEvent from "./renderable-event";
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
                lightning_challenge: true,
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
                this.forceUpdate();
            })
            .catch((err) => {
                console.error(err);
            })

        this.initTimes = this.initTimes.bind(this);
        this.initEvents = this.initEvents.bind(this);
        this.updateEvents = this.updateEvents.bind(this);

        this.onFilterKeywordChange = this.onFilterKeywordChange.bind(this);
        this.onFilterTagChange = this.onFilterTagChange.bind(this);
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
                this.latestTime = this.events[i].endTime;
            }
        }

        this.earliestTime = new Date(this.earliestTime.getTime() - 2 * 60 * 60 * 1000);
        this.latestTime = new Date(this.latestTime.getTime() + 2 * 60 * 60 * 1000);

        this.length = (this.latestTime.getTime() - this.earliestTime.getTime()) / 60000;
    }

    onFilterKeywordChange(e) {

        this.setState({
            keyword: e.target.value.toLowerCase()
        });
    }

    /**
     * Handles when one of the tag filters is changed
     * @param { Event } e 
     */
    onFilterTagChange(e) {
        let tags = this.state.tags;
        tags[e.target.name] = e.target.checked;
        this.setState({
            tags: tags
        });
    }

    /**
     * 
     * @param { Event[] } visible 
     * @returns { number[] }
     */
    orderTimes(visible) {
        let order = new Map();

        for (let i = 0; i < visible.length; ++i) {
            let st = visible[i].startTime.getTime();
            let et = visible[i].endTime.getTime();
            if (!order.has(st)) {
                order.set(st, 0);
            }

            if (!order.has(et)) {
                order.set(et, 0);
            }
        }

        let orderArr = [ ...order.keys() ];
        orderArr.sort();
        return orderArr;
    }

    updateEvents(callback) {
        let visibleEvents = [];
        console.log("---");
        for (let i = 0; i < this.events.length; ++i) {
            if (this.events[i].passesFilters(this.state.keyword, this.state.tags)) {
                console.log(this.events[i].title);
                visibleEvents.push(this.events[i]);
            }
        }

        // Orders all important times of the visible events
        let orderedTimes = this.orderTimes(visibleEvents);

        // The counter to detect when events overlap
        let overlapCounter = [];

        // Initializes all values to 0
        for (let i = 0; i < orderedTimes.length; ++i) {
            overlapCounter.push([]);
        }

        this.totalMaxOverlap = 0;

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
            let offset = 0;

            if (start != -1 && end != -1) {

                // If an event has no length
                if (end == start) {
                    end++;
                }

                let n = Math.max(overlapCounter[start].length > 0 ? overlapCounter[start][overlapCounter[start].length - 1] : 0,
                    overlapCounter[end - 1].length > 0 ? overlapCounter[end - 1][overlapCounter[end - 1].length - 1] : 0) + 2;

                for (let i = 0; i < n; ++i) {

                    // If the index isn't taken at the start or the beginning
                    if (!overlapCounter[start].includes(i) && !overlapCounter[end - 1].includes(i)) {
                        let collision = false;
                        for (let j = start + 1; j < end - 1; j++) {
                            if (overlapCounter[j].includes(i)) {
                                collision = true;
                                break;
                            }
                        }

                        if (!collision) {
                            for (let j = start; j < end; j++) {
                                overlapCounter[j].push(i);
                                overlapCounter[j].sort();
                            }

                            offset = i;
                            break;
                        }
                    }
                }
                // Offsets the event based on its position and the positions of events around it
                visibleEvents[i].setOffset(offset, st / 60000 - this.earliestTime.getTime() / 60000);

                // Sets the size of the container
                visibleEvents[i].setLength(et / 60000 - st / 60000);
            } else {
                console.error("Find in orderedTimes failed.");
            }
        }

        return visibleEvents.map((e) => {
            return <RenderableEvent data={ e } />;
        })
    }

    render() {

        let vc = this.updateEvents();

        return (
            <div className="schedule-container">
                <h1 className="schedule-title">Schedule</h1>
                <hr className="schedule-title-line"/>
                <Filterer onKeywordChange={ this.onFilterKeywordChange } onTagChange={ this.onFilterTagChange }/>
                <div className="schedule-content-container" style={ {
                } }>
                    { this.timeColumn }
                    <div className="pure-menu pure-menu-horizontal pure-menu-scrollable event-container" style={ {
                        height: "100%",
                        width: "calc(100% - 8ch)"
                    } }>
                        { vc }
                    </div>
                </div>
            </div>
        );
    }

}

export default Schedule;