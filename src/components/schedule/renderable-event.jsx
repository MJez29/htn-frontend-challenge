import React from "react";
import Event from"./event";

import "./event.css";
import Helper from "../../helper";

class RenderableEvent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

        let p = this.props.data || this.props;

        /**
         * The ID of the event
         * @type { number }
         */
        this.id = p.id;

        /**
         * The name of the event
         * @type { string }
         */
        this.title = p.title || "";

        /**
         * The start time of the event
         * @type { Date }
         */
        this.startTime = new Date(p.start_time || p.startTime);

        /**
         * The end time of the event
         * @type { Date }
         */
        this.endTime = new Date(p.end_time || p.endTime);

        /**
         * The description of the event
         * @type { string }
         */
        this.description = p.description || "";

        /**
         * The location of the event
         * @type { string }
         */
        this.location = p.location || "";

        /**
         * The tags associated with the event
         * @type { string[] }
         */
        this.tags = p.tags || [];

        /**
         * The number of events to the left of the event
         * @type { number }
         */
        this.eventOffset = p.eventOffset || 0;

        /**
         * The number of minutes before this event begins measured from the start of the schedule
         * @type { number }
         */
        this.minuteOffset = p.minuteOffset || 0;

        /**
         * The length of the event in minutes
         * @type { number }
         */
        this.length = p.length || 0;

        this.displayInfo = this.displayInfo.bind(this);
        this.hideInfo = this.hideInfo.bind(this);
        this.toggleInfo = this.toggleInfo.bind(this);
    }

    /**
     * Enables the additional info popup
     */
    displayInfo() {
        this.setState({
            popup: true
        })
    }

    /**
     * Toggles the additional info popup
     */
    toggleInfo() {
        this.setState({
            popup: !this.state.popup
        })
    }

    /**
     * Disables the additional info popup
     */
    hideInfo() {
        this.setState({
            popup: false
        })
    }

    componentWillUnmount() {
        console.log("Unmounting: " + this.title);
    }

    render() {
        let popup;

        if (this.state.popup) {
            popup = (
                <div className={ `event-popup ${this.tags[0]}` }>
                    <button className="event-popup-bookmark" onClick={ this.bookmark }>
                        <i className="fa fa-bookmark"></i>
                    </button>
                    <button className="event-popup-close" onClick={ this.hideInfo }>
                        <i className="fa fa-times"></i>
                    </button>

                    <h1 className="event-popup-title">
                        { this.title }
                    </h1>

                    <p className="event-popup-location event-popup-p">
                        { this.location }
                    </p>

                    <p className="event-popup-time event-popup-p">
                        { `${this.startTime.getHours()}:${ Helper.padTime(this.startTime.getMinutes())}` }
                        -
                        { `${this.endTime.getHours()}:${ Helper.padTime(this.endTime.getMinutes())}` }
                    </p>
                    
                    <br />

                    <p className="event-popup-description event-popup-p">
                        { this.description }
                    </p>
                </div>
            );
        }
        
        return (
            <div className="event-container" style={ {
                top: `${ this.minuteOffset * Event.UNIT_HEIGHT }px`,
                left: `${ this.eventOffset * Event.WIDTH + Event.SPACING * (this.eventOffset + 1) }px`,
            } }>
                <div className={ `event ${this.tags[0]}` } onClick={ this.toggleInfo } style={ {
                    height: `${ this.length * Event.UNIT_HEIGHT }px`,
                    width: Event.WIDTH
                } }>
                    <p className="event-title">
                        { this.title }
                    </p>
                </div>
                { popup }
            </div>
        )
    }

}

export default RenderableEvent;