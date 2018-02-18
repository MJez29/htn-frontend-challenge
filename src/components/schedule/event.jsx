import "./event.css";
import Helper from "../../helper";

class Event {

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

    /**
     * The amount of space between adjacent events
     * @static
     * @returns { number }
     */
    static get SPACING() {
        return 10;
    }

    constructor(props) {

        let p = props.data || props;

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
    }

    /**
     * Sets the parameters used to position the event within the schedule
     * @param { number } ex - The number of events to the left of this event
     * @param { number } my - The number of minutes since the start of the schedule
     */
    setOffset(ex, my) {
        this.eventOffset = ex;
        this.minuteOffset = my;
    }

    /**
     * Sets the length of the event in minutes
     * The minimum length is 15
     * @param { number } t 
     */
    setLength(t) {
        this.length = Math.max(t, 15);
    }

    /**
     * Returns true if the event meets the search criteria
     * @param { string } keyword 
     * @param { { lightning_challenge: boolean, talk: boolean, logistics: boolean, workshop: boolean, judging: boolean, food: boolean, meetup: boolean } } tags
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

        // console.log("---");
        // console.log("Keyword: " + keyword);
        // console.log("Tags: ");
        // console.log(tags);
        // console.log("Title: " + this.title);
        // console.log("id: " + this.id);
        // console.log("description: " + this.description);
        // console.log("location: " + this.location);
        // console.log("Has common tag: " + hasCommonTag);
        // console.log("Match with id: " + this.id.toString().toLowerCase().includes(keyword));
        // console.log("Match with title: " + this.title.toLowerCase().includes(keyword));
        // console.log("Match with description: " + this.description.toLowerCase().includes(keyword));
        // console.log("Match with location: " + this.location.toLowerCase().includes(keyword));
        // console.log("Should render: " + (hasCommonTag && (this.id.toString().toLowerCase().includes(keyword) || 
        //     this.title.toLowerCase().includes(keyword) || 
        //     this.description.toLowerCase().includes(keyword) || 
        //     this.location.toLowerCase().includes(keyword))));

        // Check to see if the keyword is found in any of the data about the event
        return (hasCommonTag && (this.id.toString().toLowerCase().includes(keyword) || 
            this.title.toLowerCase().includes(keyword) || 
            this.description.toLowerCase().includes(keyword) || 
            this.location.toLowerCase().includes(keyword)));
    }
}

export default Event;