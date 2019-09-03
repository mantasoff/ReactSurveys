import React from 'react';
import { Link } from 'react-router-dom';

class SurveyDescription extends React.Component {
    render() {
        return(
        <div className="ui item">
            <div className="ui tiny image">
                 <img alt={this.props.survey.title} src="https://image.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600w-1037719192.jpg"/>
            </div>
            <div className="middle aligned content">
                <Link className="header" to={`/survey/${this.props.survey.id}`}>
                    <h6>{this.props.survey.title}</h6>
                </Link>
            </div>
            <div className="extra">
                <div onClick={() => {this.props.onDeleteSurvey(this.props.survey.id)}} className="ui right floated basic button red">
                    Delete
                </div>
                <Link to={`/survey/${this.props.survey.id}/answers`} className="ui right floated basic button green">
                    Answers
                </Link>
            </div>
        </div>
        );
    }
}

export default SurveyDescription;