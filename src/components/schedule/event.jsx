import React from "react";

import "./event.css";
import Helper from "../../helper";

class Event extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

        /**
         * The ID of the event
         * @type { number }
         */
        this.id = this.props.data.id;

        /**
         * The name of the event
         * @type { string }
         */
        this.title = this.props.data.title;

        /**
         * The start time of the event
         * @type { Date }
         */
        this.startTime = new Date(this.props.data.start_time);

        /**
         * The end time of the event
         * @type { Date }
         */
        this.endTime = new Date(this.props.data.end_time);

        /**
         * The description of the event
         * @type { string }
         */
        this.description = this.props.data.description;

        /**
         * The location of the event
         * @type { string }
         */
        this.location = this.props.data.location;

        /**
         * The tags associated with the event
         * @type { string[] }
         */
        this.tags = this.props.data.tags;

        this.displayInfo = this.displayInfo.bind(this);
        this.hideInfo = this.hideInfo.bind(this);
        this.toggleInfo = this.toggleInfo.bind(this);
    }

    displayInfo() {
        this.setState({
            popup: true
        })
    }

    toggleInfo() {
        this.setState({
            popup: !this.state.popup
        })
    }

    hideInfo() {
        this.setState({
            popup: false
        })
    }

    /**
     * Returns true if the event meets the search criteria
     * @param { string } keyword 
     * @param {*} tags
     */
    passesFilters(keyword, tags) {
        let hasCommonTag = false;
        for (let i = 0; i < tags.length; i++) {
            if (this.tags.includes(tags[i])) {
                hasCommonTag = true;
                break;
            }
        }

        return hasCommonTag && (this.id.contains(keyword) || this.title.contains(keyword) || this.description.contains(keyword) ||
            this.location.contains(keyword));
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
            <div className="event-container">
                <div className={ `event ${this.tags[0]}` } onClick={ this.toggleInfo }>
                    <h1 className="event-title">
                        { this.title }
                    </h1>
                </div>
                { popup }
            </div>
        )
    }

}

export default Event;