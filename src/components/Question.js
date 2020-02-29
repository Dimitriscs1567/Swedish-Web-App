import React from 'react'
import { Grid } from 'semantic-ui-react';

const Question = (props) => {
    return (
        <Grid>
            <Grid.Row centered>
                <Grid.Column width={5} textAlign='center'>
                    What {props.word.word} means?
                </Grid.Column>
                <Grid.Column width={5} textAlign='center'>
                    What {props.word.word} means?
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Question;