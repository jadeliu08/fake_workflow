import React from "react";

class CandidateTaskGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ""};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({name: "jade"}, function () {
            console.log("CandidateTasks handleClick callback")
        });
    }

    render() {
        return <div onClick={this.handleClick}>
            CandidateTasks
        </div>
    }
}

export default CandidateTaskGrid;