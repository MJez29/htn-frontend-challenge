import React from "react";

import "./filterer.css";

class Filterer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            enabled: false
        }

        this.toggleFilters = this.toggleFilters.bind(this);
    }

    toggleFilters() {
        this.setState({
            enabled: !this.state.enabled
        });
    }

    render() {
        let content;

        // If filters are enabled
        if (this.state.enabled) {
            content = (
                <div>
                    <h1 className="add-filters-button" onClick={ this.toggleFilters }>
                        <i className="fa fa-minus"></i> Hide Filters
                    </h1>
                    <div className="pure-form pure-form-stacked">
                        <fieldset>
                            <div className="pure-control-group">
                                <div className="pure-g">
                                    <div className="pure-u-1-2 filter-label">
                                        <label htmlFor="keyword">Filter by Keyword</label>
                                    </div>
                                    <div className="pure-u-1-2">
                                        <input type="text" id="keyword" name="keyword" />
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="pure-control-group">
                                <div className="pure-g">
                                    <div className="pure-u-1-2 filter-label">
                                        <label htmlFor="tags">Filter by Tags</label>
                                    </div>
                                    <div className="pure-u-1-2">
                                    <label className="checkbox-container checkbox-lightning_challenge">Lightning Challenge
                                        <input type="checkbox" defaultChecked onChange={ this.props.onTagChange } name="lightning_challenge" id=""/> <br/>
                                        <span class="checkbox"></span>
                                    </label>
                                    <label className="checkbox-container checkbox-talk">Talk
                                        <input type="checkbox" defaultChecked onChange={ this.props.onTagChange } name="talk" id=""/> <br/>
                                        <span class="checkbox"></span>
                                    </label>
                                    <label className="checkbox-container checkbox-logistics">Logistics
                                        <input type="checkbox" defaultChecked onChange={ this.props.onTagChange } name="logistics" id=""/> <br/>
                                        <span class="checkbox"></span>
                                    </label>
                                    <label className="checkbox-container checkbox-workshop">Workshop
                                        <input type="checkbox" defaultChecked onChange={ this.props.onTagChange } name="workshop" id=""/> <br/>
                                        <span class="checkbox"></span>
                                    </label>
                                    <label className="checkbox-container checkbox-judging">Judging
                                        <input type="checkbox" defaultChecked onChange={ this.props.onTagChange } name="judging" id=""/> <br/>
                                        <span class="checkbox"></span>
                                    </label>
                                    <label className="checkbox-container checkbox-food">Food
                                        <input type="checkbox" defaultChecked onChange={ this.props.onTagChange } name="food" id=""/> <br/>
                                        <span class="checkbox"></span>
                                    </label>
                                    <label className="checkbox-container checkbox-meetup">Meetup
                                        <input type="checkbox" defaultChecked onChange={ this.props.onTagChange } name="meetup" id=""/>
                                        <span class="checkbox"></span>
                                    </label>
                                    
                                    
                            
                                    </div>
                                </div>
                            </div>
                            
                        </fieldset>
                    </div>
                    {/* <div className="pure-g">
                        <div className="pure-u-2-5">
                            <span>Filter by Keyword</span>
                        </div>
                        <div className="pure-u-3-5">
                            <input type="text" onChange={ this.props.onKeywordChange } />
                        </div>
                    </div>
                    <div className="pure-g">
                        <div className="pure-u-2-5">
                            <span>Filter by Tag</span>
                        </div>
                        <div className="pure-u-3-5">
                            <input type="checkbox" defaultChecked onChange={ this.props.onTagChange } name="lightning_challenge" id=""/> Lightning Challenge <br/>
                            <input type="checkbox" defaultChecked onChange={ this.props.onTagChange } name="talk" id=""/> Talk <br/>
                            <input type="checkbox" defaultChecked onChange={ this.props.onTagChange } name="logistics" id=""/> Logistics <br/>
                            <input type="checkbox" defaultChecked onChange={ this.props.onTagChange } name="workshop" id=""/> Workshop <br/>
                            <input type="checkbox" defaultChecked onChange={ this.props.onTagChange } name="judging" id=""/> Judging <br/>
                            <input type="checkbox" defaultChecked onChange={ this.props.onTagChange } name="food" id=""/> Food <br/>
                            <input type="checkbox" defaultChecked onChange={ this.props.onTagChange } name="meetup" id=""/> Meetup
                        </div>
                    </div> */}
                </div>
            );
        } else {
            content = (
                <h1 className="add-filters-button" onClick={ this.toggleFilters }>
                    <i className="fa fa-plus"></i> Show Filters
                </h1>
            );
        }

        return (
            <div>
                { content }
                <div className="pure-g">
                    <div className="pure-u-1-2 full-schedule">
                        <h1>
                            Full Schedule
                        </h1>
                    </div>
                    <div className="pure-u-1-2 my-schedule">
                        <h1>My Schedule</h1>
                    </div>
                </div>
            </div>
        );
    }

}

export default Filterer;