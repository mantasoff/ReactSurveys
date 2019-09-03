import React from 'react';
import SurveyDescription from './SurveyDescription';

class SurveyList extends React.Component {
    renderSurveys = () => {
        return this.props.surveys.map(survey => {
            return <SurveyDescription survey={survey} onDeleteSurvey={this.props.onDeleteSurvey}/>
        })
    }

    render() {
        return(
        <div className="ui divided items" >
            {this.renderSurveys()}
        </div>
        );
    }
}

export default SurveyList;