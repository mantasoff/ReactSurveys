import React from 'react';

const SurveyAnswer = props => {
    return(
        <div className="field">
            <input value={props.description} onChange={(e) => props.onAnswerChange(props.answer.id,e.target.value)} type="text" placeholder="Answer..." />
        </div>
    );
}

export default SurveyAnswer;