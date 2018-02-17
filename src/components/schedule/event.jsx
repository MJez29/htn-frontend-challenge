import React from "react";

import "./event.css";
import Helper from "../../helper";

class Event extends React.Component {

    /**
     * The height in px that a 1 minute long event would have
     * @static
     * @returns { number }
     */
    static get UNIT_HEIGHT() {
        return 4 / 3;
    }

    /**
     * The width of the event in px
     * @static
     * @return { number }
     */
    static get WIDTH() {
        return 200;
    }

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

    /**
     * Sets the parameters used to position the event within the schedule
     * @param { number } ex - The number of events to the left of this event
     * @param { number } my - The number of minutes since the start of the schedule
     */
    setOffset(ex, my) {
        this.eventOffset = ex;
        this.minuteOffset = my;
        console.log(ex, my);
    }

    /**
     * Sets the length of the event in minutes
     * @param { number } t 
     */
    setLength(t) {
        this.length = t;
    }

    /**
     * Returns true if the event meets the search criteria
     * @param { string } keyword 
     * @param { { lightningChallenge: boolean, talk: boolean, logistics: boolean, workshop: boolean, judging: boolean, food: boolean, meetup: boolean } } tags
     * @return { boolean }
     */
    passesFilters(keyword, tags) {

        // Checks to see if it meets the tag criteria
        let hasCommonTag = false;
        for (let i = 0; i < this.tags.length; i++) {
            if (tags[this.tags[i]]) {
                hasCommonTag = true;
                break;
            }
        }

        // Check to see if the keyword is found in any of the data about the event
        return hasCommonTag && (toString(this.id).includes(keyword) || this.title.includes(keyword) || 
            this.description.includes(keyword) || this.location.includes(keyword));
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
        console.log(this.length);
        return (
            <div className="event-container" style={ {
                top: `${ this.minuteOffset * Event.UNIT_HEIGHT }px`,
                left: `${ this.eventOffset * Event.WIDTH + 10 * (this.eventOffset + 1) }px`,
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

export default Event;