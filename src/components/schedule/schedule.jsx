import React from "react";
import Axios from "axios";

import Event from "./event";

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
                //initSchedule(res.data);
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
    }

    initSchedule(data) {
        this.earliestTime = new Date(8640000000000000);
        let latestTime = new Date(-8640000000000000);

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
    }

    render() {


        return (
            <div className="schedule-container">
                <table>
                    <tr>
                        <td className="schedule-times">
                        
                        </td>
                    </tr>
                </table>
            </div>
        );
    }

}

export default Schedule;